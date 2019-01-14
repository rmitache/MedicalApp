import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise'
import { HttpHandlerService } from 'SPA/Core/Services/HttpHandlerService/http-handler.service';
import * as moment from 'moment';
import { GetMonthRangeWithPaddingUsingMoment } from 'SPA/Core/Helpers/Functions/functions';

@Injectable()
export class StartupDataBundleService {
    // Fields
	private readonly initialDataApiUrl: string = '/AnalysisPage/';
	private availableWindowPaddingInMonths = 1;
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

		// Setup the range
		var now = moment();
		var dateRange = GetMonthRangeWithPaddingUsingMoment(now, now, this.availableWindowPaddingInMonths);
		let model = {
			DateRange: dateRange
		};
		
		// Call the API
        const apiMethodName: string = 'GetInitialData';
		let getDataPromise = this.httpHandlerService.Post(this.initialDataApiUrl + '/' + apiMethodName, model)
            .toPromise()
            .then((bundle) => {
                this.bundle = bundle;
            });

        return getDataPromise;
    }
}