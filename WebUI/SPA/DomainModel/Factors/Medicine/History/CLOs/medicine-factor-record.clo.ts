import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { Time } from 'SPA/Core/Helpers/DataStructures/data-structures';


export class MedicineFactorRecordCLO extends BaseCLO implements CLOs.IFactorRecordPropertiesGroup{
    // Fields
    public ID: number;
    public Type: Enums.FactorRecordType;
    public OccurenceDateTime: Date;

    public MedicineType: CLOs.MedicineTypeCLO;
    public UnitDoseType: Enums.UnitDoseType;
    public UnitDoseQuantifier: number;
    public UnitDoseSize: number;
    public UnitDoseUoM: Enums.UnitOfMeasure;
    public Instruction: Enums.Instruction;
    public AdministrationMethod: Enums.AdministrationMethod;


    // Constructor
    constructor(init?: Partial<MedicineFactorRecordCLO>) {
        super();
        Object.assign(this, init);
    } 

    // Public methods
    public GetTime(): Time {
        return new Time(this.OccurenceDateTime.getHours(), this.OccurenceDateTime.getMinutes());
    }
}


