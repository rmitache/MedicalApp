// Angular and 3rd party stuff
import { Component, Input, EventEmitter, Output, ViewChild, ElementRef, ChangeDetectorRef} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AutoComplete } from 'primeng/primeng';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Project modules
import * as Enums from 'SPA/DomainModel/enum-exports';
import { IMedicineTypesSearchService } from 'SPA/Components/Pages/HomePage/Schedule/AddNewEvent/add-new-event.component';
import * as CLOs from 'SPA/DomainModel/clo-exports';


@Component({
    selector: 'ifrp-group-elem',
    templateUrl: './ifrp-group-elem.component.html',
    styleUrls: ['./ifrp-group-elem.component.css'],
    host: { 'class': 'ifrp-group-elem' }
})
export class IFRPGroupElemComponent {
    // Fields
    @Input('IFRPGroupCLO')
    private readonly iFRPGroupCLO: CLOs.IMedicineFactorRecord;
    @Input('MedicineTypeSearchService')
    private readonly medicineTypesSearchService: IMedicineTypesSearchService;
    private isValid: boolean = false;
    @ViewChild('autocomplete')
    readonly autoCompleteComponentInstance: AutoComplete;
    private reactiveForm: FormGroup;
    
    private readonly unitDoseTypesEnum = Enums.UnitDoseType;
    private readonly unitsOfMeasureEnum = Enums.UnitOfMeasure;
    private readonly medicineInstructionsEnum = Enums.Instruction;

    private readonly viewModel: ViewModel = {
        IFRPGroupCLO: null,
        MedicineTypeSearchResults: [],
        OverlayIsVisible: true,
        UserDefinedControlsAreLocked: true
    };

    // Private methods
    private loadMedicineTypeByName(selectedMedicineTypeName: string) {

        // Get and load the medicineTypeCLO
        let medicineTypeCLO = this.medicineTypesSearchService.GetMedicineTypeByName(selectedMedicineTypeName);
        this.viewModel.IFRPGroupCLO.MedicineType = medicineTypeCLO;

        // Handle fields
        if (medicineTypeCLO.IsPackagedIntoUnitDoses() === true) {
            this.viewModel.IFRPGroupCLO.UnitDoseQuantifier = 1;
            this.viewModel.IFRPGroupCLO.UnitDoseType = medicineTypeCLO.PackagedUnitDoseType;
            this.viewModel.IFRPGroupCLO.UnitDoseSize = medicineTypeCLO.PackagedUnitDoseSize;
            this.viewModel.IFRPGroupCLO.UnitDoseUoM = medicineTypeCLO.PackagedUnitDoseUoM;

            // Make the controls readonly
            this.viewModel.UserDefinedControlsAreLocked = true;
        }
        else {

            this.viewModel.IFRPGroupCLO.UnitDoseQuantifier = 1;
            this.viewModel.IFRPGroupCLO.UnitDoseType = Enums.UnitDoseType.Teaspoons;
            this.viewModel.IFRPGroupCLO.UnitDoseSize = 100;
            this.viewModel.IFRPGroupCLO.UnitDoseUoM = Enums.UnitOfMeasure.mg;

            // Unlock the controls
            this.viewModel.UserDefinedControlsAreLocked = false;
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
            unitdoseuom: null,
            instruction: null
        });
    }
    ngOnInit() {
        this.viewModel.IFRPGroupCLO = this.iFRPGroupCLO;

        this.reactiveForm
            .statusChanges
            .subscribe((newStatus) => {
                this.refreshIsValid();
                
            });
        
        //
        if (this.iFRPGroupCLO.MedicineType !== null) {
            this.reactiveForm.get('medicineTypeName').setValue(this.iFRPGroupCLO.MedicineType.Name);
            this.viewModel.UserDefinedControlsAreLocked = (this.iFRPGroupCLO.MedicineType.IsPackagedIntoUnitDoses() === true);
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
        this.RemoveClicked.emit(this.iFRPGroupCLO);
    }
    private onMedicineTypeTextBoxChanged(event) {

        let searchResults = this.medicineTypesSearchService.Search(event.query);
        this.viewModel.MedicineTypeSearchResults = searchResults;

    }
    private onMedicineTypeSelected(value) {
        this.loadMedicineTypeByName(value);
        setTimeout(() => {
            this.viewModel.OverlayIsVisible = false;
        }, 1);

    }
}

interface ViewModel {
    IFRPGroupCLO: CLOs.IMedicineFactorRecord;
    MedicineTypeSearchResults: string[];
    OverlayIsVisible: boolean;
    UserDefinedControlsAreLocked: boolean;
}


