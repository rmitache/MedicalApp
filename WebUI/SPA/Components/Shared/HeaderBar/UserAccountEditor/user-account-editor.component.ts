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


@Component({
	selector: 'user-account-editor',
	templateUrl: './user-account-editor.component.html',
	styleUrls: ['./user-account-editor.component.css'],
	host: { 'class': 'user-account-editor' }
})
export class UserAccountEditorComponent implements IModalDialog {
	// Fields
	private isValid: boolean = false;
	private currentModeInstance: IUserAccountEditorModeImplementation = null;
	private reactiveForm: FormGroup;
	private readonly dialogInitParameters = {
		userAccountCLO: null,
		userAccountEditorMode: null
	};
	private readonly viewModel: ViewModel = {
		MedicineTypeCLO: null
	};

	// Private methods
	private refreshIsValid() {
		this.isValid = this.reactiveForm.valid;
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
			name: ['',
				Validators.required
			],
			
		});

		// Create the currentModeInstance
		let modeImplementationClass = modeImplementationsLookup[this.dialogInitParameters.userAccountEditorMode]
		this.currentModeInstance = new modeImplementationClass(
			this.reactiveForm,
			this.dialogInitParameters.userAccountCLO,
			this.viewModel,
			this.globalDataService,
			this.genericCLOFactory
		) as IUserAccountEditorModeImplementation;

		// Subscriptions
		this.reactiveForm.
			statusChanges.
			subscribe((value) => {
				this.refreshIsValid();
			});

	}

	// Public methods
	public SaveData(): Promise<CLOs.MedicineTypeCLO> {


		let saveDataPromise = this.currentModeInstance.SaveData();

		return saveDataPromise;
	}
	public GetValidState() {
		return this.isValid;
	}


	// IModalDialog
	dialogInit(reference: ComponentRef<IModalDialog>, options?: IModalDialogOptions) {
		this.dialogInitParameters.userAccountCLO = options.data.userAccountCLO as CLOs.UserAccountCLO;
		this.dialogInitParameters.userAccountEditorMode = options.data.userAccountEditorMode as UserAccountEditorMode;
	}
}

interface ViewModel {
	MedicineTypeCLO: CLOs.MedicineTypeCLO;
}

// PlanMode logic and classes
export enum UserAccountEditorMode {
	EditCurrent
}
interface IUserAccountEditorModeImplementation {
	SaveData(): Promise<any>;
}
class EditCurrentMode implements IUserAccountEditorModeImplementation {

	// Constructor
	constructor(
		private reactiveForm: FormGroup,
		private userAccountCLO: CLOs.UserAccountCLO,
		private vm: ViewModel,
		private globalDataService: HomePageDataService) {

		// Prepare ViewModel 
		//this.vm.MedicineTypeCLO = medicineTypeCLO;

	}

	// Public methods
	public SaveData() {
		//let saveDataPromise = this.globalDataService.AddMedicineType(this.vm.MedicineTypeCLO);
		//return saveDataPromise;

		return null;
	}
}

var modeImplementationsLookup = {};
modeImplementationsLookup[UserAccountEditorMode.EditCurrent] = EditCurrentMode;

//// Async validator for MedicineType Name
//export class ValidateMedicineTypeNameNotTaken {
//	static createValidator(homePageDataService: HomePageDataService, nameToIgnore: string = null) {
//		return (control: AbstractControl) => {
//			return homePageDataService.IsMedicineTypeNameTaken(control.value, nameToIgnore).then(isTaken => {
//				return (isTaken === false) ? null : { nameTaken: true };
//			});
//		}
//	}
//}