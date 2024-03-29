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
export class AnalysisPageDataService {
    // Fields
    private readonly apiUrl: string = '/AnalysisPage';


    // Constructor
    constructor(
        private readonly genericCLOFactory: GenericCLOFactory,
        private readonly startupDataBundleService: StartupDataBundleService,
        private readonly httpHandlerService: HttpHandlerService
    ) { }

    // From Bundle
    public GetLoggedInUserFromBundle(): CLOs.UserAccountCLO {
        return this.genericCLOFactory.ConvertToCLO<CLOs.UserAccountCLO>(CLOs.UserAccountCLO.name, this.startupDataBundleService.GetBundle['LoggedInUser']);
    }
    public GetPlansFromBundle(): DataStructures.List<CLOs.PlanCLO> {

        let blos = this.startupDataBundleService.GetBundle['Plans'];
        let cloList = this.genericCLOFactory.ConvertToCloList<CLOs.PlanCLO>(CLOs.PlanCLO, blos);

        return cloList;
    }
    public GetHealthStatusEntriesForInitialRangeFromBundle(): DataStructures.List<CLOs.HealthStatusEntryCLO> {
        let blos = this.startupDataBundleService.GetBundle['HealthStatusEntriesForInitialRange'];

        let cloList = this.genericCLOFactory.ConvertToCloList<CLOs.HealthStatusEntryCLO>(CLOs.HealthStatusEntryCLO, blos);
        return cloList;
    }
    public GetSymptomTypesFromBundle(): DataStructures.List<CLOs.SymptomTypeCLO> {

        let blos = this.startupDataBundleService.GetBundle['SymptomTypes'];
        let cloList = this.genericCLOFactory.ConvertToCloList<CLOs.SymptomTypeCLO>(CLOs.SymptomTypeCLO, blos);

        return cloList;
    }

    // HealthStatusEntries
    public GetHealthStatusEntries(dateRange: Range<Date>): Promise<CLOs.HealthStatusEntryCLO[]> {
        const apiMethodName: string = 'GetHealthStatusEntries';

        let model = {
            DateRange: dateRange
        };

        let getDataPromise = this.httpHandlerService.Post(this.apiUrl + '/' + apiMethodName, model)
            .toPromise()
            .then((blos) => {
                return this.genericCLOFactory.ConvertToCloList<CLOs.HealthStatusEntryCLO>(CLOs.HealthStatusEntryCLO, blos).ToArray();
            });


        return getDataPromise;
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
    public DownloadData(fileName: string): Promise<void> {
        const apiMethodName: string = 'DownloadData';


        return this.httpHandlerService.DownloadFile('CommonAPI/' + apiMethodName, fileName);

    }

    // Login
    public Logout(): Promise<boolean> {
        let apiMethodName: string = 'Logout';

        return this.httpHandlerService.Post('/LoginPage/' + apiMethodName, null).toPromise();
    }
}

