import { BaseCLO } from 'SPA/Core/CLO/base.clo';


export class SymptomTypeCLO extends BaseCLO {
    // Fields
    public ID: number;
    public IsCustomSymptom: boolean;
    public Name: string;

    // Constructor
    constructor() {
        super();
    }
}