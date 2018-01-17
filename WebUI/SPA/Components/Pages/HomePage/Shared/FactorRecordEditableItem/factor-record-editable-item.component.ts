import { Component, Input } from '@angular/core';
import * as CLOs from 'SPA/DomainModel/clo-exports';

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

