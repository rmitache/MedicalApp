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
    public Rules: CLOs.RuleCLO[]

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
    public GetIntersectionWithDateRange(targetDateRange: Range<moment.Moment>): Range<moment.Moment> {

        // Variables
        var intersectionRange = null;
        var momentTargetDateRange = new momentRange.DateRange(targetDateRange.RangeStart.clone().startOf('day'), targetDateRange.RangeEnd.clone().endOf('day'));

        // If a version has no EndDate, check that its StartDate is WITHIN the targetDateRange
        if (this.EndDate === null && momentTargetDateRange.contains(moment(this.StartDate))) {
            intersectionRange = new Range<moment.Moment>(moment(this.StartDate), targetDateRange.RangeEnd.clone());
        }
        // If a version has no EndDate, check that its StartDate is BEFORE the targetDateRange
        else if (this.EndDate === null && moment(this.StartDate) < targetDateRange.RangeStart) {
            intersectionRange = new Range<moment.Moment>(targetDateRange.RangeStart.clone(), targetDateRange.RangeEnd.clone());
        }
        // If the version HAS an end date, use moment-range to get the intersection
        else if (this.EndDate !== null) {
            var versionDateRange = new momentRange.DateRange(moment(this.StartDate).startOf('day'), moment(this.EndDate).endOf('day'));
            var intersectResult = momentTargetDateRange.intersect(versionDateRange);
            if (intersectResult !== null) {
                intersectionRange = new Range<moment.Moment>(intersectResult.start, intersectResult.end);
            }
        }

        return intersectionRange;
    }
}