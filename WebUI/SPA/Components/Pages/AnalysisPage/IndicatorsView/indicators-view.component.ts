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
import { GetMonthRangeWithPaddingUsingMoment, IsDateOnFirstOrLastDateInMonth } from 'SPA/Core/Helpers/Functions/functions';

// Components
import { AnalysisPageApplicationState, IReadOnlyApplicationState } from 'SPA/Components/Pages/AnalysisPage/analysis-page-application-state';
import { AnalysisPageDataService } from 'SPA/Components/Pages/AnalysisPage/analysis-page-data.service';
import { NavigationPanelComponent } from 'SPA/Components/Shared/NavigationPanel/navigation-panel.component';
import { DateRangeMode } from 'SPA/Core/Helpers/Enums/enums';
import { IndicatorsFiltersPanelComponent } from 'SPA/Components/Pages/AnalysisPage/IndicatorsView/IndicatorsFiltersPanel/indicators-filters-panel.component';
import { HealthStatusDatasetGenerator, SymptomTypeDatasetGenerator } from 'SPA/Components/Pages/AnalysisPage/IndicatorsView/dataset-generator';
import { SpinnerService } from 'SPA/Core/Services/SpinnerService/spinner.service';
import { ColorProvider } from './color-provider';
import { HealthStatusesOverDayTooltipComponent } from '../../../Shared/Tooltips/HealthStatusesOverDayTooltip/health-statuses-over-day-tooltip.component';


@Component({
    selector: 'indicators-view',
    templateUrl: './indicators-view.component.html',
    styleUrls: ['./indicators-view.component.css'],
    host: { 'class': 'indicators-view' }
})
export class IndicatorsViewComponent {
    // Fields
    private availableWindowPaddingInMonths = 1;
    private dateRangeDisplayMode: DateRangeMode = DateRangeMode.SingleMonth;
    @ViewChild('healthStatusTooltip')
    private healthStatusesTooltipInstance: HealthStatusesOverDayTooltipComponent;
    @ViewChild('filtersPanel')
    private filtersPanelInstance: IndicatorsFiltersPanelComponent;
    private canvas: any;
    private chartCanvasContext: any;
    private chartInstance: any;
    private infoTooltipText: string =
        `Here you can see an overview of how you've felt every day (good days and bad days). <br />
        On the right side, you can also see a list of your Symptoms, which you can show/hide. This 
        can be used in order to spot possible correlations and patterns. <br />
        Another good use of this area is to look at Symptoms and see when else in the past you've had problems with them.`;
    private readonly viewModel: ViewModel = {
        SymptomTypesDatasetItems: null,

        AvailableDateRange: null,
        SelectedDateRange: null,
        HealthEntriesInSelectedDateRange: null,

        HighlightRangeStartXPosition: null,
        HighlightRangeEndXPosition: null,

        ChartOptions: null,
        ChartData: null,
        DateRangeDisplayMode: DateRangeMode.ThreeMonths,
    };
    private readonly subscriptions: Subscription[] = [];
    private readonly appState: IReadOnlyApplicationState;
    private displaySideBar: boolean = false;

    // Private methods
    private generateSymptomTypeDatasetItems(availableCLOs: CLOs.SymptomTypeCLO[], selectedCLOs: number[]): SymptomTypeDatasetItem[] {

        // Variables
        let datasetItems: SymptomTypeDatasetItem[] = [];

        // Generate a FilterItem for each AvailableCLO
        for (let i = 0; i < availableCLOs.length; i++) {
            let availableCLO = availableCLOs[i];

            // Check whether it should be Selected or Deselected
            let isSelected = (selectedCLOs.find((id) => {
                if (id !== null) {
                    return id === availableCLO['ID'];
                } else {
                    return false;
                }
            }) !== undefined) ? true : false;

            // Create the new FilterItem
            let color = null;
            let newFilterItem = new SymptomTypeDatasetItem(availableCLO, isSelected, color);
            datasetItems.push(newFilterItem);

        }
        return datasetItems;
    }
    private getCurrentDisplayModeInstance(): IDisplayMode {

        var getChartCanvasFunction: GetChartCanvasFunc = () => {
            return this.canvas;
        };
        var getChartInstanceFunction: GetChartInstanceFunc = () => {
            return this.chartInstance;
        };

        // Get Current Mode strategy
        let currentStrategy: IDisplayMode = null;
        if (this.viewModel.DateRangeDisplayMode === DateRangeMode.SingleMonth) {
            currentStrategy = new SingleMonthDisplayMode(getChartInstanceFunction, getChartCanvasFunction,
                this.healthStatusesTooltipInstance, this.healthStatusDataSetGenerator, this.symptomTypeDatasetGenerator);
        } else if (this.viewModel.DateRangeDisplayMode === DateRangeMode.ThreeMonths) {
            currentStrategy = new ThreeMonthsDisplayMode(getChartInstanceFunction, getChartCanvasFunction,
                this.healthStatusesTooltipInstance, this.healthStatusDataSetGenerator, this.symptomTypeDatasetGenerator);
        } else if (this.viewModel.DateRangeDisplayMode === DateRangeMode.TwelveMonths) {
            currentStrategy = new TwelveMonthsDisplayMode(getChartInstanceFunction, getChartCanvasFunction,
                this.healthStatusesTooltipInstance, this.healthStatusDataSetGenerator, this.symptomTypeDatasetGenerator);
        } else {
            // OBS -> Not implemented yet
            throw new Error('HealthGraphDisplayMode not implemented yet');
        }
        return currentStrategy;
    }
    private reloadDataFromServer(newDateRange: Range<moment.Moment>): Promise<void> {
        let jsDateRange = new Range<Date>(newDateRange.RangeStart.toDate(), newDateRange.RangeEnd.toDate());
        let promise = this.dataService.GetHealthStatusEntries(jsDateRange)
            .then(clos => {
                this.viewModel.AvailableDateRange = newDateRange;
                this.viewModel.HealthEntriesInSelectedDateRange = clos;
            });
        return promise;

    }
    private computeXPositionFromDate(date: moment.Moment) {
        // Check if in range
        var selDateRange = new momentRange.DateRange(this.viewModel.SelectedDateRange.RangeStart, this.viewModel.SelectedDateRange.RangeEnd);
        if (!selDateRange.contains(date)) {
            return null;
        }

        // Variables
        var startDateIndex = HelperFunctions.GetDateIndexInTargetRange(date, this.viewModel.SelectedDateRange);
        var nrOfDaysInSelectedDateRange = HelperFunctions.GetNrOfDaysBetweenDatesUsingMoment(this.viewModel.SelectedDateRange.RangeStart, this.viewModel.SelectedDateRange.RangeEnd);
        var widthBetweenDates = 100 / (nrOfDaysInSelectedDateRange - 1);

        // Compute the width
        let xPosition = (startDateIndex) * widthBetweenDates;
        return xPosition;
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
        let anySymptomsAreSelected = this.viewModel.SymptomTypesDatasetItems.some(elem => {
            return elem.IsSelected;
        });
        let currentDisplayMode = this.getCurrentDisplayModeInstance();
        this.viewModel.ChartOptions = currentDisplayMode.GenerateChartOptions(datesToCLOsDictionary, anySymptomsAreSelected);
        this.viewModel.ChartData = currentDisplayMode.GenerateChartData(this.viewModel.SymptomTypesDatasetItems, filteredHealthStatusEntryCLOs,
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
        applicationState: AnalysisPageApplicationState,
        private readonly dataService: AnalysisPageDataService,
        private readonly commandManager: CommandManager,
        private readonly healthStatusDataSetGenerator: HealthStatusDatasetGenerator,
        private readonly symptomTypeDatasetGenerator: SymptomTypeDatasetGenerator,
        private readonly colorProvider: ColorProvider,
        private readonly spinnerService: SpinnerService

    ) {
        this.appState = applicationState as IReadOnlyApplicationState;

        // Register self to CommandManager
        this.commandManager.RegisterComponentInstance(this);

        // Subscriptions to AppState
        this.subscriptions.push(this.appState.HighlightedDateRange.Changed.subscribe((newRange) => {
            if (newRange !== null) {
                let start: moment.Moment = newRange.RangeStart;
                let end: moment.Moment = newRange.RangeEnd;

                this.viewModel.HighlightRangeStartXPosition = this.computeXPositionFromDate(start);
                this.viewModel.HighlightRangeEndXPosition = this.computeXPositionFromDate(end);
            } else {
                this.viewModel.HighlightRangeStartXPosition = null;
                this.viewModel.HighlightRangeEndXPosition = null;
            }
        }));
        this.subscriptions.push(this.appState.SelectedDateRange.Changed.subscribe((newValue) => {
            this.onSelectedDateRangeChanged(newValue);
        }));
    }
    ngOnInit() {

        // Initialize symptomTypes and filtersPanel
        this.viewModel.SymptomTypesDatasetItems = this.generateSymptomTypeDatasetItems(this.dataService.GetSymptomTypesFromBundle().ToArray(), []);
        this.filtersPanelInstance.InitializeItems(this.viewModel.SymptomTypesDatasetItems);

        // Initialize date ranges
        let now = moment();
        this.viewModel.AvailableDateRange = GetMonthRangeWithPaddingUsingMoment(now, now, this.availableWindowPaddingInMonths);
        this.viewModel.HealthEntriesInSelectedDateRange = this.dataService.GetHealthStatusEntriesForInitialRangeFromBundle().ToArray();
    }
    ngAfterViewInit() {
        // Get references to the chart canvas context
        this.canvas = document.getElementById('myChart');
        this.chartCanvasContext = this.canvas.getContext('2d');
    }
    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    // Event handlers
    private onSelectedDateRangeChanged(newSelDateRange: Range<moment.Moment>) {


        // Check if newSelDateRange is within the AvailableDateRange
        if (newSelDateRange.RangeStart >= this.viewModel.AvailableDateRange.RangeStart &&
            newSelDateRange.RangeEnd <= this.viewModel.AvailableDateRange.RangeEnd) {
            this.viewModel.SelectedDateRange = newSelDateRange;
            this.refreshUI();
        }
        else {
            // If it isn't, load a new "window" of FactorRecords from the server
            var newAvailableDateRange = GetMonthRangeWithPaddingUsingMoment(newSelDateRange.RangeStart.clone(),
                newSelDateRange.RangeEnd.clone(), this.availableWindowPaddingInMonths);

            this.spinnerService.Show();
            this.reloadDataFromServer(newAvailableDateRange)
                .then(() => {
                    this.viewModel.SelectedDateRange = newSelDateRange;
                    this.refreshUI();
                    setTimeout(() => {
                        this.spinnerService.Hide();
                    }, 200);
                });
        }
    }
    private onSymptomTypeToggleTriggered(targetItem: SymptomTypeDatasetItem) {
        if (targetItem.IsSelected === true) {
            // Deselect
            targetItem.IsSelected = false;
            this.colorProvider.PutBackColor(targetItem.Color);
            targetItem.Color = null;
        } else {
            // Select
            targetItem.IsSelected = true;
            targetItem.Color = this.colorProvider.GetNextColor();
        }

        this.refreshUI();
    }

}

interface ViewModel {
    SymptomTypesDatasetItems: SymptomTypeDatasetItem[];

    AvailableDateRange: Range<moment.Moment>;
    SelectedDateRange: Range<moment.Moment>;
    HealthEntriesInSelectedDateRange: CLOs.HealthStatusEntryCLO[];

    HighlightRangeStartXPosition: number;
    HighlightRangeEndXPosition: number;

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
    GenerateChartOptions(datesToCLOsDictionary: { [dateKey: string]: CLOs.HealthStatusEntryCLO[] }, showSymptomsAxis?: boolean);
    GenerateChartData(symptomTypesDatasetItems: SymptomTypeDatasetItem[], preFilteredHealthStatusEntriesCLOs: CLOs.HealthStatusEntryCLO[],
        currentSelDateRange: Range<moment.Moment>);
}

class SingleMonthDisplayMode implements IDisplayMode {

    // Constructor
    constructor(
        private readonly getChartInstance: GetChartInstanceFunc,
        private readonly getChartCanvas: GetChartCanvasFunc,
        private readonly healthStatusesTooltipInstance: HealthStatusesOverDayTooltipComponent,
        private readonly healthStatusDataSetGenerator: HealthStatusDatasetGenerator,
        private readonly symptomTypeDatasetGenerator: SymptomTypeDatasetGenerator) {
    }

    // Public methods
    public GenerateChartOptions(datesToCLOsDictionary: { [dateKey: string]: CLOs.HealthStatusEntryCLO[] }, showSymptomsAxis = false) {
        let chartOptions = {
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
                    //offset: true,
                    position: 'top',
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
                        color: '#e8e8ff',
                        display: true,
                        drawOnChartArea: true,
                        drawBorder: false,
                    },
                    ticks: {
                        maxRotation: 0,
                        minRotation: 0,
                        fontColor: 'gray',
                        fontFamily: 'Arial',
                        fontSize: 10,
                        display: false,
                        autoSkip: false,
                        callback: function (value, index, values) {
                            return value;
                            //if (!(index % 2)) return value;
                        },

                    }
                }],
                yAxes: [{

                    id: 'y-axis-0',
                    gridLines: {
                        color: '#f1f1f1',
                        display: true,
                        drawTicks: true,
                        drawOnChartArea: true,
                        drawBorder: false,
                        zeroLineColor: 'gray',
                        tickMarkLength: 2
                    },

                    ticks: {
                        fontColor: '#b6b6b6',
                        fontSize: 10,
                        padding: 3,
                        beginAtZero: true,
                        min: -3,
                        max: 3,
                        stepSize: 1,
                        callback: function (label, index, labels) {
                            if (label === Enums.HealthLevel.NotGreat)
                                return 'Not Great';
                            if (label === Enums.HealthLevel.VeryBad)
                                return 'Very Bad';
                            else if (label !== 0)
                                return Enums.HealthLevel[label];
                            else
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
                    fontSize: 12,
                    enabled: true,
                    position: "top",
                    content: 'TODAY'
                }
            }];
            chartOptions.annotation.annotations = annotations;
        }
        return chartOptions;
    }
    public GenerateChartData(symptomTypesDatasetItems: SymptomTypeDatasetItem[], preFilteredHealthStatusEntriesCLOs: CLOs.HealthStatusEntryCLO[]
        , currentSelDateRange: Range<moment.Moment>) {


        // Create SymptomType datasets
        let data = {
            datasets: []
        };
        let symptomTypeDataSetsDictionary = this.symptomTypeDatasetGenerator.GenerateDataSets(symptomTypesDatasetItems,
            preFilteredHealthStatusEntriesCLOs, currentSelDateRange);
        symptomTypesDatasetItems.forEach((item) => {
            if (item.IsSelected) {
                let symptomTypeDataset = symptomTypeDataSetsDictionary[item.SymptomTypeCLO.Name];
                data.datasets.push(symptomTypeDataset);
            }
        });


        // Create HealthStatus dataset
        let healthStatusDataset = this.healthStatusDataSetGenerator.GenerateDataSet(preFilteredHealthStatusEntriesCLOs, currentSelDateRange);
        data.datasets.push(healthStatusDataset);


        return data;
    }
};
class ThreeMonthsDisplayMode implements IDisplayMode {

    // Constructor
    constructor(
        private readonly getChartInstance: GetChartInstanceFunc,
        private readonly getChartCanvas: GetChartCanvasFunc,
        private readonly healthStatusesTooltipInstance: HealthStatusesOverDayTooltipComponent,
        private readonly healthStatusDataSetGenerator: HealthStatusDatasetGenerator,
        private readonly symptomTypeDatasetGenerator: SymptomTypeDatasetGenerator) {
    }

    // Public methods
    public GenerateChartOptions(datesToCLOsDictionary: { [dateKey: string]: CLOs.HealthStatusEntryCLO[] }, showSymptomsAxis = false) {

        let chartOptions = {

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
                    offset: true,
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
                        color: '#e8e8ff',
                        display: true,
                        drawOnChartArea: true,
                        drawBorder: false,
                    },
                    ticks: {
                        maxRotation: 0,
                        minRotation: 0,
                        fontColor: 'gray',
                        fontFamily: 'Arial',
                        fontSize: 10,
                        display: false,
                        autoSkip: false,
                        callback: function (value, index, values) {
                            //return value;
                            if (!(index % 7)) return value;
                        },

                    }
                }],
                yAxes: [{
                    position: 'left',
                    id: 'y-axis-0',
                    gridLines: {
                        color: '#f1f1f1',
                        display: true,
                        drawTicks: true,
                        drawOnChartArea: true,
                        drawBorder: false,
                        zeroLineColor: 'gray',
                        tickMarkLength: 2
                    },

                    ticks: {
                        fontColor: '#b6b6b6',
                        fontSize: 10,
                        padding: 3,
                        beginAtZero: true,
                        min: -3,
                        max: 3,
                        stepSize: 1,
                        callback: function (label, index, labels) {
                            if (label === Enums.HealthLevel.NotGreat)
                                return 'Not Great';
                            if (label === Enums.HealthLevel.VeryBad)
                                return 'Very Bad';
                            else if (label !== 0)
                                return Enums.HealthLevel[label];
                            else
                                return '';

                        }
                    }
                },
                {

                    id: 'y-axis-symptoms',
                    position: 'right',
                    gridLines: {
                        color: 'red',
                        display: false,
                        drawTicks: true,
                        drawOnChartArea: true,
                        drawBorder: false,
                        tickMarkLength: 2
                    },

                    ticks: {
                        fontColor: showSymptomsAxis ? '#2399e5' : 'white',
                        fontSize: 10,
                        padding: 3,
                        beginAtZero: true,
                        min: -3,
                        max: 3,
                        stepSize: 1,
                        callback: function (label, index, labels) {
                            if (label === Enums.SymptomIntensityLevel.Severe)
                                return 'Severe';
                            if (label === Enums.SymptomIntensityLevel.Moderate)
                                return 'Moderate';
                            else if (label === Enums.SymptomIntensityLevel.Mild)
                                return 'Mild';
                            else if (label === 0)
                                return 'Nothing';
                            else
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
                    fontSize: 12,
                    enabled: true,
                    position: "top",
                    content: 'TODAY'
                }
            }];
            chartOptions.annotation.annotations = annotations;
        }
        return chartOptions;
    }
    public GenerateChartData(symptomTypesDatasetItems: SymptomTypeDatasetItem[], preFilteredHealthStatusEntriesCLOs: CLOs.HealthStatusEntryCLO[]
        , currentSelDateRange: Range<moment.Moment>) {


        // Create SymptomType datasets
        let data = {
            datasets: []
        };
        let symptomTypeDataSetsDictionary = this.symptomTypeDatasetGenerator.GenerateDataSets(symptomTypesDatasetItems,
            preFilteredHealthStatusEntriesCLOs, currentSelDateRange);
        symptomTypesDatasetItems.forEach((item) => {
            if (item.IsSelected) {
                let symptomTypeDataset = symptomTypeDataSetsDictionary[item.SymptomTypeCLO.Name];
                data.datasets.push(symptomTypeDataset);
            }
        });

        // Create HealthStatus dataset
        let healthStatusDataset = this.healthStatusDataSetGenerator.GenerateDataSet(preFilteredHealthStatusEntriesCLOs, currentSelDateRange);
        data.datasets.push(healthStatusDataset);


        return data;
    }
};
class TwelveMonthsDisplayMode implements IDisplayMode {

    // Constructor
    constructor(
        private readonly getChartInstance: GetChartInstanceFunc,
        private readonly getChartCanvas: GetChartCanvasFunc,
        private readonly healthStatusesTooltipInstance: HealthStatusesOverDayTooltipComponent,
        private readonly healthStatusDataSetGenerator: HealthStatusDatasetGenerator,
        private readonly symptomTypeDatasetGenerator: SymptomTypeDatasetGenerator) {
    }

    // Public methods
    public GenerateChartOptions(datesToCLOsDictionary: { [dateKey: string]: CLOs.HealthStatusEntryCLO[] }, showSymptomsAxis = false) {
        let chartOptions = {
            //plugins: {
            //    filler: {
            //        propagate: true
            //    }
            //},
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
                    //offset: true,
                    position: 'top',
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
                        color: '#e8e8ff',
                        display: false,
                        drawOnChartArea: false,
                        drawBorder: false,
                    },
                    ticks: {
                        maxRotation: 0,
                        minRotation: 0,
                        fontColor: 'gray',
                        fontFamily: 'Arial',
                        fontSize: 10,
                        display: false,
                        autoSkip: false,
                        callback: function (value, index, values) {
                            return value;
                            //if (!(index % 2)) return value;
                        },

                    }
                }],
                yAxes: [
                    {
                        position: 'right',
                        id: 'y-axis-0',
                        gridLines: {
                            color: 'blue',
                            display: true,
                            drawTicks: true,
                            drawOnChartArea: true,
                            drawBorder: false,
                            zeroLineColor: 'gray',
                            tickMarkLength: 2
                        },

                        ticks: {
                            fontColor: '#b6b6b6',
                            fontSize: 10,
                            padding: 3,
                            beginAtZero: true,
                            min: -2.1,
                            max: 2.1,
                            stepSize: 1,
                            callback: function (label, index, labels) {
                                if (label === Enums.HealthLevel.NotGreat)
                                    return 'Not Great';
                                if (label === Enums.HealthLevel.VeryBad)
                                    return 'Very Bad';
                                else if (label !== 0)
                                    return Enums.HealthLevel[label];
                                else
                                    return '';

                            }
                        }
                    },


                ]
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
                    fontSize: 12,
                    enabled: true,
                    position: "top",
                    content: 'TODAY'
                }
            }];
            chartOptions.annotation.annotations = annotations;
        }
        return chartOptions;
    }
    public GenerateChartData(symptomTypesDatasetItems: SymptomTypeDatasetItem[], preFilteredHealthStatusEntriesCLOs: CLOs.HealthStatusEntryCLO[]
        , currentSelDateRange: Range<moment.Moment>) {


        // Create SymptomType datasets
        let data = {
            datasets: []
        };
        let symptomTypeDataSetsDictionary = this.symptomTypeDatasetGenerator.GenerateDataSets(symptomTypesDatasetItems,
            preFilteredHealthStatusEntriesCLOs, currentSelDateRange);
        symptomTypesDatasetItems.forEach((item) => {
            if (item.IsSelected) {
                let symptomTypeDataset = symptomTypeDataSetsDictionary[item.SymptomTypeCLO.Name];
                data.datasets.push(symptomTypeDataset);
            }
        });

        // Create HealthStatus dataset
        let healthStatusDataset = this.healthStatusDataSetGenerator.GenerateDataSet(preFilteredHealthStatusEntriesCLOs, currentSelDateRange);
        data.datasets.push(healthStatusDataset);


        return data;
    }
};