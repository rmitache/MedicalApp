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
	selector: 'medicine-type-editor',
	templateUrl: './medicine-type-editor.component.html',
	styleUrls: ['./medicine-type-editor.component.css'],
	host: { 'class': 'medicine-type-editor' }
})
export class MedicineTypeEditorComponent implements IModalDialog {
	// Fields
	private isValid: boolean = false;
	private currentModeInstance: IMedicineTypeEditorModeImplementation = null;
	private reactiveForm: FormGroup;
	private unitsOfMeasureEnum = Enums.UnitOfMeasure;
	private packagedUnitDoseTypesEnum = Enums.PackagedUnitDoseType;
	private readonly dialogInitParameters = {
		medicineTypeCLO: null,
		medicineTypeEditorMode: null
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
				Validators.required,
				ValidateMedicineTypeNameNotTaken.createValidator(this.globalDataService)
			],
			producerName: [''],
			baseUnitOfMeasure: [''],
			isPackagedIntoUnitsRadioGroup: [null],
			packagedUnitDoseType: [null],
			packagedUnitDoseSize: [null,
				Validators.compose([
					Validators.required,
					Validators.min(1),
					Validators.pattern(new RegExp(/^\d+$/))])]
		});

		// Create the currentModeInstance
		let modeImplementationClass = modeImplementationsLookup[this.dialogInitParameters.medicineTypeEditorMode]
		this.currentModeInstance = new modeImplementationClass(
			this.reactiveForm,
			this.dialogInitParameters.medicineTypeCLO,
			this.viewModel,
			this.globalDataService,
			this.genericCLOFactory
		) as IMedicineTypeEditorModeImplementation;

		// Subscriptions
		this.reactiveForm.
			statusChanges.
			subscribe((value) => {
				this.refreshIsValid();
			});

		this.reactiveForm.get('isPackagedIntoUnitsRadioGroup').valueChanges.subscribe(val => {
			if (val === false) {
				this.viewModel.MedicineTypeCLO.PackagedUnitDoseSize = 100;
				setTimeout(() => {
				}, 1);
			}
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
		this.dialogInitParameters.medicineTypeCLO = options.data.medicineTypeCLO as CLOs.MedicineTypeCLO;
		this.dialogInitParameters.medicineTypeEditorMode = options.data.medicineTypeEditorMode as MedicineTypeEditorMode;
	}
}

interface ViewModel {
	MedicineTypeCLO: CLOs.MedicineTypeCLO;
}

// PlanMode logic and classes
export enum MedicineTypeEditorMode {
	CreateNew
}
interface IMedicineTypeEditorModeImplementation {
	SaveData(): Promise<CLOs.MedicineTypeCLO>;
}
class CreateNewMode implements IMedicineTypeEditorModeImplementation {

	// Constructor
	constructor(
		private reactiveForm: FormGroup,
		private medicineTypeCLO: CLOs.MedicineTypeCLO,
		private vm: ViewModel,
		private globalDataService: HomePageDataService) {

		// Prepare ViewModel 
		this.vm.MedicineTypeCLO = medicineTypeCLO;

		//// Sample to be used for eventual EditMode
		//let emailToIgnore = this.userCLO.Email;
		//this.reactiveForm.get('email').setAsyncValidators([ValidateEmailNotTaken.createValidator(this.appDataService, emailToIgnore)]);
	}

	// Public methods
	public SaveData() {
		let saveDataPromise = this.globalDataService.AddMedicineType(this.vm.MedicineTypeCLO);
		return saveDataPromise;
	}
}

var modeImplementationsLookup = {};
modeImplementationsLookup[MedicineTypeEditorMode.CreateNew] = CreateNewMode;

// Async validator for MedicineType Name
export class ValidateMedicineTypeNameNotTaken {
	static createValidator(homePageDataService: HomePageDataService, nameToIgnore: string = null) {
		return (control: AbstractControl) => {
			return homePageDataService.IsMedicineTypeNameTaken(control.value, nameToIgnore).then(isTaken => {
				return (isTaken === false) ? null : { nameTaken: true };
			});
		}
	}
}