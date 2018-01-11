import { Component, ChangeDetectorRef } from '@angular/core';
import '../../../Content/styles.css';
import { Observable } from 'rxjs/Observable';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import { CommandManager } from 'SPA/Core/Managers/CommandManager/command.manager';
import { FlowDefinitions } from 'SPA/Components/Pages/HomePage/CommandFlows/flow-definitions';
import { GlobalApplicationState } from './global-application-state';
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
        private readonly dataService: GlobalDataService,
        private readonly changeDetectorRef: ChangeDetectorRef
    ) {
        // Init different services and managers
        commandManager.Initialize(applicationState, FlowDefinitions);

        // Register self to CommandManager
        this.commandManager.RegisterComponentInstance(this);
    }
    public ngAfterViewInit() {
        // Initialize and start the Page
        const loggedInUserCLO: CLOs.PatientAccountCLO = this.dataService.GetLoggedInUserFromBundle();
        this.commandManager.InvokeCommandFlow('InitAndStartPageFlow', [loggedInUserCLO]);

        // Fix for CD ExpressionChangedAfterItHasBeenCheckedError issue
        this.changeDetectorRef.detectChanges();
    }

}
