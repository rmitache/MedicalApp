// Angular and 3rd party stuff
import { Component, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { GlobalApplicationState, IReadOnlyApplicationState } from 'SPA/Components/Pages/HomePage/global-application-state';
import { GlobalDataService } from 'SPA/Components/Pages/HomePage/global-data.service';
import { ModalDialogService } from 'SPA/Core/Services/ModalDialogService/modal-dialog.service';
import { GenericCLOFactory } from 'SPA/DomainModel/generic-clo.factory';
import { CommandManager } from 'SPA/Core/Managers/CommandManager/command.manager';

// Components
import { PlanEditorComponent, PlanEditorMode } from './PlanEditor/plan-editor.component';


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
    private readonly planStatusViewModes = {
        Active: 'Active',
        Inactive: 'Inactive',
        Upcoming: 'Upcoming'
    };
    private readonly viewModel: ViewModel = {
        AvailablePlans: null,
        GetFilteredPlans: () => {
            return this.viewModel.AvailablePlans.filter(plan => {

                if (this.viewModel.SelectedPlanStatusViewMode === this.planStatusViewModes.Active) {
                    return plan.Status as number === Enums.PlanStatus.Active || plan.Status as number === Enums.PlanStatus.ActiveWithUpcomingAdjustment;
                }
                if (this.viewModel.SelectedPlanStatusViewMode === this.planStatusViewModes.Inactive) {
                    return plan.Status as number === Enums.PlanStatus.Inactive;
                }
                if (this.viewModel.SelectedPlanStatusViewMode === this.planStatusViewModes.Upcoming) {
                    return plan.Status as number === Enums.PlanStatus.UpcomingAsNew || plan.Status as number === Enums.PlanStatus.UpcomingAsRestarted;
                }

                return null;
            });
        },
        SelectedPlanStatusViewMode: this.planStatusViewModes.Active,
        Blocked: false
    };

    // Private methods
    private openPlanEditor(title: string, saveButtonText: string, planCLO: CLOs.PlanCLO, mode: PlanEditorMode) {
        this.modalDialogService.openDialog(this.viewContainerRef, {
            title: title,
            childComponent: PlanEditorComponent,
            data: {
                planCLO: planCLO,
                planEditorMode: mode
            },
            actionButtons: [
                {
                    isDisabledFunction: (childComponentInstance: any) => {
                        let planEditorInstance = childComponentInstance as PlanEditorComponent;
                        return !planEditorInstance.GetValidState();
                    },
                    text: saveButtonText,
                    onAction: (childComponentInstance: any) => {
                        let promiseWrapper = new Promise<void>((resolve) => {
                            this.viewModel.Blocked = true;

                            let planEditorComponentInstance = childComponentInstance as PlanEditorComponent;
                            planEditorComponentInstance.SaveData()
                                .then((planCLO) => {

                                    this.reloadPlansFromServer();
                                    this.commandManager.InvokeCommandFlow('RefreshScheduleFlow');

                                    setTimeout(() => {
                                        this.viewModel.Blocked = false;
                                        resolve();
                                    }, 200);

                                });
                        });
                        return promiseWrapper;
                    }
                },
                {
                    isDisabledFunction: (childComponentInstance: any) => {
                        return false;
                    },
                    text: 'Cancel',
                    onAction: () => {
                        return true;
                    }
                }
            ]


        });

    }
    private reloadPlansFromServer(): Promise<void> {
        let promise = this.dataService.GetPlans()
            .then(planCLOs => {
                this.viewModel.AvailablePlans = planCLOs;
            });
        return promise;
    }

    // Constructor 
    constructor(
        applicationState: GlobalApplicationState,
        private readonly commandManager: CommandManager,
        private readonly genericCLOFactory: GenericCLOFactory,
        private readonly dataService: GlobalDataService,
        private readonly modalDialogService: ModalDialogService,
        private viewContainerRef: ViewContainerRef
    ) {
        this.appState = applicationState as IReadOnlyApplicationState;

        // Register self to CommandManager
        this.commandManager.RegisterComponentInstance(this);

    }
    ngOnInit() {
        // Init ViewModel properties
        this.viewModel.AvailablePlans = this.dataService.GetPlansFromBundle().ToArray();
    }
    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    // Event handlers
    private onAddNewPlanTriggered() {
        let newPlanCLO = this.genericCLOFactory.CreateDefaultClo(CLOs.PlanCLO);
        this.openPlanEditor('Create a new Plan', 'Create', newPlanCLO, PlanEditorMode.CreateNew);
    }
    private onPlanActionTriggered(arr: any[]) {
        let planCLO: CLOs.PlanCLO = arr[0];
        let actionTypeID: PlanActionType = arr[1];
        let cloneOfPlanCLO = this.genericCLOFactory.CloneCLO(planCLO);

        if (actionTypeID === PlanActionType.Adjust) {
            // Adjust
            this.openPlanEditor('Adjust Plan', 'Confirm adjustment', cloneOfPlanCLO, PlanEditorMode.Adjust);
        } else if (actionTypeID === PlanActionType.HardEdit) {
            // HardEdit
            this.openPlanEditor('Hard modify version', 'Save changes', cloneOfPlanCLO, PlanEditorMode.HardEdit);
        } else if (actionTypeID === PlanActionType.Restart) {
            // Restart
            this.openPlanEditor('Restart plan', 'Re-start', cloneOfPlanCLO, PlanEditorMode.Restart);
        } else {
            throw new Error('Action not recognized');
        }
    }

}
interface ViewModel {
    AvailablePlans: CLOs.PlanCLO[];
    GetFilteredPlans();
    SelectedPlanStatusViewMode: any;
    Blocked: boolean;
}

export enum PlanActionType {
    CreateNew,
    Adjust,
    HardEdit,
    Restart
}
