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
import { IFRPGroupElemComponent } from 'SPA/Components/Pages/HomePage/Shared/IFRPGroupElem/ifrp-group-elem.component';


@Component({
    selector: 'ifrp-group-list',
    templateUrl: './ifrp-group-list.component.html',
    styleUrls: ['./ifrp-group-list.component.css'],
    host: { 'class': 'ifrp-group-list' }
})
export class IFRPGroupListComponent {
    // Fields
    @Input('AvailableMedicineTypes')
    private readonly availableMedicineTypes: DataStructures.List<CLOs.MedicineTypeCLO>;
    @Input('IFRPGroupCLOs')
    private readonly iFRPGroupCLOs: CLOs.IFactorRecordPropertiesGroup[];
    private readonly searchService: IMedicineTypesSearchService = {
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
    @ViewChildren('IFRPGroupElems')
    private iFRPGroupElems: QueryList<IFRPGroupElemComponent>;
    private readonly viewModel: ViewModel = {
        IFRPGroupCLOs: []
    };

    // Constructor 
    constructor(
    ) { }
    ngOnInit() {
        this.viewModel.IFRPGroupCLOs = this.iFRPGroupCLOs;
    }

    // Public methods
    public IsValidForSave(): boolean {
        let allItemsAreValid = true;

        for (var i = 0; i < this.iFRPGroupElems.toArray().length; i++) {
            let elem = this.iFRPGroupElems.toArray()[i];

            if (!elem.IsValid) {
                allItemsAreValid = false;
                break;
            }
        }




        return allItemsAreValid;
    }

    // Events 
    @Output() public AddNewClicked: EventEmitter<any> = new EventEmitter();


    // EventHandlers
    private onAddNewIFRPGroupTriggered() {
        this.AddNewClicked.emit();
    }
    private onRemoveIFRPGroupTriggered(iFRPGroupCLO: CLOs.IFactorRecordPropertiesGroup) {

        alert('remove triggered');
        //const index: number = this.viewModel.FactorRecordCLOs.indexOf(medicineFactorRecordCLO);

        //if (index !== -1) {
        //    this.viewModel.FactorRecordCLOs.splice(index, 1);
        //}
    }
}


interface ViewModel {
    IFRPGroupCLOs: CLOs.IFactorRecordPropertiesGroup[];
}

export interface IMedicineTypesSearchService {
    GetMedicineTypeByName(name: string): CLOs.MedicineTypeCLO;
    Search(searchString: string): string[];
}