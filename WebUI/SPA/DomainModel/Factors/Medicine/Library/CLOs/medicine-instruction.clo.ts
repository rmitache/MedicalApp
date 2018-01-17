import { BaseCLO } from 'SPA/Core/CLO/base.clo';

export class MedicineInstructionCLO extends BaseCLO {
    // Fields
    public ID: number;
    public Name: string;
    public ShortName: string;

    // Constructor
    constructor() {
        super();
    }
}