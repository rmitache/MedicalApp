// Angular and 3rd party stuff
import { Injectable } from '@angular/core';
import * as moment from 'moment';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import * as DataStructures from 'SPA/Core/Helpers/DataStructures/data-structures';
import { MedicineTypeCLOFactory } from 'SPA/DomainModel/Factors/Medicine/Library/CLOFactories/medicine-type-clo.factory';
import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import { ICLOFactory } from 'SPA/Core/CLO/i-clo.factory';
import { RuleCLOFactory } from 'SPA/DomainModel/Plans/CLOFactories/rule-clo.factory';

@Injectable()
export class VersionCLOService  {
    // Public Methods
    public GetVersionChanges(targetVersion: CLOs.VersionCLO, prevVersion: CLOs.VersionCLO): MedicineTypeChangeSet[] {

        // Variables
        let medTypeChanges: MedicineTypeChangeSet[] = [];
        let targetVersionUniqueMedTypes = targetVersion.GetUniqueMedicineTypesWithAvgDosePerMonth();
        let prevVersionUniqueMedTypes = prevVersion.GetUniqueMedicineTypesWithAvgDosePerMonth();

        // Loop through entries in the targetVersionMedTypes (find those which are NEW and CHANGED)
        for (var medicineTypeName in targetVersionUniqueMedTypes) {
            let medTypeEntry = targetVersionUniqueMedTypes[medicineTypeName];
            let newMedTypeChangeSet = new MedicineTypeChangeSet(medTypeEntry.MedicineType);

            // New
            if (prevVersionUniqueMedTypes[medicineTypeName] === undefined) { // medicineType exists only in targetVersion
                newMedTypeChangeSet.ChangeType = ChangeType.New;
            }
            // Changed
            else if (prevVersionUniqueMedTypes[medicineTypeName] !== undefined) { // medicineType exists in both
                var prevVersionMedTypeChangeSet = prevVersionUniqueMedTypes[medicineTypeName];

                if (prevVersionMedTypeChangeSet.AvgMonthlyDosage < medTypeEntry.AvgMonthlyDosage) {
                    newMedTypeChangeSet.ChangeType = ChangeType.Increased;
                } else if (prevVersionMedTypeChangeSet.AvgMonthlyDosage > medTypeEntry.AvgMonthlyDosage) {
                    newMedTypeChangeSet.ChangeType = ChangeType.Decreased;
                } else {
                    newMedTypeChangeSet.ChangeType = ChangeType.Unchanged;
                }
            }

            delete prevVersionUniqueMedTypes[medicineTypeName];
            medTypeChanges.push(newMedTypeChangeSet);
        }

        // Loop through remaining entries in the prevVersionUniqueMedTypes (find those which have been STOPPED)
        for (var medicineTypeName in prevVersionUniqueMedTypes) {
            let medTypeEntry = prevVersionUniqueMedTypes[medicineTypeName];
            let newMedTypeChangeSet = new MedicineTypeChangeSet(medTypeEntry.MedicineType);

            // Stopped
            if (targetVersionUniqueMedTypes[medicineTypeName] === undefined) {
                newMedTypeChangeSet.ChangeType = ChangeType.Stopped;
            }

            medTypeChanges.push(newMedTypeChangeSet);
        }


        return medTypeChanges;
    }
}

export class MedicineTypeChangeSet {
    public ChangeType: ChangeType;

    constructor(public MedicineType: CLOs.MedicineTypeCLO) {
    }
}
export enum ChangeType {
    Unchanged = 0,
    Increased = 1,
    Decreased = 2,
    New = 3,
    Stopped = 4
}