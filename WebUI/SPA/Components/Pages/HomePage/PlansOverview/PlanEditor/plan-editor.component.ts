// Angular and 3rd party stuff
import { Component, Input, EventEmitter, Output, ComponentRef, ViewChildren, QueryList, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators, ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';
import { Calendar } from 'primeng/primeng';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { GenericCLOFactory } from 'SPA/DomainModel/generic-clo.factory';
import { Time } from 'SPA/Core/Helpers/DataStructures/misc';
import * as DataStructures from 'SPA/Core/Helpers/DataStructures/data-structures';
import { IModalDialog, IModalDialogOptions } from 'SPA/Core/Services/ModalDialogService/modal-dialog.interface';
import { HomePageDataService } from 'SPA/Components/Pages/HomePage/home-page-data.service';
import { List } from 'SPA/Core/Helpers/DataStructures/list';

// Components
import { RuleElemComponent } from './RuleElem/rule-elem.component';


@Component({
	selector: 'plan-editor',
	templateUrl: './plan-editor.component.html',
	styleUrls: ['./plan-editor.component.css'],
	host: { 'class': 'plan-editor' }
})
export class PlanEditorComponent implements IModalDialog {
	// Fields
	@ViewChildren('ruleelems')
	private ruleElems: QueryList<RuleElemComponent>;
	private isValid: boolean = false;
	private currentModeInstance: IPlanEditorModeImplementation = null;
	private reactiveForm: FormGroup;
	private readonly dialogInitParameters = {
		planCLO: null,
		editorMode: null
	};
	private readonly viewModel: ViewModel = {
		PlanCLO: null,
		CurrentVersionCLO: null,

		InfoMessage: null,
		StartDateLabel: null,
		EndDateLabel: null
	};

	// Private methods
	private checkIfRuleElemsValid(): boolean {
		let allRuleElemsAreValid = true;
		if (!this.ruleElems) {
			return false;
		}

		for (var i = 0; i < this.ruleElems.toArray().length; i++) {
			let elem = this.ruleElems.toArray()[i];

			if (!elem.GetValidState()) {
				allRuleElemsAreValid = false;
				break;
			}
		}

		if (this.viewModel.CurrentVersionCLO.Rules.length === 0) {
			allRuleElemsAreValid = false;
		}

		return allRuleElemsAreValid;
	}
	private refreshIsValid() {
		this.isValid = this.checkIfRuleElemsValid() && this.reactiveForm.valid;
	}

	// Constructor 
	constructor(
		private readonly genericCLOFactory: GenericCLOFactory,
		private readonly globalDataService: HomePageDataService,
		private fb: FormBuilder

	) {
	}
	ngOnInit() {

		// Define form
		this.reactiveForm = this.fb.group({
			planName: ['', Validators.required],
			dates: this.fb.group({
				startDate: [null,
					Validators.compose([
						Validators.required
					])],
				endDate: null
			}, { validator: basicPlanDatesValidator }),

		});

		// Create the currentModeInstance
		let modeImplementationClass = modeImplementationsLookup[this.dialogInitParameters.editorMode]
		this.currentModeInstance = new modeImplementationClass(
			this.reactiveForm,
			this.dialogInitParameters.planCLO,
			this.viewModel,
			this.globalDataService,
			this.genericCLOFactory
		) as IPlanEditorModeImplementation;

		// Subscriptions
		this.reactiveForm.
			statusChanges.
			subscribe(() => {
				this.refreshIsValid();
			});
	}

	// Public methods
	public SaveData(): Promise<CLOs.PlanCLO> {
		if (this.viewModel.CurrentVersionCLO.EndDateTime !== null) {
			this.viewModel.CurrentVersionCLO.EndDateTime = moment(this.viewModel.CurrentVersionCLO.EndDateTime).endOf('day').milliseconds(0).toDate();
		}

		let saveDataPromise = this.currentModeInstance.SaveData();

		return saveDataPromise;
	}
	public GetValidState() {
		return this.isValid;
	}

	// EventHandlers
	private onChildRuleElemValidStateChanged() {
		this.refreshIsValid();
	}
	private onAddNewRuleTriggered() {
		this.viewModel.CurrentVersionCLO.Rules.push(this.genericCLOFactory.CreateDefaultClo(CLOs.RuleCLO));
		setTimeout(() => {
			this.refreshIsValid();
		}, 1);
	}
	private onRemoveRuleTriggered(ruleCLO: CLOs.RuleCLO) {
		const index: number = this.viewModel.CurrentVersionCLO.Rules.indexOf(ruleCLO);

		if (index !== -1) {
			this.viewModel.CurrentVersionCLO.Rules.splice(index, 1);
		}

		setTimeout(() => {
			this.refreshIsValid();
		}, 1);
	}

	// IModalDialog
	dialogInit(reference: ComponentRef<IModalDialog>, options?: IModalDialogOptions) {
		this.dialogInitParameters.planCLO = options.data.planCLO as CLOs.PlanCLO;
		this.dialogInitParameters.editorMode = options.data.planEditorMode as PlanEditorMode;
	}
}


interface ViewModel {
	PlanCLO: CLOs.PlanCLO;
	CurrentVersionCLO: CLOs.VersionCLO;

	InfoMessage: string;
	StartDateLabel: string;
	EndDateLabel: string;
}

// PlanMode logic and classes
export enum PlanEditorMode {
	CreateNew,
	Adjust,
	HardEdit,
	Restart
}
interface IPlanEditorModeImplementation {
	SaveData(): Promise<CLOs.PlanCLO>;
}
class CreateNewMode implements IPlanEditorModeImplementation {

	// Constructor
	constructor(
		private reactiveForm: FormGroup,
		private planCLO: CLOs.PlanCLO,
		private vm: ViewModel,
		private globalDataService: HomePageDataService) {

		// Prepare ViewModel 
		this.vm.PlanCLO = planCLO;
		this.vm.CurrentVersionCLO = this.vm.PlanCLO.GetLatestVersion();
		this.vm.InfoMessage = 'This will create a new Plan from scratch, with a first Version which you can edit below.';
		this.vm.StartDateLabel = 'Start date:';
		this.vm.EndDateLabel = 'End date:';
	}

	// Public methods
	public SaveData() {
		let saveDataPromise = this.globalDataService.AddPlan(this.vm.PlanCLO);
		return saveDataPromise;
	}
}
class AdjustMode implements IPlanEditorModeImplementation {

	// Fields
	private prevVersion: CLOs.VersionCLO = null;

	// Constructor
	constructor(
		private reactiveForm: FormGroup,
		private planCLO: CLOs.PlanCLO,
		private vm: ViewModel,
		private globalDataService: HomePageDataService,
		private genericCLOFactory: GenericCLOFactory) {
		this.prevVersion = planCLO.GetLatestVersion();

		// If prevVersion starts in the future - throw exception -> this should have different logic as in HardEdit instead of creating a new version
		if (this.prevVersion === null) {
			throw new Error('Adjusting a plan only works for plans with at least 1 previous version!');
		}
		if (moment(this.prevVersion.StartDateTime).startOf('day') > moment().startOf('day')) {
			throw new Error('Adjusting a plan whose last version starts in the future is not yet supported!');
		}


		// Create a new version for the planCLO
		let newVersion = this.genericCLOFactory.CloneCLOAsNewBLO(this.prevVersion);
		newVersion.StartDateTime = moment().add(1, 'days').startOf('day').toDate(); // default startdate = tomorrow
		planCLO.Versions.Add(newVersion);


		// Custom form logic 
		this.reactiveForm.get('planName').disable();
		this.reactiveForm.get('dates').setValidators([(control: AbstractControl) => {
			return advancedPlanDatesValidator(control as FormGroup, this.prevVersion);
		}]);

		// Prepare ViewModel 
		this.vm.PlanCLO = planCLO;
		this.vm.CurrentVersionCLO = this.vm.PlanCLO.GetLatestVersion();
		this.vm.InfoMessage = 'You are about to create a new Version for this Plan. ' +
			'The previous Version started on ' + moment(this.prevVersion.StartDateTime).format('Do MMM YYYY');
		this.vm.InfoMessage += (this.prevVersion.EndDateTime == null) ?
			', without any specific end date.' :
			' and is/was due to end on ' + moment(this.prevVersion.EndDateTime).format('Do MMM YYYY') + '.';
		this.vm.StartDateLabel = 'Taking effect from:';
		this.vm.EndDateLabel = 'New end date will be:';
	}

	// Public methods
	public SaveData() {

		// Automatically end the next last version before starting the new one
		this.prevVersion.EndDateTime = moment(this.vm.CurrentVersionCLO.StartDateTime).subtract(1, 'days').toDate();

		// Save the data
		let saveDataPromise = this.globalDataService.UpdatePlan(this.vm.PlanCLO);
		return saveDataPromise;
	}
}
class HardEditMode implements IPlanEditorModeImplementation {

	// Fields
	private prevVersion: CLOs.VersionCLO = null;

	// Constructor
	constructor(
		private reactiveForm: FormGroup,
		private planCLO: CLOs.PlanCLO,
		private vm: ViewModel,
		private globalDataService: HomePageDataService,
		private genericCLOFactory: GenericCLOFactory) {

		this.prevVersion = planCLO.GetSecondLatestVersion();


		// Scenario A: A previous version exists
		if (this.prevVersion !== null) {

			// Custom form logic
			this.reactiveForm.get('planName').disable();
			this.reactiveForm.get('dates').setValidators([(control: AbstractControl) => {
				return advancedPlanDatesValidator(control as FormGroup, this.prevVersion);
			}]);

			// Prepare ViewModel 
			this.vm.PlanCLO = planCLO;
			this.vm.CurrentVersionCLO = this.vm.PlanCLO.GetLatestVersion();
			this.vm.InfoMessage = 'You are about to hard edit the latest Version for this Plan. ' +
				'The previous Version started on ' + moment(this.prevVersion.StartDateTime).format('Do MMM YYYY');
			this.vm.InfoMessage += (this.prevVersion.EndDateTime == null) ?
				', without any specific end date.' :
				' and is/was due to end on ' + moment(this.prevVersion.EndDateTime).format('Do MMM YYYY') + '.';
			this.vm.StartDateLabel = 'Taking effect from:';
			this.vm.EndDateLabel = 'New end date will be:';
		}
		// Scenario B: Only a single version exists (no previous version)
		else if (this.prevVersion === null) {

			// Custom form logic
			this.reactiveForm.get('planName').disable();
			this.reactiveForm.get('dates').setValidators([basicPlanDatesValidator]);

			// Prepare ViewModel 
			this.vm.PlanCLO = planCLO;
			this.vm.CurrentVersionCLO = this.vm.PlanCLO.GetLatestVersion();
			this.vm.InfoMessage = 'You are about to hard edit the only Version for this Plan';
			this.vm.StartDateLabel = 'New start date will be:';
			this.vm.EndDateLabel = 'New end date will be:';
		}





	}

	// Public methods
	public SaveData() {

		// Automatically end the next last version before starting the new one
		if (this.prevVersion !== null) {

			this.prevVersion.EndDateTime = moment(this.vm.CurrentVersionCLO.StartDateTime).subtract(1, 'days').toDate();
		}

		// Save the data
		let saveDataPromise = this.globalDataService.UpdatePlan(this.vm.PlanCLO);
		return saveDataPromise;
	}
}
class RestartMode implements IPlanEditorModeImplementation {

	// Fields
	private prevVersion: CLOs.VersionCLO = null;

	// Constructor
	constructor(
		private reactiveForm: FormGroup,
		private planCLO: CLOs.PlanCLO,
		private vm: ViewModel,
		private globalDataService: HomePageDataService,
		private genericCLOFactory: GenericCLOFactory) {
		this.prevVersion = planCLO.GetLatestVersion();

		// If prevVersion isn't inactive - throw exception
		if (this.prevVersion === null || this.prevVersion.Status !== Enums.VersionStatus.Inactive) {
			throw new Error('Can only Restart a Plan where the previous version is Inactive!');
		}

		// Create a new version for the planCLO
		let newVersion = this.genericCLOFactory.CloneCLOAsNewBLO(this.prevVersion);
		newVersion.StartDateTime = moment().add(1, 'days').startOf('day').toDate(); // default restartdate = tomorrow
		newVersion.EndDateTime = null;
		planCLO.Versions.Add(newVersion);


		// Custom form logic 
		this.reactiveForm.get('planName').disable();
		this.reactiveForm.get('dates').setValidators([(control: AbstractControl) => {
			return advancedPlanDatesValidator(control as FormGroup, this.prevVersion);
		}]);

		// Prepare ViewModel 
		this.vm.PlanCLO = planCLO;
		this.vm.CurrentVersionCLO = this.vm.PlanCLO.GetLatestVersion();
		this.vm.InfoMessage = 'You are about to restart this Plan by creating a new Version for it. ' +
			'The previous Version ended on ' + moment(this.prevVersion.EndDateTime).format('Do MMM YYYY');
		this.vm.StartDateLabel = 'Starting again on:';
		this.vm.EndDateLabel = 'Ending on:';
	}

	// Public methods
	public SaveData() {

		// Save the data
		let saveDataPromise = this.globalDataService.UpdatePlan(this.vm.PlanCLO);
		return saveDataPromise;
	}
}
var modeImplementationsLookup = {};
modeImplementationsLookup[PlanEditorMode.CreateNew] = CreateNewMode;
modeImplementationsLookup[PlanEditorMode.Adjust] = AdjustMode;
modeImplementationsLookup[PlanEditorMode.HardEdit] = HardEditMode;
modeImplementationsLookup[PlanEditorMode.Restart] = RestartMode;

// Custom validators
function basicPlanDatesValidator(control: AbstractControl) {
	let group = control as FormGroup;

	// Variables
	var startDateInput = group.controls['startDate'];
	var endDateInput = group.controls['endDate'];

	// Validation logic
	if ((endDateInput.value !== '' && endDateInput.value !== null) &&
		(moment(startDateInput.value).startOf('day') >= moment(endDateInput.value).startOf('day'))) {

		startDateInput.setErrors({ startDateAfterEndDate: true });
		endDateInput.setErrors({ startDateAfterEndDate: true });

	} else {
		startDateInput.updateValueAndValidity({ onlySelf: true, emitEvent: false });
		endDateInput.updateValueAndValidity({ onlySelf: true, emitEvent: false });
	}



	return null;
}
function advancedPlanDatesValidator(group: FormGroup, prevVersion: CLOs.VersionCLO) {

	// Variables
	var startDateInput = group.controls['startDate'];
	var endDateInput = group.controls['endDate'];
	var startDateErrorsCount = 0;
	var endDateErrorsCount = 0;

	// Rule 1. newVersion.StartDate must be > prevVersion.StartDate
	if (prevVersion !== null && (moment(startDateInput.value).startOf('day') <= moment(prevVersion.StartDateTime).startOf('day'))) {
		startDateErrorsCount++;
	}

	// Rule 2. newVersion.StartDate must be < newDate.EndVersion
	if ((endDateInput.value !== '' && endDateInput.value !== null) &&
		(moment(startDateInput.value).startOf('day') >= moment(endDateInput.value).startOf('day'))) {
		startDateErrorsCount++;
		endDateErrorsCount++;
	}

	// Apply logic
	if (startDateErrorsCount > 0) {
		startDateInput.setErrors({ incorrect: true });
	} else {
		startDateInput.setErrors(null);
	}
	if (endDateErrorsCount > 0) {
		endDateInput.setErrors({ incorrect: true });
	} else {
		endDateInput.setErrors(null);
	}

	return null;
}