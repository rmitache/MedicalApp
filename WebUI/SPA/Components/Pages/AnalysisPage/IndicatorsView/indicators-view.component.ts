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


@Component({
    selector: 'indicators-view',
    templateUrl: './indicators-view.component.html',
    styleUrls: ['./indicators-view.component.css'],
    host: { 'class': 'indicators-view' }
})
export class IndicatorsViewComponent {
    // Fields
    private availableWindowPaddingInMonths = 1;
    private dateRangeDisplayMode: DateRangeMode = DateRangeMode.Month;
    @ViewChild('navPanel')
    private navPanelInstance: NavigationPanelComponent;
    @ViewChild('filtersPanel')
    private filtersPanelInstance: IndicatorsFiltersPanelComponent;
    private chartCanvasContext: any;
    private chartInstance: any;

    private readonly viewModel: ViewModel = {
        AvailableSymptomTypes: null,
        SelectedSymptomTypes: null,

        AvailableDateRange: null,
        SelectedDateRange: null,
        HealthEntriesInSelectedDateRange: null,

        HighlightRangeStartXPosition: null,
        HighlightRangeEndXPosition: null,

        ChartOptions: null,
        ChartData: null,
        DateRangeDisplayMode: DateRangeMode.Month,
        Blocked: false

    };
    private readonly subscriptions: Subscription[] = [];
    private readonly appState: IReadOnlyApplicationState;
    private readonly symptomTypesColors = [
        '#e6194b', //red
        '#3cb44b', //green
        '#ffe119', //yellow
        '#0082c8', //blue
        '#f58231', //orange
        '#911eb4', //purple
        '#f032e6', //magenta
        '#008080', //teal
        '#aa6e28', //brown
        '#800000', //maroon
        '#aaffc3', //mint
        '#808000', //olive
        '#ffd8b1', //coral
        '#000080', //navy
        '#808080', //gray
        '#000000', //black
        '#46f0f0', //cyan
        '#d2f53c', //lime
    ];

    // Private methods
    private getCurrentDisplayModeInstance(): IDisplayMode {
        // Get Current Mode strategy
        let currentStrategy: IDisplayMode = null;
        if (this.viewModel.DateRangeDisplayMode === DateRangeMode.Month) {
            currentStrategy = new MonthDisplayMode(this.chartInstance);
        } else {
            // OBS -> Not implemented yet
            throw new Error('HealthGraphDisplayMode not implemented yet');
        }
        return currentStrategy;
    }
    private getSymptomTypesToColorsDictionary(availableSymptomTypes: CLOs.SymptomTypeCLO[]) {

        // Variables
        let symptomTypesToColorsDictionary: { [symptomTypeName: string]: string } = {};
        let colors = this.symptomTypesColors.slice();

        availableSymptomTypes.forEach((clo, index) => {
            symptomTypesToColorsDictionary[clo.Name] = colors[index];
        });

        return symptomTypesToColorsDictionary;
    }
    private reloadAvailableHealthStatusEntriesFromServer(newDateRange: Range<moment.Moment>): Promise<void> {
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
            return entry.OccurrenceDateTime >= this.viewModel.SelectedDateRange.RangeStart.toDate() &&
                entry.OccurrenceDateTime <= this.viewModel.SelectedDateRange.RangeEnd.toDate();
        });
        var healthStatusCLOsInSelDateRangeDictionary: { [dateKey: string]: CLOs.HealthStatusEntryCLO[] } = {};
        filteredHealthStatusEntryCLOs.forEach((clo, index) => {
            let dateKey = moment(clo.OccurrenceDateTime, moment.ISO_8601).format('DD/MM/YYYY');
            if (healthStatusCLOsInSelDateRangeDictionary[dateKey] === undefined) {
                healthStatusCLOsInSelDateRangeDictionary[dateKey] = [];
            };
            healthStatusCLOsInSelDateRangeDictionary[dateKey].push(clo);
        });

        // Refresh VM properties 
        let symptomTypesToColorsDictionary = this.getSymptomTypesToColorsDictionary(this.viewModel.AvailableSymptomTypes);
        
        let currentDisplayMode = this.getCurrentDisplayModeInstance();
        this.viewModel.ChartOptions = currentDisplayMode.GenerateChartOptions(healthStatusCLOsInSelDateRangeDictionary);
        this.viewModel.ChartData = currentDisplayMode.GenerateChartData(healthStatusCLOsInSelDateRangeDictionary,
            new Range<moment.Moment>(this.viewModel.SelectedDateRange.RangeStart.clone(), this.viewModel.SelectedDateRange.RangeEnd.clone()),
            this.viewModel.SelectedSymptomTypes, symptomTypesToColorsDictionary);

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
        private viewContainerRef: ViewContainerRef
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
            this.navPanelInstance.SetSelectedDateRange(newValue);
        }));
    }
    ngOnInit() {

        // Initialize symptomTypes and filtersPanel
        let availableSymptomTypes = this.dataService.GetSymptomTypesFromBundle().ToArray();
        this.viewModel.AvailableSymptomTypes = this.dataService.GetSymptomTypesFromBundle().ToArray();
        this.viewModel.SelectedSymptomTypes = new Array(this.viewModel.AvailableSymptomTypes.length).fill(null);
        this.filtersPanelInstance.Initialize(this.viewModel.AvailableSymptomTypes, this.viewModel.SelectedSymptomTypes, this.symptomTypesColors.slice());

        // Initialize date ranges
        var initialSelectedDateRange = this.navPanelInstance.InitAndGetSelDateRange(this.viewModel.DateRangeDisplayMode, moment());
        this.viewModel.AvailableDateRange = GetMonthRangeWithPaddingUsingMoment(initialSelectedDateRange.RangeStart,
            initialSelectedDateRange.RangeEnd, this.availableWindowPaddingInMonths);
        this.viewModel.SelectedDateRange = initialSelectedDateRange;
        this.viewModel.HealthEntriesInSelectedDateRange = this.dataService.GetHealthStatusEntriesForInitialRangeFromBundle().ToArray();

        // OBS: Refresh the UI -> is done in ngAfterViewInit (in order to reference the chart properly)
    }
    ngAfterViewInit() {
        // Get references to the chart canvas context
        let canvas: any = document.getElementById('myChart');
        this.chartCanvasContext = canvas.getContext('2d');

        // Refresh the UI
        this.refreshUI();
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

            this.viewModel.Blocked = true;
            this.reloadAvailableHealthStatusEntriesFromServer(newAvailableDateRange)
                .then(() => {
                    this.viewModel.SelectedDateRange = newSelDateRange;
                    this.refreshUI();
                    setTimeout(() => {
                        this.viewModel.Blocked = false;
                    }, 200);
                });
        }
    }
    private onSelectedDateRangeChangeTriggered(newSelDateRange: Range<moment.Moment>) {

        this.commandManager.InvokeCommandFlow('ChangeSelectedDateRangeFlow', [newSelDateRange]);
    }
    private onSymptomTypeSelected(symptomType: CLOs.SymptomTypeCLO) {
        let indexInAvailableSymptomTypesArray = this.viewModel.AvailableSymptomTypes.findIndex((planCLO) => {
            return planCLO.ID === symptomType.ID;
        });
        this.viewModel.SelectedSymptomTypes[indexInAvailableSymptomTypesArray] = symptomType;
        this.refreshUI();
    }
    private onSymptomTypeDeselected(symptomType: CLOs.SymptomTypeCLO) {
        let indexInSelectedSymptomTypesArray = this.viewModel.SelectedSymptomTypes.findIndex((planCLO) => {
            if (planCLO !== null) {
                return planCLO.ID === symptomType.ID;
            } else {
                return false;
            }
        });
        this.viewModel.SelectedSymptomTypes[indexInSelectedSymptomTypesArray] = null;
        this.refreshUI();
    }
}

interface ViewModel {
    AvailableSymptomTypes: CLOs.SymptomTypeCLO[];
    SelectedSymptomTypes: CLOs.SymptomTypeCLO[];

    AvailableDateRange: Range<moment.Moment>;
    SelectedDateRange: Range<moment.Moment>;
    HealthEntriesInSelectedDateRange: CLOs.HealthStatusEntryCLO[];

    HighlightRangeStartXPosition: number;
    HighlightRangeEndXPosition: number;

    ChartOptions: any;
    ChartData: any;
    DateRangeDisplayMode: DateRangeMode;
    Blocked: boolean;
}



// Supported Display modes
interface IDisplayMode {
    GenerateChartOptions(datesToCLOsDictionary: { [dateKey: string]: CLOs.HealthStatusEntryCLO[] }): any;
    GenerateChartData(datesToCLOsDictionary: { [dateKey: string]: CLOs.HealthStatusEntryCLO[] }, currentSelDateRange: Range<moment.Moment>,
        selectedSymptomTypeCLOs: CLOs.SymptomTypeCLO[], symptomTypesToColorsDictionary: { [symptomTypeName: string]: string }): any;
}
class MonthDisplayMode implements IDisplayMode {
    // Private methods
    private getAverageHealthLevelAndColorForSingleDate(healthStatusEntryCLOs: CLOs.HealthStatusEntryCLO[]) {

        // Variables
        var sum: number = 0;
        var avgHealthLevel = 0;
        var color = 'white';

        //  Calculate the Average Health Level (by adding all HealthLevels and dividing them by their number)
        healthStatusEntryCLOs.forEach(clo => {
            sum += clo.HealthLevel;
        });
        if (healthStatusEntryCLOs.length > 0)
            avgHealthLevel = sum / healthStatusEntryCLOs.length;
        else
            avgHealthLevel = null;
        if (avgHealthLevel === 0) {
            avgHealthLevel = 0.2;
        }

        // Determine the color
        if (avgHealthLevel >= 2) {
            // great
            color = 'green';
        }
        else if (avgHealthLevel >= 1 && avgHealthLevel < 2) {
            // good
            color = '#9dc340';
        }
        else if (avgHealthLevel >= 0 && avgHealthLevel < 1) {
            // ok
            color = '#cfe27e';
        }
        else if (avgHealthLevel > -0.8 && avgHealthLevel < 0) {
            // notgreat 
            color = '#ffc297';
        }
        else if (avgHealthLevel >= -2 && avgHealthLevel <= -0.8) {
            // bad 
            color = '#fe6060';
        }
        else if (avgHealthLevel < -1) {
            // very bad
            color = 'red';
        }


        //
        return {
            avgHealthLevel: avgHealthLevel,
            color: color
        };
    }
    private getAvgIntensityForEachSymptomTypeForSingleDate(healthStatusEntryCLOs: CLOs.HealthStatusEntryCLO[],
        selectedSymptomTypeNames: { [symptomTypeName: string]: any }) {

        // Variables
        let valuesPerSymptomType: { [symptomTypeName: string]: number[] } = {};
        let avgValuePerSymptomType: { [symptomTypeName: string]: number } = {};

        // Loop through healthStatusEntries and their symptomEntries
        healthStatusEntryCLOs.forEach((healthStatusEntryCLO) => {
            healthStatusEntryCLO.SymptomEntries.forEach((symptomEntryCLO) => {

                let symptomTypeName = symptomEntryCLO.SymptomType.Name;
                if (selectedSymptomTypeNames[symptomTypeName] !== undefined) {
                    if (valuesPerSymptomType[symptomTypeName] === undefined) {
                        valuesPerSymptomType[symptomTypeName] = [];
                    }

                    valuesPerSymptomType[symptomTypeName].push(symptomEntryCLO.IntensityLevel as number);
                }
            });
        });

        // Calculate the averages per symptomType
        for (var symptomTypeName in selectedSymptomTypeNames) {
            let arrayOfSymptomTypeValues = valuesPerSymptomType[symptomTypeName];
            if (arrayOfSymptomTypeValues === undefined) {
                avgValuePerSymptomType[symptomTypeName] = null;
            } else {
                let sum = arrayOfSymptomTypeValues.reduce((a, b) => a + b, 0);
                let computedAverage = sum / arrayOfSymptomTypeValues.length;
                avgValuePerSymptomType[symptomTypeName] = computedAverage;
            }
        }

        return avgValuePerSymptomType;
    }
    private generateDataPointsForChart(datesToCLOsDictionary: { [dateKey: string]: CLOs.HealthStatusEntryCLO[] },
        range: Range<moment.Moment>, selectedSymptomTypeCLOs: CLOs.SymptomTypeCLO[]) {

        // Variables - OBS: each array has every entry corresponding to a given Date in the range
        let healthStatusDataPoints = []
        let healthStatusDataPointsBgColors = [];

        // Init a dictionary with all names of SelectedSymptomTypes (each entry will have an array of DataPoints, one for each Date)
        let selectedSymptomTypesDataPointsDict: { [symptomTypeName: string]: DataPoint[] } = {};
        selectedSymptomTypeCLOs.forEach((symptomTypeCLO) => {
            if (symptomTypeCLO !== null) {
                selectedSymptomTypesDataPointsDict[symptomTypeCLO.Name] = [];
            }
        });

        // Adjust the range to cut it off on today's date (if it intersects with it)
        let today = moment();
        let todayIsInRange = today.isSameOrBefore(range.RangeEnd, 'day') && today.isSameOrAfter(range.RangeStart, 'day');
        let cutOffRangeEnd = (todayIsInRange) ? today.endOf('day') : range.RangeEnd;

        // Loop through dates and create datapoints
        let datesInRangeArray = HelperFunctions.EnumerateDaysBetweenDatesUsingMoment(range, true);
        datesInRangeArray.forEach((date, index) => {

            // Add null values if the date is past the "today cutoff" point
            if (date.isAfter(cutOffRangeEnd, 'day')) {
                let nullDataPoint: DataPoint = {
                    x: date,
                    y: null
                };
                healthStatusDataPoints.push(nullDataPoint);
                healthStatusDataPointsBgColors.push(null);
            }
            else {

                // Prepare data
                let dateKey = date.format('DD/MM/YYYY');
                let healthStatusCLOsInDate = (datesToCLOsDictionary[dateKey] !== undefined) ? datesToCLOsDictionary[dateKey] : [];

                // Create the datapoint for HealthStatusLevel for the current date
                let avgHealthLevelAndColorInfo = this.getAverageHealthLevelAndColorForSingleDate(healthStatusCLOsInDate);
                let dp: DataPoint = {
                    x: date,
                    y: avgHealthLevelAndColorInfo.avgHealthLevel
                };
                healthStatusDataPoints.push(dp);
                healthStatusDataPointsBgColors.push(avgHealthLevelAndColorInfo.color);

                // Create a datapoint for each selectedSymptomType
                let avgIntensityValuePerSymptomTypeDictionary = this.getAvgIntensityForEachSymptomTypeForSingleDate(healthStatusCLOsInDate, selectedSymptomTypesDataPointsDict);
                for (var symptomTypeName in avgIntensityValuePerSymptomTypeDictionary) {
                    let dataPointsForSymptomTypeArray = selectedSymptomTypesDataPointsDict[symptomTypeName];

                    // Default to 0 if it is null 
                    if (avgIntensityValuePerSymptomTypeDictionary[symptomTypeName] === null) {
                        avgIntensityValuePerSymptomTypeDictionary[symptomTypeName] = 0;
                    }

                    let newSymptomTypeDataPoint: DataPoint = {
                        x: date,
                        y: avgIntensityValuePerSymptomTypeDictionary[symptomTypeName]
                    };
                    dataPointsForSymptomTypeArray.push(newSymptomTypeDataPoint);
                }
            }

        });

        return {
            dataPointsForHealthStatusEntries: healthStatusDataPoints,
            colorsForHealthStatusEntryDataPoints: healthStatusDataPointsBgColors,
            selectedSymptomTypesDataPointsDict: selectedSymptomTypesDataPointsDict
        };
    }

    // Constructor
    constructor(
        private readonly chartInstance: UIChart) {
    }

    // Public methods
    public GenerateChartOptions(datesToCLOsDictionary: { [dateKey: string]: CLOs.HealthStatusEntryCLO[] }) {
        let chartOptions = {
            tooltips: {
                enabled: false,
                custom: (tooltipModel) => {

                    //if (tooltipModel.opacity === 0) {
                    //    this.graphTooltipInstance.HideAndClear()
                    //    return;
                    //}

                    //var dateString = tooltipModel.title[0];
                    //var dateKey = moment(dateString, "dddd MMM D, YYYY").format('DD/MM/YYYY');
                    //var healthStatusEntryCLOsForDate = datesToCLOsDictionary[dateKey];
                    //var parentPosition = (this.chartInstance.el.nativeElement as HTMLElement).getBoundingClientRect();
                    //this.graphTooltipInstance.SetDataAndPosition(dateString, healthStatusEntryCLOsForDate, parentPosition, tooltipModel.caretX, tooltipModel.caretY);
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
                        display: true,
                        drawOnChartArea: false,
                    },
                    ticks: {
                        maxRotation: 0,
                        minRotation: 0,
                        fontColor: 'gray',
                        fontFamily: 'Arial',
                        fontSize: 10,
                        beginAtZero: true,
                        autoSkip: false,
                        callback: function (value, index, values) {
                            return value;
                            //if (!(index % 2)) return value;
                        }
                    }
                }],
                yAxes: [{
                    id: 'y-axis-0',
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
        let annotations = [{
            type: 'line',
            mode: 'vertical',
            scaleID: 'x-axis-0',
            value: moment(),
            borderColor: 'gray',
            borderWidth: 1,
            label: {
                fontFamily: 'Arial',
                fontSize: '10px',
                enabled: true,
                position: "top",
                content: 'TODAY'
            }
        }];
        if (!IsDateOnFirstOrLastDateInMonth(moment())) {
            chartOptions.annotation.annotations = annotations;
        }

        return chartOptions;
    }
    public GenerateChartData(datesToCLOsDictionary: { [dateKey: string]: CLOs.HealthStatusEntryCLO[] }, currentSelDateRange: Range<moment.Moment>,
        selectedSymptomTypeCLOs: CLOs.SymptomTypeCLO[], symptomTypesToColorsDictionary: { [symptomTypeName: string]: string }) {

        // Generate data points (for healthStatusEntries and for each selected SymptomType)
        var dataPointsInfo = this.generateDataPointsForChart(datesToCLOsDictionary, currentSelDateRange, selectedSymptomTypeCLOs);
        var symptomTypesDatasets = [];

        // Setup for chart
        var data = {
            datasets: []
        };
        
        for (var symptomTypeName in dataPointsInfo.selectedSymptomTypesDataPointsDict) {
            let symptomTypeDataPoints = dataPointsInfo.selectedSymptomTypesDataPointsDict[symptomTypeName];
            let symptomTypeDataset = {
                borderWidth: 2,
                borderColor: symptomTypesToColorsDictionary[symptomTypeName],
                backgroundColor: 'transparent',
                type: 'line',
                data: symptomTypeDataPoints
            };
            data.datasets.push(symptomTypeDataset);
        }
        let healthStatusEntriesDataset = {
            data: dataPointsInfo.dataPointsForHealthStatusEntries,
            backgroundColor: dataPointsInfo.colorsForHealthStatusEntryDataPoints,
        };
        data.datasets.push(healthStatusEntriesDataset);

        return data;
    }
};


interface DataPoint {
    x: moment.Moment;
    y: number;
}