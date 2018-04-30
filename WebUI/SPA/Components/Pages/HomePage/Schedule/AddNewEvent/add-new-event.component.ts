// Angular and 3rd party stuff
import { Component, Input, EventEmitter, Output, ComponentRef, ViewChild, ApplicationRef } from '@angular/core';
import * as moment from 'moment';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { GenericCLOFactory } from 'SPA/DomainModel/generic-clo.factory';
import { Time } from 'SPA/Core/Helpers/DataStructures/misc';
import { IModalDialog, IModalDialogOptions } from 'SPA/Core/Services/ModalDialogService/modal-dialog.interface';
import * as DataStructures from 'SPA/Core/Helpers/DataStructures/data-structures';
import { HomePageDataService } from 'SPA/Components/Pages/HomePage/home-page-data.service';
import { List } from 'SPA/Core/Helpers/DataStructures/list';

// Components
import { IFRPGroupElemComponent } from 'SPA/Components/Pages/HomePage/Shared/IFRPGroupList/IFRPGroupElem/ifrp-group-elem.component';
import { IFRPGroupListComponent } from 'SPA/Components/Pages/HomePage/Shared/IFRPGroupList/ifrp-group-list.component';

@Component({
    selector: 'add-new-event',
    templateUrl: './add-new-event.component.html',
    styleUrls: ['./add-new-event.component.css'],
    host: { 'class': 'add-new-event' }
})
export class AddNewEventComponent implements IModalDialog {
    // Fields
    private isValid: boolean;
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
    @ViewChild('ifrpgrouplist')
    private ifrpGroupList: IFRPGroupListComponent;
    private readonly availableMedicineTypes: DataStructures.List<CLOs.MedicineTypeCLO>;
    private readonly viewModel: ViewModel = {
        FactorRecordCLOs: [],
        OccurenceDateTime: null
    };

    // Private methods
    private refreshIsValid() {
        this.isValid = this.ifrpGroupList.GetValidState();
    }

    // Constructor 
    constructor(
        private readonly genericCLOFactory: GenericCLOFactory,
        private readonly globalDataService: HomePageDataService
    ) {
        this.availableMedicineTypes = this.globalDataService.GetMedicineTypesFromBundle();
        this.viewModel.FactorRecordCLOs.push(this.genericCLOFactory.CreateDefaultClo(CLOs.MedicineFactorRecordCLO));
    }

    // Public methods
    public SaveData(): Promise<List<CLOs.MedicineFactorRecordCLO>> {

        // Loop through all FactorRecords and set OccurrenceDateTime
        this.viewModel.FactorRecordCLOs.forEach(record => {
            record.OccurenceDateTime = this.viewModel.OccurenceDateTime;

        });


        let saveDataPromise = this.globalDataService.AddFactorRecords(this.viewModel.FactorRecordCLOs);
        return saveDataPromise;
    }
    public GetValidState() {
        return this.isValid;
    }

    // EventHandlers
    private onGroupListValidStateChanged() {
        this.refreshIsValid();
    }
    private onAddFactorRecordTriggered() {
        this.viewModel.FactorRecordCLOs.push(this.genericCLOFactory.CreateDefaultClo(CLOs.MedicineFactorRecordCLO));
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
    FactorRecordCLOs: CLOs.MedicineFactorRecordCLO[];
    OccurenceDateTime: Date;
}

export interface IMedicineTypesSearchService {
    GetMedicineTypeByName(name: string): CLOs.MedicineTypeCLO;
    Search(searchString: string): string[];
}