import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import * as moment from 'moment';
import * as momentRange from 'moment-range';
import { Time, Range, TimeRange } from 'SPA/Core/Helpers/DataStructures/misc';


export class PlanCLO extends BaseCLO {
    // Fields
    public ID: number;
    public Name: string;
    public DateCreated: Date;
    public Versions: CLOs.VersionCLO[];


    // Properties
    public get Status(): Enums.PlanStatus {

        // Variables
        let latestVersion = this.GetLatestVersion();
        let prevVersion = this.GetPreviousLatestVersion();


        // Active status-----------------------------------------------------------------------------
        if (latestVersion.Status === Enums.VersionStatus.Active) {
            return Enums.PlanStatus.Active;
        }
        if (prevVersion !== null && prevVersion.Status === Enums.VersionStatus.Active && latestVersion.Status === Enums.VersionStatus.Upcoming) {
            return Enums.PlanStatus.ActiveWithUpcomingAdjustment;
        }
        //-------------------------------------------------------------------------------------------
        // Inactive status---------------------------------------------------------------------------
        if (latestVersion.Status === Enums.VersionStatus.Inactive) {
            return Enums.PlanStatus.Inactive;
        }
        //-------------------------------------------------------------------------------------------
        // Upcoming status---------------------------------------------------------------------------
        if (latestVersion.Status === Enums.VersionStatus.Upcoming && prevVersion === null) {
            return Enums.PlanStatus.UpcomingAsNew;
        }
        if (prevVersion !== null && latestVersion.Status === Enums.VersionStatus.Upcoming && prevVersion.Status === Enums.VersionStatus.Inactive) {
            return Enums.PlanStatus.UpcomingAsRestarted;
        }
        //-------------------------------------------------------------------------------------------

        throw new Error('No Status could be determined for Plan with name "' + this.Name + '"');
    }


    // Constructor
    constructor() {
        super();
    }

    // Public methods
    public GetLatestVersion(): CLOs.VersionCLO {
        if (this.Versions && this.Versions.length > 0)
            return this.Versions[this.Versions.length - 1];
        else
            return null;
    }
    public GetPreviousLatestVersion(): CLOs.VersionCLO {
        if (this.Versions && this.Versions.length > 1)
            return this.Versions[this.Versions.length - 2];
        else
            return null;
    }
    public GetFirstVersion(): CLOs.VersionCLO {
        if (this.Versions && this.Versions.length > 0)
            return this.Versions[0];
        else
            return null;
    }
    public GetIntersectionsPerVersionWithDateRange(targetDateRange: Range<moment.Moment>): momentRange.DateRange[] {

        var intersectionsArray: momentRange.DateRange[] = [];
        var allIntersectionsAreNull = true;

        this.Versions.forEach((versionCLO) => {
            var intersectionResult = versionCLO.GetIntersectionWithDateRange(targetDateRange);
            intersectionsArray.push(intersectionResult);
            if (intersectionResult !== null) {
                allIntersectionsAreNull = false;
            }
        });

        // Returns an array 
        if (allIntersectionsAreNull) {
            return null;
        } else {
            return intersectionsArray;
        }
    }
}