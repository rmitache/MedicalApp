import { Injectable } from '@angular/core';
import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { ICLOFactory } from 'SPA/Core/CLO/i-clo.factory';
import * as HelperFunctions from 'SPA/Core/Helpers/Functions/functions';
import * as DataStructures from 'SPA/Core/Helpers/DataStructures/data-structures';


@Injectable()
export class SymptomTypeCLOFactory implements ICLOFactory<CLOs.SymptomTypeCLO> {


    // Public Methods
    public Convert_ToCLO(blo: any): CLOs.SymptomTypeCLO {
        let newCLO = new CLOs.SymptomTypeCLO();
        newCLO.ID = blo['ID'];
        newCLO.Name = blo['Name'];

        return newCLO;
    }
    public Create_DefaultCLO(): CLOs.SymptomTypeCLO {
        throw new Error("Create_DefaultCLO not implemented");
    }
    public Convert_ToCloList(bloArray: Object[]): DataStructures.List<CLOs.SymptomTypeCLO> {
        let cloList = new DataStructures.List<CLOs.SymptomTypeCLO>();
        bloArray.forEach(blo => {
            let clo = this.Convert_ToCLO(blo);
            cloList.Add(clo);
        });

        return cloList;
    }
    public Clone_CLOAsNewBLO(clo: CLOs.SymptomTypeCLO): CLOs.SymptomTypeCLO {
        throw new Error('Clone_CLO Not implemented');
    }
}