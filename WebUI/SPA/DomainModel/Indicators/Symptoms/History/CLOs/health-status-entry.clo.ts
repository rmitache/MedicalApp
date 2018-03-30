import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';

export class HealthStatusEntry extends BaseCLO {
    // Fields
    public ID: number;
    public OccurenceDateTime: Date;
    public HealthLevel: Enums.HealthLevel;

    // Constructor
    constructor() {
        super();
    }
}