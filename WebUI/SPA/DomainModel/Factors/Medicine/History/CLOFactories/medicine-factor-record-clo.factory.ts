import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import { ICLOFactory } from 'SPA/Core/CLO/i-clo.factory';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import * as DataStructures from 'SPA/Core/Helpers/DataStructures/data-structures';

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
        newCLO.Type = Enums.FactorRecordType.UserEntry;
        newCLO.MedicineType = null;
        newCLO.OccurenceDateTime = new Date();

        newCLO.UnitDoseType = null;
        newCLO.UnitDoseQuantifier = null;
        newCLO.UnitDoseSize = null;
        newCLO.UnitDoseUoM = null;

        newCLO.Instruction = Enums.Instruction.Unspecified;


        return newCLO;
    }
    public Convert_ToCloList(bloArray: Object[]): DataStructures.List<CLOs.MedicineFactorRecordCLO> {
        throw new Error("Convert_ToCloList not implemented");
    }
}