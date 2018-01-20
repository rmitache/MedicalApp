import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';


export class MedicineTypeCLO extends BaseCLO {
    // Fields
    public ID: number;
    public Name: string;
    public ShortName: string;
    public ProducerName: string;
    public Form: Enums.MedicineForm;
    public PieceSize: number;
    public PieceSizeUnitOfMeasure: Enums.UnitOfMeasure;
    public ParentCategories: CLOs.MedicineCategoryCLO[];


    // Constructor
    constructor(init?: Partial<MedicineTypeCLO>) {
        super();
        Object.assign(this, init);
    }
}