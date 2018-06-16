import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import * as moment from 'moment';
import * as momentRange from 'moment-range';
import { Time, Range, TimeRange } from 'SPA/Core/Helpers/DataStructures/misc';


export class VersionCLO extends BaseCLO {
    // Fields
    public ID: number;
    public StartDate: Date;
    public EndDate: Date;
    public Rules: CLOs.RuleCLO[];

    // Properties
    public get Status(): Enums.VersionStatus {

        // Determine the Status
        if (this.HasStarted && !this.HasEnded) {
            // Active
            return Enums.VersionStatus.Active;
        }
        if (this.HasStarted && this.HasEnded) {
            // Inactive
            return Enums.VersionStatus.Inactive;
        }
        if (!this.HasStarted && !this.HasEnded) {
            // Upcoming
            return Enums.VersionStatus.Upcoming;
        }
    }
    public get HasStarted(): boolean {
        if (moment(this.StartDate).startOf('day') <= moment()) {
            return true;
        } else {
            return false;

        }
    }
    public get HasEnded(): boolean {

        // Neverending
        if (this.EndDate === null) {
            return false;
        }

        if (moment(this.EndDate).endOf('day') <= moment()) {
            return true;
        } else {
            return false;

        }
    }

    // Constructor
    constructor() {
        super();
    }

    // Public methods
    public GetIntersectionWithDateRange(targetDateRange: Range<moment.Moment>): momentRange.DateRange {

        // Variables
        var intersectionRange = null;
        var momentTargetDateRange = new momentRange.DateRange(targetDateRange.RangeStart.clone().startOf('day'), targetDateRange.RangeEnd.clone().endOf('day'));
        var today = moment();

        // Intersect only up until TODAY if it is contained in the targetDateRange
        if (momentTargetDateRange.contains(today)) {
            momentTargetDateRange = new momentRange.DateRange(targetDateRange.RangeStart.clone().startOf('day'), today.endOf('day'));
        } 

        // Get the intersection
        if (this.EndDate !== null) {
            var versionDateRange = new momentRange.DateRange(moment(this.StartDate).startOf('day'), moment(this.EndDate).endOf('day'));
            intersectionRange = momentTargetDateRange.intersect(versionDateRange);
        }
        // Handle Version with no EndDate
        else {
            // If a version has no EndDate and its StartDate is WITHIN the targetDateRange
            if (this.EndDate === null && momentTargetDateRange.contains(moment(this.StartDate))) {
                intersectionRange = new momentRange.DateRange(moment(this.StartDate), momentTargetDateRange.end.clone());
            }
            // If a version has no EndDate and its StartDate is BEFORE the targetDateRange
            else if (this.EndDate === null && moment(this.StartDate) < momentTargetDateRange.start) {
                intersectionRange = new momentRange.DateRange(momentTargetDateRange.start.clone(), momentTargetDateRange.end.clone());
            }
        }

        return intersectionRange;
    }
    public GetUniqueMedicineTypes() {
        let medTypes: { [medicineTypeName: string]: CLOs.MedicineTypeCLO } = {};
           
        for (let i = 0; i < this.Rules.length; i++) {
            let ruleCLO = this.Rules[i];

            ruleCLO.MedicineRuleItems.forEach((medRuleItem) => {
                if (medTypes[medRuleItem.MedicineType.Name] === undefined) {
                    medTypes[medRuleItem.MedicineType.Name] = medRuleItem.MedicineType;
                }
            });
        }

        // Convert to array 
        let medTypesArray: CLOs.MedicineTypeCLO[] = [];
        for (var medicineTypeName in medTypes) {
            var medicineType = medTypes[medicineTypeName];
            medTypesArray.push(medicineType);
        }
        medTypesArray = medTypesArray.sort((a, b) => {
            if (a.Name < b.Name) return -1;
            if (a.Name > b.Name) return 1;
            return 0;
        })
        return medTypesArray;
    }
}

export class VersionChangeCLO {

    // Overall version changes
    // AverageMonthlyDosage
    // Fields
    public TotalAverageMonthlyDosage: number;
    public MedicineTypesChanges: MedicineTypeChangeCLO[];
}

export class MedicineTypeChangeCLO {

}