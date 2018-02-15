import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';

export class VersionCLO extends BaseCLO {
    // Fields
    public ID: number;
    public StartDate: Date;
    public EndDate: Date;
    //public SectionHeaders[]
    //public Rules[]


    // Constructor
    constructor() {
        super();
    }
}