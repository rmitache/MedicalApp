import { Component, Input, EventEmitter, Output, ComponentRef } from '@angular/core';
import * as moment from 'moment';
import { IModalDialog, IModalDialogOptions } from 'SPA/Core/Services/ModalDialogService/modal-dialog.interface';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { GenericCLOFactory } from 'SPA/DomainModel/generic-clo.factory';
import { Time } from 'SPA/Core/Helpers/DataStructures/misc';
import * as DataStructures from 'SPA/Core/Helpers/DataStructures/data-structures';
import { GlobalDataService } from 'SPA/Components/Pages/HomePage/global-data.service';

@Component({
    selector: 'add-new-event',
    templateUrl: './add-new-event.component.html',
    styleUrls: ['./add-new-event.component.css'],
    host: { 'class': 'add-new-event' }
})
export class AddNewEventComponent implements IModalDialog {
    // Fields
    @Input('SelectedDate')
    private selectedDate: Date;
    private searchService: IMedicineTypesSearchService = {
        Search: (searchString) => {
            return this.availableMedicineTypes.ToArray();
        }
    };
    private readonly availableMedicineTypes: DataStructures.List<CLOs.MedicineTypeCLO>;
    private readonly viewModel: ViewModel = {
        FactorRecords: [],
        CreateNewFactorRecord: () => {
            this.viewModel.FactorRecords.push(this.genericCLOFactory.CreateDefaultClo(CLOs.MedicineFactorRecordCLO));
        },
        OccurenceDate: new Date()
    };
    
  

    // Constructor 
    constructor(
        private readonly genericCLOFactory: GenericCLOFactory,
        private readonly globalDataService: GlobalDataService
    ) {
        this.availableMedicineTypes = this.globalDataService.GetMedicineTypesFromBundle();
    }

    // EventHandlers
    private onRemoveFactorRecordTriggered(medicineFactorRecordCLO:CLOs.MedicineFactorRecordCLO) {
        

        const index: number = this.viewModel.FactorRecords.indexOf(medicineFactorRecordCLO);
        
        if (index !== -1) {
            this.viewModel.FactorRecords.splice(index, 1);
        }    
    }

    // IModalDialog
    dialogInit(reference: ComponentRef<IModalDialog>, options?: IModalDialogOptions) {
        // No logic necessary for now
        //if (!options || !options.data) {
        //    throw new Error(`Data information for simple modal dialog is missing`);
        //}
        //this.text = options.data.text;
    }

}


interface ViewModel {
    FactorRecords: CLOs.MedicineFactorRecordCLO[];
    CreateNewFactorRecord();
    OccurenceDate: Date;
}

export interface IMedicineTypesSearchService {
    Search(searchString:string):CLOs.MedicineTypeCLO[];
}