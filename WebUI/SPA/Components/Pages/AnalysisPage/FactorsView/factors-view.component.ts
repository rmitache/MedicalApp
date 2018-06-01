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
import { GetMonthRangeWithPaddingUsingMoment, GetDateIndexInTargetRange, GetNrOfDaysBetweenDatesUsingMoment } from 'SPA/Core/Helpers/Functions/functions';
import { VersionElemHoverEventInfo } from 'SPA/Components/Pages/AnalysisPage/FactorsView/PlanElem/VersionElem/version-elem.component';
import { VersionTooltipComponent } from 'SPA/Components/Pages/AnalysisPage/FactorsView/VersionTooltip/version-tooltip.component';


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
    private readonly viewModel: ViewModel = {
        AvailableDateRange: null,
        AvailablePlans: null,

        SelectedDateRange: null,
        NavigationLabel: null,
        TodayXPosition:null,

        SelectedViewMode: FactorsViewDisplayMode.Month,
        Blocked: false
    };
    private readonly subscriptions: Subscription[] = [];
    private readonly appState: IReadOnlyApplicationState;

    // Private methods
    private getCurrentDisplayModeInstance(): IDisplayMode {
        // Get Current Mode strategy
        let currentStrategy: IDisplayMode = null;
        if (this.viewModel.SelectedViewMode === FactorsViewDisplayMode.Month) {
            currentStrategy = new MonthDisplayMode();
        } else {
            // OBS -> Not implemented yet
            throw new Error('FactorsViewDisplayMode not implemented yet');
        }
        return currentStrategy;
    }
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

        // Check if in range
        var selDateRange = new momentRange.DateRange(this.viewModel.SelectedDateRange.RangeStart, this.viewModel.SelectedDateRange.RangeEnd);
        if (!selDateRange.contains(date)) {
            return null;
        }

        // Variables
        var startDateIndex = GetDateIndexInTargetRange(date, this.viewModel.SelectedDateRange);
        var nrOfDaysInSelectedDateRange = GetNrOfDaysBetweenDatesUsingMoment(this.viewModel.SelectedDateRange.RangeStart, this.viewModel.SelectedDateRange.RangeEnd, true);
        var widthBetweenDates = 100 / (nrOfDaysInSelectedDateRange - 1);

        // Compute the width
        let xPosition = (startDateIndex) * widthBetweenDates;
        return xPosition;
    }
    private recreateDisplayRepresentation() {

        let currentDisplayMode = this.getCurrentDisplayModeInstance();
        this.viewModel.NavigationLabel = currentDisplayMode.GetNavigationLabel(this.viewModel.SelectedDateRange);
        this.viewModel.AvailablePlans = this.filterPlansByDateRange(this.dataService.GetPlansFromBundle().ToArray(), this.viewModel.SelectedDateRange);
        this.viewModel.TodayXPosition = this.computeXPositionFromDate(moment());
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

        // Register self to CommandManager
        this.commandManager.RegisterComponentInstance(this);
    }
    ngOnInit() {

        // Get the initial range from the current DisplayMode
        var initialSelectedDateRange = this.getCurrentDisplayModeInstance().GetInitialSelectedDateRange(moment());

        // Init Available (super) DataSet
        this.viewModel.AvailablePlans = this.filterPlansByDateRange(this.dataService.GetPlansFromBundle().ToArray(), initialSelectedDateRange);
        this.viewModel.SelectedDateRange = initialSelectedDateRange;

        this.recreateDisplayRepresentation();
    }
    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    // Event handlers
    private onVersionElemHover(eventInfo: VersionElemHoverEventInfo) {
        
        if (eventInfo) {
            this.versionTooltipInstance.SetDataAndPosition(eventInfo);
        } else {
            this.versionTooltipInstance.HideAndClear();
        }
    }
    private onNavigateBackwardTriggered() {
        let prevSelectedDateRange = this.getCurrentDisplayModeInstance().GetPreviousSelectedDateRange(this.viewModel.SelectedDateRange);

        this.viewModel.SelectedDateRange = prevSelectedDateRange;
        this.recreateDisplayRepresentation();
    }
    private onNavigateForwardTriggered() {
        let nextSelectedDateRange = this.getCurrentDisplayModeInstance().GetNextSelectedDateRange(this.viewModel.SelectedDateRange);

        this.viewModel.SelectedDateRange = nextSelectedDateRange;
        this.recreateDisplayRepresentation();
    }
}

interface ViewModel {
    AvailableDateRange: Range<moment.Moment>;
    AvailablePlans: CLOs.PlanCLO[];

    SelectedDateRange: Range<moment.Moment>;
    NavigationLabel: string;
    TodayXPosition: number;

    SelectedViewMode: FactorsViewDisplayMode;
    Blocked: boolean;
}
enum FactorsViewDisplayMode {
    Month
}
interface IDisplayMode {
    GetInitialSelectedDateRange(referenceDate: moment.Moment): Range<moment.Moment>;
    GetNextSelectedDateRange(currentSelDateRange: Range<moment.Moment>): Range<moment.Moment>;
    GetPreviousSelectedDateRange(currentSelDateRange: Range<moment.Moment>): Range<moment.Moment>;
    GetNavigationLabel(currentSelDateRange: Range<moment.Moment>): string;
}
class MonthDisplayMode implements IDisplayMode {


    // Public methods
    public GetInitialSelectedDateRange(referenceDate: moment.Moment) {

        // Get the month of the referenceDate as an initial range
        let range = new Range<moment.Moment>(referenceDate.clone().startOf('month').startOf('day'),
            referenceDate.clone().endOf('month').endOf('day'));
        return range;
    }
    public GetNextSelectedDateRange(currentSelDateRange: Range<moment.Moment>): Range<moment.Moment> {
        let range = new Range<moment.Moment>(currentSelDateRange.RangeStart.clone().add(1, 'months').startOf('month').startOf('day'),
            currentSelDateRange.RangeEnd.clone().add(1, 'months').endOf('month').endOf('day'));
        return range;
    }
    public GetPreviousSelectedDateRange(currentSelDateRange: Range<moment.Moment>): Range<moment.Moment> {

        let range = new Range<moment.Moment>(currentSelDateRange.RangeStart.clone().subtract(1, 'months').startOf('month').startOf('day'),
            currentSelDateRange.RangeEnd.clone().subtract(1, 'months').endOf('month').endOf('day'));
        return range;
    }
    public GetNavigationLabel(currentSelDateRange: Range<moment.Moment>) {
        // Range must be within same month
        if (currentSelDateRange.RangeStart.month() !== currentSelDateRange.RangeEnd.month()) {
            throw new Error('Range must be within same month');
        }

        return currentSelDateRange.RangeStart.format('MMMM, YYYY');
    }

};