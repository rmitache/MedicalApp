import { BaseCLO } from 'SPA/Core/CLO/base.clo';

export class MedicineMethodCLO extends BaseCLO {
    // Fields
    public ID: number;
    public Name: string;
    public ShortName: string;

    // Constructor
    constructor(init?: Partial<MedicineMethodCLO>) {
        super();
        Object.assign(this, init);
    }
}