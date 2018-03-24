// Angular and 3rd party stuff
import { Component, ChangeDetectorRef } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';

// Project modules
import { CommandManager } from 'SPA/Core/Managers/CommandManager/command.manager';
import { FlowDefinitions } from 'SPA/Components/Pages/HomePage/CommandFlows/flow-definitions';
import '../../../Content/styles.css';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import { GlobalApplicationState } from './global-application-state';

// Components
import { GlobalDataService } from './global-data.service';


@Component({
    selector: 'home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
    // Constructor
    constructor(
        private readonly applicationState: GlobalApplicationState,
        private readonly commandManager: CommandManager,
        private readonly globalDataService: GlobalDataService,
        private readonly changeDetectorRef: ChangeDetectorRef
    ) {
        // Init different services and managers
        commandManager.Initialize(applicationState, FlowDefinitions);

        // Init momentjs settings
        //moment.updateLocale('en', {
        //    calendar: {
        //        lastDay: '[Yesterday]',
        //        sameDay: '[Today]',
        //        nextDay: '[Tomorrow]',
        //        lastWeek: '[Last] dddd',
        //        nextWeek: '[Next] dddd',
        //        sameElse: 'L'
        //    }
        //});
        moment.relativeTimeThreshold('s', 55);  // 45
        moment.relativeTimeThreshold('m', 59);  // 45
        moment.relativeTimeThreshold('h', 23);  // 22
        moment.relativeTimeThreshold('d', 28);  // 26
        moment.relativeTimeThreshold('M', 11);  // 11



        // Register self to CommandManager
        this.commandManager.RegisterComponentInstance(this);
    }
    public ngAfterViewInit() {
        // Initialize and start the Page
        const loggedInUserCLO: CLOs.PatientAccountCLO = this.globalDataService.GetLoggedInUserFromBundle();
        this.commandManager.InvokeCommandFlow('InitAndStartPageFlow', [loggedInUserCLO]);

        // Fix for CD ExpressionChangedAfterItHasBeenCheckedError issue
        this.changeDetectorRef.detectChanges();
    }

}
