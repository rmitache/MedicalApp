import { Component, Input, Injectable, Inject, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { UserAccountCLO } from 'SPA/DomainModel/Users/CLOs/user-account.clo';
import * as DataStructures from 'SPA/Core/Helpers/DataStructures/data-structures';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import { ModalDialogService } from 'SPA/Core/Services/ModalDialogService/modal-dialog.service';
import { UserAccountEditorDialogService } from '../Popups/UserAccountEditorDialog/user-account-editor-dialog.service';
import { HelpDialogService } from '../Popups/HelpDialog/help-dialog.service';
import { SpinnerService } from '../../../Core/Services/SpinnerService/spinner.service';
import { MenuItem } from 'primeng/api';
import { ExportDataDialogService } from '../Popups/ExportDataDialog/export-data-dialog.service';


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
        MenuPanelVisible: false,
    };
    private readonly subscriptions: Subscription[] = [];


    // Constructor 
    constructor(
        @Inject('IReadOnlyAppStateWithUser') private readonly appState: IReadOnlyAppStateWithUser,
        @Inject('ICommonDataService') private readonly globalDataService: ICommonDataService,
        private readonly modalDialogService: ModalDialogService,
        private viewContainerRef: ViewContainerRef,
        private userAccountEditorDialogService: UserAccountEditorDialogService,
        private helpDialogService: HelpDialogService,
        private exportDataDialogService: ExportDataDialogService,
        private readonly spinnerService: SpinnerService,
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
        this.spinnerService.Show();
        var logoutPromise = this.globalDataService.Logout();
        logoutPromise.then(() => {
            window.location.href = '/LoginPage';
        });
    }
    private onChangePasswordClicked() {
        var userCLO = this.viewModel.LoggedInUser;

        this.userAccountEditorDialogService.Open(userCLO, this.viewContainerRef);
    }
    private onHelpClicked() {
        this.helpDialogService.Open(this.viewContainerRef);
    }
    private onUserEmailClicked($event: Event) {

        // Hide menu panel 
        if (this.viewModel.MenuPanelVisible === true) {
            this.viewModel.MenuPanelVisible = false;
        }
        // Position and show menu panel
        else {
            this.viewModel.MenuPanelVisible = true;

            document.addEventListener('click', this.onClickedOutside, true); // Add global click handler to detect "click outside" actions

        }
    }
    private onExportDataClicked = () => {

        this.exportDataDialogService.Open(this.viewContainerRef, () => {
        });
    }
    private onClickedOutside = ($event: Event) => {
        this.viewModel.MenuPanelVisible = false;

        // Remove handler 
        document.removeEventListener('click', this.onClickedOutside, true);
    }
    
}
interface ViewModel {
    
    LoggedInUser: UserAccountCLO | null;
    MenuPanelVisible: boolean;
}
@Injectable()
export abstract class IReadOnlyAppStateWithUser {
    LoggedInUserCLO: DataStructures.IReadableProperty<CLOs.UserAccountCLO>;
}
@Injectable()
export abstract class ICommonDataService {
    abstract GetLoggedInUserFromBundle(): CLOs.UserAccountCLO;
    abstract UpdatePassword(newPassword: string): Promise<void>;
    abstract Logout(): Promise<boolean>;
    abstract SetHasSeenWelcome(): void;
    abstract DownloadData(fileName: string): Promise<void>;
}