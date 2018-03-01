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


    // Should be getters only
    public get Status(): Enums.PlanStatus {
       
        if (this.HasStarted && !this.HasEnded) {
            return Enums.PlanStatus.Active;
        }
        else {
            return Enums.PlanStatus.Inactive;
        }

    }
    public get HasStarted(): boolean {
        if (this.GetFirstVersion().StartDate.getMilliseconds() < new Date().getMilliseconds()) {
            return true;
        } else {
            return false;

        }
    }
    public get HasEnded(): boolean {
        
        if (this.GetLatestVersion().EndDate === null) {
            return false;
        }

        if (this.GetLatestVersion().EndDate.getMilliseconds() < new Date().getMilliseconds()) {
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