import { Injectable } from '@angular/core';
import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import { ICLOFactory } from 'SPA/Core/CLO/i-clo.factory';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import * as DataStructures from 'SPA/Core/Helpers/DataStructures/data-structures';
import { MedicineTypeCLOFactory } from 'SPA/DomainModel/Factors/Medicine/CLOFactories/medicine-type-clo.factory';

@Injectable()
export class MedicineRuleItemCLOFactory implements ICLOFactory<CLOs.MedicineRuleItemCLO> {

    // Constructor
    constructor(private readonly medicineTypeCLOFactory: MedicineTypeCLOFactory) {

    }

    // Public Methods
    public Convert_ToCLO(blo: any): CLOs.MedicineRuleItemCLO {
        
        let newCLO = new CLOs.MedicineRuleItemCLO();
        newCLO.ID = blo['ID'];
        newCLO.MedicineType = this.medicineTypeCLOFactory.Convert_ToCLO(blo['MedicineType']);

        newCLO.UnitDoseType = blo['UnitDoseType'];
        newCLO.UnitDoseQuantifier = blo['UnitDoseQuantifier'];
        newCLO.UnitDoseSize = blo['UnitDoseSize'];
        newCLO.UnitDoseUoM = blo['UnitDoseUoM'];

        newCLO.Instruction = blo['Instruction'];
        newCLO.AdministrationMethod = blo['AdministrationMethod'];
        

        return newCLO;
    }
    public Create_DefaultCLO(): CLOs.MedicineRuleItemCLO {
        let newCLO = new CLOs.MedicineRuleItemCLO();
        newCLO.ID = 0;
        newCLO.MedicineType = null;

        newCLO.UnitDoseType = null;
        newCLO.UnitDoseQuantifier = null;
        newCLO.UnitDoseSize = null;
        newCLO.UnitDoseUoM = null;

        newCLO.Instruction = Enums.Instruction.Unspecified;
        newCLO.AdministrationMethod = Enums.AdministrationMethod.Unspecified;

        return newCLO;
    }
    public Convert_ToCloList(bloArray: Object[]): DataStructures.List<CLOs.MedicineRuleItemCLO> {
        let cloList = new DataStructures.List<CLOs.MedicineRuleItemCLO>();
        bloArray.forEach(blo => {
            let clo = this.Convert_ToCLO(blo);
            cloList.Add(clo);
        });

        return cloList;
    }
    public Clone_CLOAsNewBLO(clo: CLOs.MedicineRuleItemCLO): CLOs.MedicineRuleItemCLO {
        let newCLO = new CLOs.MedicineRuleItemCLO();
        newCLO.ID = 0;
        newCLO.MedicineType = clo.MedicineType;

        newCLO.UnitDoseType = clo.UnitDoseType;
        newCLO.UnitDoseQuantifier = clo.UnitDoseQuantifier;
        newCLO.UnitDoseSize = clo.UnitDoseSize;
        newCLO.UnitDoseUoM = clo.UnitDoseUoM;

        newCLO.Instruction = clo.Instruction;
        newCLO.AdministrationMethod = clo.AdministrationMethod;

        return newCLO;
    }
}