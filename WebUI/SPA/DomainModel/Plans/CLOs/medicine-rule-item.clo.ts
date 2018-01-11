import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import { MedicineCategoryCLO } from 'SPA/DomainModel/Factors/Medicine/CLOs/medicine-category.clo';
import { UnitOfMeasureCLO } from 'SPA/DomainModel/General/CLOs/unit-of-measure.clo';
import { MedicineFormCLO } from 'SPA/DomainModel/Factors/Medicine/CLOs/medicine-form.clo';
import { MedicineTypeCLO } from 'SPA/DomainModel/Factors/Medicine/CLOs/medicine-type.clo';
import { MedicineMethodCLO } from 'SPA/DomainModel/Factors/Medicine/CLOs/medicine-method.clo';
import { MedicineInstructionCLO } from 'SPA/DomainModel/Factors/Medicine/CLOs/medicine-instruction.clo';


export class MedicineRuleItemCLO extends BaseCLO {
    // Fields
    public ID: number;
    public MedicineType: MedicineTypeCLO;
    public MedicineMethod: MedicineMethodCLO;
    public NrOfPieces: number;
    public PieceSize: number;
    public PieceSizeUnitOfMeasure: UnitOfMeasureCLO;
    public Instructions: MedicineInstructionCLO[];


    // Constructor
    constructor() {
        super();
    }
}