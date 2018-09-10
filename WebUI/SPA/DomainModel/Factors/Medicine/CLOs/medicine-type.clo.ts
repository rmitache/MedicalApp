import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { MedicineFactorRecordCLO } from 'SPA/DomainModel/clo-exports';


export class MedicineTypeCLO extends BaseCLO {
    // Fields
    public ID: number;
    public Name: string;
    public ProducerName: string;

    public BaseUnitOfMeasure: Enums.UnitOfMeasure;
    public IsPackagedIntoUnits: boolean;
    public PackagedUnitDoseType: Enums.PackagedUnitDoseType;
    public PackagedUnitDoseSize: number;

    public UsageStatus: Enums.MedicineTypeStatus;
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

    // Public methods
    public AddToRemainingSupply(supplyToAdd: number) {
        if (supplyToAdd <= 0) {
            throw new Error("AddToRemainingSupply: supply must be non-zero and non-negative");
        }
        if (this.RemainingSupply === null) {
            this.RemainingSupply = 0;
        }

        this.RemainingSupply += supplyToAdd;
    }
    public RemoveFromRemainingSupply(supplyToRemove: number) {
        if (supplyToRemove <= 0) {
            throw new Error("RemoveFromRemainingSupply: supply must be non-zero and non-negative");
        }
        this.RemainingSupply -= supplyToRemove;

        if (this.RemainingSupply < 0) {
            this.RemainingSupply = 0;
        }
    }
    public ClearSupply() {
        this.RemainingSupply = null;
    }
}