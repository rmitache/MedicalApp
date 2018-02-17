import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';

export class PlanCLO extends BaseCLO {
    // Fields
    public ID: number;
    public Name: string;
    public DateCreated: Date;
    public Versions: CLOs.VersionCLO[];


    // Should be getters only
    public Status: Enums.PlanStatus;
    public HasStarted: boolean;
    public HasEnded: boolean;

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
}