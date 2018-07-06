// Angular and 3rd party stuff
import { Component, ChangeDetectorRef, ApplicationRef, ViewContainerRef, ViewChild, } from '@angular/core';
import * as moment from 'moment';
import * as momentRange from 'moment-range';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as $ from 'jquery';

// Project modules
import { Time, Range, TimeRange } from 'SPA/Core/Helpers/DataStructures/misc';
import { CommandManager } from 'SPA/Core/Managers/CommandManager/command.manager';
import { FlowDefinitions } from 'SPA/Components/Pages/HomePage/CommandFlows/flow-definitions';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import { ModalDialogService } from 'SPA/Core/Services/ModalDialogService/modal-dialog.service';
import { GenericCLOFactory } from 'SPA/DomainModel/generic-clo.factory';

// Components
import { AnalysisPageApplicationState, IReadOnlyApplicationState } from 'SPA/Components/Pages/AnalysisPage/analysis-page-application-state';
import { AnalysisPageDataService } from 'SPA/Components/Pages/AnalysisPage/analysis-page-data.service';
import { GetMonthRangeWithPaddingUsingMoment, GetDateIndexInTargetRange, GetNrOfDaysBetweenDatesUsingMoment, IsDateOnFirstOrLastDateInMonth } from 'SPA/Core/Helpers/Functions/functions';
import { VersionElemHoverEventInfo } from 'SPA/Components/Pages/AnalysisPage/FactorsView/PlanElem/VersionElem/version-elem.component';
import { VersionTooltipComponent } from 'SPA/Components/Pages/AnalysisPage/FactorsView/VersionTooltip/version-tooltip.component';
import { NavigationPanelComponent } from 'SPA/Components/Shared/NavigationPanel/navigation-panel.component';
import { DateRangeMode } from 'SPA/Core/Helpers/Enums/enums';
import { TimelinePanelComponent } from 'SPA/Components/Pages/AnalysisPage/FactorsView/TimelinePanel/timeline-panel.component';


@Component({
    selector: 'factors-view',
    templateUrl: './factors-view.component.html',
    styleUrls: ['./factors-view.component.css'],
    host: { 'class': 'factors-view' },
})
export class FactorsViewComponent {
    // Fields
    @ViewChild('versionTooltip')
    private versionTooltipInstance: VersionTooltipComponent;
    @ViewChild('navPanel')
    private navPanelInstance: NavigationPanelComponent;
    @ViewChild('timelinePanel')
    private timelinePanelInstance: TimelinePanelComponent;
    private readonly viewModel: ViewModel = {
        AvailableDateRange: null,

        PlansInSelectedDateRange: null,
        SelectedDateRange: null,
        TodayXPosition: null,

        DateRangeDisplayMode: DateRangeMode.Month,
        Blocked: false
    };
    private readonly subscriptions: Subscription[] = [];
    private readonly appState: IReadOnlyApplicationState;

    // Private methods
    private filterPlansByDateRange(planCLOs: CLOs.PlanCLO[], targetDateRange: Range<moment.Moment>): CLOs.PlanCLO[] {
        var filteredPlans: CLOs.PlanCLO[] = [];

        planCLOs.forEach((planCLO) => {
            var intersections = planCLO.GetIntersectionsPerVersionWithDateRange(targetDateRange);
            if (intersections !== null) {
                filteredPlans.push(planCLO);
            }
        });

        return filteredPlans;
    }
    private computeXPositionFromDate(date: moment.Moment) {

        // Check if TODAY is in SelectedDateRange
        var selDateRange = new momentRange.DateRange(this.viewModel.SelectedDateRange.RangeStart, this.viewModel.SelectedDateRange.RangeEnd);
        if (!selDateRange.contains(date)) {
            return null;
        }


        // Variables
        var startDateIndex = GetDateIndexInTargetRange(date, this.viewModel.SelectedDateRange);
        var nrOfDaysInSelectedDateRange = GetNrOfDaysBetweenDatesUsingMoment(this.viewModel.SelectedDateRange.RangeStart, this.viewModel.SelectedDateRange.RangeEnd);
        var widthBetweenDates = 100 / (nrOfDaysInSelectedDateRange - 1);

        // Compute the width
        let xPosition = (startDateIndex) * widthBetweenDates;
        return xPosition;
    }
    private refreshUI() {

        // Refresh vm properties
        this.viewModel.PlansInSelectedDateRange = this.filterPlansByDateRange(this.dataService.GetPlansFromBundle().ToArray(), this.viewModel.SelectedDateRange);
        this.viewModel.TodayXPosition = !IsDateOnFirstOrLastDateInMonth(moment()) ? this.computeXPositionFromDate(moment()) : null;

        // Refresh children components
        this.timelinePanelInstance.SetSelectedDateRange(this.viewModel.SelectedDateRange);
    }

    // Constructor
    constructor(
        applicationState: AnalysisPageApplicationState,
        private readonly dataService: AnalysisPageDataService,
        private readonly commandManager: CommandManager,
        private readonly modalDialogService: ModalDialogService,
        private viewContainerRef: ViewContainerRef,
        private readonly genericCLOFactory: GenericCLOFactory,
    ) {
        this.appState = applicationState as IReadOnlyApplicationState;

        this.subscriptions.push(this.appState.SelectedDateRange.Changed.subscribe((newValue) => {
            this.viewModel.SelectedDateRange = newValue;
            this.refreshUI();
            this.navPanelInstance.SetDateRangeManually(newValue);
        }));

        // Register self to CommandManager
        this.commandManager.RegisterComponentInstance(this);
    }
    ngOnInit() {
        // Get the initial range from the current DisplayMode
        var initialSelectedDateRange = this.navPanelInstance.InitAndGetSelDateRange(this.viewModel.DateRangeDisplayMode, moment());
        this.viewModel.SelectedDateRange = initialSelectedDateRange;

        // Refresh the UI
        this.refreshUI();
    }
    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    // Event handlers
    private onVersionElemHover(eventInfo: VersionElemHoverEventInfo) {

        if (eventInfo) {
            this.versionTooltipInstance.Show(eventInfo);
        } else {
            this.versionTooltipInstance.HideAndClear();
        }
    }
    private onSelectedDateRangeChangedTriggered(newSelDateRange: Range<moment.Moment>) {
        this.commandManager.InvokeCommandFlow('ChangeSelectedDateRangeFlow', [newSelDateRange]);
    }
    
}
interface ViewModel {
    AvailableDateRange: Range<moment.Moment>;

    PlansInSelectedDateRange: CLOs.PlanCLO[];
    SelectedDateRange: Range<moment.Moment>;
    TodayXPosition: number;

    DateRangeDisplayMode: DateRangeMode;
    Blocked: boolean;
}
