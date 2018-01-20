import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';

export class MedicineRuleItemCLO extends BaseCLO {
    // Fields
    public ID: number;
    public MedicineType: CLOs.MedicineTypeCLO;
    public MedicineMethod: Enums.MedicineMethod;
    public NrOfPieces: number;
    public PieceSize: number;
    public PieceSizeUnitOfMeasure: Enums.UnitOfMeasure;
    public Instruction: Enums.MedicineInstruction[];


    // Constructor
    constructor() {
        super();
    }
}