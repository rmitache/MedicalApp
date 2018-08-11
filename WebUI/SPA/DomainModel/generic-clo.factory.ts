// Angular and 3rd party stuff
import { Injectable } from '@angular/core';
import * as moment from 'moment';

// Project modules
import * as DataStructures from 'SPA/Core/Helpers/DataStructures/data-structures';
import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import { UserAccountCLOFactory } from './Users/CLOFactories/user-account-clo.factory';
import { MedicineFactorRecordCLOFactory } from './Factors/Medicine/CLOFactories/medicine-factor-record-clo.factory';
import { MedicineRuleItemCLOFactory } from './Factors/Medicine/CLOFactories/medicine-rule-item-clo.factory';
import { MedicineTypeCLOFactory } from './Factors/Medicine/CLOFactories/medicine-type-clo.factory';
import { PlanCLOFactory } from './Plans/CLOFactories/plan-clo.factory';
import { VersionCLOFactory } from './Plans/CLOFactories/version-clo.factory';
import { RuleCLOFactory } from './Plans/CLOFactories/rule-clo.factory';
import { HealthStatusEntryCLOFactory } from './Indicators/Symptoms/CLOFactories/health-status-entry-clo.factory';
import { ICLOFactory, IType } from 'SPA/Core/CLO/i-clo.factory';
import { SymptomTypeCLOFactory } from 'SPA/DomainModel/Indicators/Symptoms/CLOFactories/symptom-type-clo.factory';
import { SymptomEntryCLOFactory } from 'SPA/DomainModel/Indicators/Symptoms/CLOFactories/symptom-entry-clo.factory';
import { Time } from 'SPA/Core/Helpers/DataStructures/data-structures';


@Injectable()
export class GenericCLOFactory {
    // Private Fields
    private factoryTypeInstanceDictionary: { [typeName: string]: ICLOFactory<Object> } = {};

    // Private Methods
    private getFactoryByCLOTypeName<T>(typeName: string): ICLOFactory<T> {
        let factory = this.factoryTypeInstanceDictionary[typeName];
        if (factory === undefined) {
            throw new Error("Factory for CLO of typename " + typeName + " does not exist!"); 
        }
        return factory as ICLOFactory<T>;
    }
    private toJsonRepresentation(clo: any): Object {
        if (clo instanceof Array) {
            return clo.map(x => this.toJsonRepresentation(x));
        }
        var outputObj = {}, relevantPropertyNames = [];
        let self = this;

        // Extract relevant properties from the CLO
        for (let propertyName in clo) {
            if (clo.hasOwnProperty(propertyName) && propertyName[0] === propertyName[0].toUpperCase()) {
                relevantPropertyNames.push(propertyName);
            }
        }
		
        // Go through the extracted properties and convert their values 
        for (let i = 0; i < relevantPropertyNames.length; i++) {
            let propertyName = relevantPropertyNames[i];
            let valueOnCLO = clo[propertyName];

            // Value is a List-----------------------------------------------
            if (valueOnCLO instanceof DataStructures.List || valueOnCLO instanceof DataStructures.ObservableList) {
                outputObj[propertyName] = [];
                let valueItems = valueOnCLO.ToArray();
                
                valueItems.forEach( function (v) {
                    if (typeof v === "number" || typeof v === "string") {
                        outputObj[propertyName].push(v);
                    } else {
                        let value = self.ConvertToBlo(v);
                        outputObj[propertyName].push(value);
                    }
                });
            }
            // Value is a CLO------------------------------------------------
            else if (valueOnCLO instanceof BaseCLO) {
                outputObj[propertyName] = self.ConvertToBlo(valueOnCLO);
            }
            // Value is a primitive type-------------------------------------
            else if (typeof valueOnCLO === "number" || typeof valueOnCLO === "string" || typeof valueOnCLO === "boolean") {
                outputObj[propertyName] = valueOnCLO;
            }
            // Value is an array---------------------------------------------
            else if (valueOnCLO instanceof Array) {
                outputObj[propertyName] = [];
                valueOnCLO.forEach(function (v) {
                    if (typeof v === "number" || typeof v === "string") {
                        outputObj[propertyName].push(v);
                    } else {
                        let value = self.ConvertToBlo(v);
                        outputObj[propertyName].push(value);
                    }
                });
            }
            // Value is simply a js Date-------------------------------------
            else if (valueOnCLO instanceof Date) {
				outputObj[propertyName] = valueOnCLO.toJSON();
			}
            //---------------------------------------------------------------
            // Value is simply a js Object-----------------------------------
			else if (valueOnCLO instanceof Object) {
                outputObj[propertyName] = self.ConvertToBlo(valueOnCLO);
            }
            //---------------------------------------------------------------
            // Value is null ------------------------------------------------
            else if (valueOnCLO === null) {
                outputObj[propertyName] = null;
            }
            //---------------------------------------------------------------
        }

        return outputObj;
    }

    // Constructor
    constructor(
        private readonly userAccountCLOFactory: UserAccountCLOFactory,
        private readonly medicineFactorRecordCLOFactory: MedicineFactorRecordCLOFactory,
        private readonly medicineRuleItemCLOFactory: MedicineRuleItemCLOFactory,
        private readonly medicinetypeCLOFactory: MedicineTypeCLOFactory,
        private readonly planCLOFactory: PlanCLOFactory,
        private readonly versionCLOFactory: VersionCLOFactory,
        private readonly ruleCLOFactory: RuleCLOFactory,
        private readonly healthStatusEntryCLOFactory: HealthStatusEntryCLOFactory,
        private readonly symptomEntryCLOFactory: SymptomEntryCLOFactory,
        private readonly symptomTypeCLOFactory: SymptomTypeCLOFactory
    ) {
        this.factoryTypeInstanceDictionary['UserAccountCLO'] = userAccountCLOFactory;
        this.factoryTypeInstanceDictionary['MedicineFactorRecordCLO'] = medicineFactorRecordCLOFactory;
        this.factoryTypeInstanceDictionary['MedicineRuleItemCLO'] = medicineRuleItemCLOFactory;
        this.factoryTypeInstanceDictionary['MedicineTypeCLO'] = medicinetypeCLOFactory;
        this.factoryTypeInstanceDictionary['PlanCLO'] = planCLOFactory;
        this.factoryTypeInstanceDictionary['VersionCLO'] = versionCLOFactory;
        this.factoryTypeInstanceDictionary['RuleCLO'] = ruleCLOFactory;
        this.factoryTypeInstanceDictionary['HealthStatusEntryCLO'] = healthStatusEntryCLOFactory;
        this.factoryTypeInstanceDictionary['SymptomEntryCLO'] = symptomEntryCLOFactory;
        this.factoryTypeInstanceDictionary['SymptomTypeCLO'] = symptomTypeCLOFactory;
    }

    // Public Methods
    public ConvertToCLO<T>(typeName: string, blo: Object): T {
        
        let factory: ICLOFactory<T> = this.getFactoryByCLOTypeName<T>(typeName);

        let clo: T = factory.Convert_ToCLO(blo);

        return clo;
    }
    public ConvertToCloList<T>(type: IType<T>, bloArray: Object[]): DataStructures.List<T> {

        // Obtain the actual factory implementation by type 
        let factory: ICLOFactory<T> = this.getFactoryByCLOTypeName<T>(type.name);

        let cloArray: DataStructures.List<T> = factory.Convert_ToCloList(bloArray);

        return cloArray;
    }
    public ConvertToBlo(clo: any): Object {

        return this.toJsonRepresentation(clo);
    }
    public CloneCLO<T extends BaseCLO>(clo: T): T {
        let factory: ICLOFactory<T> = this.getFactoryByCLOTypeName<T>(clo.GetTypeName());
        let blo = this.toJsonRepresentation(clo);
        let clone: T = factory.Convert_ToCLO(blo);
        return clone;
    }
    public CloneCLOArray<T extends BaseCLO>(cloArray: T[]): T[] {
        if (cloArray.length === 0) {
            return [];
        }

        let clonedCLOs = [];
        cloArray.forEach((sourceCLO) => {
            if (sourceCLO !== undefined && sourceCLO !== null) {
                let newClone = this.CloneCLO(sourceCLO);
                clonedCLOs.push(newClone);
            } else {
                clonedCLOs.push(sourceCLO);
            }
        });
        return clonedCLOs;
    }
    public CloneCLOAsNewBLO<T extends BaseCLO>(clo: T): T {
        let factory: ICLOFactory<T> = this.getFactoryByCLOTypeName<T>(clo.GetTypeName());
        
        let clone: T = factory.Clone_CLOAsNewBLO(clo);
        return clone;
    }
    public CreateDefaultClo<T>(type: IType<T>): T {

        // Obtain the actual factory implementation by type 
        let factory: ICLOFactory<T> = this.getFactoryByCLOTypeName<T>(type.name);
        let clo: T = factory.Create_DefaultCLO();

        return clo;
    }

    
}