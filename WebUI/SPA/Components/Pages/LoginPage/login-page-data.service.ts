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
import { LoginResultStatus } from 'SPA/Core/Helpers/Enums/enums';


@Injectable()
export class LoginPageDataService {
    // Fields
    private readonly apiUrl: string = '/LoginPage';


    // Constructor
    constructor(
        private readonly genericCLOFactory: GenericCLOFactory,
        private readonly httpHandlerService: HttpHandlerService
    ) { }


    public Login(loginModel: Object) {
        let apiMethodName: string = 'Login';

        return this.httpHandlerService.Post(this.apiUrl + '/' + apiMethodName, loginModel)
            .toPromise()
            .then(response => {

                let userCLO: CLOs.UserAccountCLO = (response['User'] !== null) ? this.genericCLOFactory.ConvertToCLO(CLOs.UserAccountCLO.name, response['User']) : null;
                let loginResultStatus: LoginResultStatus = response['LoginResultStatus'];

                let loginResult = {
                    User: userCLO,
                    LoginResultStatus: loginResultStatus
                };
                return loginResult;
            });
    }
    public AcceptTerms(userCLO: CLOs.UserAccountCLO) {
        let apiMethodName: string = 'AcceptTerms';

        let blo = this.genericCLOFactory.ConvertToBlo(userCLO);
        return this.httpHandlerService.Post(this.apiUrl + '/' + apiMethodName, blo)
            .toPromise();
    }


}


