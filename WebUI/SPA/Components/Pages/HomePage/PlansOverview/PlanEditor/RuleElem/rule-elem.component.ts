import { Component, Input, EventEmitter, Output, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { IMedicineTypesSearchService } from 'SPA/Components/Pages/HomePage/Schedule/AddNewEvent/add-new-event.component';
import { AutoComplete } from 'primeng/primeng';
import { Time } from 'SPA/Core/Helpers/DataStructures/data-structures';
import { ParseStringToTime } from 'SPA/Core/Helpers/DataStructures/misc';


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
    private readonly ordinalFreqTypesEnum = Enums.OrdinalFrequency;
    private readonly ruleFreqTypesEnum = Enums.RuleFrequencyType;
    private readonly viewModel: ViewModel = {
        RuleCLO: null,
        HideNonDailyControlsDiv: true,
        MomentsInDayAsStrings: null
    };


    // Constructor 
    constructor(
        private readonly cdRef: ChangeDetectorRef
    ) {
    }
    ngOnInit() {
        this.viewModel.RuleCLO = this.ruleCLO;
        this.viewModel.MomentsInDayAsStrings = this.viewModel.RuleCLO.MomentsInDay.map(time => time.ToString());

        this.form.
            valueChanges.
            subscribe(() => {
                this.IsValid = (this.form.valid === true);
                this.viewModel.HideNonDailyControlsDiv = (this.viewModel.RuleCLO.FrequencyType == Enums.RuleFrequencyType.Day);
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
    private onAddMomentInDay(value: string) {
        let time = ParseStringToTime(value);
        

        if (time !== null) {
            this.viewModel.RuleCLO.MomentsInDay.push(time);
        } else {
            this.viewModel.MomentsInDayAsStrings.pop();
        }
    }
    private onRemoveMomentInDay(value: string) {
        var index = this.viewModel.RuleCLO.MomentsInDay.findIndex(item => item.ToString() === value);
        if (index === -1) {
            throw new Error('cannot find Time in MomentsInDay with value =' + value);
        }
        this.viewModel.RuleCLO.MomentsInDay.splice(index, 1);
    }
    
    
}

interface ViewModel {
    RuleCLO: CLOs.RuleCLO;
    HideNonDailyControlsDiv: boolean;
    MomentsInDayAsStrings: string[];
}


