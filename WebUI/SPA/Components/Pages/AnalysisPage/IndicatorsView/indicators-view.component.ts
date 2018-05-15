// Angular and 3rd party stuff
import { Component, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
import { ChartModule, UIChart } from 'primeng/primeng';
//import { } from 'chartjs'
import * as Chart from 'chart.js';
import 'chartjs-plugin-annotation';
//import * as $ from 'jquery';

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
    @ViewChild('chart')
    private chartInstance: UIChart;
    
    private readonly viewModel: ViewModel = {
        AvailableDateRange: null,
        AvailableHealthEntries: null,

        SelectedDateRange: null,
        NavigationLabel: null,

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
            currentStrategy = new MonthDisplayMode(this.chartInstance);
        } else {
            // OBS -> Not implemented yet
            throw new Error('HealthGraphDisplayMode not implemented yet');
        }
        return currentStrategy;
    }
    private reloadAvailableHealthStatusEntriesFromServer(newDateRange: Range<moment.Moment>): Promise<void> {
        //let jsDateRange = new Range<Date>(newDateRange.RangeStart.toDate(), newDateRange.RangeEnd.toDate());
        //let promise = this.dataService.GetHealthStatusEntries(jsDateRange)
        //    .then(clos => {
        //        this.viewModel.AvailableDateRange = newDateRange;
        //        this.viewModel.AvailableHealthEntries = clos;
        //    });
        //return promise;

        return null;
    }
    private recreateDisplayRepresentation() {

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
        this.chartInstance.reinit();

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


    }
    ngOnInit() {
        // Get the initial range from the current DisplayMode
        var initialSelectedDateRange = this.getCurrentDisplayModeInstance().GetInitialSelectedDateRange(moment());

        this.viewModel.AvailableDateRange = GetMonthRangeWithPaddingUsingMoment(initialSelectedDateRange.RangeStart,
            initialSelectedDateRange.RangeEnd, this.availableWindowPaddingInMonths);
        this.viewModel.AvailableHealthEntries = this.dataService.GetHealthStatusEntriesForInitialRangeFromBundle().ToArray();

        // Then init the SelectedDateRange and create the display representation
        this.viewModel.SelectedDateRange = initialSelectedDateRange;
        this.recreateDisplayRepresentation();

        
        
    }

    //canvas: any;
    //ctx: any;

    ngAfterViewInit() {
        //this.canvas = document.getElementById('myChart');
        //this.ctx = this.canvas.getContext('2d');
        //const testChart = new Chart(this.ctx, {
        //    type: 'line',
        //    data: {
        //        datasets: [{
        //            label: 'First Dataset',
        //            data: [{ x: 0, y: 4 }, { x: 1, y: 19 }, { x: 2, y: 4 }, { x: 3, y: 6 }, { x: 4, y: 14 }, { x: 5, y: 10 }, { x: 6, y: 11 }, { x: 7, y: 11 }, { x: 8, y: 15 }, { x: 9, y: 11 }, { x: 10, y: 2 }, { x: 11, y: 18 }, { x: 12, y: 19 }, { x: 13, y: 4 }, { x: 14, y: 17 }, { x: 15, y: 4 }, { x: 16, y: 16 }, { x: 17, y: 1 }],
        //            backgroundColor: 'rgba(255,99,132,0.2)',
        //            borderColor: 'rgba(255,99,132,1)',
        //            borderWidth: 1,
        //            fill: false
        //        }, {
        //            label: 'Second Dataset',
        //            data: [{ x: 0, y: 15 }, { x: 1, y: 1 }, { x: 2, y: 5 }, { x: 3, y: 9 }, { x: 4, y: 11 }, { x: 5, y: 13 }, { x: 6, y: 12 }, { x: 7, y: 10 }, { x: 8, y: 13 }, { x: 9, y: 20 }, { x: 10, y: 19 }, { x: 11, y: 4 }, { x: 12, y: 14 }, { x: 13, y: 13 }, { x: 14, y: 13 }, { x: 15, y: 19 }, { x: 16, y: 12 }, { x: 17, y: 14 }],
        //            backgroundColor: 'rgba(54,162,235,0.2)',
        //            borderColor: 'rgba(54,162,235,1)',
        //            borderWidth: 1,
        //            fill: false
        //        }, {
        //            label: 'Third Dataset',
        //            data: [{ x: 0, y: 19 }, { x: 1, y: 7 }, { x: 2, y: 12 }, { x: 3, y: 19 }, { x: 4, y: 11 }, { x: 5, y: 8 }, { x: 6, y: 18 }, { x: 7, y: 7 }, { x: 8, y: 20 }, { x: 9, y: 6 }, { x: 10, y: 2 }, { x: 11, y: 3 }, { x: 12, y: 11 }, { x: 13, y: 1 }, { x: 14, y: 12 }, { x: 15, y: 20 }, { x: 16, y: 16 }, { x: 17, y: 11 }],
        //            backgroundColor: 'rgba(255,206,86,0.2)',
        //            borderColor: 'rgba(255,206,86,1)',
        //            borderWidth: 1,
        //            fill: false
        //        }]
        //    },
        //    options: {
        //        responsive: true,
        //        legend: {
        //            display: true
        //        },
        //        scales: {
        //            xAxes: [{
        //                id: 'x-axis-0',
        //                type: 'linear',
        //                display: true,
        //                position: 'bottom',
        //                scaleLabel: {
        //                    display: true,
        //                    beginAtZero: true,
        //                    labelString: 'Date'
        //                },
        //                ticks: {
        //                    beginAtZero: true
        //                }
        //            }],
        //            yAxes: [{
        //                id: 'y-axis-0',
        //                type: 'linear',
        //                display: true,
        //                position: 'left',
        //                scaleLabel: {
        //                    display: true,
        //                    labelString: 'Count',
        //                },
        //                ticks: {
        //                    beginAtZero: true
        //                }
        //            }]
        //        },
        //        annotation: {
        //            annotations: [{
        //                type: 'box',
        //                id: 'target-period-1',
        //                xScaleID: 'x-axis-0',
        //                yScaleID: 'y-axis-0',
        //                xMin: 2,
        //                xMax: 7,
        //                yMin: 0,
        //                yMax: 20,
        //                borderColor: 'rgba(255,159,64,1)',
        //                backgroundColor: 'rgba(255,159,64,0.2)',
        //                borderWidth: 1
        //            }, {
        //                type: 'line',
        //                id: 'call-count-1',
        //                mode: 'vertical',
        //                scaleID: 'x-axis-0',
        //                value: 4.5,
        //                borderColor: 'transparent',
        //                label: {
        //                    backgroundColor: 'rgba(0,0,0,0.8)',
        //                    fontFamily: 'sans-serif',
        //                    fontSize: 12,
        //                    fontStyle: 'bold',
        //                    fontColor: '#fff',
        //                    xPadding: 12,
        //                    yPadding: 6,
        //                    cornerRadius: 4,
        //                    position: 'center',
        //                    yAdjust: -100,
        //                    enabled: true,
        //                    content: 'Test Label'
        //                }
        //            }],
        //            drawTime: 'afterDraw'
        //        }
        //    }
        //});


        //setTimeout(() => {
        //    //var canvas = $('.chartjs-render-monitor')[0] as HTMLCanvasElement;
        //    //var ctx = canvas.getContext('2d');

        //    this.ctx.fillStyle = "#FF0000";
        //    this.ctx.fillRect(50, 50, 150, 75);
        //}, 1500);
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
    private onNavigateBackwardTriggered() {
        // Check if prevSelectedDateRange is within the AvailableDateRange
        let prevSelectedDateRange = this.getCurrentDisplayModeInstance().GetPreviousSelectedDateRange(this.viewModel.SelectedDateRange);
        if (prevSelectedDateRange.RangeStart >= this.viewModel.AvailableDateRange.RangeStart) {
            this.viewModel.SelectedDateRange = prevSelectedDateRange;
            this.recreateDisplayRepresentation();
        }
        else {
            // If it isn't, load a new "window" of FactorRecords from the server
            var newAvailableDateRange = GetMonthRangeWithPaddingUsingMoment(prevSelectedDateRange.RangeStart.clone(),
                prevSelectedDateRange.RangeEnd.clone(), this.availableWindowPaddingInMonths);

            this.viewModel.Blocked = true;
            this.reloadAvailableHealthStatusEntriesFromServer(newAvailableDateRange)
                .then(() => {
                    this.viewModel.SelectedDateRange = prevSelectedDateRange;
                    this.recreateDisplayRepresentation();
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
            this.recreateDisplayRepresentation();
        }
        else {
            // If it isn't, load a new "window" of FactorRecords from the server
            var newAvailableDateRange = GetMonthRangeWithPaddingUsingMoment(nextSelectedDateRange.RangeStart.clone(),
                nextSelectedDateRange.RangeEnd.clone(), this.availableWindowPaddingInMonths);

            this.viewModel.Blocked = true;
            this.reloadAvailableHealthStatusEntriesFromServer(newAvailableDateRange)
                .then(() => {

                    this.viewModel.SelectedDateRange = nextSelectedDateRange;
                    this.recreateDisplayRepresentation();
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
                        enabled: true,
                        position: "top",
                        content: 'TODAY'
                    }
                }]
            }
        };
        return chartOptions;
    }
    public GetNavigationLabel(currentSelDateRange: Range<moment.Moment>) {
        // Range must be within same month
        if (currentSelDateRange.RangeStart.month() !== currentSelDateRange.RangeEnd.month()) {
            throw new Error('Range must be within same month');
        }

        return currentSelDateRange.RangeStart.format('MMMM, YYYY');
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
                    borderWidth:1.5,
                    fill: false
                }
            ]
        }
        return data;
    }

};

