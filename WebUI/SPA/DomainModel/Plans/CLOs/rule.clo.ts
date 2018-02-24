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

    // Constructor
    constructor() {
        super();
    }
}