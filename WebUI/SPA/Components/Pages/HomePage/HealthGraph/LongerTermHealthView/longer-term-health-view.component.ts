// Angular and 3rd party stuff
import { Component, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
import * as momentRange from 'moment-range';
import { ChartModule, UIChart } from 'primeng/primeng';
import * as Chart from 'chart.js';
import 'chartjs-plugin-annotation';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { Time, Range, TimeRange } from 'SPA/Core/Helpers/DataStructures/misc';
import { ModalDialogService } from 'SPA/Core/Services/ModalDialogService/modal-dialog.service';
import { CommandManager } from 'SPA/Core/Managers/CommandManager/command.manager';
import * as HelperFunctions from 'SPA/Core/Helpers/Functions/functions';

// Components
import { DateRangeMode } from 'SPA/Core/Helpers/Enums/enums';
import { HealthStatusDatasetGenerator, SymptomTypeDatasetGenerator } from 'SPA/Components/Pages/AnalysisPage/IndicatorsView/dataset-generator';
import { HealthStatusesOverDayTooltipComponent } from 'SPA/Components/Shared/Tooltips/HealthStatusesOverDayTooltip/health-statuses-over-day-tooltip.component';
import { ColorProvider } from 'SPA/Components/Pages/AnalysisPage/IndicatorsView/color-provider';
import { HomePageDataService } from '../../home-page-data.service';
import { HomePageApplicationState, IReadOnlyApplicationState } from '../../home-page-application-state';


@Component({
    selector: 'longer-term-health-view',
    templateUrl: './longer-term-health-view.component.html',
    styleUrls: ['./longer-term-health-view.component.css'],
    host: { 'class': 'longer-term-health-view' }
})
export class LongerTermHealthViewComponent {
    // Fields
    @ViewChild('healthStatusTooltip')
    private healthStatusesTooltipInstance: HealthStatusesOverDayTooltipComponent;
    private canvas: any;
    private chartCanvasContext: any;
    private chartInstance: any;
    private readonly viewModel: ViewModel = {
        AvailableDateRange: null,
        SelectedDateRange: null,
        HealthEntriesInSelectedDateRange: null,

        ChartOptions: null,
        ChartData: null,
        DateRangeDisplayMode: DateRangeMode.TenDays,
    };
    private readonly subscriptions: Subscription[] = [];
    private readonly appState: IReadOnlyApplicationState;

    // Private methods
    private getCurrentDisplayModeInstance(): IDisplayMode {

        var getChartCanvasFunction: GetChartCanvasFunc = () => {
            return this.canvas;
        };
        var getChartInstanceFunction: GetChartInstanceFunc = () => {
            return this.chartInstance;
        };

        // Get Current Mode strategy
        let currentStrategy: IDisplayMode = null;
        if (this.viewModel.DateRangeDisplayMode === DateRangeMode.TenDays) {
            currentStrategy = new TenDaysDisplayMode(getChartInstanceFunction, getChartCanvasFunction,
                this.healthStatusesTooltipInstance, this.healthStatusDataSetGenerator);
        } else {
            // OBS -> Not implemented yet
            throw new Error('HealthGraphDisplayMode not implemented yet');
        }
        return currentStrategy;
    }
    private reloadDataFromServer(newDateRange: Range<moment.Moment>): Promise<void> {
        let jsDateRange = new Range<Date>(newDateRange.RangeStart.toDate(), newDateRange.RangeEnd.toDate());
        let promise = this.dataService.GetHealthStatusEntries(jsDateRange)
            .then(model => {
                this.viewModel.AvailableDateRange = newDateRange;
                this.viewModel.HealthEntriesInSelectedDateRange = model.HealthStatusEntryCLOs;
            });
        return promise;

    }
    private refreshUI() {

        // Get the healthstatusEntry CLOs which are in the SelectedDateRange
        let filteredHealthStatusEntryCLOs = this.viewModel.HealthEntriesInSelectedDateRange.filter(entry => {
            return moment(entry.OccurrenceDateTime) >= this.viewModel.SelectedDateRange.RangeStart &&
                moment(entry.OccurrenceDateTime) <= this.viewModel.SelectedDateRange.RangeEnd;
        });
        var datesToCLOsDictionary: { [dateKey: string]: CLOs.HealthStatusEntryCLO[] } = {};
        filteredHealthStatusEntryCLOs.forEach((clo, index) => {
            let dateKey = moment(clo.OccurrenceDateTime).format('DD/MM/YYYY');
            if (datesToCLOsDictionary[dateKey] === undefined) {
                datesToCLOsDictionary[dateKey] = [];
            };
            datesToCLOsDictionary[dateKey].push(clo);
        });

        // Refresh VM properties 
        let currentDisplayMode = this.getCurrentDisplayModeInstance();
        this.viewModel.ChartOptions = currentDisplayMode.GenerateChartOptions(datesToCLOsDictionary);
        this.viewModel.ChartData = currentDisplayMode.GenerateChartData( filteredHealthStatusEntryCLOs,
            new Range<moment.Moment>(this.viewModel.SelectedDateRange.RangeStart.clone(), this.viewModel.SelectedDateRange.RangeEnd.clone()));

        // Recreate the chart
        if (this.chartInstance) {
            this.chartInstance.destroy();
        }
        this.chartInstance = new Chart(this.chartCanvasContext, {
            type: 'bar',
            data: this.viewModel.ChartData,
            options: this.viewModel.ChartOptions,

        });
    }

    // Constructor 
    constructor(
        applicationState: HomePageApplicationState,
        private readonly dataService: HomePageDataService,
        private readonly commandManager: CommandManager,
        private readonly healthStatusDataSetGenerator: HealthStatusDatasetGenerator,
        private readonly colorProvider: ColorProvider

    ) {
        this.appState = applicationState as IReadOnlyApplicationState;

        // Register self to CommandManager
        this.commandManager.RegisterComponentInstance(this);

    }
    ngOnInit() {

        // Get the initial range using the current DisplayMode
        let now = moment();
        var initialSelectedDateRange = new Range<moment.Moment>(moment().startOf('day').subtract(9, 'days'),
            moment().endOf('day'));

        // Initialize date ranges
        this.viewModel.AvailableDateRange = initialSelectedDateRange;
        this.viewModel.SelectedDateRange = initialSelectedDateRange;
        this.viewModel.HealthEntriesInSelectedDateRange = this.dataService.GetHealthStatusEntriesForInitialRangeFromBundle().HealthStatusEntryCLOs;

        // OBS: Refresh the UI -> is done in ngAfterViewInit (in order to reference the chart properly)
    }
    ngAfterViewInit() {
        // Get references to the chart canvas context
        this.canvas = document.getElementById('longerTermHealthViewChart');
        this.chartCanvasContext = this.canvas.getContext('2d');

        // Refresh the UI
        this.refreshUI();
    }
    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

}

interface ViewModel {
    AvailableDateRange: Range<moment.Moment>;
    SelectedDateRange: Range<moment.Moment>;
    HealthEntriesInSelectedDateRange: CLOs.HealthStatusEntryCLO[];

    ChartOptions: any;
    ChartData: any;
    DateRangeDisplayMode: DateRangeMode;
}
export class SymptomTypeDatasetItem {
    constructor(
        public readonly SymptomTypeCLO: CLOs.SymptomTypeCLO,
        public IsSelected: boolean,
        public Color: string) { }
}


// Supported Display modes
type GetChartCanvasFunc = () => any;
type GetChartInstanceFunc = () => any;
interface IDisplayMode {
    GenerateChartOptions(datesToCLOsDictionary: { [dateKey: string]: CLOs.HealthStatusEntryCLO[] });
    GenerateChartData(preFilteredHealthStatusEntriesCLOs: CLOs.HealthStatusEntryCLO[], currentSelDateRange: Range<moment.Moment>);
}
class TenDaysDisplayMode implements IDisplayMode {

    // Constructor
    constructor(
        private readonly getChartInstance: GetChartInstanceFunc,
        private readonly getChartCanvas: GetChartCanvasFunc,
        private readonly healthStatusesTooltipInstance: HealthStatusesOverDayTooltipComponent,
        private readonly healthStatusDataSetGenerator: HealthStatusDatasetGenerator) {
    }

    // Public methods
    public GenerateChartOptions(datesToCLOsDictionary: { [dateKey: string]: CLOs.HealthStatusEntryCLO[] }) {
        let chartOptions = {
            layout: {
                padding: {
                    top: 0,
                    bottom: -60,
                }
            },
            animation: false,
            tooltips: {
                enabled: false,
                custom: (tooltipModel) => {
                    if (tooltipModel.opacity === 0) {
                        this.healthStatusesTooltipInstance.HideAndClear();
                        return;
                    }

                    // Variables
                    var canvas = this.getChartCanvas();
                    var dateString = tooltipModel.title[0];
                    var avgHealthLevelValue = tooltipModel.dataPoints[0].yLabel;
                    var dateKey = moment(dateString, "dddd MMM D, YYYY").format('DD/MM/YYYY');
                    var healthStatusEntryCLOsForDate = datesToCLOsDictionary[dateKey];
                    var parentPosition = canvas.getBoundingClientRect();
                    let index = tooltipModel.dataPoints[0].index;
                    let dataPointColor = this.getChartInstance().data.datasets[0].backgroundColor[index];

                    // Hack for positioning of tooltip on negative bar chart values
                    var value = tooltipModel.dataPoints[0].yLabel;
                    if (value < 0) {
                        tooltipModel.caretY = (parentPosition.height / 2);
                    }

                    //
                    this.healthStatusesTooltipInstance.SetDataAndPosition(dateString, healthStatusEntryCLOsForDate, parentPosition,
                        tooltipModel.caretX, tooltipModel.caretY, avgHealthLevelValue, dataPointColor);
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
                    offset:true,
                    id: 'x-axis-0',
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
                        color: '#cacaca',
                        display: false,
                        drawOnChartArea: false,
                        offsetGridLines:false
                    },
                    ticks: {
                        maxRotation: 0,
                        minRotation: 0,
                        fontColor: 'gray',
                        fontFamily: 'Arial',
                        fontSize: 9,
                        autoSkip: false,
                        callback: function (value, index, values) {
                            //return '';
                            /*if (!(index % 2))*/ return value;
                        }
                    }
                }],
                yAxes: [{
                    id: 'y-axis-0',
                    gridLines: {
                        color:'white',
                        display: true,
                        drawTicks: false,
                        drawOnChartArea: true,
                        drawBorder: true,
                        zeroLineColor: 'gray',
                        tickMarkLength: 2
                    },

                    ticks: {
                        fontColor: '#b6b6b6',
                        fontSize: 10,
                        padding: 3,
                        beginAtZero: true,
                        //min: -3,
                        //max: 3,
                        stepSize: 1,
                        callback: function (label, index, labels) {
                            //if (label === Enums.HealthLevel.NotGreat)
                            //    return 'Not Great';
                            //if (label === Enums.HealthLevel.VeryBad)
                            //    return 'Very Bad';
                            //else if (label !== 0)
                            //    return Enums.HealthLevel[label];
                            //else
                                return '';

                        }
                    }
                }]
            },
            responsive: true,
            maintainAspectRatio: false,
            annotation: {

                annotations: []
            }
        };

        // Annotations
        let today = moment();
        let lastDayOfThisMonth = moment().endOf('month');

        if (!today.isSame(lastDayOfThisMonth, 'day')) {
            let annotations = [{
                type: 'line',
                mode: 'vertical',
                scaleID: 'x-axis-0',
                value: moment(),
                borderColor: 'gray',
                borderWidth: 1,
                label: {
                    fontFamily: 'Arial',
                    fontSize: 7,
                    enabled: true,
                    position: "top",
                    content: 'TODAY'
                }
            }];
            chartOptions.annotation.annotations = annotations;
        }
        return chartOptions;
    }
    public GenerateChartData(preFilteredHealthStatusEntriesCLOs: CLOs.HealthStatusEntryCLO[]
        , currentSelDateRange: Range<moment.Moment>) {


       // Create HealthStatus dataset
        let data = {
            datasets: []
        };
        let healthStatusDataset = this.healthStatusDataSetGenerator.GenerateDataSet(preFilteredHealthStatusEntriesCLOs, currentSelDateRange);
        data.datasets.push(healthStatusDataset);


        return data;
    }
};