import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { RuleFrequencyType } from 'SPA/DomainModel/Plans/Enums/rule-frequency-type.enum';
import { DaysInWeek, Time } from 'SPA/Core/Helpers/DataStructures/data-structures';

export class RuleCLO extends BaseCLO {
    // Fields
    public ID: number;
    public OrdinalFrequency: Enums.OrdinalFrequency;
    public FrequencyType: RuleFrequencyType;
    public DaysInWeek?: DaysInWeek;
    public MomentsInDay: Time[];


    // Constructor
    constructor() {
        super();
    }
}