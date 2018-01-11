import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import { MedicineCategoryCLO } from 'SPA/DomainModel/Factors/Medicine/CLOs/medicine-category.clo';
import { UnitOfMeasureCLO } from 'SPA/DomainModel/General/CLOs/unit-of-measure.clo';
import { MedicineFormCLO } from 'SPA/DomainModel/Factors/Medicine/CLOs/medicine-form.clo';


export class MedicineTypeCLO extends BaseCLO {
    // Fields
    public ID: number;
    public Name: string;
    public ShortName: string;
    public ProducerName: string;
    public Form: MedicineFormCLO;
    public PieceSize: number;
    public PieceSizeUnitOfMeasure: UnitOfMeasureCLO;
    public ParentCategories: MedicineCategoryCLO[];


    // Constructor
    constructor(init?: Partial<MedicineTypeCLO>) {
        super();
        Object.assign(this, init);
    }
}