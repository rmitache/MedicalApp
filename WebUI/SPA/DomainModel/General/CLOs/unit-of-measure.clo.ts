import { BaseCLO } from 'SPA/Core/CLO/base.clo';


export class UnitOfMeasureCLO extends BaseCLO {
    // Fields
    public ID: number;
    public Name: string;
    public Abbreviation: Date;

    // Constructor
    constructor(init?: Partial<UnitOfMeasureCLO>) {
        super();
        Object.assign(this, init);
    }
}