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
    public get TotalDosagePerTime(): number {

        // If it has UnitDoseSize defined
        if (this.UnitDoseSize !== null) {
            return this.UnitDoseQuantifier * this.UnitDoseSize;
        }
        // If it doesnt have, use the quantifier
        else {
            return this.UnitDoseQuantifier;
        }
    }

    // Constructor
    constructor() {
        super();
    }
   
}
