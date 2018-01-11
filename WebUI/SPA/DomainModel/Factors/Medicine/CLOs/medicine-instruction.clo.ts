import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import { MedicineCategoryCLO } from 'SPA/DomainModel/Factors/Medicine/CLOs/medicine-category.clo';
import { UnitOfMeasureCLO } from 'SPA/DomainModel/General/CLOs/unit-of-measure.clo';


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