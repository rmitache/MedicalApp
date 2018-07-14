import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { Time } from 'SPA/Core/Helpers/DataStructures/data-structures';
import * as moment from 'moment';
import { RemoveWhitespace } from 'SPA/Core/Helpers/Functions/functions';
import { AbstractMedicineFactorRecordCLO } from 'SPA/DomainModel/Factors/Medicine/CLOs/i-medicine-factor-record.clo';

export class MedicineFactorRecordCLO extends AbstractMedicineFactorRecordCLO {

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



