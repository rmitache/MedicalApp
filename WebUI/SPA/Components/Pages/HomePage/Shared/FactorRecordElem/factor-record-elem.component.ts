import { Component, Input, EventEmitter, Output, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { IMedicineTypesSearchService } from 'SPA/Components/Pages/HomePage/Schedule/AddNewEvent/add-new-event.component';
import { AutoComplete } from 'primeng/primeng';


@Component({
    selector: 'factor-record-elem',
    templateUrl: './factor-record-elem.component.html',
    styleUrls: ['./factor-record-elem.component.css'],
    host: { 'class': 'factor-record-elem' }
})
export class FactorRecordElem {
    // Fields
    @Input('MedicineFactorRecord')
    private readonly medicineFactorRecordCLO: CLOs.MedicineFactorRecordCLO;
    @Input('MedicineSearchService')
    private readonly medicineTypesSearchService: IMedicineTypesSearchService;
    @Output()
    public IsValid: boolean = false;
    @ViewChild('autocomplete') readonly autoCompleteComponentInstance: AutoComplete;
    @ViewChild(NgForm) form;

    private readonly unitDoseTypesEnum = Enums.UnitDoseType;
    private readonly unitsOfMeasureEnum = Enums.UnitOfMeasure;
    private readonly medicineInstructionsEnum = Enums.Instruction;

    private readonly viewModel: ViewModel = {
        FactorRecordCLO: null,
        MedicineTypeName: '',
        MedicineTypeSearchResults: [],
        OverlayIsVisible: true,
        UserDefinedControlsAreLocked: true
    };

    // Private methods
    private loadMedicineTypeByName(selectedMedicineTypeName: string) {

        // Get and load the medicineTypeCLO
        let medicineTypeCLO = this.medicineTypesSearchService.GetMedicineTypeByName(selectedMedicineTypeName);
        this.viewModel.FactorRecordCLO.MedicineType = medicineTypeCLO;

        // Handle fields

        if (medicineTypeCLO.IsPackagedIntoUnitDoses() === true) {
            this.viewModel.FactorRecordCLO.UnitDoseQuantifier = 1;
            this.viewModel.FactorRecordCLO.UnitDoseType = medicineTypeCLO.PackagedUnitDoseType;
            this.viewModel.FactorRecordCLO.UnitDoseSize = medicineTypeCLO.PackagedUnitDoseSize;
            this.viewModel.FactorRecordCLO.UnitDoseUoM = medicineTypeCLO.PackagedUnitDoseUoM;

            // Make the controls readonly
            this.viewModel.UserDefinedControlsAreLocked = true;
        }
        else {

            this.viewModel.FactorRecordCLO.UnitDoseQuantifier = 1;
            this.viewModel.FactorRecordCLO.UnitDoseType = Enums.UnitDoseType.Teaspoons;
            this.viewModel.FactorRecordCLO.UnitDoseSize = 100;
            this.viewModel.FactorRecordCLO.UnitDoseUoM = Enums.UnitOfMeasure.mg;

            // Unlock the controls
            this.viewModel.UserDefinedControlsAreLocked = false;
        }
    }

    // Constructor 
    constructor(
        private readonly cdRef: ChangeDetectorRef
    ) {
    }
    ngOnInit() {
        this.viewModel.FactorRecordCLO = this.medicineFactorRecordCLO;

        this.form.
            valueChanges.
            subscribe(() => {
                this.IsValid = (this.form.valid === true);
            });
    }
    ngAfterViewInit() {

        // Auto-focus by default onto the autocomplete input field
        this.autoCompleteComponentInstance.domHandler.findSingle(this.autoCompleteComponentInstance.el.nativeElement, 'input').focus();
        this.cdRef.detectChanges();
    }

    // Events 
    @Output() public RemoveClicked: EventEmitter<any> = new EventEmitter();


    // EventHandlers
    private onRemoveClicked() {
        this.RemoveClicked.emit(this.medicineFactorRecordCLO);
    }
    private onMedicineTypeTextBoxChanged(event) {

        let searchResults = this.medicineTypesSearchService.Search(event.query);
        this.viewModel.MedicineTypeSearchResults = searchResults;

    }
    private onMedicineTypeSelected(value) {
        this.viewModel.MedicineTypeName = value;
        this.loadMedicineTypeByName(value);
        setTimeout(() => {
            this.viewModel.OverlayIsVisible = false;
        }, 100);

    }
}

interface ViewModel {
    FactorRecordCLO: CLOs.MedicineFactorRecordCLO;
    MedicineTypeName: string;
    MedicineTypeSearchResults: string[];
    OverlayIsVisible: boolean;
    UserDefinedControlsAreLocked: boolean;
}


