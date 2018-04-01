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

// Components
import { AddNewHealthStatusEntryComponent } from 'SPA/Components/Pages/HomePage/HealthGraph/AddNewHealthStatusEntry/add-new-health-status-entry.component';


@Component({
    selector: 'health-graph',
    templateUrl: './health-graph.component.html',
    styleUrls: ['./health-graph.component.css'],
    host: { 'class': 'health-graph' }
})
export class HealthGraphComponent {
    // Fields
    @ViewChild("chart")
    private chartInstance: UIChart;
    private readonly viewModel: ViewModel = {
        AvailableDateRange: null,
        AvailableHealthEntries: null,

        SelectedDateRange: null,

        ChartOptions: null,
        ChartData: null,
        SelectedViewMode: HealthGraphDisplayMode.Month,
        Blocked: false

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
    private reloadAvailableHealthStatusEntriesFromServer(newDateRange: Range<moment.Moment>): Promise<void> {
        let jsDateRange = new Range<Date>(newDateRange.RangeStart.toDate(), newDateRange.RangeEnd.toDate());
        let promise = this.dataService.GetHealthStatusEntries(jsDateRange)
            .then(clos => {
                this.viewModel.AvailableDateRange = newDateRange;
                this.viewModel.AvailableHealthEntries = clos;
            });
        return promise;
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
        this.viewModel.ChartData = currentDisplayMode.GenerateChartData(filteredHealthStatusEntries,
            new Range<moment.Moment>(this.viewModel.SelectedDateRange.RangeStart.clone(), this.viewModel.SelectedDateRange.RangeEnd.clone()));

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
        this.viewModel.AvailableDateRange = new Range<moment.Moment>(moment().startOf('month').startOf('day'),// current month
            moment().endOf('month').startOf('day'));
        this.viewModel.AvailableHealthEntries = this.dataService.GetHealthStatusEntriesForInitialRangeFromBundle().ToArray();

        // Then init the SelectedDateRange and create the display representation
        this.viewModel.SelectedDateRange = this.getCurrentDisplayModeInstance().GetInitialSelectedDateRange(moment());
        this.recreateDisplayRepresentation();
    }
    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    // Public methods
    public RefreshUI() {
        this.reloadAvailableHealthStatusEntriesFromServer(this.viewModel.AvailableDateRange)
            .then(() => {
                this.recreateDisplayRepresentation();
            });
    }

    // Event handlers
    private onAddNewHealthStatusEntryTriggered() {
        this.modalDialogService.openDialog(this.viewContainerRef, {
            title: 'Add new Health Entry ',
            childComponent: AddNewHealthStatusEntryComponent,
            data: moment().toDate(),
            actionButtons: [
                {
                    isDisabledFunction: (childComponentInstance: any) => {
                        let componentInstance = childComponentInstance as AddNewHealthStatusEntryComponent;
                        return !componentInstance.GetValidState();
                    },
                    text: 'Save',
                    onAction: (childComponentInstance: any) => {
                        let promiseWrapper = new Promise<void>((resolve) => {
                            this.viewModel.Blocked = true;

                            let componentInstance = childComponentInstance as AddNewHealthStatusEntryComponent;
                            componentInstance.SaveData()
                                .then((cloList) => {
                                    


                                    this.reloadAvailableHealthStatusEntriesFromServer(this.viewModel.AvailableDateRange)
                                        .then(() => {
                                            this.recreateDisplayRepresentation();
                                            setTimeout(() => {
                                                this.viewModel.Blocked = false;
                                                resolve();
                                            }, 200);
                                        });

                                });
                        });
                        return promiseWrapper;
                    }
                },
                {
                    isDisabledFunction: (childComponentInstance: any) => {
                        return false;
                    },
                    text: 'Cancel',
                    onAction: () => {
                        return true;
                    }
                }
            ]
        });
    }
}


interface ViewModel {
    AvailableDateRange: Range<moment.Moment>;
    AvailableHealthEntries: CLOs.HealthStatusEntryCLO[];

    SelectedDateRange: Range<moment.Moment>;

    ChartOptions: any;
    ChartData: any;
    SelectedViewMode: HealthGraphDisplayMode;
    Blocked: boolean;
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
    GenerateChartData(filteredHealthStatusEntries: CLOs.HealthStatusEntryCLO[], currentSelDateRange: Range<moment.Moment>): any;
}
class MonthDisplayMode implements IDisplayMode {
    // Private methods
    private getAverageHealthLevel(healthStatusEntryCLOs: CLOs.HealthStatusEntryCLO[]) {
        var sum: number = 0;
        healthStatusEntryCLOs.forEach(clo => {
            sum += clo.HealthLevel;
        });

        if (healthStatusEntryCLOs.length > 0)
            return sum / healthStatusEntryCLOs.length;
        else
            return 0;
    }
    private generateDataPointsForChart(healthStatusEntryCLOs: CLOs.HealthStatusEntryCLO[], range: Range<moment.Moment>) {
       
        // Variables
        var dataPoints = []
        var dataPointsBgColors = [];

        // Create a dictionary of dates and clos 
        var datesToCLOsDictionary: { [dateKey: string]: CLOs.HealthStatusEntryCLO[] } = {};
        healthStatusEntryCLOs.forEach((clo, index) => {

            let dateKey = moment(clo.OccurenceDateTime).format('DD/MM/YYYY');
            if (datesToCLOsDictionary[dateKey] === undefined) {
                datesToCLOsDictionary[dateKey] = [];
            };
            datesToCLOsDictionary[dateKey].push(clo);
        });

        // Loop through dates and create datapoints
        var datesInRangeArray = HelperFunctions.EnumerateDaysBetweenDatesUsingMoment(range, true);
        datesInRangeArray.forEach((date, index) => {
            let dateKey = date.format('DD/MM/YYYY');
            var clos = (datesToCLOsDictionary[dateKey] !== undefined) ? datesToCLOsDictionary[dateKey] : [];
            var avgHealthLevel = this.getAverageHealthLevel(clos);

            // Create datapoints
            var dp = {
                x: date,
                y: avgHealthLevel
            };
            dataPoints.push(dp);
            if (avgHealthLevel >= 0) {
                dataPointsBgColors.push('#9dc340'); // green
            } else {
                dataPointsBgColors.push('#f35d5d'); // red
            }
        });

        return {
            dataPoints: dataPoints,
            dataPointsBgColors: dataPointsBgColors
        };
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
                        var healthLevelName = Enums.HealthLevel[tooltipItem.yLabel];
                        return healthLevelName;
                    }
                }
            },
            elements: {
                line: {
                    tension: 0, // disables bezier curves
                }
            },
            legend: {
                display: false,
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
                        drawOnChartArea: false,
                        offsetGridLines: true
                    },
                    ticks: {
                        fontColor: 'gray',
                        beginAtZero: true,
                        autoSkip: false,
                        callback: function (value, index, values) {
                            return value;
                        }
                    }
                }],
                yAxes: [{

                    gridLines: {
                        display: true,
                        drawTicks: true,
                        drawOnChartArea: true,
                        tickMarkLength: 5,
                        drawBorder: true,
                        zeroLineColor: 'black'
                    },

                    ticks: {
                        fontColor: 'gray',
                        padding: 5,
                        beginAtZero: true,
                        min: -3,
                        max: 3,
                        stepSize: 1,
                        callback: function (label, index, labels) {
                            if (label !== 0)
                                return Enums.HealthLevel[label];
                            else
                                return '';

                        }
                    }
                }]
            },
            responsive: true,
            maintainAspectRatio: false
        };
        return chartOptions;
    }
    public GenerateChartData(filteredHealthStatusEntryCLOs: CLOs.HealthStatusEntryCLO[], currentSelDateRange: Range<moment.Moment>) {

        // Prepare data
        var dataPointsInfo = this.generateDataPointsForChart(filteredHealthStatusEntryCLOs, currentSelDateRange);

        // Set data
        var data = {
            datasets: [
                {
                    label: 'General state',
                    data: dataPointsInfo.dataPoints,
                    backgroundColor: dataPointsInfo.dataPointsBgColors,
                }
            ]
        }
        return data;
    }

};
