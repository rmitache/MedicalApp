// Angular and 3rd party stuff
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as momentRange from 'moment-range';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import * as DataStructures from 'SPA/Core/Helpers/DataStructures/data-structures';
import { MedicineTypeCLOFactory } from 'SPA/DomainModel/Factors/Medicine/CLOFactories/medicine-type-clo.factory';
import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import { ICLOFactory } from 'SPA/Core/CLO/i-clo.factory';
import { RuleCLOFactory } from 'SPA/DomainModel/Plans/CLOFactories/rule-clo.factory';
import { GetNrOfDaysBetweenDatesUsingMoment } from 'SPA/Core/Helpers/Functions/functions';

@Injectable()
export class VersionCLOService {
    // Public Methods
    public GetUniqueMedicineTypesWithAvgDosePerMonth(targetVersion:CLOs.VersionCLO) {
        let medTypes: { [medicineTypeName: string]: MedicineTypeAndAvgMonthlyDosage } = {};

        // Loop through rules  
        for (let i = 0; i < targetVersion.Rules.length; i++) {
            let ruleCLO = targetVersion.Rules[i];

            // Loop through medicineRuleItems
            ruleCLO.MedicineRuleItems.forEach((medRuleItem) => {

                // Create an entry for the MedicineType if it doesnt exist
                if (medTypes[medRuleItem.MedicineType.Name] === undefined) {
                    medTypes[medRuleItem.MedicineType.Name] = new MedicineTypeAndAvgMonthlyDosage();
                    medTypes[medRuleItem.MedicineType.Name].MedicineType = medRuleItem.MedicineType;
                }

                // Add it's dosage calculation to the monthlyTotal for its MedicineType
                let medTypeEntry = medTypes[medRuleItem.MedicineType.Name];
                var dosagePerMonth = medRuleItem.TotalDosagePerTimeInMgOrMl * ruleCLO.NrOfTimesPerMonth;
                medTypeEntry.AddTotalMonthlyDosageFromMedicineRuleItem(dosagePerMonth);
            });
        }

        return medTypes;
    }
    /** Returns VersionA - VersionB  */
    public GetChangesBetween(versionA: CLOs.VersionCLO, versionB: CLOs.VersionCLO, returnUnchanged: boolean = false): MedicineTypeAndChangeTypePair[] {
        // versionA - versionB -> actual differences between the two versions
        // null - versionB -> everything in versionB is shown as STOPPED
        // versionA - null -> everything in versionA is shown as NEW


        // Variables
        let medTypeChanges: MedicineTypeAndChangeTypePair[] = [];
        let versionAUniqueMedTypes =  (versionA !== null) ? this.GetUniqueMedicineTypesWithAvgDosePerMonth(versionA) : {};
        let versionBUniqueMedTypes = (versionB !== null) ? this.GetUniqueMedicineTypesWithAvgDosePerMonth(versionB) : {};
        

        // Loop through entries in the versionAMedTypes (find those which are NEW and CHANGED)
        for (var medicineTypeName in versionAUniqueMedTypes) {
            let medTypeEntry = versionAUniqueMedTypes[medicineTypeName];
            let newMedTypeChangeSet = new MedicineTypeAndChangeTypePair(medTypeEntry.MedicineType);

            // New
            if (versionBUniqueMedTypes[medicineTypeName] === undefined) { // medicineType exists only in targetVersion
                newMedTypeChangeSet.ChangeType = ChangeType.New;
            }
            // UnChanged & Changed
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
            let newMedTypeChangeSet = new MedicineTypeAndChangeTypePair(medTypeEntry.MedicineType);

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
        if (versionA === null || versionB === null) {
            return false;
        }

        let versionAStartDate = moment(versionA.StartDateTime);
        let versionAEndDate = moment(versionA.EndDateTime);
        let versionBStartDate = moment(versionB.StartDateTime);
        let versionBEndDate = moment(versionB.EndDateTime);


        let nrOfDaysOneSide = GetNrOfDaysBetweenDatesUsingMoment(versionBEndDate, versionAStartDate, false);
        let nrOfDaysOtherSide = GetNrOfDaysBetweenDatesUsingMoment(versionBStartDate, versionAEndDate, false);


        if (nrOfDaysOneSide === 1 || nrOfDaysOtherSide === 1) {
            return true;
        } else {
            return false;
        }
    }
}

// Special classes 
export class MedicineTypeAndChangeTypePair {
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
export class MedicineTypeAndAvgMonthlyDosage {

    // Fields
    public MedicineType: CLOs.MedicineTypeCLO;
    private totalMonthlyDosageInMgOrMl: number = 0; // quantity * unitdosesize 
    private numberOfRuleItems: number = 0;

    // Properties
    public get AvgMonthlyDosage(): number {
        return this.totalMonthlyDosageInMgOrMl;
    }

    // Public methods
    public AddTotalMonthlyDosageFromMedicineRuleItem(totalDosageInMgOrMl) {
        this.totalMonthlyDosageInMgOrMl += totalDosageInMgOrMl;
        this.numberOfRuleItems++;
    }
}