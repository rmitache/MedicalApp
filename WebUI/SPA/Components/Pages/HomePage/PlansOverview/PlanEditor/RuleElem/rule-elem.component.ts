// Angular and 3rd party stuff
import { Component, Input, EventEmitter, Output, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';

// Project modules
import * as Enums from 'SPA/DomainModel/enum-exports';
import * as DataStructures from 'SPA/Core/Helpers/DataStructures/data-structures';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import { IMedicineTypesSearchService } from 'SPA/Components/Pages/HomePage/Schedule/AddNewEvent/add-new-event.component';
import { Time } from 'SPA/Core/Helpers/DataStructures/data-structures';
import { GlobalDataService } from 'SPA/Components/Pages/HomePage/global-data.service';
import { GenericCLOFactory } from 'SPA/DomainModel/generic-clo.factory';

// Components
import { IFRPGroupListComponent } from 'SPA/Components/Pages/HomePage/Shared/IFRPGroupList/ifrp-group-list.component';



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
    @Input('MedicineSearchService')
    private readonly medicineTypesSearchService: IMedicineTypesSearchService;
    private readonly availableMedicineTypes: DataStructures.List<CLOs.MedicineTypeCLO>;
    @Output()
    public IsValid: boolean;
    @ViewChild(NgForm)
    private form;
    @ViewChild('ifrpgrouplist')
    private groupList: IFRPGroupListComponent;
    private readonly ordinalFreqTypesEnum = Enums.OrdinalFrequencyType;
    private readonly ruleFreqTypesEnum = Enums.RuleFrequencyType;
    private readonly viewModel: ViewModel = {
        RuleCLO: null,
        HideNonDailyControlsDiv: true,
        MomentsInDayAsStrings: null
    };


    // Constructor 
    constructor(
        private readonly genericCLOFactory: GenericCLOFactory,
        private readonly globalDataService: GlobalDataService

    ) {
        this.availableMedicineTypes = this.globalDataService.GetMedicineTypesFromBundle();

    }
    ngOnInit() {
        this.viewModel.RuleCLO = this.ruleCLO;
        this.viewModel.MomentsInDayAsStrings = this.viewModel.RuleCLO.MomentsInDay.map(time => time.ToString());

        this.form.
            valueChanges.
            subscribe(() => {
                this.IsValid = /*(this.form.valid === true) && */this.groupList.IsValid;
                this.viewModel.HideNonDailyControlsDiv = (this.viewModel.RuleCLO.FrequencyType == Enums.RuleFrequencyType.Day);
            });
    }
    ngAfterViewInit() {

    }

    // Events 
    @Output() public RemoveClicked: EventEmitter<any> = new EventEmitter();
    @Output() public ValidStateChanged: EventEmitter<any> = new EventEmitter();


    // EventHandlers
    private onChildGroupListChanged() {
        this.IsValid = this.groupList.IsValid;
        this.ValidStateChanged.emit();
    }
    private onAddIFRPGroupTriggered() {
        this.viewModel.RuleCLO.MedicineRuleItems.push(this.genericCLOFactory.CreateDefaultClo(CLOs.MedicineRuleItemCLO));
    }
    private onRemoveClicked() {
        this.RemoveClicked.emit(this.ruleCLO);
    }
    private onAddMomentInDay(value: string) {
        let time = Time.ParseString(value);


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


