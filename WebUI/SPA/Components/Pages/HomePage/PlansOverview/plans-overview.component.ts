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
import { SpinnerService } from 'SPA/Core/Services/SpinnerService/spinner.service';
import { StopPlanDialogComponent } from 'SPA/Components/Pages/HomePage/PlansOverview/StopPlanDialog/stop-plan-dialog.component';


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
		// Explanation - this collection is necessary because we are not binding directly to the enum values, but to aggregates
		Active: 'Active',
		Inactive: 'Inactive',
		Upcoming: 'Upcoming'
	};
	private readonly viewModel: ViewModel = {
		AvailablePlans: null,
		FilteredPlans: null,
		SelectedViewMode: this.planStatusViewModes.Active,
	};

	// Private methods
	private openPlanEditor(title: string, saveButtonText: string, planCLO: CLOs.PlanCLO, mode: PlanEditorMode) {

		this.spinnerService.Show();
		this.dataService.GetMedicineTypes().then(medicineTypeCLOs => {

			this.spinnerService.Hide();
			this.modalDialogService.OpenDialog(this.viewContainerRef, {
				title: title,
				childComponent: PlanEditorComponent,
				data: {
					planCLO: planCLO,
					planEditorMode: mode,
					availableMedicineTypes: medicineTypeCLOs
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
								this.spinnerService.Show();

								let planEditorComponentInstance = childComponentInstance as PlanEditorComponent;
								planEditorComponentInstance.SaveData()
									.then((planCLO) => {

										this.reloadDataFromServer()
											.then(() => {
												this.refreshUI();
											});


										this.commandManager.InvokeCommandFlow('RefreshScheduleAndMedicineTypesOverviewFlow');

										setTimeout(() => {
											this.spinnerService.Hide();
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
						},
						buttonClass: 'ui-button-secondary'
					}
				]


			});
		});


	}
	private openStopPlanDialog(planCLO: CLOs.PlanCLO) {

		
			this.modalDialogService.OpenDialog(this.viewContainerRef, {
				title: 'Stop Plan',
				childComponent: StopPlanDialogComponent,
				data: {
					stopDate: moment().endOf('day').toDate(),
					planCLO: planCLO
				},
				actionButtons: [
					{
						isDisabledFunction: (childComponentInstance: any) => {
							let compInstance = childComponentInstance as StopPlanDialogComponent;
							return !compInstance.GetValidState();
						},
						text: 'Stop',
						buttonClass: 'ui-button-danger',
						onAction: (childComponentInstance: any) => {
							let promiseWrapper = new Promise<void>((resolve) => {
								this.spinnerService.Show();

								let compInstance = childComponentInstance as StopPlanDialogComponent;
								compInstance.SaveData()
									.then(() => {

										this.reloadDataFromServer()
											.then(() => {
												this.refreshUI();
											});

										this.commandManager.InvokeCommandFlow('RefreshScheduleAndMedicineTypesOverviewFlow');

										setTimeout(() => {
											this.spinnerService.Hide();
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
						},
						buttonClass: 'ui-button-secondary'
					}
				]


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
		private viewContainerRef: ViewContainerRef,
		private readonly spinnerService: SpinnerService

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
		let newPlanCLO = this.genericCLOFactory.CreateDefaultClo(CLOs.PlanCLO);
		this.openPlanEditor('Create a new Plan', 'Create', newPlanCLO, PlanEditorMode.CreateNew);
	}
	private onPlanActionTriggered(arr: any[]) {
		let planCLO: CLOs.PlanCLO = arr[0];
		let actionTypeID: PlanActionType = arr[1];
		let cloneOfPlanCLO = this.genericCLOFactory.CloneCLO(planCLO);

		switch (actionTypeID) {
			case PlanActionType.Adjust:
				this.openPlanEditor('Make changes to Plan', 'Confirm changes', cloneOfPlanCLO, PlanEditorMode.Adjust);
				break;

			case PlanActionType.HardEdit:
				this.openPlanEditor('Correct latest version', 'Save', cloneOfPlanCLO, PlanEditorMode.HardEdit);
				break;

			case PlanActionType.Restart:
				this.openPlanEditor('Restart Plan', 'Re-start', cloneOfPlanCLO, PlanEditorMode.Restart);
				break;

			case PlanActionType.Rename:
				alert('rename plan');
				break;
			case PlanActionType.Stop:
				this.openStopPlanDialog(planCLO);
				break;

			case PlanActionType.CreateNew:
				throw new Error('CreateNew is handled separately');
			default:
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
}

export enum PlanActionType {
	CreateNew,
	Adjust,
	HardEdit,
	Restart,
	Stop,
	Rename
}
