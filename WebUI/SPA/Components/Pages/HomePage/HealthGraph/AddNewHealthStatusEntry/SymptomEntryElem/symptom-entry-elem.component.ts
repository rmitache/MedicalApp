// Angular and 3rd party stuff
import { Component, Input, EventEmitter, Output, ViewChild, ElementRef, ChangeDetectorRef} from '@angular/core';
import { NgForm, AbstractControl } from '@angular/forms';
import { AutoComplete } from 'primeng/primeng';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Project modules
import * as Enums from 'SPA/DomainModel/enum-exports';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import { ISymptomTypesSearchService } from 'SPA/Components/Pages/HomePage/HealthGraph/AddNewHealthStatusEntry/add-new-health-status-entry.component';


@Component({
    selector: 'symptom-entry-elem',
    templateUrl: './symptom-entry-elem.component.html',
    styleUrls: ['./symptom-entry-elem.component.css'],
    host: { 'class': 'symptom-entry-elem' }
})
export class SymptomEntryElemComponent {
    // Fields
    @Input('SymptomEntryCLO')
    private readonly symptomEntryCLO: CLOs.SymptomEntryCLO;
    @Input('SymptomTypeSearchService')
    private readonly symptomTypeSearchService: ISymptomTypesSearchService;
    private isValid: boolean = false;
    @ViewChild('autocomplete')
    readonly autoCompleteComponentInstance: AutoComplete;
    private reactiveForm: FormGroup;
    private readonly symptomIntensityLevelsEnum = Enums.SymptomIntensityLevel;
    private readonly viewModel: ViewModel = {
        SymptomEntryCLO: null,
        SymptomTypeSearchResults: [],
        OverlayIsVisible: true
    };

    // Private methods
    private loadSymptomTypeByName(selectedSymptomTypeName: string) {

        // Get and load the symptomTypeCLO
        let symptomTypeCLO = this.symptomTypeSearchService.GetSymptomTypeByName(selectedSymptomTypeName);
        this.viewModel.SymptomEntryCLO.SymptomType = symptomTypeCLO;
       
    }
    private refreshIsValid() {
        let prevIsValid = this.isValid;
        this.isValid = this.reactiveForm.valid;

        if (prevIsValid !== this.isValid) {
            this.ValidStateChanged.emit();
        }
    }

    // Constructor 
    constructor(
        private fb: FormBuilder,
        private readonly cdRef: ChangeDetectorRef,
        
    ) {
        this.reactiveForm = this.fb.group({
            symptomTypeName: ['',
                Validators.compose([
                    Validators.required])],
            symptomIntensityLevelInput: null
        });
    }
    ngOnInit() {
        this.viewModel.SymptomEntryCLO = this.symptomEntryCLO;

        // Special autosuggest validator (as a quick-fix for the ForceSelection bug)
        this.reactiveForm.get('symptomTypeName').setValidators([(control: AbstractControl) => {
            return autosuggestMustMatchSuggestions(control as FormGroup, this.symptomTypeSearchService);
        }]);

        this.reactiveForm
            .statusChanges
            .subscribe((newStatus) => {
                this.refreshIsValid();
                
            });
        
        //
        if (this.symptomEntryCLO.SymptomType !== null) {
            this.reactiveForm.get('symptomTypeName').setValue(this.symptomEntryCLO.SymptomType.Name);
            this.viewModel.OverlayIsVisible = false;
        }
    }

    // Public methods
    public GetValidState() {
        return this.isValid;
    }

    // Events 
    @Output() public RemoveClicked: EventEmitter<any> = new EventEmitter();
    @Output() public ValidStateChanged: EventEmitter<any> = new EventEmitter();

    // EventHandlers
    private onRemoveClicked() {
        this.RemoveClicked.emit(this.symptomEntryCLO);
    }
    private onSymptomTypeTextBoxChanged(event) {

        let searchResults = this.symptomTypeSearchService.Search(event.query);
        this.viewModel.SymptomTypeSearchResults = searchResults;
    }
    private onSymptomTypeSelected(value) {
        this.loadSymptomTypeByName(value);
        setTimeout(() => {
            this.viewModel.OverlayIsVisible = false;
        }, 1);

    }
}

interface ViewModel {
    SymptomEntryCLO: CLOs.SymptomEntryCLO;
    SymptomTypeSearchResults: string[];
    OverlayIsVisible: boolean;
}


function autosuggestMustMatchSuggestions(control: AbstractControl, searchService: ISymptomTypesSearchService) {
    // Find out if the current value of the control matches exactly a suggestion from the list
    var allSuggestions = searchService.Search(null);
    var currentTextEntered = control.value;
    var textMatchesSuggestionInList = false;
    for (let i = 0; i < allSuggestions.length; i++) {
        let suggestion = allSuggestions[i];

        if (suggestion === currentTextEntered) {
            textMatchesSuggestionInList = true;
            break;
        }
    };

    // Validate based on above logic 
    if (textMatchesSuggestionInList) {
        return null;
    } else {
        return { doesntMatchItemInList: true };
    }
}