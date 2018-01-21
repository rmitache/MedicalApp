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
    private medicineMethodsEnum = Enums.MedicineMethod;
    private unitsOfMeasureEnum = Enums.UnitOfMeasure;
    private medicineInstructionsEnum = Enums.MedicineInstruction;

    private readonly viewModel: ViewModel = {
        FactorRecordCLO: null,
        MedicineTypeSearchString: '',
        MedicineTypeSearchResults: []
    };
    




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
}

interface ViewModel {
    FactorRecordCLO: CLOs.MedicineFactorRecordCLO;
    MedicineTypeSearchString: string;
    MedicineTypeSearchResults: CLOs.MedicineTypeCLO[];
}

