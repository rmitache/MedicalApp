// Angular and 3rd party stuff
import { Component, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
import * as momentRange from 'moment-range';
import { ChartModule, UIChart } from 'primeng/primeng';
//import { } from 'chartjs'
import * as Chart from 'chart.js';
import 'chartjs-plugin-annotation';
import * as $ from 'jquery';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { Time, Range, TimeRange } from 'SPA/Core/Helpers/DataStructures/misc';
import { ModalDialogService } from 'SPA/Core/Services/ModalDialogService/modal-dialog.service';
import { CommandManager } from 'SPA/Core/Managers/CommandManager/command.manager';
import * as HelperFunctions from 'SPA/Core/Helpers/Functions/functions';
import { GetMonthRangeWithPaddingUsingMoment } from 'SPA/Core/Helpers/Functions/functions';

// Components
import { AnalysisPageApplicationState, IReadOnlyApplicationState } from 'SPA/Components/Pages/AnalysisPage/analysis-page-application-state';
import { AnalysisPageDataService } from 'SPA/Components/Pages/AnalysisPage/analysis-page-data.service';



@Component({
    selector: 'indicators-view',
    templateUrl: './indicators-view.component.html',
    styleUrls: ['./indicators-view.component.css'],
    host: { 'class': 'indicators-view' }
})
export class IndicatorsViewComponent {
    // Fields
    private availableWindowPaddingInMonths = 0;
    private canvas: any;
    private ctx: any;
    private chartInstance: any;
    private readonly viewModel: ViewModel = {
        AvailableDateRange: null,
        AvailableHealthEntries: null,

        SelectedDateRange: null,
        NavigationLabel: null,

        HighlightRangeStartXPosition: null,
        HighlightRangeEndXPosition: null,

        ChartOptions: null,
        ChartData: null,
        SelectedViewMode: IndicatorsViewDisplayMode.Month,
        Blocked: false

    };
    private readonly subscriptions: Subscription[] = [];
    private readonly appState: IReadOnlyApplicationState;

    // Private methods
    private getCurrentDisplayModeInstance(): IDisplayMode {
        // Get Current Mode strategy
        let currentStrategy: IDisplayMode = null;
        if (this.viewModel.SelectedViewMode === IndicatorsViewDisplayMode.Month) {
            currentStrategy = new MonthDisplayMode(this.chartInstance);
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
    private computeXPositionFromDate(date: moment.Moment) {
        // Check if in range
        var selDateRange = new momentRange.DateRange(this.viewModel.SelectedDateRange.RangeStart, this.viewModel.SelectedDateRange.RangeEnd);
        if (!selDateRange.contains(date)) {
            return null;
        }

        // Variables
        var startDateIndex = HelperFunctions.GetDateIndexInTargetRange(date, this.viewModel.SelectedDateRange);
        var nrOfDaysInSelectedDateRange = HelperFunctions.GetNrOfDaysBetweenDatesUsingMoment(this.viewModel.SelectedDateRange.RangeStart, this.viewModel.SelectedDateRange.RangeEnd, true);
        var widthBetweenDates = 100 / (nrOfDaysInSelectedDateRange - 1);

        // Compute the width
        let xPosition = (startDateIndex) * widthBetweenDates;
        return xPosition;
    }
    private refreshUI() {

        // Use selectedDateRange to get a subset of data from AvailableFactorRecords
        let filteredHealthStatusEntryCLOs = this.viewModel.AvailableHealthEntries.filter(entry => {
            return entry.OccurenceDateTime >= this.viewModel.SelectedDateRange.RangeStart.toDate() &&
                entry.OccurenceDateTime <= this.viewModel.SelectedDateRange.RangeEnd.toDate();
        });

        // Create a dictionary 
        var datesToCLOsDictionary: { [dateKey: string]: CLOs.HealthStatusEntryCLO[] } = {};
        filteredHealthStatusEntryCLOs.forEach((clo, index) => {
            let dateKey = moment(clo.OccurenceDateTime, moment.ISO_8601).format('DD/MM/YYYY');
            if (datesToCLOsDictionary[dateKey] === undefined) {
                datesToCLOsDictionary[dateKey] = [];
            };
            datesToCLOsDictionary[dateKey].push(clo);
        });

        // 
        let currentDisplayMode = this.getCurrentDisplayModeInstance();
        this.viewModel.ChartOptions = currentDisplayMode.GenerateChartOptions(datesToCLOsDictionary);
        this.viewModel.ChartData = currentDisplayMode.GenerateChartData(datesToCLOsDictionary,
            new Range<moment.Moment>(this.viewModel.SelectedDateRange.RangeStart.clone(), this.viewModel.SelectedDateRange.RangeEnd.clone()));
        this.viewModel.NavigationLabel = currentDisplayMode.GetNavigationLabel(this.viewModel.SelectedDateRange);

        var chartInstance = new Chart(this.ctx, {
            type: 'line',
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
    }
    ngOnInit() {
        // Get the initial range from the current DisplayMode
        var initialSelectedDateRange = this.getCurrentDisplayModeInstance().GetInitialSelectedDateRange(moment());
        this.viewModel.AvailableDateRange = GetMonthRangeWithPaddingUsingMoment(initialSelectedDateRange.RangeStart,
            initialSelectedDateRange.RangeEnd, this.availableWindowPaddingInMonths);
        this.viewModel.AvailableHealthEntries = this.dataService.GetHealthStatusEntriesForInitialRangeFromBundle().ToArray();

        // Then init the SelectedDateRange and create the display representation
        this.viewModel.SelectedDateRange = initialSelectedDateRange;
        
    }
    ngAfterViewInit() {
        this.canvas = document.getElementById('myChart');
        this.ctx = this.canvas.getContext('2d');

        
        this.refreshUI();
        
    }
    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    // Event handlers
    private onNavigateBackwardTriggered() {
        // Check if prevSelectedDateRange is within the AvailableDateRange
        let prevSelectedDateRange = this.getCurrentDisplayModeInstance().GetPreviousSelectedDateRange(this.viewModel.SelectedDateRange);
        if (prevSelectedDateRange.RangeStart >= this.viewModel.AvailableDateRange.RangeStart) {
            this.viewModel.SelectedDateRange = prevSelectedDateRange;
            this.refreshUI();
        }
        else {
            // If it isn't, load a new "window" of FactorRecords from the server
            var newAvailableDateRange = GetMonthRangeWithPaddingUsingMoment(prevSelectedDateRange.RangeStart.clone(),
                prevSelectedDateRange.RangeEnd.clone(), this.availableWindowPaddingInMonths);

            this.viewModel.Blocked = true;
            this.reloadAvailableHealthStatusEntriesFromServer(newAvailableDateRange)
                .then(() => {
                    this.viewModel.SelectedDateRange = prevSelectedDateRange;
                    this.refreshUI();
                    setTimeout(() => {
                        this.viewModel.Blocked = false;
                    }, 200);
                });
        }
    }
    private onNavigateForwardTriggered() {

        // Variables
        let nextSelectedDateRange = this.getCurrentDisplayModeInstance().GetNextSelectedDateRange(this.viewModel.SelectedDateRange);

        // Check if nextSelectedDateRange is within the AvailableDateRange
        if (nextSelectedDateRange.RangeEnd <= this.viewModel.AvailableDateRange.RangeEnd) {
            this.viewModel.SelectedDateRange = nextSelectedDateRange;
            this.refreshUI();
        }
        else {
            // If it isn't, load a new "window" of FactorRecords from the server
            var newAvailableDateRange = GetMonthRangeWithPaddingUsingMoment(nextSelectedDateRange.RangeStart.clone(),
                nextSelectedDateRange.RangeEnd.clone(), this.availableWindowPaddingInMonths);

            this.viewModel.Blocked = true;
            this.reloadAvailableHealthStatusEntriesFromServer(newAvailableDateRange)
                .then(() => {

                    this.viewModel.SelectedDateRange = nextSelectedDateRange;
                    this.refreshUI();
                    setTimeout(() => {
                        this.viewModel.Blocked = false;
                    }, 200);

                });
        }
    }
}


interface ViewModel {
    AvailableDateRange: Range<moment.Moment>;
    AvailableHealthEntries: CLOs.HealthStatusEntryCLO[];

    SelectedDateRange: Range<moment.Moment>;
    NavigationLabel: string;

    HighlightRangeStartXPosition: number;
    HighlightRangeEndXPosition: number;

    ChartOptions: any;
    ChartData: any;
    SelectedViewMode: IndicatorsViewDisplayMode;
    Blocked: boolean;
}
enum IndicatorsViewDisplayMode {
    Month
}

// Display modes
interface IDisplayMode {
    GetInitialSelectedDateRange(referenceDate: moment.Moment): Range<moment.Moment>;
    GetNextSelectedDateRange(currentSelDateRange: Range<moment.Moment>): Range<moment.Moment>;
    GetPreviousSelectedDateRange(currentSelDateRange: Range<moment.Moment>): Range<moment.Moment>;
    GetNavigationLabel(currentSelDateRange: Range<moment.Moment>): string;

    GenerateChartOptions(datesToCLOsDictionary: { [dateKey: string]: CLOs.HealthStatusEntryCLO[] }): any;
    GenerateChartData(datesToCLOsDictionary: { [dateKey: string]: CLOs.HealthStatusEntryCLO[] }, currentSelDateRange: Range<moment.Moment>): any;
}
class MonthDisplayMode implements IDisplayMode {
    // Private methods
    private getAverageHealthLevel(healthStatusEntryCLOs: CLOs.HealthStatusEntryCLO[]) {
        var sum: number = 0;
        var result = 0;
        healthStatusEntryCLOs.forEach(clo => {
            sum += clo.HealthLevel;
        });

        if (healthStatusEntryCLOs.length > 0)
            result = sum / healthStatusEntryCLOs.length;
        else
            result = null;


        if (result === 0) {
            result = 0.2;
        }
        return result;
    }
    private generateDataPointsForChart(datesToCLOsDictionary: { [dateKey: string]: CLOs.HealthStatusEntryCLO[] }, range: Range<moment.Moment>) {

        // Variables
        var dataPoints = []
        var dataPointsBgColors = [];


        // Loop through dates and create datapoints
        var datesInRangeArray = HelperFunctions.EnumerateDaysBetweenDatesUsingMoment(range, true);
        datesInRangeArray.forEach((date, index) => {

            // Prepare data
            let dateKey = date.format('DD/MM/YYYY');
            var clos = (datesToCLOsDictionary[dateKey] !== undefined) ? datesToCLOsDictionary[dateKey] : [];
            var avgHealthLevel = this.getAverageHealthLevel(clos);


            // Create datapoint
            var dp = {
                x: date,
                y: avgHealthLevel
            };
            dataPoints.push(dp);


        });

        return {
            dataPoints: dataPoints,
            dataPointsBgColors: dataPointsBgColors
        };
    }

    // Constructor
    constructor(
        private readonly chartInstance: UIChart) {
    }


    // Public methods
    public GetInitialSelectedDateRange(referenceDate: moment.Moment) {

        // Get the month of the referenceDate as an initial range
        let range = new Range<moment.Moment>(referenceDate.clone().startOf('month').startOf('day'),
            referenceDate.clone().endOf('month').endOf('day'));
        return range;
    }
    public GetNextSelectedDateRange(currentSelDateRange: Range<moment.Moment>): Range<moment.Moment> {
        // Get the month of the referenceDate as an initial range
        let range = new Range<moment.Moment>(currentSelDateRange.RangeStart.clone().add(1, 'months').startOf('month').startOf('day'),
            currentSelDateRange.RangeEnd.clone().add(1, 'months').endOf('month').endOf('day'));
        return range;
    }
    public GetPreviousSelectedDateRange(currentSelDateRange: Range<moment.Moment>): Range<moment.Moment> {

        // Get the month of the referenceDate as an initial range
        let range = new Range<moment.Moment>(currentSelDateRange.RangeStart.clone().subtract(1, 'months').startOf('month').startOf('day'),
            currentSelDateRange.RangeEnd.clone().subtract(1, 'months').endOf('month').endOf('day'));
        return range;
    }
    public GetNavigationLabel(currentSelDateRange: Range<moment.Moment>) {
        // Range must be within same month
        if (currentSelDateRange.RangeStart.month() !== currentSelDateRange.RangeEnd.month()) {
            throw new Error('Range must be within same month');
        }

        return currentSelDateRange.RangeStart.format('MMMM, YYYY');
    }

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

                annotations: [{
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
                }]
            }
        };
        return chartOptions;
    }
    public GenerateChartData(datesToCLOsDictionary: { [dateKey: string]: CLOs.HealthStatusEntryCLO[] }, currentSelDateRange: Range<moment.Moment>) {

        // Prepare data
        var dataPointsInfo = this.generateDataPointsForChart(datesToCLOsDictionary, currentSelDateRange);

        // Set data
        var data = {
            datasets: [
                {
                    data: dataPointsInfo.dataPoints,
                    borderColor: 'red',
                    borderWidth: 1.5,
                    fill: false
                }
            ]
        }
        return data;
    }
};

