// Angular and 3rd party stuff
import { Component, ChangeDetectorRef, ApplicationRef, ViewContainerRef, } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

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
import { GetMonthRangeWithPaddingUsingMoment } from 'SPA/Core/Helpers/Functions/functions';


@Component({
    selector: 'factors-view',
    templateUrl: './factors-view.component.html',
    styleUrls: ['./factors-view.component.css'],
    host: { 'class': 'factors-view' },
})
export class FactorsViewComponent {
    // Fields
    private availableWindowPaddingInMonths = 0;
    private readonly viewModel: ViewModel = {
        AvailableDateRange: null,
        AvailablePlans: null,

        SelectedDateRange: null,
        NavigationLabel: null,

        Blocked: false
    };
    private readonly subscriptions: Subscription[] = [];
    private readonly appState: IReadOnlyApplicationState;

    // Private methods
    public getInitialSelectedDateRange(referenceDate: moment.Moment) {

        // Get the whole month of the referenceDate
        let range = new Range<moment.Moment>(referenceDate.clone().startOf('month').startOf('day'),
            referenceDate.clone().endOf('month').endOf('day'));
        return range;
    }
    public filterPlansByDateRange(planCLOs: CLOs.PlanCLO[], targetDateRange: Range<moment.Moment>): CLOs.PlanCLO[] {
        var filteredPlans: CLOs.PlanCLO[] = [];

        planCLOs.forEach((planCLO) => {
            var intersections = planCLO.GetIntersectionsPerVersionWithDateRange(targetDateRange);
            if (intersections !== null) {
                filteredPlans.push(planCLO);
            }
        });

        return filteredPlans;
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
        var initialSelectedDateRange = this.getInitialSelectedDateRange(moment());

        // Init Available (super) DataSet
        this.viewModel.AvailableDateRange = GetMonthRangeWithPaddingUsingMoment(initialSelectedDateRange.RangeStart, initialSelectedDateRange.RangeEnd, this.availableWindowPaddingInMonths);
        this.viewModel.AvailablePlans = this.filterPlansByDateRange(this.dataService.GetPlansFromBundle().ToArray(), initialSelectedDateRange);

        // Then init the SelectedDateRange and create the display representation
        this.viewModel.SelectedDateRange = initialSelectedDateRange;
    }
    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

}

interface ViewModel {
    AvailableDateRange: Range<moment.Moment>;
    AvailablePlans: CLOs.PlanCLO[];

    SelectedDateRange: Range<moment.Moment>;
    NavigationLabel: string;

    Blocked: boolean;
}