import { NgModule } from '@angular/core';
import {GenericCLOFactory } from './generic-clo.factory';
import { PatientAccountCLOFactory } from './Patients/CLOFactories/patient-account-clo.factory';
import { MedicineFactorRecordCLOFactory } from './Factors/Medicine/History/CLOFactories/medicine-factor-record-clo.factory';
import { MedicineTypeCLOFactory } from './Factors/Medicine/Library/CLOFactories/medicine-type-clo.factory';

@NgModule({
    providers: [
        // Generic CLOFactory
        GenericCLOFactory,

        // All CLOFactories
        PatientAccountCLOFactory,
        MedicineFactorRecordCLOFactory,
        MedicineTypeCLOFactory
    ]
})

export class DomainModelModule { }