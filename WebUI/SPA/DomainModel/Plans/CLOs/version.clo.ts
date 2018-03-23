import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';

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
        if (this.StartDate.getTime() < new Date().getTime()) {
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

        if (this.EndDate.getTime() < new Date().getTime()) {
            return true;
        } else {
            return false;

        }
    }

    // Constructor
    constructor() {
        super();
    }


}