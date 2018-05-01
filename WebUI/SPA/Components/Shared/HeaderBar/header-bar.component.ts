import { Component, Input, Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { HomePageApplicationState } from 'SPA/Components/Pages/HomePage/home-page-application-state';
import { UserAccountCLO } from 'SPA/DomainModel/Users/CLOs/user-account.clo';
import { HomePageDataService } from 'SPA/Components/Pages/HomePage/home-page-data.service';
import * as DataStructures from 'SPA/Core/Helpers/DataStructures/data-structures';
import * as CLOs from 'SPA/DomainModel/clo-exports';


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

    // Constructor 
    constructor(
        @Inject('IReadOnlyAppStateWithUser') private readonly appState: IReadOnlyAppStateWithUser,
        @Inject('IDataServiceWithLogout') private readonly globalDataService: IDataServiceWithLogout,
    ) {

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
@Injectable()
export abstract class IReadOnlyAppStateWithUser {
    LoggedInUserCLO: DataStructures.IReadableProperty<CLOs.UserAccountCLO>;
}
@Injectable()
export abstract class IDataServiceWithLogout {
    abstract Logout(): Promise<boolean>;
}