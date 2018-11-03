// Angular and 3rd party stuff
import { Component, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
import { ChartModule, UIChart } from 'primeng/primeng';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { Time, Range, TimeRange } from 'SPA/Core/Helpers/DataStructures/misc';
import { HomePageDataService } from 'SPA/Components/Pages/HomePage/home-page-data.service';
import * as HelperFunctions from 'SPA/Core/Helpers/Functions/functions';


@Component({
    selector: 'info-to-remember',
    templateUrl: './info-to-remember.component.html',
    styleUrls: ['./info-to-remember.component.css'],
    host: { 'class': 'info-to-remember' }
})
export class InfoToRememberComponent {
    // Fields
    private readonly noDataModes = NoDataModes;
    private readonly viewModel: ViewModel = {
        CurrentNoDataMode: null,

    };
    private readonly subscriptions: Subscription[] = [];

    // Constructor 
    constructor(
        private readonly dataService: HomePageDataService,
    ) {



    }
    ngOnInit() {
        //this.viewModel.CurrentNoDataMode = NoDataModes.NoUpcomingPlanChanges;
    }
    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

}

interface ViewModel {
    CurrentNoDataMode: NoDataModes;
}
enum NoDataModes {
    NoUpcomingPlanChanges = 0,
}
