import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';


export abstract class AbstractMedicineFactorRecordCLO extends BaseCLO {

    // Fields
    MedicineType: CLOs.MedicineTypeCLO;
    UnitDoseQuantifier: number = 0;
    HasUserDefinedUnitDose: boolean;
    UserDefinedUnitDoseType: Enums.UserDefinedUnitDoseType;
    UserDefinedUnitDoseSize: number;

    // Properties (special getters)
    public get UnitDoseTypeName() {
        if (this.MedicineType === null) {
            return '';
        }

        let name: string;
        if (this.HasUserDefinedUnitDose) {
            name = Enums.UserDefinedUnitDoseType[this.UserDefinedUnitDoseType];
        } else {
            name = Enums.PackagedUnitDoseType[this.MedicineType.PackagedUnitDoseType];
        }

        return name;
    }
    public get UnitOfMeasureName() {
        if (this.MedicineType === null) {
            return null;
        }

        return Enums.UnitOfMeasure[this.MedicineType.BaseUnitOfMeasure];
    }
    public get UnitDoseSize() {
        if (this.MedicineType === null) {
            return null;
        }

        let doseSize: number;
        if (this.HasUserDefinedUnitDose) {
            doseSize = this.UserDefinedUnitDoseSize;
        } else {
            doseSize = this.MedicineType.PackagedUnitDoseSize;
        }

        return doseSize;
    }


}
