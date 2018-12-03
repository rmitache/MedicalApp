// Angular and 3rd party stuff
import { Component, Input, EventEmitter, Output, ComponentRef, QueryList, ViewChildren, ViewChild, ApplicationRef, ViewContainerRef } from '@angular/core';
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
import { HealthLevelSelectorComponent } from './HealthLevelSelector/health-level-selector.component';
import { AutoComplete } from 'primeng/primeng';
import { SymptomEntryElemComponent } from './SymptomEntryElem/symptom-entry-elem.component';
import { SymptomTypeCLO } from 'SPA/DomainModel/clo-exports';
import { ModalDialogService } from '../../../../Core/Services/ModalDialogService/modal-dialog.service';
import { AddSymptomTypeDialogService } from '../AddSymptomTypeDialog/add-symptom-type-dialog.service';
import { SpinnerService } from '../../../../Core/Services/SpinnerService/spinner.service';



@Component({
    selector: 'add-health-status-dialog',
    templateUrl: './add-health-status-dialog.component.html',
    styleUrls: ['./add-health-status-dialog.component.css'],
    host: { 'class': 'add-health-status-dialog' }
})
export class AddHealthStatusDialogComponent implements IModalDialog {
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

            // Add a special create new SymptomType option at the top
            let addNewOption = "Add a new Symptom...";
            results.unshift(addNewOption);

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

        ShowRecentSymptomsDiv: false,
        RecentSymptomTypeCLOs: null,

        SymptomTypesSearchResults: [],
        SearchText: null
    };

    // Private methods
    private addNewSymptomEntry(symptomTypeName: string) {

        // Verify if the SymptomType already has been added
        let symptomTypeAlreadyAdded = this.viewModel.HealthStatusEntryCLO.SymptomEntries.find(symptomEntry => {
            return symptomEntry.SymptomType.Name === symptomTypeName;
        }) !== undefined;

        // If it hasn't been added yet
        if (!symptomTypeAlreadyAdded) {

            // Get the symptomTypeCLO
            let symptomTypeCLO = this.searchService.GetSymptomTypeByName(symptomTypeName);

            // Add a new entry
            let newSymptomEntry = this.genericCLOFactory.CreateDefaultClo(CLOs.SymptomEntryCLO);
            newSymptomEntry.SymptomType = symptomTypeCLO;
            this.viewModel.HealthStatusEntryCLO.SymptomEntries.push(newSymptomEntry);
        }
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
        private readonly dataService: HomePageDataService,
        private readonly addSymptomTypeDialogService: AddSymptomTypeDialogService,
        private viewContainerRef: ViewContainerRef,
        private readonly spinnerService: SpinnerService
    ) {
        this.availableSymptomTypes = this.dataService.GetSymptomTypesFromBundle().ToArray();
        this.viewModel.HealthStatusEntryCLO = this.genericCLOFactory.CreateDefaultClo(CLOs.HealthStatusEntryCLO);
        this.viewModel.HealthStatusEntryCLO.SymptomEntries = [];
    }
    ngOnInit() {
        this.viewModel.HealthStatusEntryCLO.OccurrenceDateTime = new Date();

        if (this.dialogInitParameters.recentSymptomTypes.length > 0) {
            this.viewModel.ShowRecentSymptomsDiv = true;
        }

    }

    // Public methods
    public SaveData(): Promise<CLOs.HealthStatusEntryCLO> {
        let saveDataPromise = this.dataService.AddHealthStatusEntry(this.viewModel.HealthStatusEntryCLO);
        return saveDataPromise;
    }
    public GetValidState() {
        return this.isValid;
    }

    // IModalDialog
    dialogInit(reference: ComponentRef<IModalDialog>, options?: IModalDialogOptions) {
        this.dialogInitParameters.recentSymptomTypes = options.data.recentSymptomTypes;
    }

    // Event handlers 
    private onShowSymptomsAreaTriggered() {
        this.viewModel.ShowSymptomEntriesOverlayDiv = false;

        this.viewModel.RecentSymptomTypeCLOs = this.dialogInitParameters.recentSymptomTypes;
    }
    private onRemoveSymptomTriggered(clo: CLOs.SymptomEntryCLO) {
        const index: number = this.viewModel.HealthStatusEntryCLO.SymptomEntries.indexOf(clo);

        if (index !== -1) {
            this.viewModel.HealthStatusEntryCLO.SymptomEntries.splice(index, 1);
        }
    }
    private onCloseRecentSymptomsTriggered() {
        this.viewModel.ShowRecentSymptomsDiv = false;
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
        if (value === "Add a new Symptom...") {
            let newCLO = this.genericCLOFactory.CreateDefaultClo(CLOs.SymptomTypeCLO);
            this.addSymptomTypeDialogService.Open(newCLO, this.viewContainerRef, (newSymptomTypeCLO) => {
                this.availableSymptomTypes.push(newSymptomTypeCLO);
                this.addNewSymptomEntry(newSymptomTypeCLO.Name);


                this.spinnerService.Hide();
            });
            this.viewModel.SearchText = '';
            return; 
        }


        this.addNewSymptomEntry(value);
        this.viewModel.SearchText = '';
    }
    private onRecentSymptomTypeClicked(symptomTypeCLO) {

        this.addNewSymptomEntry(symptomTypeCLO.Name);

        // Remove the SymptomType from the recents list
        var index = this.viewModel.RecentSymptomTypeCLOs.indexOf(symptomTypeCLO);
        this.viewModel.RecentSymptomTypeCLOs.splice(index, 1);

        // Hide the recent-symptoms-div if there are not recent-symptoms left
        if (this.viewModel.RecentSymptomTypeCLOs.length === 0) {
            this.viewModel.ShowRecentSymptomsDiv = false;
        }
    }
}


interface ViewModel {
    HealthStatusEntryCLO: CLOs.HealthStatusEntryCLO;
    ShowSymptomEntriesOverlayDiv: boolean;

    ShowRecentSymptomsDiv: boolean;
    RecentSymptomTypeCLOs: CLOs.SymptomTypeCLO[];

    SymptomTypesSearchResults: string[];
    SearchText: string;
}
export interface ISymptomTypesSearchService {
    GetSymptomTypeByName(name: string): CLOs.SymptomTypeCLO;
    Search(searchString: string): string[];

}