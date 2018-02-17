// Angular and 3rd party stuff
import { Injectable } from '@angular/core';

// Project modules
import * as DataStructures from 'SPA/Core/Helpers/DataStructures/data-structures';
import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import { PatientAccountCLOFactory } from './Patients/CLOFactories/patient-account-clo.factory';
import { MedicineFactorRecordCLOFactory } from './Factors/Medicine/History/CLOFactories/medicine-factor-record-clo.factory';
import { MedicineTypeCLOFactory } from './Factors/Medicine/Library/CLOFactories/medicine-type-clo.factory';
import { PlanCLOFactory } from './Plans/CLOFactories/plan-clo.factory';
import { VersionCLOFactory } from './Plans/CLOFactories/version-clo.factory';
import { RuleCLOFactory } from './Plans/CLOFactories/rule-clo.factory';
import { ICLOFactory, IType } from 'SPA/Core/CLO/i-clo.factory';


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
            if (valueOnCLO instanceof DataStructures.List) {
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
        private readonly patientAccountCLOFactory: PatientAccountCLOFactory,
        private readonly medicineFactorRecordCLOFactory: MedicineFactorRecordCLOFactory,
        private readonly medicinetypeCLOFactory: MedicineTypeCLOFactory,
        private readonly planCLOFactory: PlanCLOFactory,
        private readonly versionCLOFactory: VersionCLOFactory,
        private readonly ruleCLOFactory: RuleCLOFactory
    ) {
        this.factoryTypeInstanceDictionary['PatientAccountCLO'] = patientAccountCLOFactory;
        this.factoryTypeInstanceDictionary['MedicineFactorRecordCLO'] = medicineFactorRecordCLOFactory;
        this.factoryTypeInstanceDictionary['MedicineTypeCLO'] = medicinetypeCLOFactory;
        this.factoryTypeInstanceDictionary['PlanCLO'] = planCLOFactory;
        this.factoryTypeInstanceDictionary['VersionCLO'] = versionCLOFactory;
        this.factoryTypeInstanceDictionary['RuleCLO'] = ruleCLOFactory;
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
    public CreateDefaultClo<T>(type: IType<T>): T {

        // Obtain the actual factory implementation by type 
        let factory: ICLOFactory<T> = this.getFactoryByCLOTypeName<T>(type.name);
        let clo: T = factory.Create_DefaultCLO();

        return clo;
    }


    

    /*
    //public CreateFromParams<T>(type: IType<T>, ...params: any[]): T {

    //    // Obtain the actual factory implementation by type 
    //    let factory: ICreatable<T> = this.getCreationFactoryByType<T>(type);

    //    let clo: T = factory.Create_FromParams(...params);

    //    return clo;
    //}

    //public CloneCloList<T extends BaseCLO>(cloArray: T[]): DataStructures.List<T> {

    //    if (cloArray.length === 0) {
    //        return new DataStructures.List<T>();
    //    }

    //    let typeName: string = cloArray[0].GetTypeName();
    //    let factory: ICreatable<T> = this.getCreationFactoryByTypeName<T>(typeName);
    //    let cloneList: DataStructures.List<T> = factory.Clone_CloList(cloArray);

    //    return cloneList;
    //}
    */
}