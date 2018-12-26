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
import { SingleHealthStatusTooltipComponent } from '../../../Shared/Tooltips/SingleHealthStatusTooltip/single-health-status-tooltip.component';
import { AddHealthStatusDialogService } from '../../../Shared/Popups/AddHealthStatusDialog/add-health-status-dialog.service';


@Component({
    selector: 'health-graph',
    templateUrl: './health-graph.component.html',
    styleUrls: ['./health-graph.component.css'],
    host: { 'class': 'health-graph' }
})
export class HealthGraphComponent {
    // Fields
    private infoTooltipText: string =
        `Under HEALTH you can keep track of how you've been feeling throughout the day. <br />
        It is recommended that you check-in at least several times per day, as this is valuable information which you can use later.`;
    private readonly viewModel: ViewModel = {
        
    };
    private readonly subscriptions: Subscription[] = [];
    private readonly appState: IReadOnlyApplicationState;


    // Private methods
    
    private refreshUI() {

        
    }

    // Constructor 
    constructor(
        applicationState: HomePageApplicationState,
        private readonly dataService: HomePageDataService,
        private readonly commandManager: CommandManager,
        private readonly modalDialogService: ModalDialogService,
        private viewContainerRef: ViewContainerRef,
        private readonly spinnerService: SpinnerService,
        private readonly addHealthStatusDialogService: AddHealthStatusDialogService
    ) {
        this.appState = applicationState as IReadOnlyApplicationState;

        // Register self to CommandManager
        this.commandManager.RegisterComponentInstance(this);


    }
    ngOnInit() {
        
    }
    
    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    // Event handlers
    private onAddNewHealthStatusEntryTriggered() {
        this.addHealthStatusDialogService.Open(this.viewContainerRef, () => {
            //this.reloadDataFromServer(this.viewModel.AvailableDateRange)
            //    .then(() => {
            //        this.refreshUI();
            //        setTimeout(() => {
            //            this.spinnerService.Hide();
            //        }, 200);
            //    });
        });
    }
}

interface ViewModel {
   

    
}
