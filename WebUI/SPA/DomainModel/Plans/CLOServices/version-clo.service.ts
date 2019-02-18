﻿// Angular and 3rd party stuff
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as momentRange from 'moment-range';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';


@Injectable()
export class VersionCLOService {

    // Private methods
    private getChangeBetween(medTypeA: MedicineTypeDosageInfo, medTypeB: MedicineTypeDosageInfo) { // a = current, b = previous
        if (medTypeA !== undefined && medTypeB !== undefined &&
            medTypeA.MedicineType.Name !== medTypeB.MedicineType.Name) {
            throw new Error('Change can only be determined between the same medicine type');
        }

        // Variables
        let change = new MedicineTypeAndChangeTypePair(medTypeA.MedicineType);


        // Only medTypeA is present
        if (medTypeA !== undefined && medTypeB === undefined) {
            change.ChangeType = ChangeType.Started;
        }
        // Both medType A and B are present 
        else if (medTypeA !== undefined && medTypeB !== undefined) { // medicineType exists in both

            // If there are more than 1 unitDoseTypes
            if (medTypeA.UnitDoseTypesNamesCount > 1 || medTypeB.UnitDoseTypesNamesCount > 1) {
                change.ChangeType = ChangeType.Unspecified;
            }
            // If there is a single unitDoseType in each
            else {

                // If the unitDoseTypes are different 
                let medTypeAUnitDoseTypeName = Object.keys(medTypeA.UnitDoseTypesNamesToTotalMonthlyDosage)[0];
                let medTypeBUnitDoseTypeName = Object.keys(medTypeB.UnitDoseTypesNamesToTotalMonthlyDosage)[0];
                if (medTypeAUnitDoseTypeName !== medTypeBUnitDoseTypeName) {
                    change.ChangeType = ChangeType.Unspecified;
                }


                //}
                ////
                //for (var medTypeName in medTypeA.UnitDoseTypesNamesToTotalMonthlyDosage) {
                //    var monthlyDosage = medTypeA.UnitDoseTypesNamesToTotalMonthlyDosage[medTypeName];
                //}

                //let medTypeADosage = Object.keys(medTypeA.UnitDoseTypesNamesToTotalMonthlyDosage)[0];
                //let medTypeBDosage = Object.keys(medTypeB.UnitDoseTypesNamesToTotalMonthlyDosage)[0];

                //if (medTypeADosage !== medTypeBDosage) {
                //    change.ChangeType = ChangeType.Unspecified;
                //}


                // 
            }




            //if (medTypeB.AvgMonthlyDosage < medTypeDosageInfo.AvgMonthlyDosage) {
            //    medTypeChange.ChangeType = ChangeType.Increased;
            //} else if (prevVersionMedTypeChangeSet.AvgMonthlyDosage > medTypeDosageInfo.AvgMonthlyDosage) {
            //    medTypeChange.ChangeType = ChangeType.Decreased;
            //} else {
            //    medTypeChange.ChangeType = ChangeType.Unchanged;
            //}
        }
        // Only medTypeB is present 
        else if (medTypeA === undefined && medTypeB !== undefined) {
            change.ChangeType = ChangeType.Stopped;
        }


        if (change.ChangeType === null)
            return null;
        else
            return change;
    }

    // Public Methods
    public GetUniqueMedicineTypesWithDosageInfo(targetVersion: CLOs.VersionCLO) {
        let medTypes: { [medicineTypeName: string]: MedicineTypeDosageInfo } = {};

        // Loop through rules  
        for (let i = 0; i < targetVersion.Rules.length; i++) {
            let ruleCLO = targetVersion.Rules[i];

            // Loop through medicineRuleItems and record their dosage info for their MedicineType
            ruleCLO.MedicineRuleItems.forEach((medRuleItem) => {
                if (medTypes[medRuleItem.MedicineType.Name] === undefined) {
                    medTypes[medRuleItem.MedicineType.Name] = new MedicineTypeDosageInfo(medRuleItem.MedicineType);
                }
                let medTypeEntry = medTypes[medRuleItem.MedicineType.Name];
                medTypeEntry.AddDosageInfoFromRuleItem(medRuleItem, ruleCLO);
            });
        }

        return medTypes;
    }
    /** Returns changes in the form: VersionA minus VersionB  */
    public GetChangesBetween(versionA: CLOs.VersionCLO, versionB: CLOs.VersionCLO): MedicineTypeAndChangeTypePair[] {
        // versionA - versionB -> actual differences between the two versions
        // null - versionB -> everything in versionB is shown as STOPPED
        // versionA - null -> everything in versionA is shown as NEW
        
        // Variables
        let listOfChanges: MedicineTypeAndChangeTypePair[] = [];
        let versionAUniqueMedTypes = (versionA !== null) ? this.GetUniqueMedicineTypesWithDosageInfo(versionA) : {};
        let versionBUniqueMedTypes = (versionB !== null) ? this.GetUniqueMedicineTypesWithDosageInfo(versionB) : {};

        // Loop through entries in the versionAMedTypes (find those which are NEW and CHANGED)
        for (var medicineTypeName in versionAUniqueMedTypes) {
            let medTypeDosageInfoFromA = versionAUniqueMedTypes[medicineTypeName];
            let medTypeDosageInfoFromB = versionBUniqueMedTypes[medicineTypeName];

            let change = this.getChangeBetween(medTypeDosageInfoFromA, medTypeDosageInfoFromB);
            if (change !== null)
                listOfChanges.push(change);

            // Delete the medicineType entry from versionB, in order to be able to parse what is left afterwards
            delete versionBUniqueMedTypes[medicineTypeName];
        }


        return listOfChanges;
    }
    /** Checks whether two Versions are adjacent. The check is done on both sides, meaning the order of the Versions passed is irrelevant */
    public AreAdjacent(versionA: CLOs.VersionCLO, versionB: CLOs.VersionCLO) {
        if (versionA === null || versionB === null) {
            return false;
        }
        // OBS: the reason the calc is done on both sides, is that the order of versions (time-wise) might be either AB or BA

        // Convert all the dates to UTC (to ensure that calculations are not affected by potential DST)
        let versionAStartDate = moment(versionA.StartDateTime).utc();
        let versionAEndDate = moment(versionA.EndDateTime).utc();
        let versionBStartDate = moment(versionB.StartDateTime).utc();
        let versionBEndDate = moment(versionB.EndDateTime).utc();


        // The idea is that adjacent dates will be of the form 23:59 and 00:00 (in local time), so the different should be only 1 minute between them
        var minutesOnOneSide = versionBEndDate.diff(versionAStartDate, 'minutes');
        var minutesOnOtherSide = versionBStartDate.diff(versionAEndDate, 'minutes');
        if (minutesOnOneSide === 1 || minutesOnOtherSide === 1) {
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
export class MedicineTypeDosageInfo {

    // Fields
    public readonly MedicineType: CLOs.MedicineTypeCLO;
    public readonly UnitDoseTypesNamesToTotalMonthlyDosage: { [UnitDoseTypeName: string]: number } = {};
    private unitDoseTypesNamesCount: number = 0;

    // Properties
    public get UnitDoseTypesNamesCount(): number {
        return this.unitDoseTypesNamesCount;
    }

    // Constructor
    constructor(medTypeCLO: CLOs.MedicineTypeCLO) {
        this.MedicineType = medTypeCLO;
    }

    // Public methods
    public AddDosageInfoFromRuleItem(ruleItem: CLOs.MedicineRuleItemCLO, parentRule: CLOs.RuleCLO) {

        // Initialize the total from 0 if nothing has been added to it yet for the given UnitDoseTypeName
        if (this.UnitDoseTypesNamesToTotalMonthlyDosage[ruleItem.UnitDoseTypeName] === undefined) {
            this.UnitDoseTypesNamesToTotalMonthlyDosage[ruleItem.UnitDoseTypeName] = 0;
            this.unitDoseTypesNamesCount++;
        }

        //
        var dosagePerMonth = ruleItem.DosageToTakeASingleTime * parentRule.NrOfTimesPerMonth;
        this.UnitDoseTypesNamesToTotalMonthlyDosage[ruleItem.UnitDoseTypeName] += dosagePerMonth;
    }
}
export enum ChangeType {
    Increased = 0,
    Decreased = 1,
    Started = 2,
    Stopped = 3,
    Unspecified = 4
}



//export class MedicineTypeAndAvgMonthlyDosage {

//    // Ex: []

//    // Idea: the avgMonthlyDosage should be for EACH UnitDoseType !!!!

//    // Fields
//    public MedicineType: CLOs.MedicineTypeCLO;
//    private totalMonthlyDosage: number = 0; // quantity * unitdosesize 
//    private numberOfRuleItems: number = 0;

//    // Properties
//    public get AvgMonthlyDosage(): number {
//        return this.totalMonthlyDosage;
//    }

//    // Public methods
//    public AddTotalMonthlyDosageFromMedicineRuleItem(totalDosageInMgOrMl) {
//        this.totalMonthlyDosage += totalDosageInMgOrMl;
//        this.numberOfRuleItems++;
//    }
//}




