// Angular and 3rd party stuff
import { Component, Input, EventEmitter, Output, ComponentRef, ViewChildren, QueryList, ApplicationRef, ViewChild } from '@angular/core';
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
import { IFRPGroupElemComponent } from './IFRPGroupElem/ifrp-group-elem.component';
import { AutoComplete } from 'primeng/primeng';

// Components


@Component({
    selector: 'ifrp-group-list',
    templateUrl: './ifrp-group-list.component.html',
    styleUrls: ['./ifrp-group-list.component.css'],
    host: { 'class': 'ifrp-group-list' }
})
export class IFRPGroupListComponent {
    // Fields
    @Input('AvailableMedicineTypes')
    private readonly availableMedicineTypes: CLOs.MedicineTypeCLO[];
    @Input('IFRPGroupCLOs')
    private readonly iFRPGroupCLOs: CLOs.AbstractMedicineFactorRecordCLO[];
    private readonly medicineTypesSearchService: IMedicineTypesSearchService = {
        GetMedicineTypeByName: (name) => {
            return this.availableMedicineTypes.find(clo => {
                return clo.Name === name;
            });
        },
        Search: (searchString) => {

            // Return everything if searchString is passed as null
            if (searchString === null) {
                return this.availableMedicineTypes.map(clo => {
                    return clo.Name;
                });
            }

            // Properly parse a valid searchString
            searchString = searchString.toLowerCase();
            let matchingMedTypes = this.availableMedicineTypes.filter(clo => {
                return clo.Name.toLowerCase().includes(searchString);
            });
            let results = matchingMedTypes.map(clo => {
                return clo.Name;
            });

            // Add a special create new MedicineType option at the top
            let addNewMedTypeOption = "Register a new Supplement...";
            results.unshift(addNewMedTypeOption);

            return results;
        }
    };
    private isValid: boolean = false;
    @ViewChildren('IFRPGroupElems')
    private iFRPGroupElems: QueryList<IFRPGroupElemComponent>;
    @ViewChild('autocomplete')
    private autocomplete: AutoComplete;
    private readonly viewModel: ViewModel = {
        RuleItemCLOs: [],
        MedicineTypeSearchResults: null,
        SearchText: null,
        ShowSearchBar: false
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
    private createNewRuleItemFromMedTypeName(selectedMedicineTypeName: string) {

        // Get and load the medicineTypeCLO
        let newRuleItemCLO = this.genericCLOFactory.CreateDefaultClo(CLOs.MedicineRuleItemCLO);
        let medicineTypeCLO = this.medicineTypesSearchService.GetMedicineTypeByName(selectedMedicineTypeName);
        newRuleItemCLO.MedicineType = medicineTypeCLO;
        this.viewModel.RuleItemCLOs.push(newRuleItemCLO);


    }

    // Constructor 
    constructor(
        private readonly genericCLOFactory: GenericCLOFactory,

    ) {

    }
    ngOnInit() {
        this.viewModel.RuleItemCLOs = this.iFRPGroupCLOs;

        setTimeout(() => {
            this.refreshIsValid();
        }, 1);

        // Hack for DEVELOPMENT TESTING
        setTimeout(() => {
            var all = this.medicineTypesSearchService.Search("");
            this.onAddMedicineTypeItemSelected(all[1]);
            this.onAddMedicineTypeItemSelected(all[6]);
        }, 100);

        this.autocomplete.onBlur.subscribe(() => {

            setTimeout(() => {
                var isFocused = (document.activeElement === this.autocomplete.inputEL.nativeElement);
                if (!isFocused)
                    this.viewModel.ShowSearchBar = false;
            }, 100);

        });
    }

    // Public methods
    public GetValidState() {
        return this.isValid;
    }

    // Events 
    @Output() public AddNewClicked: EventEmitter<any> = new EventEmitter();
    @Output() public ValidStateChanged: EventEmitter<any> = new EventEmitter();
    @Output() public CreateNewMedicineTypeTriggered: EventEmitter<any> = new EventEmitter();

    // EventHandlers
    private onStartAddingSupplementsButtonClicked() {
        this.viewModel.ShowSearchBar = true;
        setTimeout(() => {
            this.autocomplete.focusInput();
        }, 1);
    }
    private onAddMedicineTypeTextBoxChanged(event) {

        let searchResults = this.medicineTypesSearchService.Search(event.query);
        this.viewModel.MedicineTypeSearchResults = searchResults;
    }
    private onAddMedicineTypeItemSelected(medTypeName) {

        // Open the popup to register a new MedType 
        if (medTypeName === "Register a new Supplement...") {
            this.CreateNewMedicineTypeTriggered.emit((newMedTypeCLO) => {
                this.createNewRuleItemFromMedTypeName(newMedTypeCLO.Name);
            });
            this.viewModel.SearchText = '';
            return;
        }

        // Or add a new factorRecord
        this.createNewRuleItemFromMedTypeName(medTypeName);
        this.viewModel.SearchText = '';
    }
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

        const index: number = this.viewModel.RuleItemCLOs.indexOf(iFRPGroupCLO);

        if (index !== -1) {
            this.viewModel.RuleItemCLOs.splice(index, 1);
        }

        setTimeout(() => {
            this.refreshIsValid();
        }, 1);
    }
}


interface ViewModel {
    RuleItemCLOs: CLOs.AbstractMedicineFactorRecordCLO[];
    MedicineTypeSearchResults: string[];
    SearchText: string;
    ShowSearchBar: boolean;
}

export interface IMedicineTypesSearchService {
    GetMedicineTypeByName(name: string): CLOs.MedicineTypeCLO;
    Search(searchString: string): string[];
}