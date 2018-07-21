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
    };// Explanation - this collection is necessary because we are not binding directly to the enum values, but to aggregates
    private readonly viewModel: ViewModel = {
        AvailablePlans: null,
        FilteredPlans: null,
        SelectedViewMode: this.planStatusViewModes.Active,
        Blocked: false
    };

    // Private methods
    private openPlanEditor(title: string, saveButtonText: string, planCLO: CLOs.PlanCLO, mode: PlanEditorMode) {
        this.modalDialogService.OpenDialog(this.viewContainerRef, {
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
                                    this.refreshUI();

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
    private filterPlans(plans: CLOs.PlanCLO[], planStatusViewMode: any) {

        let filteredPlans = this.viewModel.AvailablePlans.filter(plan => {
            let numericVal = plan.Status as number;
            if (planStatusViewMode === this.planStatusViewModes.Active) {
                return (numericVal === Enums.PlanStatus.Active) || (numericVal === Enums.PlanStatus.ActiveWithUpcomingAdjustment);
            }
            if (planStatusViewMode === this.planStatusViewModes.Inactive) {
                return (numericVal === Enums.PlanStatus.Inactive);
            }
            if (planStatusViewMode === this.planStatusViewModes.Upcoming) {
                return (numericVal === Enums.PlanStatus.UpcomingAsNew) || (numericVal === Enums.PlanStatus.UpcomingAsRestarted);
            }

            return null;
        });

        return filteredPlans;
    }
    private refreshUI() {
        this.viewModel.FilteredPlans = this.filterPlans(this.viewModel.AvailablePlans, this.viewModel.SelectedViewMode);
    }

    // Constructor 
    constructor(
        applicationState: HomePageApplicationState,
        private readonly commandManager: CommandManager,
        private readonly genericCLOFactory: GenericCLOFactory,
        private readonly dataService: HomePageDataService,
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

        //
        this.refreshUI();
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
    private onSelectedViewModeChanged(event) {
        const newVal = event.target.value;
        this.viewModel.SelectedViewMode = newVal;
        
        this.refreshUI();
    }
}
interface ViewModel {
    AvailablePlans: CLOs.PlanCLO[];
    FilteredPlans: CLOs.PlanCLO[];
    SelectedViewMode: any;
    Blocked: boolean;
}

export enum PlanActionType {
    CreateNew,
    Adjust,
    HardEdit,
    Restart
}
