import { Injectable } from '@angular/core';
import * as moment from 'moment';
import 'rxjs/add/operator/toPromise'

import { HttpHandlerService } from 'SPA/Core/Services/HttpHandlerService/http-handler.service';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { StartupDataBundleService } from './startup-data-bundle.service';
import { GenericCLOFactory } from 'SPA/DomainModel/generic-clo.factory';
import * as DataStructures from 'SPA/Core/Helpers/DataStructures/data-structures';
import { Range } from 'SPA/Core/Helpers/DataStructures/misc';
import { List } from 'SPA/Core/Helpers/DataStructures/list';
import * as HelperFunctions from 'SPA/Core/Helpers/Functions/functions';

@Injectable()
export class HomePageDataService {
    // Fields
    private readonly apiUrl: string = '/HomePage';

    // Constructor
    constructor(
        private readonly genericCLOFactory: GenericCLOFactory,
        private readonly startupDataBundleService: StartupDataBundleService,
        private readonly httpHandlerService: HttpHandlerService
    ) { }

    // Public methods - Retreive data from bundle 
    public GetLoggedInUserFromBundle(): CLOs.UserAccountCLO {
        return this.genericCLOFactory.ConvertToCLO<CLOs.UserAccountCLO>(CLOs.UserAccountCLO.name, this.startupDataBundleService.GetBundle['LoggedInUser']);
    }
    public GetSymptomTypesFromBundle(): DataStructures.List<CLOs.SymptomTypeCLO> {
        let blos = this.startupDataBundleService.GetBundle['SymptomTypes'];
        let cloList = this.genericCLOFactory.ConvertToCloList<CLOs.SymptomTypeCLO>(CLOs.SymptomTypeCLO, blos);

        return cloList;
    }
    public GetMedicineTypesFromBundle(): DataStructures.List<CLOs.MedicineTypeCLO> {

        let blos = this.startupDataBundleService.GetBundle['MedicineTypes'];
        let cloList = this.genericCLOFactory.ConvertToCloList<CLOs.MedicineTypeCLO>(CLOs.MedicineTypeCLO, blos);

        return cloList;
    }
    public GetPlansFromBundle(): DataStructures.List<CLOs.PlanCLO> {

        let blos = this.startupDataBundleService.GetBundle['Plans'];
        let cloList = this.genericCLOFactory.ConvertToCloList<CLOs.PlanCLO>(CLOs.PlanCLO, blos);
        return cloList;
    }
    public GetFactorRecordsForInitialRangeFromBundle(): DataStructures.List<CLOs.MedicineFactorRecordCLO> {
        let blos = this.startupDataBundleService.GetBundle['FactorRecordsForInitialRange'];

        let cloList = this.genericCLOFactory.ConvertToCloList<CLOs.MedicineFactorRecordCLO>(CLOs.MedicineFactorRecordCLO, blos);
        return cloList;
    }
    public GetHealthStatusEntriesForInitialRangeFromBundle(): HealthStatusEntriesModel {
        let obj = this.startupDataBundleService.GetBundle['HealthStatusEntriesForInitialRange'];

        let model = new HealthStatusEntriesModel();
        model.HealthStatusEntryCLOs = this.genericCLOFactory.ConvertToCloList<CLOs.HealthStatusEntryCLO>(CLOs.HealthStatusEntryCLO, obj['HealthStatusEntries']).ToArray();
        model.UserHasAnyHealthStatusEntries = obj['UserHasAnyHealthStatusEntries'];

        return model;
    }

    // FactorRecords
    public AddFactorRecords(factorRecordCLOs: CLOs.MedicineFactorRecordCLO[]): Promise<List<CLOs.MedicineFactorRecordCLO>> {
        const apiMethodName: string = 'AddFactorRecords';

        let blos = this.genericCLOFactory.ConvertToBlo(factorRecordCLOs);
        let postDataPromise = this.httpHandlerService.Post(this.apiUrl + '/' + apiMethodName, blos)
            .toPromise()
            .then((blosWithUpdatedIDs) => {
                let clos = this.genericCLOFactory.ConvertToCloList(CLOs.MedicineFactorRecordCLO, blosWithUpdatedIDs);
                return clos;
            });

        return postDataPromise;
    }
    public MarkFactorRecordsAsTaken(factorRecordCLOs: CLOs.MedicineFactorRecordCLO[]): Promise<List<CLOs.MedicineFactorRecordCLO>> {
        const apiMethodName: string = 'MarkFactorRecordsAsTaken';


        let model = {
            FactorRecordCompositeIDs: [],
            NewTakenStatuses: []
        };
        factorRecordCLOs.forEach((clo) => {
            model.FactorRecordCompositeIDs.push(clo.CompositeID);
            model.NewTakenStatuses.push(clo.Taken);
        });


        let postDataPromise = this.httpHandlerService.Post(this.apiUrl + '/' + apiMethodName, model)
            .toPromise();

        return postDataPromise;
    }
    public GetFactorRecords(dateRange: Range<Date>): Promise<CLOs.MedicineFactorRecordCLO[]> {
        const apiMethodName: string = 'GetFactorRecords';

        let model = {
            DateRange: dateRange
        };

        let getDataPromise = this.httpHandlerService.Post(this.apiUrl + '/' + apiMethodName, model)
            .toPromise()
            .then((blos) => {
                return this.genericCLOFactory.ConvertToCloList<CLOs.MedicineFactorRecordCLO>(CLOs.MedicineFactorRecordCLO, blos).ToArray();
            });


        return getDataPromise;
    }

    // Plans
    public AddPlan(planCLO: CLOs.PlanCLO): Promise<CLOs.PlanCLO> {
        const apiMethodName: string = 'AddPlan';

        let blo = this.genericCLOFactory.ConvertToBlo(planCLO);
        let postDataPromise = this.httpHandlerService.Post(this.apiUrl + '/' + apiMethodName, blo)
            .toPromise()
            .then((bloWithUpdatedID) => {
                let clo = this.genericCLOFactory.ConvertToCLO<CLOs.PlanCLO>(CLOs.PlanCLO.name, bloWithUpdatedID);
                return clo;
            });

        return postDataPromise;
    }
    public UpdatePlan(planCLO: CLOs.PlanCLO): Promise<CLOs.PlanCLO> {
        const apiMethodName: string = 'UpdatePlan';

        let blo = this.genericCLOFactory.ConvertToBlo(planCLO);

        let postDataPromise = this.httpHandlerService.Post(this.apiUrl + '/' + apiMethodName, blo)
            .toPromise()
            .then((bloWithUpdatedID) => {
                let clo = this.genericCLOFactory.ConvertToCLO<CLOs.PlanCLO>(CLOs.PlanCLO.name, bloWithUpdatedID);
                return clo;
            });

        return postDataPromise;
    }
    public RenamePlan(planID: number, newName: string): Promise<void> {
        const apiMethodName: string = 'RenamePlan';

        let model = {
            PlanID: planID,
            NewName: newName
        };

        let promise = this.httpHandlerService.Post(this.apiUrl + '/' + apiMethodName, model)
            .toPromise();

        return promise;
    }
    public GetPlans(): Promise<CLOs.PlanCLO[]> {
        const apiMethodName: string = 'GetPlans';


        let getDataPromise = this.httpHandlerService.Get(this.apiUrl + '/' + apiMethodName)
            .toPromise()
            .then((blos) => {
                return this.genericCLOFactory.ConvertToCloList<CLOs.PlanCLO>(CLOs.PlanCLO, blos).ToArray();
            });


        return getDataPromise;
    }

    // HealthStatusEntries
    public AddHealthStatusEntry(healthStatusEntryCLO: CLOs.HealthStatusEntryCLO): Promise<CLOs.HealthStatusEntryCLO> {
        const apiMethodName: string = 'AddHealthStatusEntry';

        let blo = this.genericCLOFactory.ConvertToBlo(healthStatusEntryCLO);
        let postDataPromise = this.httpHandlerService.Post(this.apiUrl + '/' + apiMethodName, blo)
            .toPromise()
            .then((bloWithUpdatedID) => {
                let clo = this.genericCLOFactory.ConvertToCLO<CLOs.HealthStatusEntryCLO>(CLOs.HealthStatusEntryCLO.name, bloWithUpdatedID);

                return clo;
            });

        return postDataPromise;
    }
    public GetHealthStatusEntries(dateRange: Range<Date>): Promise<HealthStatusEntriesModel> {
        const apiMethodName: string = 'GetHealthStatusEntries';

        let model = {
            DateRange: dateRange
        };

        let getDataPromise = this.httpHandlerService.Post(this.apiUrl + '/' + apiMethodName, model)
            .toPromise()
            .then((obj) => {
                let returnModel = new HealthStatusEntriesModel();
                returnModel.HealthStatusEntryCLOs = this.genericCLOFactory.ConvertToCloList<CLOs.HealthStatusEntryCLO>(CLOs.HealthStatusEntryCLO, obj['HealthStatusEntries']).ToArray();
                returnModel.UserHasAnyHealthStatusEntries = obj['UserHasAnyHealthStatusEntries'];

                return returnModel;
            });


        return getDataPromise;
    }
    public GetMostRecentHealthEntry(): Promise<CLOs.HealthStatusEntryCLO> {

        const apiMethodName: string = 'GetMostRecentHealthEntry';


        let getDataPromise = this.httpHandlerService.Post(this.apiUrl + '/' + apiMethodName)
            .toPromise()
            .then((blo) => {
                return this.genericCLOFactory.ConvertToCLO<CLOs.HealthStatusEntryCLO>(CLOs.HealthStatusEntryCLO.name, blo);
            });


        return getDataPromise;
    }


    // Symptoms
    public GetRecentSymptoms(): Promise<CLOs.SymptomTypeCLO[]> {

        const apiMethodName: string = 'GetRecentSymptoms';


        let getDataPromise = this.httpHandlerService.Post(this.apiUrl + '/' + apiMethodName)
            .toPromise()
            .then((blos) => {
                return this.genericCLOFactory.ConvertToCloList<CLOs.SymptomTypeCLO>(CLOs.SymptomTypeCLO, blos).ToArray();
            });


        return getDataPromise;
    }
    public AddCustomSymptomType(clo: CLOs.SymptomTypeCLO): Promise<CLOs.SymptomTypeCLO> {
        const apiMethodName: string = 'AddCustomSymptomType';

        let blo = this.genericCLOFactory.ConvertToBlo(clo);
        let postDataPromise = this.httpHandlerService.Post(this.apiUrl + '/' + apiMethodName, blo)
            .toPromise()
            .then((bloWithUpdatedID) => {
                let clo = this.genericCLOFactory.ConvertToCLO<CLOs.SymptomTypeCLO>(CLOs.SymptomTypeCLO.name, bloWithUpdatedID);
                return clo;
            });

        return postDataPromise;
    }
    public IsSymptomTypeNameTaken(name: string, ignoreName: string): Promise<any> {
        const apiMethodName: string = 'IsSymptomTypeNameTaken';

        var model = {
            Name: name,
            IgnoreName: ignoreName
        };

        let getDataPromise = this.httpHandlerService.Post(this.apiUrl + '/' + apiMethodName, model)
            .toPromise();


        return getDataPromise;
    }


    // MedicineTypes
    public AddMedicineType(medicineTypeCLO: CLOs.MedicineTypeCLO): Promise<CLOs.MedicineTypeCLO> {
        const apiMethodName: string = 'AddMedicineType';

        let blo = this.genericCLOFactory.ConvertToBlo(medicineTypeCLO);
        let postDataPromise = this.httpHandlerService.Post(this.apiUrl + '/' + apiMethodName, blo)
            .toPromise()
            .then((bloWithUpdatedID) => {
                let clo = this.genericCLOFactory.ConvertToCLO<CLOs.MedicineTypeCLO>(CLOs.MedicineTypeCLO.name, bloWithUpdatedID);
                return clo;
            });

        return postDataPromise;
    }
    public GetMedicineTypes(): Promise<CLOs.MedicineTypeCLO[]> {
        const apiMethodName: string = 'GetMedicineTypes';


        let getDataPromise = this.httpHandlerService.Post(this.apiUrl + '/' + apiMethodName)
            .toPromise()
            .then((blos) => {
                return this.genericCLOFactory.ConvertToCloList<CLOs.MedicineTypeCLO>(CLOs.MedicineTypeCLO, blos).ToArray();
            });


        return getDataPromise;
    }
    public IsMedicineTypeNameTaken(name: string, ignoreName: string): Promise<any> {
        const apiMethodName: string = 'IsMedicineTypeNameTaken';

        var model = {
            Name: name,
            IgnoreName: ignoreName
        };

        let getDataPromise = this.httpHandlerService.Post(this.apiUrl + '/' + apiMethodName, model)
            .toPromise();


        return getDataPromise;
    }
    public RenameMedicineType(medicineTypeID: number, newName: string): Promise<void> {
        const apiMethodName: string = 'RenameMedicineType';

        let model = {
            MedicineTypeID: medicineTypeID,
            NewName: newName
        };

        let promise = this.httpHandlerService.Post(this.apiUrl + '/' + apiMethodName, model)
            .toPromise();

        return promise;
    }


    // MedicineType Supply
    public AddMedicineTypeSupplyEntry(medicineTypeID: number, supplyQuantity: number): Promise<void> {
        const apiMethodName: string = 'AddMedicineTypeSupplyEntry';

        let model = {
            MedicineTypeID: medicineTypeID,
            SupplyQuantity: supplyQuantity
        };

        let postDataPromise = this.httpHandlerService.Post(this.apiUrl + '/' + apiMethodName, model)
            .toPromise();

        return postDataPromise;
    }
    public ClearSupplyEntries(medicineTypeID: number): Promise<void> {
        const apiMethodName: string = 'ClearSupplyEntries';

        let model = {
            MedicineTypeID: medicineTypeID
        };

        let postDataPromise = this.httpHandlerService.Post(this.apiUrl + '/' + apiMethodName, model)
            .toPromise();

        return postDataPromise;
    }
    public RecalculateRemainingSupplyAmount(medicineTypeID: number): Promise<MedicineTypeSupplyInfoModel> {
        const apiMethodName: string = 'RecalculateRemainingSupplyAmount';

        let model = {
            MedicineTypeID: medicineTypeID
        };
        let postDataPromise = this.httpHandlerService.Post(this.apiUrl + '/' + apiMethodName, model)
            .toPromise()
            .then((obj) => {
                let returnModel = new MedicineTypeSupplyInfoModel();
                returnModel.CurrentSupplyAmount = obj['CurrentSupplyAmount'];
                returnModel.SupplyWillLastUntil = (obj['SupplyWillLastUntil'] !== null) ? new Date(obj['SupplyWillLastUntil']) : null;

                return returnModel;
            });

        return postDataPromise;
    }

    // UserAccount
    public UpdatePassword(newPassword: string): Promise<void> {
        const apiMethodName: string = 'UpdatePassword';

        let model = {
            NewPassword: newPassword
        };

        let postDataPromise = this.httpHandlerService.Post(this.apiUrl + '/' + apiMethodName, model)
            .toPromise();

        return postDataPromise;
    }
    public SetHasSeenWelcome(): Promise<void> {
        const apiMethodName: string = 'SetHasSeenWelcome';


        let postDataPromise = this.httpHandlerService.Post(this.apiUrl + '/' + apiMethodName)
            .toPromise();

        return postDataPromise;
    }
    public DownloadData(): Promise<void> {
        const apiMethodName: string = 'DownloadData';


       return this.httpHandlerService.DownloadFile('CommonAPI/' + apiMethodName);
        
    }

    // Login
    public Logout(): Promise<boolean> {
        let apiMethodName: string = 'Logout';

        return this.httpHandlerService.Post('/LoginPage/' + apiMethodName, null).toPromise();
    }
}


// Models - returned to BE
export class HealthStatusEntriesModel {
    HealthStatusEntryCLOs: CLOs.HealthStatusEntryCLO[];
    UserHasAnyHealthStatusEntries: boolean;
}
export class MedicineTypeSupplyInfoModel {
    CurrentSupplyAmount: number;
    SupplyWillLastUntil: Date;
}