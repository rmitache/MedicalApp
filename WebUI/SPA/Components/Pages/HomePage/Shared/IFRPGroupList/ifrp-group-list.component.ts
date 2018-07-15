// Angular and 3rd party stuff
import { Component, Input, EventEmitter, Output, ComponentRef, ViewChildren, QueryList, ApplicationRef  } from '@angular/core';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private readonly iFRPGroupCLOs: CLOs.AbstractMedicineFactorRecordCLO[];
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
    private isValid: boolean = false;
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

            if (!elem.GetValidState()) {
                allChildElemsAreValid = false;
                break;
            }
        }

        if (this.iFRPGroupCLOs.length === 0) {
            allChildElemsAreValid = false;
        }

        return allChildElemsAreValid;
    }
    private refreshIsValid() {
        let prevIsValid = this.isValid;
        this.isValid = this.checkChildrenAreValid();

        if (prevIsValid !== this.isValid) {
            this.ValidStateChanged.emit();
        }
    }

    // Constructor 
    constructor(
    ) {
        
    }
    ngOnInit() {
        this.viewModel.IFRPGroupCLOs = this.iFRPGroupCLOs;

        setTimeout(() => {
            this.refreshIsValid();
        }, 1);
    }

    // Public methods
    public GetValidState() {
        return this.isValid;
    }

    // Events 
    @Output() public AddNewClicked: EventEmitter<any> = new EventEmitter();
    @Output() public ValidStateChanged: EventEmitter<any> = new EventEmitter();


    // EventHandlers
    private onChildGroupElemValidStateChanged() {
        this.refreshIsValid();
    }
    private onAddNewIFRPGroupTriggered() {
        
        this.AddNewClicked.emit();

        setTimeout(() => {
            this.refreshIsValid();
        }, 1);
        
    }
    private onRemoveIFRPGroupTriggered(iFRPGroupCLO: CLOs.AbstractMedicineFactorRecordCLO) {

        const index: number = this.viewModel.IFRPGroupCLOs.indexOf(iFRPGroupCLO);

        if (index !== -1) {
            this.viewModel.IFRPGroupCLOs.splice(index, 1);
        }

        setTimeout(() => {
            this.refreshIsValid();
        }, 1);
    }
}


interface ViewModel {
    IFRPGroupCLOs: CLOs.AbstractMedicineFactorRecordCLO[];
}

export interface IMedicineTypesSearchService {
    GetMedicineTypeByName(name: string): CLOs.MedicineTypeCLO;
    Search(searchString: string): string[];
}