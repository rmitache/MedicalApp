// Angular and 3rd party stuff
import { Component, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { HomePageApplicationState, IReadOnlyApplicationState } from 'SPA/Components/Pages/HomePage/home-page-application-state';
import { HomePageDataService } from 'SPA/Components/Pages/HomePage/home-page-data.service';
import { ModalDialogService } from 'SPA/Core/Services/ModalDialogService/modal-dialog.service';
import { GenericCLOFactory } from 'SPA/DomainModel/generic-clo.factory';
import { CommandManager } from 'SPA/Core/Managers/CommandManager/command.manager';

// Components
import { SpinnerService } from 'SPA/Core/Services/SpinnerService/spinner.service';
import { StopPlanDialogService } from '../../../Shared/Popups/StopPlanDialog/stop-plan-dialog.service';
import { PlanEditorMode } from '../../../Shared/Popups/PlanEditorDialog/plan-editor-dialog.component';
import { PlanEditorDialogService } from '../../../Shared/Popups/PlanEditorDialog/plan-editor-dialog.service';
import { PlanVersionTooltipComponent, PlanElemHoverEventInfo } from '../../../Shared/Tooltips/PlanVersionTooltip/plan-version-tooltip.component';


@Component({
    selector: 'plans-overview',
    templateUrl: './plans-overview.component.html',
    styleUrls: ['./plans-overview.component.css'],
    host: { 'class': 'plans-overview' }
})
export class PlansOverviewComponent {
    // Fields
    private readonly subscriptions: Subscription[] = [];
    private readonly appState: IReadOnlyApplicationState;
    @ViewChild('planVersionTooltip')
    private planVersionTooltipInstance: PlanVersionTooltipComponent;
    private readonly noDataModes = NoDataModes;
    private infoTooltipText: string =
        `PLANS allow you to group and define different types of treatments. <br />
        You can change them as time goes by depending on your needs.
        `;

    private readonly planStatusViewModes = {
        // Explanation - this collection is necessary because we are not binding directly to the enum values, but to aggregates
        All: 'All',
        Active: 'Active',
        Inactive: 'Inactive',
        Upcoming: 'Upcoming'
    };
    private readonly viewModel: ViewModel = {
        AvailablePlans: null,
        FilteredPlans: null,
        SelectedViewMode: this.planStatusViewModes.Active,
        CurrentNoDataMode: null
    };

    // Private methods
    private openPlanEditor(planCLO: CLOs.PlanCLO, mode: PlanEditorMode) {

        this.planEditorDialogService.Open(planCLO, mode, this.viewContainerRef, () => {

            this.reloadDataFromServer()
                .then(() => {
                    this.refreshUI();
                });

            this.commandManager.InvokeCommandFlow('RefreshScheduleAndMedicineTypesOverviewFlow');
            this.commandManager.InvokeCommandFlow('RefreshRemindersFlow');

            setTimeout(() => {
                this.spinnerService.Hide();
            }, 200);
        });

    }
    private openStopPlanDialog(planCLO: CLOs.PlanCLO) {

        this.stopPlanDialogService.Open(planCLO, this.viewContainerRef, () => {
            this.reloadDataFromServer()
                .then(() => {
                    this.refreshUI();
                });

            this.commandManager.InvokeCommandFlow('RefreshScheduleAndMedicineTypesOverviewFlow');

            setTimeout(() => {
                this.spinnerService.Hide();
            }, 200);
        });


    }
    private reloadDataFromServer(): Promise<void> {
        let promise = this.dataService.GetPlans()
            .then(planCLOs => {
                this.viewModel.AvailablePlans = planCLOs;
            });
        return promise;
    }
    private filterPlans(plans: CLOs.PlanCLO[], planStatusViewMode: any) {

        let filteredPlans = this.viewModel.AvailablePlans.filter(plan => {
            let statusVal = plan.Status as number;

            // All
            if (planStatusViewMode === this.planStatusViewModes.All) {
                return true;
            }


            // Active 
            if (planStatusViewMode === this.planStatusViewModes.Active) {
                return (statusVal === Enums.PlanStatus.Active);
            }


            // Inactive
            if (planStatusViewMode === this.planStatusViewModes.Inactive) {
                return (statusVal === Enums.PlanStatus.Inactive);
            }

            // Upcoming
            if (planStatusViewMode === this.planStatusViewModes.Upcoming) {
                return (statusVal === Enums.PlanStatus.Upcoming);
            }

            return null;
        });
        return filteredPlans;
    }
    private updatePlan(planCLO: CLOs.PlanCLO, refreshFromServer: boolean = true) {
        if (refreshFromServer) {
            this.spinnerService.Show();
        }


        this.dataService.UpdatePlan(planCLO)
            .then(() => {
                if (refreshFromServer) {
                    this.reloadDataFromServer()
                        .then(() => {
                            this.refreshUI();
                        });

                    this.commandManager.InvokeCommandFlow('RefreshScheduleAndMedicineTypesOverviewFlow');

                    setTimeout(() => {
                        this.spinnerService.Hide();
                    }, 200);
                }

            });
    }
    private triggerPlanAction(targetExistingPlanCLO: CLOs.PlanCLO, actionType: PlanActionType) {


        switch (actionType) {
            // CreateNew
            case PlanActionType.CreateNew:
                let newPlanCLO = this.genericCLOFactory.CreateDefaultClo(CLOs.PlanCLO);
                this.openPlanEditor(newPlanCLO, PlanEditorMode.CreateNew);
                break;


            // Change
            case PlanActionType.Change:
                var cloneOfPlanCLO = this.genericCLOFactory.CloneCLO(targetExistingPlanCLO);
                this.openPlanEditor(cloneOfPlanCLO, PlanEditorMode.Change);
                break;


            // EditUpcomingChanges
            case PlanActionType.EditUpcomingChanges:
                var cloneOfPlanCLO = this.genericCLOFactory.CloneCLO(targetExistingPlanCLO);
                this.openPlanEditor(cloneOfPlanCLO, PlanEditorMode.EditUpcomingChanges);
                break;


            // CancelUpcomingChanges
            case PlanActionType.CancelUpcomingChanges:
                var cloneOfPlanCLO = this.genericCLOFactory.CloneCLO(targetExistingPlanCLO);
                cloneOfPlanCLO.GetLatestVersion().ToBeDeleted = true; // mark for deletion
                cloneOfPlanCLO.GetSecondLatestVersion().EndDateTime = null;
                this.updatePlan(cloneOfPlanCLO);
                break;


            // EditTodaysChanges
            case PlanActionType.EditTodaysChanges:
                var cloneOfPlanCLO = this.genericCLOFactory.CloneCLO(targetExistingPlanCLO);
                this.openPlanEditor(cloneOfPlanCLO, PlanEditorMode.EditTodaysChanges);
                break;

            // CancelTodaysChanges
            case PlanActionType.CancelTodaysChanges:
                var cloneOfPlanCLO = this.genericCLOFactory.CloneCLO(targetExistingPlanCLO);
                cloneOfPlanCLO.GetLatestVersion().ToBeDeleted = true; // mark for deletion
                cloneOfPlanCLO.GetSecondLatestVersion().EndDateTime = null;
                this.updatePlan(cloneOfPlanCLO);
                break;

            // EditPlanStartedToday
            case PlanActionType.EditPlanStartedToday:
                var cloneOfPlanCLO = this.genericCLOFactory.CloneCLO(targetExistingPlanCLO);
                this.openPlanEditor(cloneOfPlanCLO, PlanEditorMode.EditPlanStartedToday);
                break;

            // EditPlanRestartedToday
            case PlanActionType.EditPlanRestartedToday:
                var cloneOfPlanCLO = this.genericCLOFactory.CloneCLO(targetExistingPlanCLO);
                this.openPlanEditor(cloneOfPlanCLO, PlanEditorMode.EditPlanStartedToday);
                break;

            // Restart
            case PlanActionType.Restart:
                var cloneOfPlanCLO = this.genericCLOFactory.CloneCLO(targetExistingPlanCLO);
                this.openPlanEditor(cloneOfPlanCLO, PlanEditorMode.Restart);
                break;


            // CancelRestart
            case PlanActionType.CancelRestart:
            case PlanActionType.CancelPlanRestartedToday:
                var cloneOfPlanCLO = this.genericCLOFactory.CloneCLO(targetExistingPlanCLO);
                cloneOfPlanCLO.GetLatestVersion().ToBeDeleted = true; // mark for deletion
                this.updatePlan(cloneOfPlanCLO);
                break;


            // Stop 
            case PlanActionType.Stop:
                this.openStopPlanDialog(targetExistingPlanCLO);
                break;


            // CancelStop 
            case PlanActionType.CancelStop:
                var cloneOfPlanCLO = this.genericCLOFactory.CloneCLO(targetExistingPlanCLO);
                cloneOfPlanCLO.GetLatestVersion().EndDateTime = null;
                this.updatePlan(cloneOfPlanCLO);
                break;


            // Rename
            case PlanActionType.Rename:
                alert('rename plan');
                break;


            default:
                throw new Error('Action not recognized');
        }
    }
    private refreshUI() {
        this.viewModel.FilteredPlans = this.filterPlans(this.viewModel.AvailablePlans, this.viewModel.SelectedViewMode);

        // NoData logic
        if (this.viewModel.AvailablePlans.length === 0) {
            this.viewModel.CurrentNoDataMode = NoDataModes.NoAvailablePlans;
        } else if (this.viewModel.SelectedViewMode === this.planStatusViewModes.Active && this.viewModel.FilteredPlans.length === 0) {
            this.viewModel.CurrentNoDataMode = NoDataModes.NoActivePlans;
        } else if (this.viewModel.SelectedViewMode === this.planStatusViewModes.Inactive && this.viewModel.FilteredPlans.length === 0) {
            this.viewModel.CurrentNoDataMode = NoDataModes.NoInactivePlans;
        } else if (this.viewModel.SelectedViewMode === this.planStatusViewModes.Upcoming && this.viewModel.FilteredPlans.length === 0) {
            this.viewModel.CurrentNoDataMode = NoDataModes.NoUpcomingPlans;
        } else {
            this.viewModel.CurrentNoDataMode = null;
        }
    }


    // Constructor 
    constructor(
        applicationState: HomePageApplicationState,
        private readonly commandManager: CommandManager,
        private readonly genericCLOFactory: GenericCLOFactory,
        private readonly dataService: HomePageDataService,
        private readonly modalDialogService: ModalDialogService,
        private viewContainerRef: ViewContainerRef,
        private readonly spinnerService: SpinnerService,
        private readonly stopPlanDialogService: StopPlanDialogService,
        private readonly planEditorDialogService: PlanEditorDialogService

    ) {
        this.appState = applicationState as IReadOnlyApplicationState;

        // Register self to CommandManager
        this.commandManager.RegisterComponentInstance(this);

    }
    ngOnInit() {
        // Init ViewModel properties
        this.viewModel.AvailablePlans = this.dataService.GetPlansFromBundle().ToArray();

        this.refreshUI();
    }
    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    // Event handlers
    private onAddNewPlanTriggered() {

        this.triggerPlanAction(null, PlanActionType.CreateNew);

    }
    private onPlanActionTriggered(arr: any[]) {
        let planCLO: CLOs.PlanCLO = arr[0];
        let actionTypeID: PlanActionType = arr[1];

        this.triggerPlanAction(planCLO, actionTypeID);
    }
    private onSelectedViewModeChanged(event) {
        const newVal = event.target.value;
        this.viewModel.SelectedViewMode = newVal;

        this.refreshUI();
    }
    private onPlanStatusElemMouseEnter(hoverEvent: PlanElemHoverEventInfo) {
        this.planVersionTooltipInstance.Show(hoverEvent);
    }
    private onPlanStatusElemMouseLeave() {
        this.planVersionTooltipInstance.HideAndClear();
    }
}
interface ViewModel {
    AvailablePlans: CLOs.PlanCLO[];
    FilteredPlans: CLOs.PlanCLO[];
    SelectedViewMode: any;
    CurrentNoDataMode: NoDataModes;
}

export enum PlanActionType {
    CreateNew = 0,

    Change = 1,

    EditUpcomingChanges = 2, // hard edit
    CancelUpcomingChanges = 3,

    EditTodaysChanges = 4,  // hard edit
    CancelTodaysChanges = 5,

    EditPlanStartedToday = 6, // hard edit
    EditPlanRestartedToday = 7, // hard edit
    CancelPlanRestartedToday = 9,

    Restart = 9,
    CancelRestart = 10,

    Stop = 11,
    CancelStop = 12,

    Rename = 13
}

enum NoDataModes {
    NoAvailablePlans = 0,
    NoActivePlans = 1,
    NoInactivePlans = 2,
    NoUpcomingPlans = 3
}