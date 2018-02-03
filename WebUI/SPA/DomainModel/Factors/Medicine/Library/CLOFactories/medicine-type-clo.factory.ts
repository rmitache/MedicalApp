﻿import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { ICLOFactory } from 'SPA/Core/CLO/i-clo.factory';
import * as HelperFunctions from 'SPA/Core/Helpers/Functions/functions';
import * as DataStructures from 'SPA/Core/Helpers/DataStructures/data-structures';

export class MedicineTypeCLOFactory implements ICLOFactory<CLOs.MedicineTypeCLO> {


    // Public Methods
    public Convert_ToCLO(blo: any): CLOs.MedicineTypeCLO {
        let newCLO = new CLOs.MedicineTypeCLO();
        newCLO.ID = blo['ID'];
        newCLO.Name = blo['Name'];
        newCLO.ProducerName = blo['ProducerName'];
        newCLO.ParentCategories = [];

        newCLO.PackagedUnitDoseType = HelperFunctions.GetEnumEntryByIndex(Enums.UnitDoseType, parseInt(blo['PackagedUnitDoseType']));
        newCLO.PackagedUnitDoseSize = parseInt(blo['PackagedUnitDoseSize']);
        newCLO.PackagedUnitDoseUoM = HelperFunctions.GetEnumEntryByIndex(Enums.UnitOfMeasure, parseInt(blo['PackagedUnitDoseUoM']));
        


        return newCLO;
    }
    public Create_DefaultCLO(): CLOs.MedicineTypeCLO {
        throw new Error("Create_DefaultCLO not implemented");
    }
    public Convert_ToCloList(bloArray: Object[]): DataStructures.List<CLOs.MedicineTypeCLO> {
        let cloList = new DataStructures.List<CLOs.MedicineTypeCLO>();
        bloArray.forEach(blo => {
            let clo = this.Convert_ToCLO(blo);
            cloList.Add(clo);
        });

        return cloList;
    }
}