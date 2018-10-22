// Angular and 3rd party stuff
import { Component, Input, EventEmitter, Output, ComponentRef, QueryList, ViewChildren, ViewChild, ApplicationRef } from '@angular/core';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators, ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';

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
import { SymptomEntryElemComponent } from 'SPA/Components/Pages/HomePage/HealthGraph/AddNewHealthStatusEntry/SymptomEntryElem/symptom-entry-elem.component';
import { HealthLevelSelectorComponent } from './HealthLevelSelector/health-level-selector.component';
import { AutoComplete } from 'primeng/primeng';



@Component({
    selector: 'add-new-health-status-entry',
    templateUrl: './add-new-health-status-entry.component.html',
    styleUrls: ['./add-new-health-status-entry.component.css'],
    host: { 'class': 'add-new-health-status-entry' }
})
export class AddNewHealthStatusEntryComponent implements IModalDialog {
    // Fields
    private isValid: boolean = false;
    @ViewChildren('symptomEntryElems')
    private symptomEntryElems: QueryList<SymptomEntryElemComponent>;
    private searchService: ISymptomTypesSearchService = {
        GetSymptomTypeByName: (name) => {
            return this.availableSymptomTypes.find(clo => {
                return clo.Name === name;
            });
        },
        Search: (searchString) => {
            // Return everything if searchString is passed as null
            if (searchString === null) {
                return this.availableSymptomTypes.map(clo => {
                    return clo.Name;
                });
            }

            // Properly parse a valid searchString
            searchString = searchString.toLowerCase();
            let matchingMedTypes = this.availableSymptomTypes.filter(clo => {
                return clo.Name.toLowerCase().includes(searchString);
            });
            let results = matchingMedTypes.map(clo => {
                return clo.Name;
            });

            return results;
        }
    };
    @ViewChild('autocomplete')
    readonly autoCompleteComponentInstance: AutoComplete;
    private readonly availableSymptomTypes: CLOs.SymptomTypeCLO[];
    private readonly dialogInitParameters = {
        recentSymptomTypes: null
    };
    private readonly viewModel: ViewModel = {
        HealthStatusEntryCLO: null,
        ShowSymptomEntriesOverlayDiv: true,
        SymptomTypesSearchResults: [],
        SearchText: null
    };

    // Private methods
    private addNewSymptomEntry(symptomTypeName: string) {

        // Get the symptomTypeCLO
        let symptomTypeCLO = this.searchService.GetSymptomTypeByName(symptomTypeName);

        // Create a new entry
        let newSymptomEntry = this.genericCLOFactory.CreateDefaultClo(CLOs.SymptomEntryCLO);
        newSymptomEntry.SymptomType = symptomTypeCLO;
        this.viewModel.HealthStatusEntryCLO.SymptomEntries.push(newSymptomEntry);
    }
    private checkChildrenAreValid(): boolean {

        let allChildElemsAreValid = true;
        if (!this.symptomEntryElems) {
            return false;
        }

        for (var i = 0; i < this.symptomEntryElems.toArray().length; i++) {

            let elem = this.symptomEntryElems.toArray()[i];

            if (!elem.GetValidState()) {
                allChildElemsAreValid = false;
                break;
            }
        }

        //if (this.symptomEntryElems.length === 0) {
        //    allChildElemsAreValid = false;
        //}

        return allChildElemsAreValid;
    }
    private refreshIsValid() {
        let prevIsValid = this.isValid;
        this.isValid = this.checkChildrenAreValid()
            && this.viewModel.HealthStatusEntryCLO.HealthLevel !== Enums.HealthLevel.Unspecified;
    }

    // Constructor 
    constructor(
        private readonly genericCLOFactory: GenericCLOFactory,
        private readonly globalDataService: HomePageDataService,
    ) {
        this.availableSymptomTypes = this.globalDataService.GetSymptomTypesFromBundle().ToArray();
        this.viewModel.HealthStatusEntryCLO = this.genericCLOFactory.CreateDefaultClo(CLOs.HealthStatusEntryCLO);
        this.viewModel.HealthStatusEntryCLO.SymptomEntries = [];
    }
    ngOnInit() {
        this.viewModel.HealthStatusEntryCLO.OccurrenceDateTime = new Date();

        
        
    }

    // Public methods
    public SaveData(): Promise<CLOs.HealthStatusEntryCLO> {
        let saveDataPromise = this.globalDataService.AddHealthStatusEntry(this.viewModel.HealthStatusEntryCLO);
        return saveDataPromise;
    }
    public GetValidState() {
        return this.isValid;
    }

    // IModalDialog
    dialogInit(reference: ComponentRef<IModalDialog>, options?: IModalDialogOptions) {
        this.dialogInitParameters.recentSymptomTypes = options.data.recentSymptomTypes;
    }

    // Event handlers onRemoveSymptomEntryElemTriggered
    private onSymptomEntryElemValidStateChanged() {
        this.refreshIsValid();
    }
    private onRegisterSymptomsTriggered() {
        this.viewModel.ShowSymptomEntriesOverlayDiv = false;


        // Add recent symptom types
        for (let i = 0; i < this.dialogInitParameters.recentSymptomTypes.length; i++) {
            let recentSymptomType = this.dialogInitParameters.recentSymptomTypes[i];

            let newSymptomEntry = this.genericCLOFactory.CreateDefaultClo(CLOs.SymptomEntryCLO);
            newSymptomEntry.SymptomType = recentSymptomType;
            this.viewModel.HealthStatusEntryCLO.SymptomEntries.push(newSymptomEntry);
        }
    }
    private onAddNewSymptomEntryTriggered() {
        this.viewModel.HealthStatusEntryCLO.SymptomEntries.push(this.genericCLOFactory.CreateDefaultClo(CLOs.SymptomEntryCLO));

        setTimeout(() => {
            this.refreshIsValid();
        }, 1);
    }
    private onRemoveSymptomTriggered(clo: CLOs.SymptomEntryCLO) {
        const index: number = this.viewModel.HealthStatusEntryCLO.SymptomEntries.indexOf(clo);

        if (index !== -1) {
            this.viewModel.HealthStatusEntryCLO.SymptomEntries.splice(index, 1);
        }

        setTimeout(() => {
            this.refreshIsValid();
        }, 1);
    }
    private onRemoveAllSymptomsTriggered() {
        this.viewModel.HealthStatusEntryCLO.SymptomEntries = [];

        setTimeout(() => {
            this.refreshIsValid();
        }, 1);
    }
    private onHealthLevelSelected(newHealthLevel: Enums.HealthLevel) {
        this.viewModel.HealthStatusEntryCLO.HealthLevel = newHealthLevel;
        this.refreshIsValid();
    }
    private onSymptomTypeTextBoxChanged(event) {
        let searchResults = this.searchService.Search(event.query);

        this.viewModel.SymptomTypesSearchResults = searchResults;
    }
    private onSymptomTypeSelected(value) {

        // Verify if the SymptomType already has been added
        let symptomTypeAlreadyAdded = this.viewModel.HealthStatusEntryCLO.SymptomEntries.find(symptomEntry => {
            return symptomEntry.SymptomType.Name === value;
        }) !== undefined;

        // If it hasnt already been added, add it
        if (!symptomTypeAlreadyAdded) {
            this.addNewSymptomEntry(value);
            this.viewModel.SearchText = '';
        }

        
    }
}


interface ViewModel {
    HealthStatusEntryCLO: CLOs.HealthStatusEntryCLO;
    ShowSymptomEntriesOverlayDiv: boolean;
    SymptomTypesSearchResults: string[];
    SearchText: string;
}
export interface ISymptomTypesSearchService {
    GetSymptomTypeByName(name: string): CLOs.SymptomTypeCLO;
    Search(searchString: string): string[];

}