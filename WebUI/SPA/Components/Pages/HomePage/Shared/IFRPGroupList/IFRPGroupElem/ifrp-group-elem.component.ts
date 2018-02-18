import { Component, Input, EventEmitter, Output, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { IMedicineTypesSearchService } from 'SPA/Components/Pages/HomePage/Schedule/AddNewEvent/add-new-event.component';
import { AutoComplete } from 'primeng/primeng';


@Component({
    selector: 'ifrp-group-elem',
    templateUrl: './ifrp-group-elem.component.html',
    styleUrls: ['./ifrp-group-elem.component.css'],
    host: { 'class': 'ifrp-group-elem' }
})
export class IFRPGroupElemComponent {
    // Fields
    @Input('IFRPGroupCLO')
    private readonly iFRPGroupCLO: CLOs.IFactorRecordPropertiesGroup;
    @Input('MedicineTypeSearchService')
    private readonly medicineTypesSearchService: IMedicineTypesSearchService;
    @Output()
    public IsValid: boolean = false;
    @ViewChild('autocomplete') readonly autoCompleteComponentInstance: AutoComplete;
    @ViewChild(NgForm) form;

    private readonly unitDoseTypesEnum = Enums.UnitDoseType;
    private readonly unitsOfMeasureEnum = Enums.UnitOfMeasure;
    private readonly medicineInstructionsEnum = Enums.Instruction;

    private readonly viewModel: ViewModel = {
        IFRPGroupCLO: null,
        MedicineTypeName: '',
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

    // Constructor 
    constructor(
        private readonly cdRef: ChangeDetectorRef
    ) {
    }
    ngOnInit() {
        this.viewModel.IFRPGroupCLO = this.iFRPGroupCLO;
        
        this.form.
            valueChanges.
            subscribe(() => {
                this.IsValid = (this.form.valid === true);
                this.ValidStateChanged.emit();
            });
    }
    ngAfterViewInit() {

        // Auto-focus by default onto the autocomplete input field
        this.autoCompleteComponentInstance.domHandler.findSingle(this.autoCompleteComponentInstance.el.nativeElement, 'input').focus();
        this.cdRef.detectChanges();
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
        this.viewModel.MedicineTypeName = value;
        this.loadMedicineTypeByName(value);
        setTimeout(() => {
            this.viewModel.OverlayIsVisible = false;
        }, 100);

    }
}

interface ViewModel {
    IFRPGroupCLO: CLOs.IFactorRecordPropertiesGroup;
    MedicineTypeName: string;
    MedicineTypeSearchResults: string[];
    OverlayIsVisible: boolean;
    UserDefinedControlsAreLocked: boolean;
}


