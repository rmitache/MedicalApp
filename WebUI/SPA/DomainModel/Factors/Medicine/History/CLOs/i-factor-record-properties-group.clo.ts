import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';

export interface IFactorRecordPropertiesGroup {
    MedicineType: CLOs.MedicineTypeCLO;
    UnitDoseType: Enums.UnitDoseType;
    UnitDoseQuantifier: number;
    UnitDoseSize: number;
    UnitDoseUoM: Enums.UnitOfMeasure;
    Instruction: Enums.Instruction;
    AdministrationMethod: Enums.AdministrationMethod;
}
// IFRPGroupElem