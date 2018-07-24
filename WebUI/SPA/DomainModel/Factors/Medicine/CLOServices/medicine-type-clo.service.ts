// Angular and 3rd party stuff
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as momentRange from 'moment-range';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import { Time, Range, TimeRange } from 'SPA/Core/Helpers/DataStructures/misc';
import * as Enums from 'SPA/DomainModel/enum-exports';
import * as DataStructures from 'SPA/Core/Helpers/DataStructures/data-structures';
import { MedicineTypeCLOFactory } from 'SPA/DomainModel/Factors/Medicine/CLOFactories/medicine-type-clo.factory';
import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import { ICLOFactory } from 'SPA/Core/CLO/i-clo.factory';
import { RuleCLOFactory } from 'SPA/DomainModel/Plans/CLOFactories/rule-clo.factory';
import { GetNrOfDaysBetweenDatesUsingMoment } from 'SPA/Core/Helpers/Functions/functions';
import { VersionCLOService } from 'SPA/DomainModel/Plans/CLOServices/version-clo.service';

@Injectable()
export class MedicineTypeCLOService {
    // Fields

    // Constructor
    constructor(private readonly versionCLOService: VersionCLOService) {

    }
    // Public Methods
    public GetInUsePropertyForMedicineTypes(uniqueMedTypes: CLOs.MedicineTypeCLO[], planCLOs: CLOs.PlanCLO[], targetDate: moment.Moment): boolean[] {
        
        // Variables
        let isInUseStatusArray: boolean[] = new Array(uniqueMedTypes.length);
        let medTypesInUseDictionary: { [medicineTypeName: string]: boolean } = {};
        uniqueMedTypes.forEach(clo => {
            medTypesInUseDictionary[clo.Name] = false;
        });

        // Loop through plans and versions which intersect with the targetDate
        var targetDateRange = new Range<moment.Moment>(targetDate.clone().startOf('day'), targetDate.clone().endOf('day'));
        planCLOs.forEach((planCLO) => {
            if (planCLO !== null) {
                var versions = planCLO.GetVersionsWhichIntersectWithDateRange(targetDateRange);

                if (versions !== null) {
                    versions.forEach(version => {
                        let uniqueMedTypesInVersion = this.versionCLOService.GetUniqueMedicineTypesWithAvgDosePerMonth(version);
                        for (var uniqueMedTypeName in uniqueMedTypesInVersion) {
                            medTypesInUseDictionary[uniqueMedTypeName] = true;
                        }
                    });
                }
            }
        });


        // Convert to an
        let index = 0;
        for (var uniqueMedTypeName in medTypesInUseDictionary) {
            isInUseStatusArray[index] = medTypesInUseDictionary[uniqueMedTypeName];
            index++;
        }

        return isInUseStatusArray;
    }
}

