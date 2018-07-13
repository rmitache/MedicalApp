import { Injectable } from '@angular/core';
import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import { ICLOFactory } from 'SPA/Core/CLO/i-clo.factory';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import * as DataStructures from 'SPA/Core/Helpers/DataStructures/data-structures';
import { SymptomEntryCLOFactory } from 'SPA/DomainModel/Indicators/Symptoms/CLOFactories/symptom-entry-clo.factory';

@Injectable()
export class HealthStatusEntryCLOFactory implements ICLOFactory<CLOs.HealthStatusEntryCLO> {

    // Constructor
    constructor(private readonly symptomEntryCLOFactory: SymptomEntryCLOFactory) {

    }

    // Public Methods
    public Convert_ToCLO(blo: any): CLOs.HealthStatusEntryCLO {

        let newCLO = new CLOs.HealthStatusEntryCLO();
        newCLO.ID = blo['ID'];
        newCLO.OccurrenceDateTime = new Date(blo['OccurrenceDateTime']);
        newCLO.HealthLevel = blo['HealthLevel'];
        newCLO.SymptomEntries = this.symptomEntryCLOFactory.Convert_ToCloList(blo['SymptomEntries']).ToArray();

        return newCLO;
    }
    public Create_DefaultCLO(): CLOs.HealthStatusEntryCLO {
        let newCLO = new CLOs.HealthStatusEntryCLO();
        newCLO.ID = 0;
        newCLO.OccurrenceDateTime = new Date();
        newCLO.HealthLevel = Enums.HealthLevel.Unspecified;
        newCLO.SymptomEntries = [this.symptomEntryCLOFactory.Create_DefaultCLO()];

        return newCLO;
    }
    public Convert_ToCloList(bloArray: Object[]): DataStructures.List<CLOs.HealthStatusEntryCLO> {
        
        let cloList = new DataStructures.List<CLOs.HealthStatusEntryCLO>();
        bloArray.forEach(blo => {
            let clo = this.Convert_ToCLO(blo);
            cloList.Add(clo);
        });

        return cloList;
    }
    public Clone_CLOAsNewBLO(clo: CLOs.HealthStatusEntryCLO): CLOs.HealthStatusEntryCLO {
        throw new Error('Clone_CLO Not implemented');
    }
}