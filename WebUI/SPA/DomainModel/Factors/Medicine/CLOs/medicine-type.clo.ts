import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { MedicineFactorRecordCLO } from 'SPA/DomainModel/clo-exports';
import * as moment from 'moment';


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
	public SupplyWillLastUntil: Date;

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