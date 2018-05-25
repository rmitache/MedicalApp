// Angular and 3rd party stuff
import { Component, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';

// Project modules
import { CommandManager } from 'SPA/Core/Managers/CommandManager/command.manager';
import { FlowDefinitions } from 'SPA/Components/Pages/AnalysisPage/CommandFlows/flow-definitions';
import '../../../Content/styles.css';
import * as CLOs from 'SPA/DomainModel/clo-exports';

// Components
import { AnalysisPageApplicationState } from 'SPA/Components/Pages/AnalysisPage/analysis-page-application-state';
import { AnalysisPageDataService } from 'SPA/Components/Pages/AnalysisPage/analysis-page-data.service';


@Component({
    selector: 'analysis-page',
    templateUrl: './analysis-page.component.html',
    styleUrls: ['./analysis-page.component.css']
})
export class AnalysisPageComponent {
    // Constructor
    constructor(
        private readonly applicationState: AnalysisPageApplicationState,
        private readonly commandManager: CommandManager,
        private readonly globalDataService: AnalysisPageDataService,
        private readonly changeDetectorRef: ChangeDetectorRef,
        private readonly applicationRef: ApplicationRef
    ) {
        // Init different services and managers
        commandManager.Initialize(applicationState, FlowDefinitions);

        // Init momentjs settings
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

        this.changeDetectorRef.detectChanges();
    }

}
