// Angular and 3rd party stuff
import { Component, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
import { ChartModule } from 'primeng/primeng';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { Time, Range, TimeRange } from 'SPA/Core/Helpers/DataStructures/misc';
import { GlobalApplicationState, IReadOnlyApplicationState } from 'SPA/Components/Pages/HomePage/global-application-state';
import { GlobalDataService } from 'SPA/Components/Pages/HomePage/global-data.service';
import { ModalDialogService } from 'SPA/Core/Services/ModalDialogService/modal-dialog.service';
import { CommandManager } from 'SPA/Core/Managers/CommandManager/command.manager';

// Components



@Component({
    selector: 'health-graph',
    templateUrl: './health-graph.component.html',
    styleUrls: ['./health-graph.component.css'],
    host: { 'class': 'health-graph' }
})
export class HealthGraphComponent {
    // Fields
    private readonly viewModel: ViewModel = {
        AvailableDateRange: null,
        AvailableHealthEntries: null,

        SelectedDateRange: null,
        SelectedViewMode: HealthGraphDisplayMode.Day
    };
    private readonly subscriptions: Subscription[] = [];
    private readonly appState: IReadOnlyApplicationState;
    private chartOptions = {

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
                gridLines: {

                },
                ticks: {
                    fontColor: 'gray',
                    beginAtZero: true
                }
            }],
            yAxes: [{

                gridLines: {
                    display: true,
                    drawTicks: true,
                    drawOnChartArea: false,
                    tickMarkLength: 5,
                    drawBorder: false,
                },

                ticks: {
                    fontColor: 'gray',
                    max: 4,
                    min: -4,
                    stepSize: 1,
                    padding: 5,
                    beginAtZero: true
                }
            }]
        },
        responsive: true,
        maintainAspectRatio: false,
        annotation: {
            annotations: [{
                drawTime: 'afterDraw', // overrides annotation.drawTime if set
                id: 'a-line-1', // optional
                type: 'line',
                mode: 'horizontal',
                scaleID: 'y-axis-0',
                value: '25',
                borderColor: 'red',
                borderWidth: 2,
            }]
        }
    };

    data: any;

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

        this.data = {
            labels: ['Night', 'Morning', 'Mid-Day', 'Evening'],
            datasets: [


                {
                    label: 'Today (30th March)',
                    data: [-3, 1, 2, 2],
                    backgroundColor: '#c1e568',
                    borderColor: '#81a81f',
                    borderWidth: 1
                }
            ]
        }

        //// Init Available (super) DataSet
        //this.viewModel.AvailableDateRange = new Range<moment.Moment>(
        //    moment(new Date()).startOf('day').subtract(this.availableDataWindowSizeInDays / 2, 'days'),
        //    moment(new Date()).endOf('day').add(this.availableDataWindowSizeInDays / 2, 'days'));
        //this.viewModel.AvailableFactorRecords = this.dataService.GetFactorRecordsForInitialRangeFromBundle().ToArray();

        //// Then init the SelectedDateRange and create the display representation
        //this.viewModel.SelectedDateRange = this.getCurrentDisplayModeInstance().GetInitialSelectedDateRange(moment());
        //this.recreateDisplayRepresentation();
    }
    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}


interface ViewModel {
    AvailableDateRange: Range<moment.Moment>;
    AvailableHealthEntries: CLOs.HealthStatusEntry[];

    SelectedDateRange: Range<moment.Moment>;
    SelectedViewMode: HealthGraphDisplayMode;
}
enum HealthGraphDisplayMode {
    Day,
    Week
}

// STRATEGIES
interface IDisplayMode {
    GetInitialSelectedDateRange(referenceDate: moment.Moment): Range<moment.Moment>;
    GetNextSelectedDateRange(currentSelDateRange: Range<moment.Moment>): Range<moment.Moment>;
    GetPreviousSelectedDateRange(currentSelDateRange: Range<moment.Moment>): Range<moment.Moment>;
    GetChartOptions(): any;
    GetChartData(factorRecords: CLOs.MedicineFactorRecordCLO[]): any;
}