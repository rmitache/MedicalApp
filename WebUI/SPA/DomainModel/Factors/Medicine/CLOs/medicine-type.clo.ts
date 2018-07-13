import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';


export class MedicineTypeCLO extends BaseCLO {
    // Fields
    public ID: number;
    public Name: string;
    public ProducerName: string;
    public BaseForm: Enums.BaseForm;

    public PackagedUnitDoseType?: Enums.UnitDoseType;
    public PackagedUnitDoseSize: number;
    public PackagedUnitDoseUoM: Enums.UnitOfMeasure;



    // Constructor
    constructor(init?: Partial<MedicineTypeCLO>) {
        super();
        Object.assign(this, init);
    }

    // Public methods
    public IsPackagedIntoUnitDoses(): boolean {
        let isPackaged = (this.PackagedUnitDoseType !== null &&
            this.PackagedUnitDoseSize !== null &&
            this.PackagedUnitDoseUoM !== null);
        return isPackaged;
    }
}