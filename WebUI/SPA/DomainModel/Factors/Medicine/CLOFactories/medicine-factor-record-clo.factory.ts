﻿import { Injectable } from '@angular/core';
import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import { ICLOFactory } from 'SPA/Core/CLO/i-clo.factory';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import * as DataStructures from 'SPA/Core/Helpers/DataStructures/data-structures';
import { MedicineTypeCLOFactory } from 'SPA/DomainModel/Factors/Medicine/CLOFactories/medicine-type-clo.factory';

@Injectable()
export class MedicineFactorRecordCLOFactory implements ICLOFactory<CLOs.MedicineFactorRecordCLO> {

    // Constructor
    constructor(private readonly medicineTypeCLOFactory: MedicineTypeCLOFactory) {

    }

    // Public Methods
    public Convert_ToCLO(blo: any): CLOs.MedicineFactorRecordCLO {

        let newCLO = new CLOs.MedicineFactorRecordCLO();
        newCLO.ID = blo['ID'];
        newCLO.CompositeID = blo['CompositeID'];
        newCLO.Type = blo['Type'];
        newCLO.OccurrenceDateTime = new Date(blo['OccurrenceDateTime']);
        newCLO.MedicineType = this.medicineTypeCLOFactory.Convert_ToCLO(blo['MedicineType']);

        newCLO.ParentPlanName = blo['ParentPlanName'];
        newCLO.ParentPlanID = blo['ParentPlanID'];
        newCLO.RecentlyAdded = blo['RecentlyAdded'];
        newCLO.Taken = blo['Taken'];

        newCLO.UnitDoseQuantifier = blo['UnitDoseQuantifier'];
        newCLO.HasUserDefinedUnitDose = blo['HasUserDefinedUnitDose'];
        newCLO.UserDefinedUnitDoseType = blo['UserDefinedUnitDoseType'];
        newCLO.UserDefinedUnitDoseSize = blo['UserDefinedUnitDoseSize'];
        
        return newCLO;
    }
    public Create_DefaultCLO(): CLOs.MedicineFactorRecordCLO {
        let newCLO = new CLOs.MedicineFactorRecordCLO();
        newCLO.ID = 0;
        newCLO.CompositeID = null;
        newCLO.Type = Enums.FactorRecordType.UserEntry;
        newCLO.MedicineType = null;
        newCLO.OccurrenceDateTime = new Date();
        
        newCLO.ParentPlanID = null;
        newCLO.RecentlyAdded = null;
        newCLO.Taken = false;

        newCLO.UnitDoseQuantifier = null;
        newCLO.HasUserDefinedUnitDose = null;
        newCLO.UserDefinedUnitDoseType = null;
        newCLO.UserDefinedUnitDoseSize = null;

        return newCLO;
    }
    public Convert_ToCloList(bloArray: Object[]): DataStructures.List<CLOs.MedicineFactorRecordCLO> {
        
        let cloList = new DataStructures.List<CLOs.MedicineFactorRecordCLO>();
        bloArray.forEach(blo => {
            let clo = this.Convert_ToCLO(blo);
            cloList.Add(clo);
        });

        return cloList;
    }
    public Clone_CLOAsNewBLO(clo: CLOs.MedicineFactorRecordCLO): CLOs.MedicineFactorRecordCLO {
        throw new Error('Clone_CLO Not implemented');
    }
}