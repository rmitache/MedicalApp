import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { RuleFrequencyType } from 'SPA/DomainModel/Plans/Enums/rule-frequency-type.enum';
import { DaysInWeek, Time } from 'SPA/Core/Helpers/DataStructures/data-structures';

export class RuleCLO extends BaseCLO {
    // Fields
    public ID: number;
    public OrdinalFrequencyType: Enums.OrdinalFrequencyType;
    public FrequencyType: RuleFrequencyType;
    public DaysInWeek?: DaysInWeek;
    public MomentsInDay: Time[];
    public MedicineRuleItems: CLOs.MedicineRuleItemCLO[];

    // Properties
    public get NrOfTimesPerMonth(): number {
        // Nr of times per day 
        let nrOfTimesPerDay = this.MomentsInDay.length;

        // Nr of times per week
        let nrOfTimesPerWeek: number;
        if (this.FrequencyType = RuleFrequencyType.Week) {
            nrOfTimesPerWeek = this.DaysInWeek.GetNrOfDaysWhichAreTrue();
        } else {
            nrOfTimesPerWeek = 7;
        }

        // Nr of weeks per month
        let nrOfWeeksPerMonth: number;
        if (this.FrequencyType = RuleFrequencyType.Day) {
            nrOfWeeksPerMonth = 4;
        } else if (this.FrequencyType = RuleFrequencyType.Week) {
            let everyX =  this.OrdinalFrequencyType + 1;
            nrOfWeeksPerMonth = 4;
        }
        



        // Calculate and return 
        let nrOfTimesPerMonth = nrOfTimesPerDay * nrOfTimesPerWeek * nrOfWeeksPerMonth;
        return nrOfTimesPerMonth;
    }

    // Constructor
    constructor() {
        super();
    }

}