import { Injectable } from '@angular/core';
import * as moment from 'moment';
import 'rxjs/add/operator/toPromise'

import { HttpHandlerService } from 'SPA/Core/Services/HttpHandlerService/http-handler.service';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { GenericCLOFactory } from 'SPA/DomainModel/generic-clo.factory';
import * as DataStructures from 'SPA/Core/Helpers/DataStructures/data-structures';
import { Range } from 'SPA/Core/Helpers/DataStructures/misc';
import { List } from 'SPA/Core/Helpers/DataStructures/list';
import * as HelperFunctions from 'SPA/Core/Helpers/Functions/functions';

@Injectable()
export class LoginPageDataService {
    // Fields
    private readonly apiUrl: string = '/LoginPage';


    // Constructor
    constructor(
        private readonly genericCLOFactory: GenericCLOFactory,
        private readonly httpHandlerService: HttpHandlerService
    ) { }


    public Login(loginModel: Object): Promise<boolean> {
        let apiMethodName:string = 'Login';

        return this.httpHandlerService.Post(this.apiUrl + '/' + apiMethodName, loginModel).toPromise();
    }
    //public Login(username:string, password:string, keepLoggedIn:boolean): Promise<boolean> {
    //    const apiMethodName: string = 'GetHealthStatusEntries';

    //    let model = {
    //        DateRange: dateRange
    //    };

    //    let getDataPromise = this.httpHandlerService.Post(this.apiUrl + '/' + apiMethodName, model)
    //        .toPromise()
    //        .then((blos) => {
    //            return this.genericCLOFactory.ConvertToCloList<CLOs.HealthStatusEntryCLO>(CLOs.HealthStatusEntryCLO, blos).ToArray();
    //        });


    //    return getDataPromise;
    //}

}

