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
    selector: 'medicine-type-editor-dialog',
    templateUrl: './medicine-type-editor-dialog.component.html',
    styleUrls: ['./medicine-type-editor-dialog.component.css'],
    host: { 'class': 'medicine-type-editor-dialog' }
})
export class MedicineTypeEditorDialogComponent implements IModalDialog {
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
        let nameToIgnoreParameter = (this.dialogInitParameters.medicineTypeCLO !== null) ? this.dialogInitParameters.medicineTypeCLO.Name : null;
        this.reactiveForm = this.fb.group({
            name: ['',
                Validators.required,
                ValidateMedicineTypeNameNotTaken.createValidator(this.globalDataService, nameToIgnoreParameter)
            ],
            producerName: [''],
            baseUnitOfMeasure: [''],
            isPackagedIntoUnitsRadioGroup: [null],
            packagedUnitDoseType: [null],
            packagedUnitDoseSize: [null,
                Validators.compose([
                    Validators.required,
                    Validators.pattern(new RegExp(/^(?:[1-9]\d*|0)?(?:\.\d+)?$/)),
                    Validators.min(0.00000000001)
                ])],

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

        //this.reactiveForm.get('isPackagedIntoUnitsRadioGroup').valueChanges.subscribe(val => {
        //    if (val === false) {
        //        this.reactiveForm.controls["packagedUnitDoseSize"].disable();
        //        setTimeout(() => {
        //        }, 1);
        //    }
        //    else if (val === true) {
        //        this.reactiveForm.controls["packagedUnitDoseSize"].enable();
        //        this.viewModel.MedicineTypeCLO.PackagedUnitDoseSize = null;
                
        //        setTimeout(() => {
        //        }, 1);
        //    }
        //});
    }

    // Public methods
    public SaveData(): Promise<CLOs.MedicineTypeCLO> {


        let saveDataPromise = this.currentModeInstance.SaveData();

        return saveDataPromise;
    }
    public GetValidState() {
        return this.isValid;
    }

    // Event handlers
    private onIsPackagedIntoUnitsTrueClicked() {
        this.reactiveForm.controls["packagedUnitDoseSize"].enable();
        this.viewModel.MedicineTypeCLO.PackagedUnitDoseSize = null;

        setTimeout(() => {
        }, 1);
    }
    private onIsPackagedIntoUnitsFalseClicked() {
        this.reactiveForm.controls["packagedUnitDoseSize"].disable();
        setTimeout(() => {
        }, 1);
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
    CreateNew,
    EditExisting
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
    }

    // Public methods
    public SaveData() {
        let saveDataPromise = this.globalDataService.AddMedicineType(this.vm.MedicineTypeCLO);
        return saveDataPromise;
    }
}
class EditExistingMode implements IMedicineTypeEditorModeImplementation {

    // Constructor
    constructor(
        private reactiveForm: FormGroup,
        private medicineTypeCLO: CLOs.MedicineTypeCLO,
        private vm: ViewModel,
        private globalDataService: HomePageDataService) {

        // Prepare ViewModel 
        this.vm.MedicineTypeCLO = medicineTypeCLO;
    }

    // Public methods
    public SaveData() {
        
        let saveDataPromise = this.globalDataService.UpdateMedicineType(this.vm.MedicineTypeCLO);
        return saveDataPromise;
    }
}

var modeImplementationsLookup = {};
modeImplementationsLookup[MedicineTypeEditorMode.CreateNew] = CreateNewMode;
modeImplementationsLookup[MedicineTypeEditorMode.EditExisting] = EditExistingMode;

// Async validator for MedicineType Name
export class ValidateMedicineTypeNameNotTaken {
    static createValidator(homePageDataService: HomePageDataService, nameToIgnore: string = null) {
        return (control: AbstractControl) => {

            if (control.value === nameToIgnore) {
                return Promise.resolve(null);
            } else {

                return homePageDataService.IsMedicineTypeNameTaken(control.value, nameToIgnore).then(isTaken => {
                    return (isTaken === false) ? null : { nameTaken: true };
                });

            }
        }
    }
}