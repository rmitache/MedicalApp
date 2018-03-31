// Angular and 3rd party stuff
import { Component, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
import { ChartModule, UIChart } from 'primeng/primeng';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { Time, Range, TimeRange } from 'SPA/Core/Helpers/DataStructures/misc';
import { GlobalApplicationState, IReadOnlyApplicationState } from 'SPA/Components/Pages/HomePage/global-application-state';
import { GlobalDataService } from 'SPA/Components/Pages/HomePage/global-data.service';
import { ModalDialogService } from 'SPA/Core/Services/ModalDialogService/modal-dialog.service';
import { CommandManager } from 'SPA/Core/Managers/CommandManager/command.manager';
import * as HelperFunctions from 'SPA/Core/Helpers/Functions/functions';


@Component({
    selector: 'health-graph',
    templateUrl: './health-graph.component.html',
    styleUrls: ['./health-graph.component.css'],
    host: { 'class': 'health-graph' }
})
export class HealthGraphComponent {
    // Fields
    private availableDataWindowSizeInDays = 50;
    @ViewChild("chart")
    private chartInstance: UIChart;
    private readonly viewModel: ViewModel = {
        AvailableDateRange: null,
        AvailableHealthEntries: null,

        SelectedDateRange: null,

        ChartOptions: null,
        ChartData: null,
        SelectedViewMode: HealthGraphDisplayMode.Month
    };
    private readonly subscriptions: Subscription[] = [];
    private readonly appState: IReadOnlyApplicationState;


    // Private methods
    private getCurrentDisplayModeInstance(): IDisplayMode {
        // Get Current Mode strategy
        let currentStrategy: IDisplayMode = null;
        if (this.viewModel.SelectedViewMode === HealthGraphDisplayMode.Month) {
            currentStrategy = new MonthDisplayMode();
        } else {
            // OBS -> Not implemented yet
            throw new Error('HealthGraphDisplayMode not implemented yet');
        }
        return currentStrategy;
    }
    private recreateDisplayRepresentation() {

        // Use selectedDateRange to get a subset of data from AvailableFactorRecords
        let filteredHealthStatusEntries = this.viewModel.AvailableHealthEntries.filter(entry => {
            return entry.OccurenceDateTime >= this.viewModel.SelectedDateRange.RangeStart.toDate() &&
                entry.OccurenceDateTime <= this.viewModel.SelectedDateRange.RangeEnd.toDate();
        });

        // 
        let currentDisplayMode = this.getCurrentDisplayModeInstance();
        this.viewModel.ChartOptions = currentDisplayMode.GenerateChartOptions();
        this.viewModel.ChartData = currentDisplayMode.GenerateChartData(filteredHealthStatusEntries);
        this.chartInstance.reinit();

    }

    // Constructor 
    constructor(
        applicationState: GlobalApplicationState,
        private readonly dataService: GlobalDataService,
        private readonly commandManager: CommandManager,
        private readonly modalDialogService: ModalDialogService,
        private viewContainerRef: ViewContainerRef
    ) {
        this.appState = applicationState as IReadOnlyApplicationState;

        // Register self to CommandManager
        this.commandManager.RegisterComponentInstance(this);


    }
    ngOnInit() {

        // Init Available (super) DataSet
        this.viewModel.AvailableDateRange = new Range<moment.Moment>(
            moment().startOf('day').subtract(this.availableDataWindowSizeInDays, 'days'),
            moment().endOf('day'));
        this.viewModel.AvailableHealthEntries = this.dataService.GetHealthStatusEntriesForInitialRangeFromBundle().ToArray();

        // Then init the SelectedDateRange and create the display representation
        this.viewModel.SelectedDateRange = this.getCurrentDisplayModeInstance().GetInitialSelectedDateRange(moment());
        this.recreateDisplayRepresentation();
    }
    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}


interface ViewModel {
    AvailableDateRange: Range<moment.Moment>;
    AvailableHealthEntries: CLOs.HealthStatusEntryCLO[];

    SelectedDateRange: Range<moment.Moment>;

    ChartOptions: any;
    ChartData: any;
    SelectedViewMode: HealthGraphDisplayMode;
}
enum HealthGraphDisplayMode {
    Day,
    Week,
    Month
}

// STRATEGIES
interface IDisplayMode {
    GetInitialSelectedDateRange(referenceDate: moment.Moment): Range<moment.Moment>;
    GetNextSelectedDateRange(currentSelDateRange: Range<moment.Moment>): Range<moment.Moment>;
    GetPreviousSelectedDateRange(currentSelDateRange: Range<moment.Moment>): Range<moment.Moment>;
    GenerateChartOptions(): any;
    GenerateChartData(filteredHealthStatusEntries: CLOs.HealthStatusEntryCLO[]): any;
}
class MonthDisplayMode implements IDisplayMode {
    // Private methods
    private generateDataPointsForChart(healthStatusEntryCLOs: CLOs.HealthStatusEntryCLO[]) {
        var dataPoints = [];
        healthStatusEntryCLOs.forEach(clo => {
            var dp = {
                x: moment(clo.OccurenceDateTime),
                y: clo.HealthLevel
            };
            dataPoints.push(dp);
        });
        
        return dataPoints;
    }


    // Public methods
    public GetInitialSelectedDateRange(referenceDate: moment.Moment) {

        // Get the month of the referenceDate as an initial range
        let range = new Range<moment.Moment>(referenceDate.clone().startOf('month').startOf('day'),
            referenceDate.clone().endOf('month').endOf('day'));
        return range;
    }
    public GetNextSelectedDateRange(currentSelDateRange: Range<moment.Moment>): Range<moment.Moment> {
        throw new Error('GetNextSelectedDateRange not implemented yet');
    }
    public GetPreviousSelectedDateRange(currentSelDateRange: Range<moment.Moment>): Range<moment.Moment> {
        throw new Error('GetPreviousSelectedDateRange not implemented yet');
    }
    public GenerateChartOptions() {
        let chartOptions = {
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        //var label = data.datasets[tooltipItem.datasetIndex].label || '';

                        //if (label) {
                        //    label += ': ';
                        //}
                        //label += Math.round(tooltipItem.yLabel * 100) / 100;
                        //return label;

                        return 'wtf bro';
                    }
                }
            },
            elements: {
                line: {
                    tension: 0, // disables bezier curves
                }
            },
            legend: {
                display: true,
                position: 'top',
                labels: {
                    boxWidth: 15,

                },
            },
            scales: {
                xAxes: [{
                    type: "time",
                    time: {
                        unit: 'day',
                        round: 'day',
                        unitStepSize: 1,
                        tooltipFormat: "dddd MMM D, YYYY",
                        displayFormats: {
                            hour: 'MMM D'
                        }
                    },
                    gridLines: {
                        display: true,
                        offsetGridLines: true
                    },
                    ticks: {
                        fontColor: 'gray',
                        beginAtZero: true,
                    }
                }],
                yAxes: [{

                    gridLines: {
                        display: true,
                        drawTicks: true,
                        drawOnChartArea: true,
                        tickMarkLength: 5,
                        drawBorder: true,
                    },

                    ticks: {
                        fontColor: 'gray',
                        padding: 5,
                        beginAtZero: true
                    }
                }]
            },
            responsive: true,
            maintainAspectRatio: false
        };
        return chartOptions;
    }
    public GenerateChartData(filteredHealthStatusEntryCLOs: CLOs.HealthStatusEntryCLO[]) {

        // Prepare data
        var labelText = (filteredHealthStatusEntryCLOs.length > 0) ? moment(filteredHealthStatusEntryCLOs[0].OccurenceDateTime).format('MMMM YYYY') : 'No data is available';
        var dataPoints = this.generateDataPointsForChart(filteredHealthStatusEntryCLOs);

        // Set data
        var data = {
            datasets: [
                {
                    label: labelText,
                    data: dataPoints,
                    backgroundColor: '#c1e568',
                    borderColor: '#81a81f',
                    borderWidth: 1
                }
            ]
        }
        return data;
    }

};
