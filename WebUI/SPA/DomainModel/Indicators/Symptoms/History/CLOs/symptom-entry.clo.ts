import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';

export class SymptomEntryCLO extends BaseCLO {
    // Fields
    public ID: number;
    public OccurenceDateTime: Date;
    public SymptomType: CLOs.SymptomType;
    public IntensityLevel: Enums.SymptomIntensityLevel;

    // Constructor
    constructor() {
        super();
    }
}