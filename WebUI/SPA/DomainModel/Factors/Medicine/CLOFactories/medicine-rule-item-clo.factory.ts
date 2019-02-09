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

        newCLO.UnitDoseQuantifier = blo['UnitDoseQuantifier'];
        newCLO.HasUserDefinedUnitDose = blo['HasUserDefinedUnitDose'];
        newCLO.UserDefinedUnitDoseType = blo['UserDefinedUnitDoseType'];
        newCLO.UserDefinedUnitDoseSize = blo['UserDefinedUnitDoseSize'];


        return newCLO;
    }
    public Create_DefaultCLO(): CLOs.MedicineRuleItemCLO {
        let newCLO = new CLOs.MedicineRuleItemCLO();
        newCLO.ID = 0;
        newCLO.MedicineType = null;

        newCLO.UnitDoseQuantifier = 1;
        newCLO.HasUserDefinedUnitDose = null;
        newCLO.UserDefinedUnitDoseType = null;
        newCLO.UserDefinedUnitDoseSize = null;


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

        newCLO.UnitDoseQuantifier = clo.UnitDoseQuantifier;
        newCLO.HasUserDefinedUnitDose = clo.HasUserDefinedUnitDose;
        newCLO.UserDefinedUnitDoseType = clo.UserDefinedUnitDoseType;
        newCLO.UserDefinedUnitDoseSize = clo.UserDefinedUnitDoseSize;


        return newCLO;
    }
}