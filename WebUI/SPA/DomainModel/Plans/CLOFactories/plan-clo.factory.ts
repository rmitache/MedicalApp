import { Injectable } from '@angular/core';
import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import { ICLOFactory } from 'SPA/Core/CLO/i-clo.factory';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import * as DataStructures from 'SPA/Core/Helpers/DataStructures/data-structures';
import { VersionCLOFactory } from 'SPA/DomainModel/Plans/CLOFactories/version-clo.factory';

@Injectable()
export class PlanCLOFactory implements ICLOFactory<CLOs.PlanCLO> {

    // Constructor
    constructor(private readonly versionCLOFactory: VersionCLOFactory) {

    }

    // Public Methods
    public Convert_ToCLO(blo: any): CLOs.PlanCLO {

        let newCLO = new CLOs.PlanCLO();
        newCLO.ID = blo['ID'];
        newCLO.Name = blo['Name'];
        newCLO.DateCreated = new Date(blo['DateCreated']);
        newCLO.Versions = this.versionCLOFactory.Convert_ToCloList(blo['Versions']).ToArray();


        return newCLO;
    }
    public Create_DefaultCLO(): CLOs.PlanCLO {
        throw new Error("Create_DefaultCLO not implemented!");
    }
    public Convert_ToCloList(bloArray: Object[]): DataStructures.List<CLOs.PlanCLO> {
        let cloList = new DataStructures.List<CLOs.PlanCLO>();
        bloArray.forEach(blo => {
            let clo = this.Convert_ToCLO(blo);
            cloList.Add(clo);
        });

        return cloList;
    }
}