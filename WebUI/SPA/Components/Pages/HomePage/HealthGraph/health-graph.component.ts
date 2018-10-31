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
import { HomePageApplicationState, IReadOnlyApplicationState } from 'SPA/Components/Pages/HomePage/home-page-application-state';
import { HomePageDataService } from 'SPA/Components/Pages/HomePage/home-page-data.service';
import { ModalDialogService } from 'SPA/Core/Services/ModalDialogService/modal-dialog.service';
import { CommandManager } from 'SPA/Core/Managers/CommandManager/command.manager';
import * as HelperFunctions from 'SPA/Core/Helpers/Functions/functions';
import { GetMonthRangeWithPaddingUsingMoment } from 'SPA/Core/Helpers/Functions/functions';

// Components
import { AddNewHealthStatusEntryComponent } from 'SPA/Components/Pages/HomePage/HealthGraph/AddNewHealthStatusEntry/add-new-health-status-entry.component';
import { NavigationPanelComponent } from 'SPA/Components/Shared/NavigationPanel/navigation-panel.component';
import { DateRangeMode } from 'SPA/Core/Helpers/Enums/enums';
import { GraphTooltipComponent } from 'SPA/Components/Shared/HealthStatusTooltip/graph-tooltip.component';
import { SpinnerService } from 'SPA/Core/Services/SpinnerService/spinner.service';


@Component({
    selector: 'health-graph',
    templateUrl: './health-graph.component.html',
    styleUrls: ['./health-graph.component.css'],
    host: { 'class': 'health-graph' }
})
export class HealthGraphComponent {
    // Fields
    private availableWindowPaddingInMonths = 0;
    @ViewChild('chart')
    private chartInstance: UIChart;
    @ViewChild('graphTooltip')
    private graphTooltipInstance: GraphTooltipComponent;
    @ViewChild('navPanel')
    private navPanelInstance: NavigationPanelComponent;
    private readonly noDataModes = NoDataModes;
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
        // Get Current Mode strategy
        let currentStrategy: IDisplayMode = null;
        if (this.viewModel.DateRangeDisplayMode === DateRangeMode.SingleDay) {
            currentStrategy = new DayDisplayMode(this.chartInstance, this.graphTooltipInstance);
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
        this.chartInstance.reinit();

        // NoData triggers
        if (this.viewModel.UserHasAnyHealthStatusEntries === false) {
            this.viewModel.CurrentNoDataMode = NoDataModes.NoAvailableHealthStatusEntries;
        } else {
            this.viewModel.CurrentNoDataMode = null;
        }
    }

    // Constructor 
    constructor(
        applicationState: HomePageApplicationState,
        private readonly dataService: HomePageDataService,
        private readonly commandManager: CommandManager,
        private readonly modalDialogService: ModalDialogService,
        private viewContainerRef: ViewContainerRef,
        private readonly spinnerService: SpinnerService
    ) {
        this.appState = applicationState as IReadOnlyApplicationState;

        // Register self to CommandManager
        this.commandManager.RegisterComponentInstance(this);


    }
    ngOnInit() {
        // Get the initial range using the current DisplayMode
        let now = moment();
        //var initialSelectedDateRange = this.navPanelInstance.InitAndGetSelDateRange(this.viewModel.DateRangeDisplayMode, now);
        var initialSelectedDateRange = new Range<moment.Moment>(moment().startOf('day'),
            moment().endOf('day'));

        // Init VM properties
        this.viewModel.AvailableDateRange = initialSelectedDateRange; // GetMonthRangeWithPaddingUsingMoment(now, now, this.availableWindowPaddingInMonths);
        this.viewModel.AvailableHealthEntries = this.dataService.GetHealthStatusEntriesForInitialRangeFromBundle().HealthStatusEntryCLOs;
        this.viewModel.UserHasAnyHealthStatusEntries = this.dataService.GetHealthStatusEntriesForInitialRangeFromBundle().UserHasAnyHealthStatusEntries;
        this.viewModel.SelectedDateRange = initialSelectedDateRange;

        // Refresh the UI
        this.refreshUI();
    }
    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    // Event handlers
    private onAddNewHealthStatusEntryTriggered() {

        this.spinnerService.Show();
        this.dataService.GetRecentSymptoms().then(symptomTypeCLOs => {
            this.spinnerService.Hide();

            this.modalDialogService.OpenDialog(this.viewContainerRef, {
                title: 'Health status',
                childComponent: AddNewHealthStatusEntryComponent,
                data: {
                    recentSymptomTypes: symptomTypeCLOs
                },
                actionButtons: [
                    {
                        isDisabledFunction: (childComponentInstance: any) => {
                            let componentInstance = childComponentInstance as AddNewHealthStatusEntryComponent;
                            return !componentInstance.GetValidState();
                        },
                        text: 'Done',
                        onAction: (childComponentInstance: any) => {
                            let promiseWrapper = new Promise<void>((resolve) => {
                                this.spinnerService.Show();

                                let componentInstance = childComponentInstance as AddNewHealthStatusEntryComponent;
                                componentInstance.SaveData()
                                    .then((healthStatusCLO) => {
                                        this.reloadDataFromServer(this.viewModel.AvailableDateRange)
                                            .then(() => {
                                                this.refreshUI();
                                                setTimeout(() => {
                                                    this.spinnerService.Hide();
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
                        },
                        buttonClass: 'ui-button-secondary'
                    }
                ]
            });
        });

    }
    private onSelectedDateRangeChangedBackward(newSelDateRange: Range<moment.Moment>) {
        // Check if newSelDateRange is within the AvailableDateRange        
        if (newSelDateRange.RangeStart >= this.viewModel.AvailableDateRange.RangeStart) {
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
    private onSelectedDateRangeChangedForward(newSelDateRange: Range<moment.Moment>) {

        // Check if newSelDateRange is within the AvailableDateRange
        if (newSelDateRange.RangeEnd <= this.viewModel.AvailableDateRange.RangeEnd) {
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
    NoAvailableHealthStatusEntries = 0,
}

// Supported Display modes
interface IDisplayMode {
    GenerateChartOptions(datesToCLOsDictionary: { [dateKey: string]: CLOs.HealthStatusEntryCLO[] }): any;
    GenerateChartData(datesToCLOsDictionary: { [dateKey: string]: CLOs.HealthStatusEntryCLO[] }, currentSelDateRange: Range<moment.Moment>): any;
}
class DayDisplayMode implements IDisplayMode {
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
                dataPointsBgColors.push('#9dc340'); // green
            } else {
                dataPointsBgColors.push('#f35d5d'); // red
            }
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

    // Constructor
    constructor(
        private readonly chartInstance: UIChart,
        private readonly graphTooltipInstance: GraphTooltipComponent) {
    }


    // Public methods
    public GenerateChartOptions(datesToCLOsDictionary: { [dateKey: string]: CLOs.HealthStatusEntryCLO[] }) {
        let chartOptions =
        {
            animation: false,
            tooltips: {
                enabled: false
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
                        drawOnChartArea: false,
                        offsetGridLines: false
                    },
                    ticks: {

                        fontSize: 9,
                        maxRotation: 0,
                        minRotation: 0,
                        maxTicksLimit: 4,
                        fontColor: 'gray',
                        beginAtZero: true,
                        autoSkip: false,
                        callback: function (value, index, values) {
                            if (value === '0:00' || value === '6:00' || value === '12:00' || value === '18:00' || value === '23:00') {
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
                        drawTicks: false,
                        drawOnChartArea: true,
                        tickMarkLength: 5,
                        drawBorder: true,
                        zeroLineColor: 'gray'
                    },

                    ticks: {
                        padding: 10,
                        fontColor: 'gray',
                        //mirror: true,
                        //padding: 5,
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
                    pointRadius: 8,
                    pointStyle: 'circle',
                    pointBorderWidth: 0,
                    pointHoverRadius: 8,
                    borderColor: 'black',
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    showLine: true,
                    data: dataPointsInfo.dataPoints,
                    pointBackgroundColor: dataPointsInfo.dataPointsBgColors,
                }
            ]
        }
        return data;
    }

};


/*
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

            // Test comment
            // Create datapoint
            var dp = {
                x: date,
                y: avgHealthLevel
            };
            dataPoints.push(dp);

            // Basic colors
            if (avgHealthLevel >= 0) {
            	dataPointsBgColors.push('#9dc340');
            } else if (avgHealthLevel < 0) {
            	dataPointsBgColors.push('#fe6060');
            } 


            //// great
            //if (avgHealthLevel >= 2) {
            //    dataPointsBgColors.push('green');
            //}
            //// good
            //else if (avgHealthLevel >= 1 && avgHealthLevel < 2) {
            //    dataPointsBgColors.push('#9dc340');
            //}
            //// ok
            //else if (avgHealthLevel >= 0 && avgHealthLevel < 1) {
            //    dataPointsBgColors.push('#d8e27e');
            //}
            //// notgreat 
            //else if (avgHealthLevel > -0.8 && avgHealthLevel < 0) {
            //    dataPointsBgColors.push('#f3a590');
            //}
            //// bad 
            //else if (avgHealthLevel >= -2 && avgHealthLevel <= -0.8) {
            //    dataPointsBgColors.push('#fe6060');
            //}
            //// very bad
            //else if (avgHealthLevel < -1) {
            //    dataPointsBgColors.push('red');
            //}

        });

        return {
            dataPoints: dataPoints,
            dataPointsBgColors: dataPointsBgColors
        };
    }

    // Constructor
    constructor(
        private readonly chartInstance: UIChart,
        private readonly graphTooltipInstance: GraphTooltipComponent) {
    }


    // Public methods
    public GenerateChartOptions(datesToCLOsDictionary: { [dateKey: string]: CLOs.HealthStatusEntryCLO[] }) {
        let chartOptions = {
            tooltips: {
                enabled: false,
                custom: (tooltipModel) => {
                    if (tooltipModel.opacity === 0) {
                        this.graphTooltipInstance.HideAndClear();
                        return;
                    }
                    
                    // Variables
                    var dateString = tooltipModel.title[0];
                    var avgHealthLevelValue = tooltipModel.dataPoints[0].yLabel;
                    var dateKey = moment(dateString, "dddd MMM D, YYYY").format('DD/MM/YYYY');
                    var healthStatusEntryCLOsForDate = datesToCLOsDictionary[dateKey];
                    var parentPosition = (this.chartInstance.el.nativeElement as HTMLElement).getBoundingClientRect();

                    // Hack for positioning of tooltip on negative bar chart values
                    var value = tooltipModel.dataPoints[0].yLabel;
                    if (value < 0) {
                        tooltipModel.caretY = (parentPosition.height / 2);
                    }

                    //
                    this.graphTooltipInstance.SetDataAndPosition(dateString, healthStatusEntryCLOsForDate, parentPosition,
                        tooltipModel.caretX, tooltipModel.caretY, avgHealthLevelValue);
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
                            if (!(index % 3)) return value;
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
                        zeroLineColor: 'gray'
                    },

                    ticks: {
                        fontColor: 'gray',
                        beginAtZero: true,
                        min: -3,
                        max: 3,
                        stepSize: 1,
                        callback: function (label, index, labels) {
                            //if (label !== 0)
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
        var dataPointsInfo = this.generateDataPointsForChart(datesToCLOsDictionary, currentSelDateRange);

        // Set data
        var data = {
            datasets: [
                {
                    data: dataPointsInfo.dataPoints,
                    backgroundColor: dataPointsInfo.dataPointsBgColors,
                }
            ]
        }
        return data;
    }

};
*/