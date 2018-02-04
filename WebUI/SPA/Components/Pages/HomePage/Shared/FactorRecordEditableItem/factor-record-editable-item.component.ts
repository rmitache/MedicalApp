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
        OverlayIsVisible: () => {
            return false;
            //return this.viewModel.FactorRecordCLO.MedicineType === null;
        }
    };

    // Private methods
    private loadMedicineTypeByName(newMedicineTypeName: string) {

        // Get and load the newMedicineTypeCLO
        let newMedicineTypeCLO = this.medicineTypesSearchService.GetMedicineTypeByName(newMedicineTypeName);
        this.viewModel.FactorRecordCLO.MedicineType = newMedicineTypeCLO;

        // Define available Methods - based on the FORM: some FORMS allow multiple kinds of methods. Extra: there should be support for 

        // Mapping examples between Forms and Methods
        // Form = Powder or Liquid 
        //      -> Methods = 


        // Set PieceSize and disable

        // 
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
    OverlayIsVisible(): boolean;
}


