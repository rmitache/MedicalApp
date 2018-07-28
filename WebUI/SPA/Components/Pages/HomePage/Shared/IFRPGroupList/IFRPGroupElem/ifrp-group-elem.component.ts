// Angular and 3rd party stuff
import { Component, Input, EventEmitter, Output, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AutoComplete } from 'primeng/primeng';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Project modules
import * as Enums from 'SPA/DomainModel/enum-exports';
import { IMedicineTypesSearchService } from 'SPA/Components/Pages/HomePage/Schedule/AddNewEvent/add-new-event.component';
import * as CLOs from 'SPA/DomainModel/clo-exports';


@Component({
    selector: 'ifrp-group-elem',
    templateUrl: './ifrp-group-elem.component.html',
    styleUrls: ['./ifrp-group-elem.component.css'],
    host: { 'class': 'ifrp-group-elem' }
})
export class IFRPGroupElemComponent {
    // Fields
    @Input('IFRPGroupCLO')
    private readonly iFRPGroupCLO: CLOs.AbstractMedicineFactorRecordCLO;
    @Input('MedicineTypeSearchService')
    private readonly medicineTypesSearchService: IMedicineTypesSearchService;
    private isValid: boolean = false;
    @ViewChild('autocomplete')
    readonly autoCompleteComponentInstance: AutoComplete;
    private reactiveForm: FormGroup;

    private readonly viewModel: ViewModel = {
        IFRPGroupCLO: null,
        MedicineTypeSearchResults: [],

        UnitDoseTypesEnum: {},
        OverlayIsVisible: true,
        UserDefinedControlsAreLocked: true
    };

    // Private methods
    private loadMedicineTypeByName(selectedMedicineTypeName: string) {

        // Get and load the medicineTypeCLO
        let factorRecordCLO = this.viewModel.IFRPGroupCLO;
        let medicineTypeCLO = this.medicineTypesSearchService.GetMedicineTypeByName(selectedMedicineTypeName);
        factorRecordCLO.MedicineType = medicineTypeCLO;


        // Handle fields for factorRecord
        factorRecordCLO.UnitDoseQuantifier = 1;
        if (medicineTypeCLO.IsPackagedIntoUnits === true) {
            factorRecordCLO.HasUserDefinedUnitDose = false;
            factorRecordCLO.UserDefinedUnitDoseType = null;
            factorRecordCLO.UserDefinedUnitDoseSize = null;

            // Make the controls readonly and load enum values
            this.viewModel.UserDefinedControlsAreLocked = true;
            this.viewModel.UnitDoseTypesEnum = Enums.PackagedUnitDoseType;
        }
        else {
            factorRecordCLO.HasUserDefinedUnitDose = true;
            factorRecordCLO.UserDefinedUnitDoseType = 0;
            factorRecordCLO.UserDefinedUnitDoseSize = 100;

            // Unlock the controls
            this.viewModel.UserDefinedControlsAreLocked = false;
            this.viewModel.UnitDoseTypesEnum = Enums.UserDefinedUnitDoseType;
        }
    }
    private refreshIsValid() {
        let prevIsValid = this.isValid;
        this.isValid = this.reactiveForm.valid;

        if (prevIsValid !== this.isValid) {
            this.ValidStateChanged.emit();
        }
    }

    // Constructor 
    constructor(
        private readonly fb: FormBuilder,
        private readonly cdRef: ChangeDetectorRef,

    ) {
        this.reactiveForm = this.fb.group({
            medicineTypeName: ['',
                Validators.compose([
                    Validators.required])],
            unitDoseQuantifierInput: [null,
                Validators.compose([
                    Validators.required,
                    Validators.min(1),
                    Validators.pattern(new RegExp(/^\d+$/))])],
            unitdosetype: null,
            unitdosesize: [null,
                Validators.compose([
                    Validators.required,
                    Validators.min(1),
                    Validators.pattern(new RegExp(/^\d+$/))])],
        });
    }
    ngOnInit() {
        this.viewModel.IFRPGroupCLO = this.iFRPGroupCLO;

        this.reactiveForm
            .statusChanges
            .subscribe((newStatus) => {
                this.refreshIsValid();

            });

        //
        if (this.iFRPGroupCLO.MedicineType !== null) {
            this.reactiveForm.get('medicineTypeName').setValue(this.iFRPGroupCLO.MedicineType.Name);
            this.viewModel.OverlayIsVisible = false;

            //
            if (this.iFRPGroupCLO.MedicineType.IsPackagedIntoUnits === true) {
                this.viewModel.UserDefinedControlsAreLocked = true;
                this.viewModel.UnitDoseTypesEnum = Enums.PackagedUnitDoseType;
            } else {
                this.viewModel.UserDefinedControlsAreLocked = false;
                this.viewModel.UnitDoseTypesEnum = Enums.UserDefinedUnitDoseType;
            }
            
        }

    }

    // Public methods
    public GetValidState() {
        return this.isValid;
    }

    // Events 
    @Output() public RemoveClicked: EventEmitter<any> = new EventEmitter();
    @Output() public ValidStateChanged: EventEmitter<any> = new EventEmitter();

    // EventHandlers
    private onRemoveClicked() {
        this.RemoveClicked.emit(this.iFRPGroupCLO);
    }
    private onMedicineTypeTextBoxChanged(event) {

        let searchResults = this.medicineTypesSearchService.Search(event.query);
        this.viewModel.MedicineTypeSearchResults = searchResults;

    }
    private onMedicineTypeSelected(value) {
        this.loadMedicineTypeByName(value);
        setTimeout(() => {
            this.viewModel.OverlayIsVisible = false;
        }, 1);

    }
    private onUnitDoseSizeChanged(value) {
        if (this.viewModel.IFRPGroupCLO.HasUserDefinedUnitDose === true) {
            this.viewModel.IFRPGroupCLO.UserDefinedUnitDoseSize = value;
        }
    }
    private onUnitDoseTypeChanged(value) {
        if (this.viewModel.IFRPGroupCLO.HasUserDefinedUnitDose === true) {
            this.viewModel.IFRPGroupCLO.UserDefinedUnitDoseType = value;
        }
    }
}

interface ViewModel {
    IFRPGroupCLO: CLOs.AbstractMedicineFactorRecordCLO;
    MedicineTypeSearchResults: string[];

    UnitDoseTypesEnum: any;
    OverlayIsVisible: boolean;
    UserDefinedControlsAreLocked: boolean;
}


