import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { Time } from 'SPA/Core/Helpers/DataStructures/data-structures';


export class HealthStatusEntryCLO extends BaseCLO {
    // Fields
    public ID: number;
    public OccurenceDateTime: Date;
    public HealthLevel: Enums.HealthLevel;
    public SymptomEntries: CLOs.SymptomEntryCLO[];

    // Constructor
    constructor() {
        super();
    }

    // Public methods
    public GetTime(): Time {
        return new Time(this.OccurenceDateTime.getHours(), this.OccurenceDateTime.getMinutes());
    }
}