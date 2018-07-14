import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { Time } from 'SPA/Core/Helpers/DataStructures/data-structures';
import * as moment from 'moment';
import { RemoveWhitespace } from 'SPA/Core/Helpers/Functions/functions';
import { IMedicineFactorRecordCLO } from 'SPA/DomainModel/Factors/Medicine/CLOs/i-medicine-factor-record.clo';

export class MedicineFactorRecordCLO extends BaseCLO implements IMedicineFactorRecordCLO {
    // Fields
    public ID: number;
    public CompositeID: string;
    public OccurrenceDateTime: Date;
    public Type: Enums.FactorRecordType;
    public MedicineType: CLOs.MedicineTypeCLO;

    public ParentPlanName: string;
    public ParentPlanID: number;
    public RecentlyAdded: boolean;
    public Taken: boolean;

    public UnitDoseQuantifier: number;
    public HasUserDefinedUnitDose: boolean;
    public UserDefinedUnitDoseType: Enums.UserDefinedUnitDoseType;
    public UserDefinedUnitDoseSize: number;


    // Properties
    public get ActualUnitDoseTypeName() {
        let name: string;
        if (this.HasUserDefinedUnitDose) {
            name = Enums.UserDefinedUnitDoseType[this.UserDefinedUnitDoseType];
        } else {
            name = Enums.PackagedUnitDoseType[this.MedicineType.PackagedUnitDoseType];
        }

        return name;
    }
    public get ActualUnitDoseSize() {
        let doseSize: number;
        if (this.HasUserDefinedUnitDose) {
            doseSize = this.UserDefinedUnitDoseSize;
        } else {
            doseSize = this.MedicineType.PackagedUnitDoseSize;
        }

        return doseSize;
    }
    public get ActualUnitOfMeasureName() {
        return Enums.UnitOfMeasure[this.MedicineType.BaseUnitOfMeasure];
    }

    // Constructor
    constructor(init?: Partial<MedicineFactorRecordCLO>) {
        super();
        Object.assign(this, init);
    }

    // Public methods
    public GetTime(): Time {
        return new Time(this.OccurrenceDateTime.getHours(), this.OccurrenceDateTime.getMinutes());
    }
}



