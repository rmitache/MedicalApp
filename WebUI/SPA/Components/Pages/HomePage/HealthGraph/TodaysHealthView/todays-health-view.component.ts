// Angular and 3rd party stuff
import { Component, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
import * as Chart from 'chart.js';


// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { Time, Range, TimeRange } from 'SPA/Core/Helpers/DataStructures/misc';
import { HomePageApplicationState, IReadOnlyApplicationState } from 'SPA/Components/Pages/HomePage/home-page-application-state';
import { HomePageDataService } from 'SPA/Components/Pages/HomePage/home-page-data.service';
import { ModalDialogService } from 'SPA/Core/Services/ModalDialogService/modal-dialog.service';
import { CommandManager } from 'SPA/Core/Managers/CommandManager/command.manager';
import * as HelperFunctions from 'SPA/Core/Helpers/Functions/functions';
import { GetMonthRangeWithPaddingUsingMoment } from 'SPA/Core/Helpers/Functions/functions';

// Components
import { NavigationPanelComponent } from 'SPA/Components/Shared/NavigationPanel/navigation-panel.component';
import { DateRangeMode } from 'SPA/Core/Helpers/Enums/enums';
import { SpinnerService } from 'SPA/Core/Services/SpinnerService/spinner.service';
import { SingleHealthStatusTooltipComponent } from 'SPA/Components/Shared/Tooltips/SingleHealthStatusTooltip/single-health-status-tooltip.component';
import { AddHealthStatusDialogService } from 'SPA/Components/Shared/Popups/AddHealthStatusDialog/add-health-status-dialog.service';


@Component({
    selector: 'todays-health-view',
    templateUrl: './todays-health-view.component.html',
    styleUrls: ['./todays-health-view.component.css'],
    host: { 'class': 'todays-health-view' }
})
export class TodaysHealthViewComponent {
    // Fields
    @ViewChild('healthStatusTooltip')
    private healthStatusTooltipInstance: SingleHealthStatusTooltipComponent;
    private readonly noDataModes = NoDataModes;
    private canvas: any;
    private chartCanvasContext: any;
    private chartInstance: any;
    private readonly viewModel: ViewModel = {
        AvailableDateRange: null,
        AvailableHealthEntries: null,

        SelectedDateRange: null,
        ChartOptions: null,
        ChartData: null,

        DateRangeDisplayMode: DateRangeMode.SingleDay,
        CurrentNoDataMode: null,
        UserHasAnyHealthStatusEntries: null
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
        if (this.viewModel.DateRangeDisplayMode === DateRangeMode.SingleDay) {
            currentStrategy = new DayDisplayMode(getChartInstanceFunction, getChartCanvasFunction, this.healthStatusTooltipInstance);
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
                this.viewModel.AvailableHealthEntries = model.HealthStatusEntryCLOs;
                this.viewModel.UserHasAnyHealthStatusEntries = model.UserHasAnyHealthStatusEntries;
            });
        return promise;
    }
    private refreshUI() {

        // Get the healthstatusEntry CLOs which are in the SelectedDateRange
        let filteredHealthStatusEntryCLOs = this.viewModel.AvailableHealthEntries.filter(entry => {
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

        // Refresh VM properties and (re)create the chart
        let currentDisplayMode = this.getCurrentDisplayModeInstance();
        this.viewModel.ChartOptions = currentDisplayMode.GenerateChartOptions(datesToCLOsDictionary);
        this.viewModel.ChartData = currentDisplayMode.GenerateChartData(datesToCLOsDictionary,
            new Range<moment.Moment>(this.viewModel.SelectedDateRange.RangeStart.clone(), this.viewModel.SelectedDateRange.RangeEnd.clone()));


        // Recreate the chart
        if (this.chartInstance) {
            this.chartInstance.destroy();
        }
        this.chartInstance = new Chart(this.chartCanvasContext, {
            type: 'line',
            data: this.viewModel.ChartData,
            options: this.viewModel.ChartOptions,

        });

        // NoData triggers
        if (filteredHealthStatusEntryCLOs.length === 0) {
            this.viewModel.CurrentNoDataMode = NoDataModes.NoHealthStatusEntriesToday;
        } else {
            this.viewModel.CurrentNoDataMode = null;
        }
    }

    // Constructor 
    constructor(
        applicationState: HomePageApplicationState,
        private readonly dataService: HomePageDataService,
        private readonly commandManager: CommandManager,
        private readonly spinnerService: SpinnerService
    ) {
        this.appState = applicationState as IReadOnlyApplicationState;

        // Register self to CommandManager
        this.commandManager.RegisterComponentInstance(this);


    }
    ngOnInit() {
        // Get the initial range using the current DisplayMode
        let now = moment();
        var initialSelectedDateRange = new Range<moment.Moment>(moment().startOf('day'),
            moment().endOf('day'));

        // Init VM properties
        this.viewModel.AvailableDateRange = initialSelectedDateRange; // GetMonthRangeWithPaddingUsingMoment(now, now, this.availableWindowPaddingInMonths);
        this.viewModel.AvailableHealthEntries = this.dataService.GetHealthStatusEntriesForInitialRangeFromBundle().HealthStatusEntryCLOs;
        this.viewModel.UserHasAnyHealthStatusEntries = this.dataService.GetHealthStatusEntriesForInitialRangeFromBundle().UserHasAnyHealthStatusEntries;
        this.viewModel.SelectedDateRange = initialSelectedDateRange;


    }
    ngAfterViewInit() {
        // Get references to the chart canvas context
        this.canvas = document.getElementById('todaysHealthViewChart');
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
    AvailableHealthEntries: CLOs.HealthStatusEntryCLO[];

    SelectedDateRange: Range<moment.Moment>;

    ChartOptions: any;
    ChartData: any;

    DateRangeDisplayMode: DateRangeMode;
    CurrentNoDataMode: NoDataModes;
    UserHasAnyHealthStatusEntries: boolean;
}

enum NoDataModes {
    NoHealthStatusEntriesToday = 0,
}

// Supported Display modes
interface IDisplayMode {
    GenerateChartOptions(datesToCLOsDictionary: { [dateKey: string]: CLOs.HealthStatusEntryCLO[] }): any;
    GenerateChartData(datesToCLOsDictionary: { [dateKey: string]: CLOs.HealthStatusEntryCLO[] }, currentSelDateRange: Range<moment.Moment>): any;
}
class DayDisplayMode implements IDisplayMode {
    // Private methods
    private generateDataPointsForChart(healthEntryCLOs: CLOs.HealthStatusEntryCLO[]) {

        // Variables
        var dataPoints = []
        var dataPointsBgColors = [];


        // Loop through clos and create datapoints
        healthEntryCLOs.forEach((clo, index) => {

            // Create datapoints
            var dp = {
                x: moment(clo.OccurrenceDateTime),
                y: clo.HealthLevel
            };
            dataPoints.push(dp);

            if (clo.HealthLevel >= 0) {
                dataPointsBgColors.push('#9dc340');
            } else if (clo.HealthLevel < 0) {
                dataPointsBgColors.push('#fe6060');
            }

            //// Color
            //// great
            //if (clo.HealthLevel > 2) {
            //    dataPointsBgColors.push('#284e11');
            //}
            //// good
            //else if (clo.HealthLevel > 1 && clo.HealthLevel <= 2) {
            //    dataPointsBgColors.push('#009e11');
            //}
            //// ok
            //else if (clo.HealthLevel > 0 && clo.HealthLevel <= 1) {
            //    dataPointsBgColors.push('#b5d7a7');
            //}
            //// notgreat 
            //else if (clo.HealthLevel >= -1 && clo.HealthLevel < 0) {
            //    dataPointsBgColors.push('#ff9900');
            //}
            //// bad 
            //else if (clo.HealthLevel >= -2 && clo.HealthLevel < -1) {
            //    dataPointsBgColors.push('#e06666');
            //}
            //// very bad
            //else if (clo.HealthLevel < -2) {
            //    dataPointsBgColors.push('red');
            //}
        });

        // Add min/max special datapoints
        if (healthEntryCLOs.length > 0) {
            var minDp = {
                x: moment(healthEntryCLOs[0].OccurrenceDateTime).startOf('day'),
                y: null
            }
            dataPoints.splice(0, 0, minDp);
            dataPointsBgColors.splice(0, 0, 'black');

            var maxDp = {
                x: moment(healthEntryCLOs[0].OccurrenceDateTime).endOf('day'),
                y: null
            }
            dataPoints.push(maxDp);
            dataPointsBgColors.push(maxDp);
        }




        return {
            dataPoints: dataPoints,
            dataPointsBgColors: dataPointsBgColors
        };
    }
    private getHealthStatusCLOByDateTimeAndHealthLevel(targetDateTime: moment.Moment, healthLevel: number,
        datesToCLOsDictionary: { [dateKey: string]: CLOs.HealthStatusEntryCLO[] })
        : CLOs.HealthStatusEntryCLO {
        var allHealthEntryCLOs = HelperFunctions.ConvertDictionaryToArray(datesToCLOsDictionary)[0];
        for (var i = 0; i < allHealthEntryCLOs.length; i++) {
            let clo = allHealthEntryCLOs[i];

            if (moment(clo.OccurrenceDateTime).isSame(targetDateTime) && clo.HealthLevel === healthLevel) {
                return clo;
            }
        }

        return null;
    }

    // Constructor
    constructor(
        private readonly getChartInstance: GetChartInstanceFunc,
        private readonly getChartCanvas: GetChartCanvasFunc,
        private readonly healthStatusTooltipInstance: SingleHealthStatusTooltipComponent) {
    }


    // Public methods
    public GenerateChartOptions(datesToCLOsDictionary: { [dateKey: string]: CLOs.HealthStatusEntryCLO[] }) {
        let chartOptions =
        {
            
            layout: {
                padding: {
                    top: 10,
                    bottom: 0
                }
            },
            animation: false,
            tooltips: {
                enabled: false,
                custom: (tooltipModel) => {
                    if (tooltipModel.opacity === 0) {
                        this.healthStatusTooltipInstance.HideAndClear();
                        return;
                    }

                    // Variables
                    let dateTimeString = tooltipModel.title[0];
                    let index = tooltipModel.dataPoints[0].index;
                    let healthLevel = tooltipModel.dataPoints[0].yLabel;

                    let dataPointColor = this.getChartInstance().data.datasets[0].pointBackgroundColor[index];
                    let targetHealthStatusCLO = this.getHealthStatusCLOByDateTimeAndHealthLevel(moment(dateTimeString),
                        healthLevel, datesToCLOsDictionary);
                    let parentPosition = this.getChartCanvas().getBoundingClientRect();

                    //
                    this.healthStatusTooltipInstance.SetDataAndPosition(targetHealthStatusCLO, parentPosition,
                        tooltipModel.caretX, tooltipModel.caretY, dataPointColor);
                }

            },
            elements: {
                line: {
                    tension: 0, 
                }
            },
            legend: {
                display: false,
            },
            scales: {
                xAxes: [{
                    type: "time",
                    distribution: 'linear',
                    time: {
                        minUnit: 'hour',
                        unit: 'hour',
                        unitStepSize: 1,
                        displayFormats: {
                            hour: 'H:mm',
                            minute: 'H:mm',
                        }
                    },
                    gridLines: {
                        display: true,
                        drawBorder: false,
                        drawOnChartArea: false,
                        offsetGridLines: false,
                    },
                    ticks: {
                        mirror: true,
                        fontSize: 8,
                        maxRotation: 0,
                        minRotation: 0,
                        maxTicksLimit: 4,
                        fontColor: 'gray',
                        beginAtZero: true,
                        autoSkip: false,
                        callback: function (value, index, values) {
                            if (value === '0:00' /*|| value === '6:00'*/ || value === '12:00' || /*value === '18:00' ||*/ value === '23:00') {
                                return value;
                            }
                            else {
                                return '';
                            }
                        }
                    }
                }],
                yAxes: [{

                    gridLines: {
                        display: true,
                        color: "white",
                        drawTicks: false,
                        drawOnChartArea: true,
                        tickMarkLength: 5,
                        drawBorder: false,
                        zeroLineColor: 'gray'
                    },

                    ticks: {
                        padding: 10,
                        fontColor: '#b6b6b6',
                        
                        //padding: 5,
                        fontSize: 10,
                        beginAtZero: true,
                        min: -3,
                        max: 3,
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
            maintainAspectRatio: false
        };
        return chartOptions;
    }
    public GenerateChartData(datesToCLOsDictionary: { [dateKey: string]: CLOs.HealthStatusEntryCLO[] }, currentSelDateRange: Range<moment.Moment>) {

        // Prepare data
        var healthEntryCLOsInRange: CLOs.HealthStatusEntryCLO[] = [];
        var datesWhichAreInGivenRange = HelperFunctions.EnumerateDaysBetweenDatesUsingMoment(currentSelDateRange, true);
        datesWhichAreInGivenRange.forEach((date, index) => {

            // Prepare data
            let dateKey = date.format('DD/MM/YYYY');
            var clos = (datesToCLOsDictionary[dateKey] !== undefined) ? datesToCLOsDictionary[dateKey] : [];
            healthEntryCLOsInRange = healthEntryCLOsInRange.concat(clos);
        });

        var dataPointsInfo = this.generateDataPointsForChart(healthEntryCLOsInRange);

        // Set data
        var data = {
            datasets: [
                {
                    borderDash: [5, 5],
                    pointRadius: 7,
                    pointStyle: 'circle',
                    pointBorderWidth: 0,
                    pointHoverRadius: 8,
                    borderColor: 'black',
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    showLine: true,
                    data: dataPointsInfo.dataPoints,
                    pointBackgroundColor: dataPointsInfo.dataPointsBgColors,
                }
            ]
        }
        return data;
    }

};


type GetChartCanvasFunc = () => any;
type GetChartInstanceFunc = () => any;