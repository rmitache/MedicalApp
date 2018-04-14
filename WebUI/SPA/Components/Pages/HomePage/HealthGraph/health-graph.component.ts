// Angular and 3rd party stuff
import { Component, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
import { ChartModule, UIChart } from 'primeng/primeng';
import { NgxChartsModule } from '@swimlane/ngx-charts';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { Time, Range, TimeRange } from 'SPA/Core/Helpers/DataStructures/misc';
import { GlobalApplicationState, IReadOnlyApplicationState } from 'SPA/Components/Pages/HomePage/global-application-state';
import { GlobalDataService } from 'SPA/Components/Pages/HomePage/global-data.service';
import { ModalDialogService } from 'SPA/Core/Services/ModalDialogService/modal-dialog.service';
import { CommandManager } from 'SPA/Core/Managers/CommandManager/command.manager';
import * as HelperFunctions from 'SPA/Core/Helpers/Functions/functions';
import { GetMonthRangeWithPaddingUsingMoment } from 'SPA/Core/Helpers/Functions/functions';

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
    private availableWindowPaddingInMonths = 0;

    @ViewChild("chart")
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



    single = [
        {
            "name": new Date("2011-01-01"),
            "value": 3
        },
        {
            "name": new Date("2011-01-02"),
            "value": -2
        },
        {
            "name": new Date("2011-01-03"),
            "value": 0
        },
        {
            "name": new Date("2011-01-04"),
            "value": 3
        },
        {
            "name": new Date("2011-01-05"),
            "value": 3
        },
        {
            "name": new Date("2011-01-06"),
            "value": -3
        },
        {
            "name": new Date("2011-01-07"),
            "value": 1
        },
        {
            "name": new Date("2011-01-08"),
            "value": 1
        },
        {
            "name": new Date("2011-01-09"),
            "value": -3
        },
        {
            "name": new Date("2011-01-10"),
            "value": 1
        },
        {
            "name": new Date("2011-01-11"),
            "value": 2
        },
        {
            "name": new Date("2011-01-12"),
            "value": -1
        },
        {
            "name": new Date("2011-01-13"),
            "value": 3
        },
        {
            "name": new Date("2011-01-14"),
            "value": 3
        },
        {
            "name": new Date("2011-01-15"),
            "value": -3
        },
    ];


    // options
    options = {

        // X Axis
        showXAxis: true,
        showXAxisLabel: false,
        xAxisLabel: 'Country',

        // Y Axis
        showYAxis: true,
        showYAxisLabel: false,
        yAxisLabel: 'Population',
        yAxisTicks: [
            3,2,1,0,-1,-2,-3
        ],

        yScaleMax: 5,
        yScaleMin:-5,

        // General
        showLegend: false,
    }
    axisFormat(val) {
        return 'wtf';
    }

    colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };

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
        this.viewModel.NavigationLabel = currentDisplayMode.GetNavigationLabel(this.viewModel.SelectedDateRange);
        //this.chartInstance.reinit();

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
        // Get the initial range from the current DisplayMode
        var initialSelectedDateRange = this.getCurrentDisplayModeInstance().GetInitialSelectedDateRange(moment());

        this.viewModel.AvailableDateRange = GetMonthRangeWithPaddingUsingMoment(initialSelectedDateRange.RangeStart,
            initialSelectedDateRange.RangeEnd, this.availableWindowPaddingInMonths);
        this.viewModel.AvailableHealthEntries = this.dataService.GetHealthStatusEntriesForInitialRangeFromBundle().ToArray();

        // Then init the SelectedDateRange and create the display representation
        this.viewModel.SelectedDateRange = initialSelectedDateRange;
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
    public GetNavigationLabel(currentSelDateRange: Range<moment.Moment>) {
        // Range must be within same month
        if (currentSelDateRange.RangeStart.month() !== currentSelDateRange.RangeEnd.month()) {
            throw new Error('Range must be within same month');
        }

        return currentSelDateRange.RangeStart.format('MMMM, YYYY');
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
