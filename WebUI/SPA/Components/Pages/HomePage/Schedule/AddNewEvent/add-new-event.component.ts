// Angular and 3rd party stuff
import { Component, Input, EventEmitter, Output, ComponentRef, ViewChildren, QueryList } from '@angular/core';
import * as moment from 'moment';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { GenericCLOFactory } from 'SPA/DomainModel/generic-clo.factory';
import { Time } from 'SPA/Core/Helpers/DataStructures/misc';
import { IModalDialog, IModalDialogOptions } from 'SPA/Core/Services/ModalDialogService/modal-dialog.interface';
import * as DataStructures from 'SPA/Core/Helpers/DataStructures/data-structures';
import { GlobalDataService } from 'SPA/Components/Pages/HomePage/global-data.service';
import { List } from 'SPA/Core/Helpers/DataStructures/list';

// Components
import { IFRPGroupElem } from 'SPA/Components/Pages/HomePage/Shared/IFRPGroupElem/ifrp-group-elem.component';


@Component({
    selector: 'add-new-event',
    templateUrl: './add-new-event.component.html',
    styleUrls: ['./add-new-event.component.css'],
    host: { 'class': 'add-new-event' }
})
export class AddNewEventComponent implements IModalDialog {
    // Fields
    private searchService: IMedicineTypesSearchService = {
        GetMedicineTypeByName: (name) => {
            return this.availableMedicineTypes.ToArray().find(clo => {
                return clo.Name === name;
            });
        },
        Search: (searchString) => {
            return this.availableMedicineTypes.ToArray().map(clo => {
                return clo.Name;
            });
        }
    };
    @ViewChildren('factorRecords') factorRecordItems: QueryList<IFRPGroupElem>;
    private readonly availableMedicineTypes: DataStructures.List<CLOs.MedicineTypeCLO>;
    private readonly availableMedicineTypesNames: string[];
    private readonly viewModel: ViewModel = {
        FactorRecords: [],
        CreateNewFactorRecord: () => {
            this.viewModel.FactorRecords.push(this.genericCLOFactory.CreateDefaultClo(CLOs.MedicineFactorRecordCLO));
        },
        OccurenceDateTime: null
    };

    // Constructor 
    constructor(
        private readonly genericCLOFactory: GenericCLOFactory,
        private readonly globalDataService: GlobalDataService
    ) {
        this.availableMedicineTypes = this.globalDataService.GetMedicineTypesFromBundle();
        this.viewModel.FactorRecords.push(this.genericCLOFactory.CreateDefaultClo(CLOs.MedicineFactorRecordCLO));
    }

    // Public methods
    public SaveData(): Promise<List<CLOs.MedicineFactorRecordCLO>> {

        // Loop through all FactorRecords and set OccurrenceDateTime
        this.viewModel.FactorRecords.forEach(record => {
            record.OccurenceDateTime = this.viewModel.OccurenceDateTime;

        });


        let saveDataOperationPromise = this.globalDataService.AddFactorRecords(this.viewModel.FactorRecords);
        return saveDataOperationPromise;
    }
    public IsValidForSave(): boolean {
        let allItemsAreValid = true;

        for (var i = 0; i < this.factorRecordItems.toArray().length; i++) {
            let factorItem = this.factorRecordItems.toArray()[i];

            if (!factorItem.IsValid) {
                allItemsAreValid = false;
                break;
            }
        }




        return allItemsAreValid;
    }

    // EventHandlers
    private onRemoveFactorRecordTriggered(medicineFactorRecordCLO: CLOs.MedicineFactorRecordCLO) {


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

        let dateFromSchedule = options.data as Date;
        this.viewModel.OccurenceDateTime = dateFromSchedule;
    }
}


interface ViewModel {
    FactorRecords: CLOs.MedicineFactorRecordCLO[];
    CreateNewFactorRecord();
    OccurenceDateTime: Date;
}

export interface IMedicineTypesSearchService {
    GetMedicineTypeByName(name: string): CLOs.MedicineTypeCLO;
    Search(searchString: string): string[];
}