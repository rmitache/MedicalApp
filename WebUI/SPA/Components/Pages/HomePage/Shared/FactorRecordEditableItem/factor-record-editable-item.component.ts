import { Component, Input, EventEmitter, Output } from '@angular/core';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { IMedicineTypesSearchService } from 'SPA/Components/Pages/HomePage/Schedule/AddNewEvent/add-new-event.component';

@Component({
    selector: 'factor-record-editable-item',
    templateUrl: './factor-record-editable-item.component.html',
    styleUrls: ['./factor-record-editable-item.component.css'],
    host: { 'class': 'factor-record-editable-item' }
})
export class FactorRecordEditableItem {
    // Fields
    @Input('MedicineFactorRecord')
    private medicineFactorRecordCLO: CLOs.MedicineFactorRecordCLO;
    @Input('MedicineSearchService')
    private medicineTypesSearchService: IMedicineTypesSearchService;

    private unitDoseTypesEnum = Enums.UnitDoseType;
    private unitsOfMeasureEnum = Enums.UnitOfMeasure;
    private medicineInstructionsEnum = Enums.Instruction;

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
        this.viewModel.OverlayIsVisible = false;
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
    ) {

    }
    ngOnInit() {

        this.viewModel.FactorRecordCLO = this.medicineFactorRecordCLO;
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
    }
}

interface ViewModel {
    FactorRecordCLO: CLOs.MedicineFactorRecordCLO;
    MedicineTypeName: string;
    MedicineTypeSearchResults: string[];
    OverlayIsVisible: boolean;
    UserDefinedControlsAreLocked: boolean;
}


