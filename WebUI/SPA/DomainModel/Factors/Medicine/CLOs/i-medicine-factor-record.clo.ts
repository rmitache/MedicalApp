import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { Time } from 'SPA/Core/Helpers/DataStructures/data-structures';
import * as moment from 'moment';
import { RemoveWhitespace } from 'SPA/Core/Helpers/Functions/functions';




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
    public get UnitDoseType() {
        if (this.MedicineType === null) {
            return;
        }

        if (this.HasUserDefinedUnitDose) {
            return this.UserDefinedUnitDoseType;
        } else {
            return this.MedicineType.PackagedUnitDoseType;
        }
    }
    public get UnitDoseSize() {
        if (this.MedicineType === null) {
            return 0;
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
