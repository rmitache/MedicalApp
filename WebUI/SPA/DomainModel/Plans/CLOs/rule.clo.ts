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

        // Nr of days in month 
        let nrOfDaysPerMonth: number;
        let everyX = this.OrdinalFrequencyType + 1;
        if (this.FrequencyType = RuleFrequencyType.Day) {

            // Daily frequency 
            nrOfDaysPerMonth = 30 / everyX;
        } else if (this.FrequencyType = RuleFrequencyType.Week) {

            // Weekly frequency
            nrOfDaysPerMonth = (4 / everyX) * this.DaysInWeek.GetNrOfDaysWhichAreTrue();
        }


        // Calculate and return 
        let nrOfTimesPerMonth = nrOfTimesPerDay * nrOfDaysPerMonth;
        return nrOfTimesPerMonth;
    }

    // Constructor
    constructor() {
        super();
    }

}