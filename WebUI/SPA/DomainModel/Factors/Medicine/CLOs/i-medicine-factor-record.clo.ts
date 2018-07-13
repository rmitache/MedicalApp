﻿import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';

export interface IMedicineFactorRecord {
    MedicineType: CLOs.MedicineTypeCLO;
    UnitDoseType: Enums.UnitDoseType;
    UnitDoseQuantifier: number;
    UnitDoseSize: number;
    UnitDoseUoM: Enums.UnitOfMeasure;
}
