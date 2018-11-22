// Angular and 3rd party stuff
import { Component, Input, EventEmitter, Output, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NgForm, AbstractControl } from '@angular/forms';
import { AutoComplete } from 'primeng/primeng';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

// Project modules
import * as Enums from 'SPA/DomainModel/enum-exports';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import { IMedicineTypesSearchService } from 'SPA/Components/Pages/HomePage/Shared/i-medicine-types-search-service';

@Component({
    selector: 'ifrp-group-elem',
    templateUrl: './ifrp-group-elem.component.html',
    styleUrls: ['./ifrp-group-elem.component.css'],
    host: { 'class': 'ifrp-group-elem' }
})
export class IFRPGroupElemComponent {
    // Fields
    @Input('IFRPGroupCLO')
    private readonly iFRPGroupCLO: CLOs.AbstractMedicineFactorRecordCLO;
    @Input('MedicineTypeSearchService')
    private readonly medicineTypesSearchService: IMedicineTypesSearchService;
    private isValid: boolean = false;
    @ViewChild('autocomplete')
    readonly autoCompleteComponentInstance: AutoComplete;
    private reactiveForm: FormGroup;

    private readonly viewModel: ViewModel = {
        IFRPGroupCLO: null,
        MedicineTypeSearchResults: [],

        UnitDoseTypesEnum: {},
        OverlayIsVisible: true,
        UserDefinedControlsAreLocked: true,

        SearchText: null
    };

    // Private methods
    private loadMedicineTypeByName(selectedMedicineTypeName: string) {

        // Get and load the medicineTypeCLO
        let factorRecordCLO = this.viewModel.IFRPGroupCLO;
        let medicineTypeCLO = this.medicineTypesSearchService.GetMedicineTypeByName(selectedMedicineTypeName);
        factorRecordCLO.MedicineType = medicineTypeCLO;


        // Handle fields for factorRecord
        factorRecordCLO.UnitDoseQuantifier = 1;
        if (medicineTypeCLO.IsPackagedIntoUnits === true) {
            factorRecordCLO.HasUserDefinedUnitDose = false;
            factorRecordCLO.UserDefinedUnitDoseType = null;
            factorRecordCLO.UserDefinedUnitDoseSize = null;

            // Make the controls readonly and load enum values
            this.viewModel.UserDefinedControlsAreLocked = true;
            this.viewModel.UnitDoseTypesEnum = Enums.PackagedUnitDoseType;
        }
        else {
            factorRecordCLO.HasUserDefinedUnitDose = true;
            factorRecordCLO.UserDefinedUnitDoseType = 0;
            factorRecordCLO.UserDefinedUnitDoseSize = 100;

            // Unlock the controls
            this.viewModel.UserDefinedControlsAreLocked = false;
            this.viewModel.UnitDoseTypesEnum = Enums.UserDefinedUnitDoseType;
        }
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
        private readonly fb: FormBuilder,
        private readonly cdRef: ChangeDetectorRef,

    ) {
        this.reactiveForm = this.fb.group({
            medicineTypeName: ['',
                Validators.compose([
                    Validators.required])],
            unitDoseQuantifierInput: [null,
                Validators.compose([
                    Validators.required,
                    Validators.min(1),
                    Validators.pattern(new RegExp(/^\d+$/))])],
            unitdosetype: null,
            unitdosesize: [null,
                Validators.compose([
                    Validators.required,
                    Validators.min(1),
                    Validators.pattern(new RegExp(/^\d+$/))])],
        });
    }
    ngOnInit() {
        this.viewModel.IFRPGroupCLO = this.iFRPGroupCLO;


        // Special autosuggest validator (as a quick-fix for the ForceSelection bug)
        this.reactiveForm.get('medicineTypeName').setValidators([(control: AbstractControl) => {
            return autosuggestMustMatchSuggestions(control as FormGroup, this.medicineTypesSearchService);
        }]);


        //
        this.reactiveForm
            .statusChanges
            .subscribe((newStatus) => {
                this.refreshIsValid();

            });

        //
        if (this.iFRPGroupCLO.MedicineType !== null) {
            this.reactiveForm.get('medicineTypeName').setValue(this.iFRPGroupCLO.MedicineType.Name);
            this.viewModel.SearchText = this.iFRPGroupCLO.MedicineType.Name;
            this.viewModel.OverlayIsVisible = false;

            //
            if (this.iFRPGroupCLO.MedicineType.IsPackagedIntoUnits === true) {
                this.viewModel.UserDefinedControlsAreLocked = true;
                this.viewModel.UnitDoseTypesEnum = Enums.PackagedUnitDoseType;
            } else {
                this.viewModel.UserDefinedControlsAreLocked = false;
                this.viewModel.UnitDoseTypesEnum = Enums.UserDefinedUnitDoseType;
            }

        }

    }

    // Public methods
    public GetValidState() {
        return this.isValid;
    }
    public SetMedicineType(name) {
        
        this.loadMedicineTypeByName(name);
        setTimeout(() => {
            this.viewModel.OverlayIsVisible = false;
            this.viewModel.SearchText = name;
        }, 1);
    }

    // Events 
    @Output() public RemoveClicked: EventEmitter<any> = new EventEmitter();
    @Output() public ValidStateChanged: EventEmitter<any> = new EventEmitter();
    @Output() public AddNewMedicineTypeTriggered: EventEmitter<any> = new EventEmitter();

    // EventHandlers
    private onRemoveClicked() {
        this.RemoveClicked.emit(this.iFRPGroupCLO);
    }
    private onMedicineTypeTextBoxChanged(event) {
        
        let searchResults = this.medicineTypesSearchService.Search(event.query);
        this.viewModel.MedicineTypeSearchResults = searchResults;      
    }
    private onMedicineTypeSelected(value) {
        if (value === "Add a new Medicine Type...") {
            this.AddNewMedicineTypeTriggered.emit(this);
            this.viewModel.SearchText = '';
            return;
        }


        this.loadMedicineTypeByName(value);
        setTimeout(() => {
            this.viewModel.OverlayIsVisible = false;
        }, 1);
    }
    private onUnitDoseSizeChanged(value) {
        if (this.viewModel.IFRPGroupCLO.HasUserDefinedUnitDose === true) {
            this.viewModel.IFRPGroupCLO.UserDefinedUnitDoseSize = value;
        }
    }
    private onUnitDoseTypeChanged(value) {
        if (this.viewModel.IFRPGroupCLO.HasUserDefinedUnitDose === true) {
            this.viewModel.IFRPGroupCLO.UserDefinedUnitDoseType = value;
        }
    }
}

interface ViewModel {
    IFRPGroupCLO: CLOs.AbstractMedicineFactorRecordCLO;
    MedicineTypeSearchResults: string[];

    UnitDoseTypesEnum: any;
    OverlayIsVisible: boolean;
    UserDefinedControlsAreLocked: boolean;

    SearchText: string;
}


function autosuggestMustMatchSuggestions(control: AbstractControl, searchService: IMedicineTypesSearchService) {
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