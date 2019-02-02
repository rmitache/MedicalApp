// Angular and 3rd party stuff
import { Component, Input, EventEmitter, Output, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NgForm, AbstractControl } from '@angular/forms';
import { AutoComplete } from 'primeng/primeng';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

// Project modules
import * as Enums from 'SPA/DomainModel/enum-exports';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import { IMedicineTypesSearchService } from 'SPA/Components/Pages/HomePage/Shared/i-medicine-types-search-service';

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
    private isValid: boolean = false;
    private reactiveForm: FormGroup;

    private readonly viewModel: ViewModel = {
        IFRPGroupCLO: null,

        UnitDoseTypesEnum: {},
        UserDefinedControlsAreLocked: true,
    };

    // Private methods
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

        // Load fields 
        this.viewModel.IFRPGroupCLO.UnitDoseQuantifier = 1;
        var medicineTypeCLO = this.viewModel.IFRPGroupCLO.MedicineType;
        if (medicineTypeCLO.IsPackagedIntoUnits === true) {
            this.viewModel.IFRPGroupCLO.HasUserDefinedUnitDose = false;
            this.viewModel.IFRPGroupCLO.UserDefinedUnitDoseType = null;
            this.viewModel.IFRPGroupCLO.UserDefinedUnitDoseSize = null;

            // Make the controls readonly and load enum values
            this.viewModel.UserDefinedControlsAreLocked = true;
            this.viewModel.UnitDoseTypesEnum = Enums.PackagedUnitDoseType;
        }
        else {
            this.viewModel.IFRPGroupCLO.HasUserDefinedUnitDose = true;
            this.viewModel.IFRPGroupCLO.UserDefinedUnitDoseType = 0;
            this.viewModel.IFRPGroupCLO.UserDefinedUnitDoseSize = 100;

            // Unlock the controls
            this.viewModel.UserDefinedControlsAreLocked = false;
            this.viewModel.UnitDoseTypesEnum = Enums.UserDefinedUnitDoseType;
        }

        


        ////
        //this.reactiveForm
        //    .statusChanges
        //    .subscribe((newStatus) => {
        //        this.refreshIsValid();

        //    });

        ////
        //if (this.iFRPGroupCLO.MedicineType !== null) {
        //    this.reactiveForm.get('medicineTypeName').setValue(this.iFRPGroupCLO.MedicineType.Name);
        //    this.viewModel.SearchText = this.iFRPGroupCLO.MedicineType.Name;
        //    this.viewModel.OverlayIsVisible = false;

        //    //
        //    if (this.iFRPGroupCLO.MedicineType.IsPackagedIntoUnits === true) {
        //        this.viewModel.UserDefinedControlsAreLocked = true;
        //        this.viewModel.UnitDoseTypesEnum = Enums.PackagedUnitDoseType;
        //    } else {
        //        this.viewModel.UserDefinedControlsAreLocked = false;
        //        this.viewModel.UnitDoseTypesEnum = Enums.UserDefinedUnitDoseType;
        //    }
        //}
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
    
    UnitDoseTypesEnum: any;
    UserDefinedControlsAreLocked: boolean;
}


