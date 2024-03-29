// Angular and 3rd party stuff
import { Component, ChangeDetectorRef, ApplicationRef, ViewContainerRef } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';

// Project modules
import { CommandManager } from 'SPA/Core/Managers/CommandManager/command.manager';
import { FlowDefinitions } from 'SPA/Components/Pages/HomePage/CommandFlows/flow-definitions';
import '../../../Content/styles.css';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import { HomePageApplicationState } from './home-page-application-state';

// Components
import { HomePageDataService } from './home-page-data.service';
import { HelpDialogService } from '../../Shared/Popups/HelpDialog/help-dialog.service';


@Component({
    selector: 'home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
    // Constructor
    constructor(
        private readonly applicationState: HomePageApplicationState,
        private readonly commandManager: CommandManager,
        private readonly globalDataService: HomePageDataService,
        private readonly changeDetectorRef: ChangeDetectorRef,
        private readonly applicationRef: ApplicationRef,
        private helpDialogService: HelpDialogService,
        private viewContainerRef: ViewContainerRef,
    ) {
        // Init different services and managers
        commandManager.Initialize(applicationState, FlowDefinitions);

        // Setup momentjs relative thresholds
        moment.relativeTimeThreshold('s', 55);  // 45
        moment.relativeTimeThreshold('m', 59);  // 45
        moment.relativeTimeThreshold('h', 23);  // 22
        moment.relativeTimeThreshold('d', 28);  // 26
        moment.relativeTimeThreshold('M', 11);  // 11

        // Register self to CommandManager
        this.commandManager.RegisterComponentInstance(this);
    }
    ngAfterViewInit() {
        // Initialize and start the Page
        const loggedInUserCLO: CLOs.UserAccountCLO = this.globalDataService.GetLoggedInUserFromBundle();
        this.commandManager.InvokeCommandFlow('InitAndStartPageFlow', [loggedInUserCLO]);
        
        //
        setTimeout(() => {
            if(!loggedInUserCLO.HasSeenWelcome) {
                this.helpDialogService.OpenAsWelcome( () => {
                    loggedInUserCLO.HasSeenWelcome = true;
                });
            }
        }, 0);


        //// Handle change tracking
        //setInterval(() => {
        //    this.applicationRef.tick();
        //}, 100);
        this.changeDetectorRef.detectChanges();
    }

}
