import { NgModule } from '@angular/core';
import {GenericCLOFactory } from './generic-clo.factory';
import { PatientAccountCLOFactory } from './Patients/CLOFactories/patient-account-clo.factory';
import { MedicineFactorRecordCLOFactory } from 'SPA/DomainModel/Factors/Medicine/History/CLOFactories/medicine-factor-record-clo.factory';
import { MedicineRuleItemCLOFactory } from 'SPA/DomainModel/Factors/Medicine/History/CLOFactories/medicine-rule-item-clo.factory';
import { MedicineTypeCLOFactory } from 'SPA/DomainModel/Factors/Medicine/Library/CLOFactories/medicine-type-clo.factory';
import { PlanCLOFactory } from './Plans/CLOFactories/plan-clo.factory';
import { VersionCLOFactory } from './Plans/CLOFactories/version-clo.factory';
import { RuleCLOFactory } from 'SPA/DomainModel/Plans/CLOFactories/rule-clo.factory';
import { HealthStatusEntryCLOFactory } from './Indicators/Symptoms/History/CLOFactories/health-status-entry-clo.factory';


@NgModule({
    providers: [
        // Generic CLOFactory
        GenericCLOFactory,

        // All CLOFactories
        PatientAccountCLOFactory,
        MedicineFactorRecordCLOFactory,
        MedicineRuleItemCLOFactory,
        MedicineTypeCLOFactory,
        PlanCLOFactory,
        VersionCLOFactory,
        RuleCLOFactory,
        HealthStatusEntryCLOFactory,

    ]
})

export class DomainModelModule { }