import { Injectable } from '@angular/core';
import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import { ICLOFactory } from 'SPA/Core/CLO/i-clo.factory';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import * as DataStructures from 'SPA/Core/Helpers/DataStructures/data-structures';

@Injectable()
export class HealthStatusEntryCLOFactory implements ICLOFactory<CLOs.HealthStatusEntry> {

    // Constructor
    constructor() {

    }

    // Public Methods
    public Convert_ToCLO(blo: any): CLOs.HealthStatusEntry {

        let newCLO = new CLOs.HealthStatusEntry();
        newCLO.ID = blo['ID'];
        newCLO.OccurenceDateTime = new Date(blo['OccurenceDateTime']);
        newCLO.HealthLevel = blo['HealthLevel'];

        return newCLO;
    }
    public Create_DefaultCLO(): CLOs.HealthStatusEntry {
        let newCLO = new CLOs.HealthStatusEntry();
        newCLO.ID = 0;
        newCLO.OccurenceDateTime = new Date();
        newCLO.HealthLevel = Enums.HealthLevel.Unspecified;


        return newCLO;
    }
    public Convert_ToCloList(bloArray: Object[]): DataStructures.List<CLOs.HealthStatusEntry> {
        
        let cloList = new DataStructures.List<CLOs.HealthStatusEntry>();
        bloArray.forEach(blo => {
            let clo = this.Convert_ToCLO(blo);
            cloList.Add(clo);
        });

        return cloList;
    }
    public Clone_CLOAsNewBLO(clo: CLOs.HealthStatusEntry): CLOs.HealthStatusEntry {
        throw new Error('Clone_CLO Not implemented');
    }
}