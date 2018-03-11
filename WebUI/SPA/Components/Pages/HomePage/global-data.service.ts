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

@Injectable()
export class GlobalDataService {
    // Fields
    private readonly apiUrl: string = '/HomePage';
    // Constructor
    constructor(
        private readonly genericCLOFactory: GenericCLOFactory,
        private readonly startupDataBundleService: StartupDataBundleService,
        private readonly httpHandlerService: HttpHandlerService
    ) { }

    // Public methods - Retreive data from bundle 
    public GetLoggedInUserFromBundle(): CLOs.PatientAccountCLO {
        return this.genericCLOFactory.ConvertToCLO<CLOs.PatientAccountCLO>(CLOs.PatientAccountCLO.name, this.startupDataBundleService.GetBundle['LoggedInUser']);
    }
    public GetMedicineTypesFromBundle(): DataStructures.List<CLOs.MedicineTypeCLO> {

        let blos = this.startupDataBundleService.GetBundle['MedicineTypes'];
        let cloList = this.genericCLOFactory.ConvertToCloList<CLOs.MedicineTypeCLO>(CLOs.MedicineTypeCLO, blos);

        return cloList;
    }
    public GetShallowPlansFromBundle(): DataStructures.List<CLOs.PlanCLO> {

        let blos = this.startupDataBundleService.GetBundle['Plans'];
        let cloList = this.genericCLOFactory.ConvertToCloList<CLOs.PlanCLO>(CLOs.PlanCLO, blos);
        
        return cloList;
    }

    // Public methods 
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
    public GetFactorRecordsForInitialRangeFromBundle(): DataStructures.List<CLOs.MedicineFactorRecordCLO> {
        let blos = this.startupDataBundleService.GetBundle['FactorRecordsForInitialRange'];
        let cloList = this.genericCLOFactory.ConvertToCloList<CLOs.MedicineFactorRecordCLO>(CLOs.MedicineFactorRecordCLO, blos);
        return cloList;
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
    public AdjustPlan(planCLO: CLOs.PlanCLO): Promise<CLOs.PlanCLO> {
        const apiMethodName: string = 'AdjustPlan';
        
        let blo = this.genericCLOFactory.ConvertToBlo(planCLO);
        let postDataPromise = this.httpHandlerService.Post(this.apiUrl + '/' + apiMethodName, blo)
            .toPromise()
            .then((bloWithUpdatedID) => {
                let clo = this.genericCLOFactory.ConvertToCLO<CLOs.PlanCLO>(CLOs.PlanCLO.name, bloWithUpdatedID);
                return clo;
            });

        return postDataPromise;
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

}

