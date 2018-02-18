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
import { IFRPGroupElemComponent } from 'SPA/Components/Pages/HomePage/Shared/IFRPGroupList/IFRPGroupElem/ifrp-group-elem.component';


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
    @Output()
    public IsValid: boolean = false;
    @ViewChildren('IFRPGroupElems')
    private iFRPGroupElems: QueryList<IFRPGroupElemComponent>;
    private readonly viewModel: ViewModel = {
        IFRPGroupCLOs: []
    };

    // Private methods
    private checkChildrenAreValid(): boolean {
        let allChildElemsAreValid = true;
        if (!this.iFRPGroupElems) {
            return false;
        }

        for (var i = 0; i < this.iFRPGroupElems.toArray().length; i++) {
            let elem = this.iFRPGroupElems.toArray()[i];

            if (!elem.IsValid) {
                allChildElemsAreValid = false;
                break;
            }
        }

        if (this.iFRPGroupCLOs.length === 0) {
            allChildElemsAreValid = false;
        }

        return allChildElemsAreValid;
    }
    // Constructor 
    constructor(
    ) { }
    ngOnInit() {
        this.viewModel.IFRPGroupCLOs = this.iFRPGroupCLOs;
    }


    // Events 
    @Output() public AddNewClicked: EventEmitter<any> = new EventEmitter();
    @Output() public ValidStateChanged: EventEmitter<any> = new EventEmitter();


    // EventHandlers
    private onChildGroupElemChanged() {
        this.IsValid = this.checkChildrenAreValid();
        this.ValidStateChanged.emit();
    }
    private onAddNewIFRPGroupTriggered() {
        this.AddNewClicked.emit();
    }
    private onRemoveIFRPGroupTriggered(iFRPGroupCLO: CLOs.IFactorRecordPropertiesGroup) {

        const index: number = this.viewModel.IFRPGroupCLOs.indexOf(iFRPGroupCLO);

        if (index !== -1) {
            this.viewModel.IFRPGroupCLOs.splice(index, 1);
        }

        this.IsValid = this.checkChildrenAreValid();
        this.ValidStateChanged.emit();
    }
}


interface ViewModel {
    IFRPGroupCLOs: CLOs.IFactorRecordPropertiesGroup[];
}

export interface IMedicineTypesSearchService {
    GetMedicineTypeByName(name: string): CLOs.MedicineTypeCLO;
    Search(searchString: string): string[];
}