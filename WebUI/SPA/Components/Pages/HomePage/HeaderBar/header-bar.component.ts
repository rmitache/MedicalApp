import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { GlobalApplicationState, IReadOnlyApplicationState } from 'SPA/Components/Pages/HomePage/global-application-state';
import { PatientAccountCLO } from 'SPA/DomainModel/Patients/CLOs/patient-account.clo';

@Component({
    selector: 'header-bar',
    templateUrl: './header-bar.component.html',
    styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent {
    // Fields
    private readonly viewModel: ViewModel = {
        loggedInUser: null
    };
    private readonly subscriptions: Subscription[] = [];
    private readonly appState: IReadOnlyApplicationState;

    // Constructor 
    constructor(
        applicationState: GlobalApplicationState 
    ) {
        this.appState = applicationState as IReadOnlyApplicationState;

        this.subscriptions.push(this.appState.LoggedInUserCLO.Changed.subscribe((newValue) => {
            this.viewModel.loggedInUser = newValue;
        }));
    }
    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}


interface ViewModel {
    loggedInUser: PatientAccountCLO | null;
}