import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise'
import { HttpHandlerService } from 'SPA/Core/Services/HttpHandlerService/http-handler.service';

@Injectable()
export class StartupDataBundleService {
    // Fields
    private readonly initialDataApiUrl: string = '/HomePage/';
    private bundle: Object | null = null;

    // Properties
    public get GetBundle() {
        return this.bundle;
    }

    // Constructor
    constructor(private readonly httpHandlerService: HttpHandlerService) { }

    // Public methods
    public InitializeBundle(): Promise<void> {
        if (this.bundle !== null) {
            throw new Error("Bundle has already been loaded and initialized");
        }

        const apiMethodName: string = 'GetInitialData';

        let getDataPromise = this.httpHandlerService.Get(this.initialDataApiUrl + '/' + apiMethodName)
            .toPromise()
            .then((bundle) => {
                this.bundle = bundle;
            });

        return getDataPromise;
    }
}