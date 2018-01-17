import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { StartupDataBundleService } from './startup-data-bundle.service';
import { GenericCLOFactory } from 'SPA/DomainModel/generic-clo.factory';

@Injectable()
export class GlobalDataService {
    // Constructor
    constructor(
        private readonly genericCLOFactory: GenericCLOFactory,
        private readonly startupDataBundleService: StartupDataBundleService
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
                PieceSize: 500

            }),
            OccurenceDateTime: new Date(Date.now()),
            Method: new CLOs.MedicineMethodCLO({
                Name: 'Pills'
            }),
            NrOfPieces: 1,
            PieceSize: 500,
            PieceSizeUnitOfMeasure: Enums.UnitOfMeasure.mg,
            Instruction: null
        });
        records.push(testRecord1);

        let testRecord2: CLOs.MedicineFactorRecordCLO = new CLOs.MedicineFactorRecordCLO({
            ID: 2,
            MedicineType: new CLOs.MedicineTypeCLO({
                ID: 2,
                Name: 'Magnesium',
                PieceSize: 450

            }),
            OccurenceDateTime: moment().subtract(1, 'hours').toDate(),
            Method: new CLOs.MedicineMethodCLO({
                Name: 'Pills'
            }),
            NrOfPieces: 1,
            PieceSize: 450,
            PieceSizeUnitOfMeasure: Enums.UnitOfMeasure.mg,
            Instruction: null
        });
        records.push(testRecord2);

        let testRecord3: CLOs.MedicineFactorRecordCLO = new CLOs.MedicineFactorRecordCLO({
            ID: 3,
            MedicineType: new CLOs.MedicineTypeCLO({
                ID: 3,
                Name: 'Lymph Cleanse',
                PieceSize: 250

            }),
            OccurenceDateTime: moment().subtract(1, 'hours').toDate(),
            Method: new CLOs.MedicineMethodCLO({
                Name: 'Pills'
            }),
            NrOfPieces: 3,
            PieceSize: 250,
            PieceSizeUnitOfMeasure: Enums.UnitOfMeasure.mg,
            Instruction: null
        });
        records.push(testRecord3);

        return records;
    }
   
}

