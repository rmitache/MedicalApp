import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';


export class MedicineTypeCLO extends BaseCLO {
    // Fields
    public ID: number;
    public Name: string;
    public ProducerName: string;

    public BaseUnitOfMeasure: Enums.UnitOfMeasure;
    public IsPackagedIntoUnits: boolean;
    public PackagedUnitDoseType: Enums.PackagedUnitDoseType;
    public PackagedUnitDoseSize: number;

    public IsInUse: Enums.MedicineTypeStatus;
    public RemainingSupply: number;
    public RemainingSupplyMeasuredIn: string;

    // Properties
    public get UnitOfMeasureName() {
        if (this.BaseUnitOfMeasure === null || this.BaseUnitOfMeasure === undefined) {
            return null;
        }

        return Enums.UnitOfMeasure[this.BaseUnitOfMeasure];
    }

    // Constructor
    constructor(init?: Partial<MedicineTypeCLO>) {
        super();
        Object.assign(this, init);
    }
}