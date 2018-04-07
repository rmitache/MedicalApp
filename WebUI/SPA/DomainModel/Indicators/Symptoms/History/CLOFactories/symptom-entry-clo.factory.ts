import { Injectable } from '@angular/core';
import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import { ICLOFactory } from 'SPA/Core/CLO/i-clo.factory';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import * as DataStructures from 'SPA/Core/Helpers/DataStructures/data-structures';
import { SymptomTypeCLOFactory } from 'SPA/DomainModel/Indicators/Symptoms/Library/CLOFactories/symptom-type-clo.factory';

@Injectable()
export class SymptomEntryCLOFactory implements ICLOFactory<CLOs.SymptomEntryCLO> {

    // Constructor
    constructor(private readonly symptomTypeCLOFactory: SymptomTypeCLOFactory) {

    }

    // Public Methods
    public Convert_ToCLO(blo: any): CLOs.SymptomEntryCLO {

        let newCLO = new CLOs.SymptomEntryCLO();
        newCLO.ID = blo['ID'];
        newCLO.IntensityLevel = blo['IntensityLevel'];
        newCLO.SymptomType = this.symptomTypeCLOFactory.Convert_ToCLO(blo['SymptomType']);

        return newCLO;
    }
    public Create_DefaultCLO(): CLOs.SymptomEntryCLO {
        let newCLO = new CLOs.SymptomEntryCLO();
        newCLO.ID = 0;
        newCLO.IntensityLevel = Enums.SymptomIntensityLevel.NotPresent;
        newCLO.SymptomType = null;

        return newCLO;
    }
    public Convert_ToCloList(bloArray: Object[]): DataStructures.List<CLOs.SymptomEntryCLO> {

        let cloList = new DataStructures.List<CLOs.SymptomEntryCLO>();
        bloArray.forEach(blo => {
            let clo = this.Convert_ToCLO(blo);
            cloList.Add(clo);
        });

        return cloList;
    }
    public Clone_CLOAsNewBLO(clo: CLOs.SymptomEntryCLO): CLOs.SymptomEntryCLO {
        throw new Error('Clone_CLO Not implemented');
    }
}