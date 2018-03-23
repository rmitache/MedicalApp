import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import * as moment from 'moment';


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
        let prevVersion = (this.Versions.length > 1) ? this.Versions[this.Versions.length - 2] : null;


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
    public GetFirstVersion(): CLOs.VersionCLO {
        if (this.Versions && this.Versions.length > 0)
            return this.Versions[0];
        else
            return null;
    }
}