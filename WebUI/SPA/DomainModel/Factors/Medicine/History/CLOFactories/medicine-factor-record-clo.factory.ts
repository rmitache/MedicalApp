import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import { ICLOFactory } from 'SPA/Core/CLO/i-clo.factory';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';


export class MedicineFactorRecordCLOFactory implements ICLOFactory<CLOs.MedicineFactorRecordCLO> {

    // Constructor
    constructor() {

    }

    // Public Methods
    public Convert_ToCLO(blo: any): CLOs.MedicineFactorRecordCLO {
        
        throw new Error('Convert_ToCLO not implemented');
    }
    public Create_DefaultCLO(): CLOs.MedicineFactorRecordCLO {
        let newCLO = new CLOs.MedicineFactorRecordCLO();
        newCLO.ID = -1;
        newCLO.RecordType = Enums.FactorRecordType.UserEntry;
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