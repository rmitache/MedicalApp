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
import * as CLOs from 'SPA/DomainModel/clo-exports';

// Components
import { ExternalHistoryPageApplicationState, IReadOnlyApplicationState } from 'SPA/Components/Pages/ExternalHistoryPage/external-history-page-application-state';
import { ExternalHistoryPageDataService } from 'SPA/Components/Pages/ExternalHistoryPage/external-history-page-data.service';
import { GetMonthRangeWithPaddingUsingMoment, GetDateIndexInTargetRange, GetNrOfDaysBetweenDatesUsingMoment, IsDateOnFirstOrLastDateInMonth } from 'SPA/Core/Helpers/Functions/functions';
import { VersionElemHoverEventInfo } from 'SPA/Components/Pages/ExternalHistoryPage/FactorsView/PlanElem/VersionElem/version-elem.component';
import { NavigationPanelComponent } from 'SPA/Components/Shared/NavigationPanel/navigation-panel.component';
import { DateRangeMode } from 'SPA/Core/Helpers/Enums/enums';
import { GenericCLOFactory } from 'SPA/DomainModel/generic-clo.factory';
import { SpinnerService } from 'SPA/Core/Services/SpinnerService/spinner.service';
import { PlanVersionChangesTooltipComponent } from '../../../Shared/Tooltips/PlanVersionChangesTooltip/plan-version-changes-tooltip.component';
import { TimelineComponent } from 'SPA/Components/Shared/Timeline/timeline.component';


@Component({
    selector: 'factors-view',
    templateUrl: './factors-view.component.html',
    styleUrls: ['./factors-view.component.css'],
    host: { 'class': 'factors-view' },
})
export class FactorsViewComponent {
    // Fields
    @ViewChild('versionTooltip')
    private versionTooltipInstance: PlanVersionChangesTooltipComponent;   
    @ViewChild('timeline')
    private timelineInstance: TimelineComponent;
    private infoTooltipText: string =
        `Here you can see which FACTORS have potentially influenced your HEALTH. <br />
        You can see which changes you've made to your treatment Plans over time. If you hover over the small black circles you can 
        see what was changed.  <br />
        You can also show/hide Plans on the right side.`;

    private readonly viewModel: ViewModel = {
        AvailablePlans: null,

        SelectedDateRange: null,
        PlansInSelectedDateRange: null,
        SelectedPlans: null,

        TodayXPosition: null,
        //DateRangeDisplayMode: DateRangeMode.ThreeMonths,
    };
    private readonly subscriptions: Subscription[] = [];
    private readonly appState: IReadOnlyApplicationState;

    // Private methods
    private filterPlansByDateRange(availablePlanCLOs: CLOs.PlanCLO[], targetDateRange: Range<moment.Moment>): CLOs.PlanCLO[] {
        var planCLOs = this.genericCLOFactory.CloneCLOArray(availablePlanCLOs); // need to clone them, otherwise they get manipulated by PlanElem and VersionElem logic and broken

        var filteredPlans: CLOs.PlanCLO[] = [];
        
        planCLOs.forEach((planCLO) => {
            if (planCLO !== null) {
                var intersections = planCLO.GetIntersectionsPerVersionWithDateRange(targetDateRange);
                if (intersections !== null) {
                    filteredPlans.push(planCLO);
                }
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
        this.viewModel.PlansInSelectedDateRange = this.filterPlansByDateRange(this.viewModel.SelectedPlans, this.viewModel.SelectedDateRange);
		this.viewModel.TodayXPosition = this.computeXPositionFromDate(moment());
        
    }

    // Constructor
    constructor(
        applicationState: ExternalHistoryPageApplicationState,
        private readonly dataService: ExternalHistoryPageDataService,
        private readonly commandManager: CommandManager,
		private readonly genericCLOFactory: GenericCLOFactory

    ) {
        this.appState = applicationState as IReadOnlyApplicationState;
        
        // Subscriptions to AppState
        this.subscriptions.push(this.appState.SelectedDateRange.Changed.subscribe((newValue) => {
            this.viewModel.SelectedDateRange = newValue;
            this.refreshUI();

            this.timelineInstance.SetSelectedDateRange(newValue);
        }));

        // Register self to CommandManager
        this.commandManager.RegisterComponentInstance(this);
    }
    ngOnInit() {
        // Initialize plans
        this.viewModel.AvailablePlans = this.dataService.GetPlansFromBundle().ToArray();
        this.viewModel.SelectedPlans = this.viewModel.AvailablePlans.slice(); // everything starts selected
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
    private onPlanSelected(plan: CLOs.PlanCLO) {
        let indexInAvailablePlansArray = this.viewModel.AvailablePlans.findIndex((planCLO) => {
            return planCLO.ID === plan.ID;
        });
        this.viewModel.SelectedPlans[indexInAvailablePlansArray] = plan;
        this.refreshUI();
    }
    private onPlanDeselected(plan: CLOs.PlanCLO) {
        let indexInSelectedPlansArray = this.viewModel.SelectedPlans.findIndex((planCLO) => {
            if (planCLO !== null) {
                return planCLO.ID === plan.ID;
            } else {
                return false;
            }
        });
        this.viewModel.SelectedPlans[indexInSelectedPlansArray] = null;
        this.refreshUI();
    }

}
interface ViewModel {
    AvailablePlans: CLOs.PlanCLO[];

    SelectedDateRange: Range<moment.Moment>;
    PlansInSelectedDateRange: CLOs.PlanCLO[];
    SelectedPlans: CLOs.PlanCLO[];

    TodayXPosition: number;
    //DateRangeDisplayMode: DateRangeMode;
}
