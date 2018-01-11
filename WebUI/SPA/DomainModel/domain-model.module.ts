import { NgModule } from '@angular/core';
import {GenericCLOFactory } from './generic-clo.factory';
import { PatientAccountCLOFactory } from './Patients/CLOFactories/patient-account-clo.factory';


@NgModule({
    providers: [
        // Generic CLOFactory
        GenericCLOFactory,

        // All CLOFactories
        PatientAccountCLOFactory,
    ]
})

export class DomainModelModule { }