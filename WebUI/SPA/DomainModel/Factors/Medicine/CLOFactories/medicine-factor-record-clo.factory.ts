import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import { MedicineFactorRecordCLO } from 'SPA/DomainModel/Factors/Medicine/CLOs/medicine-factor-record.clo';
import { ICLOFactory } from 'SPA/Core/CLO/i-clo.factory';
import * as CLOs from 'SPA/DomainModel/clo-exports';

export class MedicineFactorRecordCLOFactory implements ICLOFactory<MedicineFactorRecordCLO> {

    // Constructor
    constructor() {

    }

    // Public Methods
    public Convert_ToCLO(blo: any): MedicineFactorRecordCLO {
        
        throw new Error('Convert_ToCLO not implemented');
    }
    public Create_DefaultCLO(): MedicineFactorRecordCLO {
        let newCLO = new MedicineFactorRecordCLO();
        newCLO.ID = -1;
        newCLO.RecordType = CLOs.RecordType.UserEntry;
        newCLO.MedicineType = null;
        newCLO.OccurenceDateTime = new Date();
        newCLO.Method = null;
        newCLO.NrOfPieces = null;
        newCLO.PieceSize = null;
        newCLO.PieceSizeUnitOfMeasure = null;
        newCLO.Instruction = null;

        return newCLO;
    }
}