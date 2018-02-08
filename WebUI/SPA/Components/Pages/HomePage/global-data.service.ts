import { Injectable } from '@angular/core';
import * as moment from 'moment';
import 'rxjs/add/operator/toPromise'

import { HttpHandlerService } from 'SPA/Core/Services/HttpHandlerService/http-handler.service';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { StartupDataBundleService } from './startup-data-bundle.service';
import { GenericCLOFactory } from 'SPA/DomainModel/generic-clo.factory';
import * as DataStructures from 'SPA/Core/Helpers/DataStructures/data-structures';

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

    // Public methods
    public GetLoggedInUserFromBundle(): CLOs.PatientAccountCLO {
        return this.genericCLOFactory.ConvertToCLO<CLOs.PatientAccountCLO>(CLOs.PatientAccountCLO.name, this.startupDataBundleService.GetBundle['LoggedInUser']);
    }
    public GetMedicineTypesFromBundle(): DataStructures.List<CLOs.MedicineTypeCLO> {

        let blos = this.startupDataBundleService.GetBundle['MedicineTypes'];
        let cloList = this.genericCLOFactory.ConvertToCloList<CLOs.MedicineTypeCLO>(CLOs.MedicineTypeCLO, blos);

        return cloList;
    }
    public AddFactorRecords(factorRecordCLOs: CLOs.MedicineFactorRecordCLO[]): Promise<void> {
        const apiMethodName: string = 'AddFactorRecords';

        let blos = this.genericCLOFactory.ConvertToBlo(factorRecordCLOs);
        let postDataPromise = this.httpHandlerService.Post(this.apiUrl + '/' + apiMethodName, blos)
            .toPromise()
            .then((response) => {
                
            });

        return postDataPromise;
    }
    public GetFactorRecordsForTodayFromBundle(): DataStructures.List<CLOs.MedicineFactorRecordCLO> {
        let blos = this.startupDataBundleService.GetBundle['FactorRecordsForToday'];
        let cloList = this.genericCLOFactory.ConvertToCloList<CLOs.MedicineFactorRecordCLO>(CLOs.MedicineFactorRecordCLO, blos);
        return cloList;
    }
    public GetFactorRecords(): Promise<CLOs.MedicineFactorRecordCLO[]> {
        const apiMethodName: string = 'GetFactorRecords';

        let dummyDate = Date.now();

        let getDataPromise = this.httpHandlerService.Get(this.apiUrl + '/' + apiMethodName, dummyDate)
            .toPromise()
            .then((blos) => {
                return this.genericCLOFactory.ConvertToCloList(CLOs.MedicineFactorRecordCLO, blos).ToArray();
            });


        return getDataPromise;
    }
}

        