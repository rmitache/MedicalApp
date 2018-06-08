import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';

export class MedicineRuleItemCLO extends BaseCLO implements CLOs.IMedicineFactorRecord{
    // Fields
    public ID: number;

    public MedicineType: CLOs.MedicineTypeCLO;
    public UnitDoseType: Enums.UnitDoseType;
    public UnitDoseQuantifier: number;
    public UnitDoseSize: number;
    public UnitDoseUoM: Enums.UnitOfMeasure;
    public Instruction: Enums.Instruction;
    public AdministrationMethod: Enums.AdministrationMethod;


    // Constructor
    constructor() {
        super();
    }
}
