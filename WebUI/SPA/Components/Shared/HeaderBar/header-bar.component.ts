import { Component, Input, Injectable, Inject, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { UserAccountCLO } from 'SPA/DomainModel/Users/CLOs/user-account.clo';
import * as DataStructures from 'SPA/Core/Helpers/DataStructures/data-structures';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import { ModalDialogService } from 'SPA/Core/Services/ModalDialogService/modal-dialog.service';
import { UserAccountEditorDialogService } from '../Popups/UserAccountEditorDialog/user-account-editor-dialog.service';
import { HelpDialogService } from '../Popups/HelpDialog/help-dialog.service';


@Component({
    selector: 'header-bar',
    templateUrl: './header-bar.component.html',
    styleUrls: ['./header-bar.component.css'],
    host: { 'class': 'header-bar' },
})
export class HeaderBarComponent {
    // Fields
    @Input('ActivePageName')
    private activePageName;
    private readonly viewModel: ViewModel = {
        LoggedInUser: null,
    };
    private readonly subscriptions: Subscription[] = [];


    // Constructor 
    constructor(
        @Inject('IReadOnlyAppStateWithUser') private readonly appState: IReadOnlyAppStateWithUser,
        @Inject('IDataServiceWithUser') private readonly globalDataService: IDataServiceWithUser,
        private readonly modalDialogService: ModalDialogService,
        private viewContainerRef: ViewContainerRef,
        private userAccountEditorDialogService: UserAccountEditorDialogService,
        private helpDialogService: HelpDialogService
    ) {

        this.subscriptions.push(this.appState.LoggedInUserCLO.Changed.subscribe((newValue) => {
            this.viewModel.LoggedInUser = newValue;
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
    private onUserEmailClicked() {
        var userCLO = this.viewModel.LoggedInUser;

        this.userAccountEditorDialogService.Open(userCLO, this.viewContainerRef);
    }
    private onHelpClicked() {
        this.helpDialogService.Open(this.viewContainerRef);
    }
}
interface ViewModel {
    LoggedInUser: UserAccountCLO | null;
}
@Injectable()
export abstract class IReadOnlyAppStateWithUser {
    LoggedInUserCLO: DataStructures.IReadableProperty<CLOs.UserAccountCLO>;
}
@Injectable()
export abstract class IDataServiceWithUser {
    abstract GetLoggedInUserFromBundle(): CLOs.UserAccountCLO;
    abstract UpdatePassword(newPassword: string): Promise<void>;
    abstract Logout(): Promise<boolean>;
}