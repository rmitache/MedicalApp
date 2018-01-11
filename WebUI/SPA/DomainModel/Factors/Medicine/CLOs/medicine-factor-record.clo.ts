import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import { MedicineTypeCLO } from 'SPA/DomainModel/Factors/Medicine/CLOs/medicine-type.clo';
import { MedicineMethodCLO } from 'SPA/DomainModel/Factors/Medicine/CLOs/medicine-method.clo';
import { UnitOfMeasureCLO } from 'SPA/DomainModel/General/CLOs/unit-of-measure.clo';
import { MedicineInstructionCLO } from 'SPA/DomainModel/Factors/Medicine/CLOs/medicine-instruction.clo';
import { Time } from 'SPA/Core/Helpers/DataStructures/data-structures';


export class MedicineFactorRecordCLO extends BaseCLO {
    // Fields
    public ID: number;
    public RecordType: RecordType;
    public MedicineType: MedicineTypeCLO;
    public OccurenceDateTime: Date;
    public Method: MedicineMethodCLO;
    public NrOfPieces: number;
    public PieceSize: number;
    public PieceSizeUnitOfMeasure: UnitOfMeasureCLO;
    public Instructions: MedicineInstructionCLO[];



    // Constructor
    constructor(init?: Partial<MedicineFactorRecordCLO>) {
        super();
        Object.assign(this, init);
    }

    // Public methods
    public GetTime():Time {
        return new Time(this.OccurenceDateTime.getHours(), this.OccurenceDateTime.getMinutes());
    }
}


enum RecordType {
    UserEntry,
    PlanProjection
}