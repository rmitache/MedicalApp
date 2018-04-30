import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { HomePageApplicationState, IReadOnlyApplicationState } from 'SPA/Components/Pages/HomePage/global-application-state';
import { UserAccountCLO } from 'SPA/DomainModel/Users/CLOs/user-account.clo';
import { GlobalDataService } from 'SPA/Components/Pages/HomePage/global-data.service';

@Component({
    selector: 'header-bar',
    templateUrl: './header-bar.component.html',
    styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent {
    // Fields
    @Input('ActivePageName')
    private activePageName;
    private readonly viewModel: ViewModel = {
        loggedInUser: null
    };
    private readonly subscriptions: Subscription[] = [];
    private readonly appState: IReadOnlyApplicationState;

    // Constructor 
    constructor(
        applicationState: HomePageApplicationState,
        private readonly globalDataService: GlobalDataService,
    ) {
        this.appState = applicationState as IReadOnlyApplicationState;

        this.subscriptions.push(this.appState.LoggedInUserCLO.Changed.subscribe((newValue) => {
            this.viewModel.loggedInUser = newValue;
        }));
    }
    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    // Event handlers
    private onLogoutTriggered() {
        var logoutPromise = this.globalDataService.Logout();
        logoutPromise.then(() => {
            window.location.href = '/LoginPage';
        });
    }
}


interface ViewModel {
    loggedInUser: UserAccountCLO | null;
}