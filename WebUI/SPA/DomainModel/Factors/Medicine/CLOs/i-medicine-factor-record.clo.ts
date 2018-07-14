import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { Time } from 'SPA/Core/Helpers/DataStructures/data-structures';
import * as moment from 'moment';
import { RemoveWhitespace } from 'SPA/Core/Helpers/Functions/functions';




export interface IMedicineFactorRecordCLO {
    UnitDoseQuantifier: number;
    HasUserDefinedUnitDose: boolean;
    UserDefinedUnitDoseType: Enums.UserDefinedUnitDoseType;
    UserDefinedUnitDoseSize: number;
}
