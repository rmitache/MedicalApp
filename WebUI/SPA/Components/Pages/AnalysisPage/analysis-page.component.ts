// Angular and 3rd party stuff
import { Component, ChangeDetectorRef, ApplicationRef, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';

// Project modules
import { CommandManager } from 'SPA/Core/Managers/CommandManager/command.manager';
import { FlowDefinitions } from 'SPA/Components/Pages/AnalysisPage/CommandFlows/flow-definitions';
import '../../../Content/styles.css';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import { Time, Range, TimeRange } from 'SPA/Core/Helpers/DataStructures/misc';

// Components
import { AnalysisPageApplicationState, IReadOnlyApplicationState } from 'SPA/Components/Pages/AnalysisPage/analysis-page-application-state';
import { AnalysisPageDataService } from 'SPA/Components/Pages/AnalysisPage/analysis-page-data.service';
import { NavigationPanelComponent } from 'SPA/Components/Shared/NavigationPanel/navigation-panel.component';
import { DateRangeMode } from 'SPA/Core/Helpers/Enums/enums';
import { Subscription } from 'rxjs/Subscription';
import { TimelineComponent } from 'SPA/Components/Shared/Timeline/timeline.component';


@Component({
    selector: 'analysis-page',
    templateUrl: './analysis-page.component.html',
    styleUrls: ['./analysis-page.component.css']
})
export class AnalysisPageComponent {

    // Fields
    @ViewChild('navPanel')
    private navPanelInstance: NavigationPanelComponent;
    @ViewChild('timeline')
    private timelineInstance: TimelineComponent;
    private readonly viewModel: ViewModel = {
        DateRangeDisplayMode: DateRangeMode.SingleMonth,
    };
    private readonly subscriptions: Subscription[] = [];
    private readonly appState: IReadOnlyApplicationState;

    // Constructor
    constructor(
        private readonly applicationState: AnalysisPageApplicationState,
        private readonly commandManager: CommandManager,
        private readonly globalDataService: AnalysisPageDataService,
        private readonly changeDetectorRef: ChangeDetectorRef,
        private readonly applicationRef: ApplicationRef
    ) {
        this.appState = applicationState as IReadOnlyApplicationState;


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

        // Subscriptions to AppState
        this.subscriptions.push(this.appState.SelectedDateRange.Changed.subscribe((newValue) => {
            this.navPanelInstance.SetSelectedDateRange(newValue);
            this.timelineInstance.SetSelectedDateRange(newValue);
        }));
    }
    ngAfterViewInit() {
        // Initialize and start the Page
        const loggedInUserCLO: CLOs.UserAccountCLO = this.globalDataService.GetLoggedInUserFromBundle();
        this.commandManager.InvokeCommandFlow('InitAndStartPageFlow', [loggedInUserCLO]);


        // Initialize date range
        var initialSelectedDateRange = this.navPanelInstance.InitAndGetSelDateRange(this.viewModel.DateRangeDisplayMode, moment());
        this.commandManager.InvokeCommandFlow('ChangeSelectedDateRangeFlow', [initialSelectedDateRange]);
        

        //// Handle change tracking
        //setInterval(() => {
        //    this.applicationRef.tick();
        //}, 100);
        this.changeDetectorRef.detectChanges();
    }

    // Event handlers
    private onSelectedDateRangeChangeTriggered(newSelDateRange: Range<moment.Moment>) {
        this.commandManager.InvokeCommandFlow('ChangeSelectedDateRangeFlow', [newSelDateRange]);
    }

}

interface ViewModel {
    DateRangeDisplayMode: DateRangeMode;
}
