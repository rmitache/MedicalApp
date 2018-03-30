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
        loggedInUser: null
    };
    private readonly subscriptions: Subscription[] = [];
    private readonly appState: IReadOnlyApplicationState;

    data: any;
    options: any;

    // Constructor 
    constructor(
        applicationState: GlobalApplicationState
    ) {

        this.appState = applicationState as IReadOnlyApplicationState;

        this.subscriptions.push(this.appState.LoggedInUserCLO.Changed.subscribe((newValue) => {
            this.viewModel.loggedInUser = newValue;
        }));

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

        this.options = {

            elements: {
                line: {
                    tension: 0, // disables bezier curves
                }
            },
            legend: {
                display:true,
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
                        fontColor:'gray',
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
    }
    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}


interface ViewModel {
    loggedInUser: CLOs.PatientAccountCLO | null;
}