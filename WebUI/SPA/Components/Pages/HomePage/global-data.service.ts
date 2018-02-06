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
    public GetFactorRecordsForTodayFromBundle(): CLOs.MedicineFactorRecordCLO[] {
        const records: CLOs.MedicineFactorRecordCLO[] = [];


        let testRecord1: CLOs.MedicineFactorRecordCLO = new CLOs.MedicineFactorRecordCLO({
            ID: 1,
            MedicineType: new CLOs.MedicineTypeCLO({
                ID: 1,
                Name: 'Vitamin C Liposomal',
                PackagedUnitDoseType: Enums.UnitDoseType.Satchel,
                PackagedUnitDoseSize: 1000,
                PackagedUnitDoseUoM: Enums.UnitOfMeasure.mg

            }),
            OccurenceDateTime: new Date(Date.now()),

            UnitDoseType: Enums.UnitDoseType.Satchel,
            UnitDoseQuantifier: 1,
            UnitDoseSize: 1000,
            UnitDoseUoM: Enums.UnitOfMeasure.mg,
            Instruction: null
        });
        records.push(testRecord1);



        return records;
    }
    public GetMedicineTypesFromBundle(): DataStructures.List<CLOs.MedicineTypeCLO> {

        // Get MedicineTypes (flat dictionary, where each MedicineType has a null MedicineCategory, to begin with)
        let blos = this.startupDataBundleService.GetBundle['MedicineTypes'];
        let cloList = this.genericCLOFactory.ConvertToCloList<CLOs.MedicineTypeCLO>(CLOs.MedicineTypeCLO, blos);

        return cloList;
    }
    public AddFactorRecords(factorRecordCLOs: CLOs.MedicineFactorRecordCLO[]): Promise<void> {
        const apiMethodName: string = 'AddFactorRecords';

        let blos = this.genericCLOFactory.ConvertToBlo(factorRecordCLOs);
        let getDataPromise = this.httpHandlerService.Post(this.apiUrl + '/' + apiMethodName, blos)
            .toPromise()
            .then((response) => {
                
            });

        return getDataPromise;
    }
}

