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
    private parentPlan: CLOs.PlanCLO;

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
    public set ParentPlan(planCLO: CLOs.PlanCLO) {
        this.parentPlan = planCLO;
    }

    // Constructor
    constructor() {
        super();
    }

    // Public methods
    public GetIntersectionWithDateRange(targetDateRange: Range<moment.Moment>, excludeFuture: boolean = false): momentRange.DateRange {

        // Variables
        var intersectionRange = null;
        var momentTargetDateRange = new momentRange.DateRange(targetDateRange.RangeStart.clone().startOf('day'), targetDateRange.RangeEnd.clone().endOf('day'));


        // Exclude future -> If requested, intersect only up until TODAY 
        if (excludeFuture === true) {
            var today = moment();
            if (momentTargetDateRange.contains(today)) {
                momentTargetDateRange = new momentRange.DateRange(targetDateRange.RangeStart.clone().startOf('day'), today.endOf('day'));
            } else if (momentTargetDateRange.start > today ) {
                return null;
            }
        }


        // Get the intersection when there is an EndDate
        if (this.EndDate !== null) {
            var versionDateRange = new momentRange.DateRange(moment(this.StartDate).startOf('day'), moment(this.EndDate).endOf('day'));
            intersectionRange = momentTargetDateRange.intersect(versionDateRange);
        }
        // Get the intersection when there is no EndDate
        else {
            // If StartDate is WITHIN the targetDateRange
            if (momentTargetDateRange.contains(moment(this.StartDate))) {
                intersectionRange = new momentRange.DateRange(moment(this.StartDate), momentTargetDateRange.end.clone());
            }
            // If StartDate is BEFORE the targetDateRange start
            else if (moment(this.StartDate) < momentTargetDateRange.start) {
                intersectionRange = new momentRange.DateRange(momentTargetDateRange.start.clone(), momentTargetDateRange.end.clone());
            }
        }

        return intersectionRange;
    }
    public GetPreviousVersion(): CLOs.VersionCLO {
        return this.parentPlan.GetVersionBeforeTarget(this);
    }
    public GetNextVersion(): CLOs.VersionCLO {
        return this.parentPlan.GetVersionAfterTarget(this);
    }
}

