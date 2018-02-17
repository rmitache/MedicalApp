import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { RuleFrequencyType } from 'SPA/DomainModel/Plans/Enums/rule-frequency-type.enum';
import { DaysInWeek } from 'SPA/Core/Helpers/DataStructures/data-structures';

export abstract class RuleItem extends BaseCLO {

    // Constructor
    constructor() {
        super();
    }
}