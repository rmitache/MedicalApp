import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { AbstractMedicineFactorRecordCLO } from 'SPA/DomainModel/Factors/Medicine/CLOs/i-medicine-factor-record.clo';

export class MedicineRuleItemCLO extends AbstractMedicineFactorRecordCLO {
    // Fields
    public ID: number;
    public MedicineType: CLOs.MedicineTypeCLO;

    public UnitDoseQuantifier: number;
    public HasUserDefinedUnitDose: boolean;
    public UserDefinedUnitDoseType: Enums.UserDefinedUnitDoseType;
    public UserDefinedUnitDoseSize: number;

    // Properties
    public get TotalDosagePerTimeInMgOrMl(): number {
        let totalDosageInMgOrMl: number;
        if (this.HasUserDefinedUnitDose) {
            totalDosageInMgOrMl = this.UnitDoseQuantifier * this.UserDefinedUnitDoseSize;
        } else {
            totalDosageInMgOrMl = this.UnitDoseQuantifier * this.MedicineType.PackagedUnitDoseSize;
        }
        return totalDosageInMgOrMl;
    }

    // Constructor
    constructor() {
        super();
    }

   
}
