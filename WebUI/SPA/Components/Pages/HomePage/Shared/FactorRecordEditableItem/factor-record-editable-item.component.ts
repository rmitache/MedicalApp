import { Component, Input } from '@angular/core';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';

@Component({
    selector: 'factor-record-editable-item',
    templateUrl: './factor-record-editable-item.component.html',
    styleUrls: ['./factor-record-editable-item.component.css'],
    host: { 'class': 'factor-record-editable-item' }
})
export class FactorRecordEditableItem {
    // Fields
    @Input('MedicineFactorRecord')
    private medicineFactorRecord: CLOs.MedicineFactorRecordCLO;
    private readonly viewModel: ViewModel = {
        FactorRecordCLO: null
    };
    private medicineMethodsEnum = Enums.MedicineMethod;
    private unitsOfMeasureEnum = Enums.UnitOfMeasure;
    private medicineInstructionsEnum = Enums.MedicineInstruction;

    // Constructor 
    constructor(
    ) {

    }
    ngOnInit() {
        
        this.viewModel.FactorRecordCLO = this.medicineFactorRecord;
    }
}

interface ViewModel {
    FactorRecordCLO: CLOs.MedicineFactorRecordCLO;
}

