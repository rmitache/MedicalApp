import { Component, Input, EventEmitter, Output, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { IMedicineTypesSearchService } from 'SPA/Components/Pages/HomePage/Schedule/AddNewEvent/add-new-event.component';
import { AutoComplete } from 'primeng/primeng';


@Component({
    selector: 'rule-elem',
    templateUrl: './rule-elem.component.html',
    styleUrls: ['./rule-elem.component.css'],
    host: { 'class': 'rule-elem' }
})
export class RuleElemComponent {
    // Fields
    @Input('Rule')
    private readonly ruleCLO: CLOs.RuleCLO;
    @Input('MedicineSearchService')
    private readonly medicineTypesSearchService: IMedicineTypesSearchService;
    @Output()
    public IsValid: boolean = false;
    @ViewChild(NgForm) form;
    private readonly unitDoseTypesEnum = Enums.UnitDoseType;
    private readonly viewModel: ViewModel = {
        RuleCLO: null
    };


    // Constructor 
    constructor(
        private readonly cdRef: ChangeDetectorRef
    ) {
    }
    ngOnInit() {
        this.viewModel.RuleCLO = this.ruleCLO;

        this.form.
            valueChanges.
            subscribe(() => {
                this.IsValid = (this.form.valid === true);
            });
    }
    ngAfterViewInit() {

    }

    // Events 
    @Output() public RemoveClicked: EventEmitter<any> = new EventEmitter();


    // EventHandlers
    private onRemoveRuleClicked() {
        this.RemoveClicked.emit(this.ruleCLO);
    }
    
}

interface ViewModel {
    RuleCLO: CLOs.RuleCLO;
}


