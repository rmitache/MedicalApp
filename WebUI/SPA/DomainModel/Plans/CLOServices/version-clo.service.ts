// Angular and 3rd party stuff
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as momentRange from 'moment-range';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import * as DataStructures from 'SPA/Core/Helpers/DataStructures/data-structures';
import { MedicineTypeCLOFactory } from 'SPA/DomainModel/Factors/Medicine/Library/CLOFactories/medicine-type-clo.factory';
import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import { ICLOFactory } from 'SPA/Core/CLO/i-clo.factory';
import { RuleCLOFactory } from 'SPA/DomainModel/Plans/CLOFactories/rule-clo.factory';
import { GetNrOfDaysBetweenDatesUsingMoment } from 'SPA/Core/Helpers/Functions/functions';

@Injectable()
export class VersionCLOService {
    // Public Methods
    /** Returns VersionA - VersionB  */
    public GetChangesBetween(versionA: CLOs.VersionCLO, versionB: CLOs.VersionCLO, returnUnchanged: boolean = false): MedicineTypeChangeSet[] {
        // versionA - versionB -> actual differences between the two versions
        // null - versionB -> everything in versionB is shown as STOPPED
        // versionA - null -> everything in versionA is shown as NEW


        // Variables
        let medTypeChanges: MedicineTypeChangeSet[] = [];
        let versionAUniqueMedTypes = (versionA !== null) ? versionA.GetUniqueMedicineTypesWithAvgDosePerMonth() : {};
        let versionBUniqueMedTypes = (versionB !== null) ? versionB.GetUniqueMedicineTypesWithAvgDosePerMonth() : {};

        // Loop through entries in the versionAMedTypes (find those which are NEW and CHANGED)
        for (var medicineTypeName in versionAUniqueMedTypes) {
            let medTypeEntry = versionAUniqueMedTypes[medicineTypeName];
            let newMedTypeChangeSet = new MedicineTypeChangeSet(medTypeEntry.MedicineType);

            // New
            if (versionBUniqueMedTypes[medicineTypeName] === undefined) { // medicineType exists only in targetVersion
                newMedTypeChangeSet.ChangeType = ChangeType.New;
            }
            // Changed
            else if (versionBUniqueMedTypes[medicineTypeName] !== undefined) { // medicineType exists in both
                var prevVersionMedTypeChangeSet = versionBUniqueMedTypes[medicineTypeName];

                if (prevVersionMedTypeChangeSet.AvgMonthlyDosage < medTypeEntry.AvgMonthlyDosage) {
                    newMedTypeChangeSet.ChangeType = ChangeType.Increased;
                } else if (prevVersionMedTypeChangeSet.AvgMonthlyDosage > medTypeEntry.AvgMonthlyDosage) {
                    newMedTypeChangeSet.ChangeType = ChangeType.Decreased;
                } else {
                    newMedTypeChangeSet.ChangeType = ChangeType.Unchanged;
                }
            }

            delete versionBUniqueMedTypes[medicineTypeName];
            medTypeChanges.push(newMedTypeChangeSet);
        }

        // Loop through remaining entries in the prevVersionUniqueMedTypes (find those which have been STOPPED)
        for (var medicineTypeName in versionBUniqueMedTypes) {
            let medTypeEntry = versionBUniqueMedTypes[medicineTypeName];
            let newMedTypeChangeSet = new MedicineTypeChangeSet(medTypeEntry.MedicineType);

            // Stopped
            if (versionAUniqueMedTypes[medicineTypeName] === undefined) {
                newMedTypeChangeSet.ChangeType = ChangeType.Stopped;
            }

            medTypeChanges.push(newMedTypeChangeSet);
        }


        // Filter out Unchanged types 
        if (!returnUnchanged) {
            medTypeChanges = medTypeChanges.filter((medTypeChange) => {
                return medTypeChange.ChangeType !== ChangeType.Unchanged;
            });
        }

        return medTypeChanges;
    }
    /** Checks whether two Versions are adjacent. The check is done on both sides  */
    public AreAdjacent(versionA: CLOs.VersionCLO, versionB: CLOs.VersionCLO) {
        let versionAStartDate = moment(versionA.StartDate);
        let versionAEndDate = moment(versionA.EndDate);
        let versionBStartDate = moment(versionB.StartDate);
        let versionBEndDate = moment(versionB.EndDate);


        let nrOfDaysOneSide = GetNrOfDaysBetweenDatesUsingMoment(versionBEndDate, versionAStartDate, false);
        let nrOfDaysOneSideReverse = GetNrOfDaysBetweenDatesUsingMoment(versionAStartDate, versionBEndDate, false);

        let nrOfDaysOtherSide = GetNrOfDaysBetweenDatesUsingMoment(versionBStartDate, versionAEndDate, false);
        let nrOfDaysOtherSideReverse = GetNrOfDaysBetweenDatesUsingMoment(versionAEndDate, versionBStartDate, false);


        if (nrOfDaysOneSide === 1 || nrOfDaysOtherSide === 1) {
            return true;
        } else {
            return false;
        }
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