// Angular and 3rd party stuff
import { Component, ChangeDetectorRef, ApplicationRef, ViewChild, } from '@angular/core';
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

// Components
import { AnalysisPageApplicationState, IReadOnlyApplicationState } from 'SPA/Components/Pages/AnalysisPage/analysis-page-application-state';
import { AnalysisPageDataService } from 'SPA/Components/Pages/AnalysisPage/analysis-page-data.service';
import { GetMonthRangeWithPaddingUsingMoment, GetDateIndexInTargetRange, GetNrOfDaysBetweenDatesUsingMoment, IsDateOnFirstOrLastDateInMonth } from 'SPA/Core/Helpers/Functions/functions';
import { VersionElemHoverEventInfo } from 'SPA/Components/Pages/AnalysisPage/FactorsView/PlanElem/VersionElem/version-elem.component';
import { VersionTooltipComponent } from 'SPA/Components/Pages/AnalysisPage/FactorsView/VersionTooltip/version-tooltip.component';
import { NavigationPanelComponent } from 'SPA/Components/Shared/NavigationPanel/navigation-panel.component';
import { DateRangeMode } from 'SPA/Core/Helpers/Enums/enums';
import { TimelineComponent } from 'SPA/Components/Pages/AnalysisPage/FactorsView/Timeline/timeline.component';
import { FiltersPanelComponent } from 'SPA/Components/Pages/AnalysisPage/FactorsView/FiltersPanel/filters-panel.component';
import { GenericCLOFactory } from 'SPA/DomainModel/generic-clo.factory';


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
    @ViewChild('timeline')
    private timelineInstance: TimelineComponent;
    @ViewChild('filtersPanel')
    private filtersPanelInstance: FiltersPanelComponent;
    private readonly viewModel: ViewModel = {
        AvailablePlans: null,

        SelectedDateRange: null,
        PlansInSelectedDateRange: null,
        SelectedPlans: null,

        TodayXPosition: null,
        DateRangeDisplayMode: DateRangeMode.Month,
        Blocked: false
    };
    private readonly subscriptions: Subscription[] = [];
    private readonly appState: IReadOnlyApplicationState;

    // Private methods
    private filterPlansByDateRange(availablePlanCLOs: CLOs.PlanCLO[], targetDateRange: Range<moment.Moment>): CLOs.PlanCLO[] {
        var planCLOs = this.genericCLOFactory.CloneCLOArray(availablePlanCLOs); // need to clone them, otherwise they get manipulated by PlanElem and VersionElem logic and broken

        var filteredPlans: CLOs.PlanCLO[] = [];

        planCLOs.forEach((planCLO) => {
            var intersections = planCLO.GetIntersectionsPerVersionWithDateRange(targetDateRange);
            if (intersections !== null) {
                filteredPlans.push(planCLO);
            }
        });

        return planCLOs;
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
        this.viewModel.PlansInSelectedDateRange = this.filterPlansByDateRange(this.viewModel.AvailablePlans, this.viewModel.SelectedDateRange);
        this.viewModel.TodayXPosition = !IsDateOnFirstOrLastDateInMonth(moment()) ? this.computeXPositionFromDate(moment()) : null;

        // Refresh children components
        this.timelineInstance.SetSelectedDateRange(this.viewModel.SelectedDateRange);
        this.navPanelInstance.SetSelectedDateRange(this.viewModel.SelectedDateRange);
    }

    // Constructor
    constructor(
        applicationState: AnalysisPageApplicationState,
        private readonly dataService: AnalysisPageDataService,
        private readonly commandManager: CommandManager,
        private readonly genericCLOFactory: GenericCLOFactory
    ) {
        this.appState = applicationState as IReadOnlyApplicationState;

        // Subscriptions to AppState
        this.subscriptions.push(this.appState.SelectedDateRange.Changed.subscribe((newValue) => {
            this.viewModel.SelectedDateRange = newValue;
            this.refreshUI();
        }));

        // Register self to CommandManager
        this.commandManager.RegisterComponentInstance(this);
    }
    ngOnInit() {
        // Initialize
        this.viewModel.AvailablePlans = this.dataService.GetPlansFromBundle().ToArray();
        var initialSelectedDateRange = this.navPanelInstance.InitAndGetSelDateRange(this.viewModel.DateRangeDisplayMode, moment());
        this.viewModel.SelectedDateRange = initialSelectedDateRange;
        var selectedPlans = this.filtersPanelInstance.InitAndGetSelPlanCLOs(this.viewModel.AvailablePlans);
        this.viewModel.SelectedPlans = selectedPlans;

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
    private onSelectedDateRangeChangeTriggered(newSelDateRange: Range<moment.Moment>) {
        this.commandManager.InvokeCommandFlow('ChangeSelectedDateRangeFlow', [newSelDateRange]);
    }

}
interface ViewModel {
    AvailablePlans: CLOs.PlanCLO[];

    SelectedDateRange: Range<moment.Moment>;
    PlansInSelectedDateRange: CLOs.PlanCLO[];
    SelectedPlans: CLOs.PlanCLO[];

    TodayXPosition: number;
    DateRangeDisplayMode: DateRangeMode;
    Blocked: boolean;
}
