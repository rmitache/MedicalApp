// Angular and 3rd party stuff
import { Component, Input, EventEmitter, Output, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';

// Project modules
import * as Enums from 'SPA/DomainModel/enum-exports';
import * as DataStructures from 'SPA/Core/Helpers/DataStructures/data-structures';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import { Time } from 'SPA/Core/Helpers/DataStructures/data-structures';
import { HomePageDataService } from 'SPA/Components/Pages/HomePage/home-page-data.service';
import { GenericCLOFactory } from 'SPA/DomainModel/generic-clo.factory';
import { IFRPGroupListComponent } from '../IFRPGroupList/ifrp-group-list.component';

// Components



@Component({
    selector: 'rule-elem',
    templateUrl: './rule-elem.component.html',
    styleUrls: ['./rule-elem.component.css'],
    host: { 'class': 'rule-elem' }
})
export class RuleElemComponent {
    // Fields
    @Input('RuleCLO')
	private readonly ruleCLO: CLOs.RuleCLO;
	@Input('AvailableMedicineTypes')
	private readonly availableMedicineTypes: CLOs.MedicineTypeCLO[];
    private isValid: boolean = false;

    @ViewChild(NgForm)
    private form;

    @ViewChild('ifrpgrouplist')
    private groupList: IFRPGroupListComponent;
    private readonly ordinalFreqTypesEnum = Enums.OrdinalFrequencyType;
    private readonly ruleFreqTypesEnum = Enums.RuleFrequencyType;
    private readonly viewModel: ViewModel = {
        RuleCLO: null,
        HideNonDailyControlsDiv: true,
        MomentsInDayAsStrings: null,
        ShowChipsInputInvalid: false
    };

    // Private methods
    private refreshIsValid() {
        // Special hack for custom validation for chipsInput
        this.viewModel.ShowChipsInputInvalid = this.viewModel.MomentsInDayAsStrings.length < 1;

        //
        let prevIsValid = this.isValid;
        this.isValid = !this.viewModel.ShowChipsInputInvalid && this.groupList.GetValidState();

        if (prevIsValid !== this.isValid) {
            this.ValidStateChanged.emit();
            
        }
    }

    // Constructor 
    constructor(
        private readonly genericCLOFactory: GenericCLOFactory,
    ) {

    }
    ngOnInit() {
        
        this.viewModel.RuleCLO = this.ruleCLO;
        this.viewModel.MomentsInDayAsStrings = this.viewModel.RuleCLO.MomentsInDay.map(time => time.ToString());
        this.form.
            valueChanges.
            subscribe(() => {
                this.refreshIsValid();
                this.viewModel.HideNonDailyControlsDiv = (this.viewModel.RuleCLO.FrequencyType == Enums.RuleFrequencyType.Day);
                if (this.viewModel.HideNonDailyControlsDiv ) {
                    this.viewModel.RuleCLO.DaysInWeek.ResetAllDaysToTrue();
                }
            });
    }
    

    // Public methods
    public GetValidState() {
        return this.isValid;
    }

    // Events 
    @Output() public RemoveClicked: EventEmitter<any> = new EventEmitter();
    @Output() public ValidStateChanged: EventEmitter<any> = new EventEmitter();
    @Output() public AddNewMedicineTypeTriggered: EventEmitter<any> = new EventEmitter();

    // EventHandlers
    private onAddNewMedicineTypeTriggered(sourceComponent) {
        this.AddNewMedicineTypeTriggered.emit(sourceComponent);
       
    }
    private onGroupListValidStateChanged() {
        this.refreshIsValid();
    }
    private onAddIFRPGroupTriggered() {
        this.viewModel.RuleCLO.MedicineRuleItems.push(this.genericCLOFactory.CreateDefaultClo(CLOs.MedicineRuleItemCLO));
    }
    private onRemoveClicked() {
        this.RemoveClicked.emit(this.ruleCLO);
    }
    private onAddMomentInDayChip(value: string) {
        let time = Time.ParseString(value);

        if (time !== null) {
            this.viewModel.RuleCLO.MomentsInDay.push(time);
        } else {
            this.viewModel.MomentsInDayAsStrings.pop();
        }
        this.refreshIsValid();
    }
    private onRemoveMomentInDayChip(value: string) {
        var index = this.viewModel.RuleCLO.MomentsInDay.findIndex(item => item.ToString() === value);
        if (index === -1) {
            throw new Error('cannot find Time in MomentsInDay with value =' + value);
        }
        this.viewModel.RuleCLO.MomentsInDay.splice(index, 1);

        this.refreshIsValid();
    }


}

interface ViewModel {
    RuleCLO: CLOs.RuleCLO;
    HideNonDailyControlsDiv: boolean;
    MomentsInDayAsStrings: string[];
    ShowChipsInputInvalid: boolean;
}


