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
    selector: 'symptoms-graph',
    templateUrl: './symptoms-graph.component.html',
    styleUrls: ['./symptoms-graph.component.css'],
    host: { 'class': 'symptoms-graph' }
})
export class SymptomsGraphComponent {
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
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'This month (April)',
                    data: [0, 0, 1, 2, 1, 3, 1, 0, 0, 1, 2, 1, 3, 2, 0, 0, 1, 2, 1, 3],
                    fill: false,
                    borderColor: '#5da5da',
                },
                {
                    label: 'Last month (March)',
                    data: [2, 2, 3, 3, 2, 1, 1, 2, 2, 3, 3, 2, 1, 1, 2, 2, 3, 3, 2, 1],
                    fill: false,
                    borderColor: '#332288',
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
                position: 'top'
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        
                    },
                    ticks: {
                        fontColor: 'gray',
                        
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
                        padding: 5
                    }
                }]
            },
            responsive: true,
            maintainAspectRatio: false
        };
    }
    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}


interface ViewModel {
    loggedInUser: CLOs.PatientAccountCLO | null;
}