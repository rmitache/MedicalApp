import { NgModule } from '@angular/core';
import {GenericCLOFactory } from './generic-clo.factory';
import { UserAccountCLOFactory } from './Users/CLOFactories/user-account-clo.factory';
import { MedicineFactorRecordCLOFactory } from 'SPA/DomainModel/Factors/Medicine/CLOFactories/medicine-factor-record-clo.factory';
import { MedicineRuleItemCLOFactory } from 'SPA/DomainModel/Factors/Medicine/CLOFactories/medicine-rule-item-clo.factory';
import { MedicineTypeCLOFactory } from 'SPA/DomainModel/Factors/Medicine/CLOFactories/medicine-type-clo.factory';
import { PlanCLOFactory } from './Plans/CLOFactories/plan-clo.factory';
import { VersionCLOFactory } from './Plans/CLOFactories/version-clo.factory';
import { RuleCLOFactory } from 'SPA/DomainModel/Plans/CLOFactories/rule-clo.factory';
import { HealthStatusEntryCLOFactory } from './Indicators/Symptoms/CLOFactories/health-status-entry-clo.factory';
import { SymptomTypeCLOFactory } from 'SPA/DomainModel/Indicators/Symptoms/CLOFactories/symptom-type-clo.factory';
import { SymptomEntryCLOFactory } from 'SPA/DomainModel/Indicators/Symptoms/CLOFactories/symptom-entry-clo.factory';
import { VersionCLOService } from 'SPA/DomainModel/Plans/CLOServices/version-clo.service';
import { HealthStatusEntryCLOService } from 'SPA/DomainModel/Indicators/Symptoms/CLOServices/health-status-entry-clo.service';


@NgModule({
    providers: [
        // Generic CLOFactory
        GenericCLOFactory,

        // All CLOFactories
        UserAccountCLOFactory,
        MedicineFactorRecordCLOFactory,
        MedicineRuleItemCLOFactory,
        MedicineTypeCLOFactory,
        PlanCLOFactory,
        VersionCLOFactory,
        RuleCLOFactory,
        HealthStatusEntryCLOFactory,
        SymptomEntryCLOFactory,
		SymptomTypeCLOFactory,

		// All Services
		VersionCLOService,
		HealthStatusEntryCLOService
    ]
})

export class DomainModelModule { }