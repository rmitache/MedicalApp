import { Component, Input, Injectable, Inject, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { HomePageApplicationState } from 'SPA/Components/Pages/HomePage/home-page-application-state';
import { UserAccountCLO } from 'SPA/DomainModel/Users/CLOs/user-account.clo';
import { HomePageDataService } from 'SPA/Components/Pages/HomePage/home-page-data.service';
import * as DataStructures from 'SPA/Core/Helpers/DataStructures/data-structures';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import { UserAccountEditorComponent, UserAccountEditorMode } from 'SPA/Components/Shared/HeaderBar/UserAccountEditor/user-account-editor.component';
import { ModalDialogService } from 'SPA/Core/Services/ModalDialogService/modal-dialog.service';


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
		LoggedInUser: null,
    };
    private readonly subscriptions: Subscription[] = [];

	// Private methods
	private openUserAccountEditor(title: string, saveButtonText: string, userAccountCLO: CLOs.UserAccountCLO, mode: UserAccountEditorMode) {
		this.modalDialogService.OpenDialog(this.viewContainerRef, {
			title: title,
			childComponent: UserAccountEditorComponent,
			data: {
				userAccountCLO: userAccountCLO,
				userAccountEditorMode: mode
			},
			actionButtons: [
				{
					isDisabledFunction: (childComponentInstance: any) => {
						let editorInstance = childComponentInstance as UserAccountEditorComponent;
						return !editorInstance.GetValidState();
					},
					text: saveButtonText,
					onAction: (childComponentInstance: any) => {
						let promiseWrapper = new Promise<void>((resolve) => {
							let editorComponentInstance = childComponentInstance as UserAccountEditorComponent;
							editorComponentInstance.SaveData()
								.then(() => {
									resolve();
								});
						});
						return promiseWrapper;
					}
				},
				{
					isDisabledFunction: (childComponentInstance: any) => {
						return false;
					},
					text: 'Cancel',
					onAction: () => {
						return true;
					},
					buttonClass: 'ui-button-secondary'
				}
			]


		});

	}

    // Constructor 
    constructor(
        @Inject('IReadOnlyAppStateWithUser') private readonly appState: IReadOnlyAppStateWithUser,
		@Inject('IDataServiceWithUser') private readonly globalDataService: IDataServiceWithUser,
		private readonly modalDialogService: ModalDialogService,
		private viewContainerRef: ViewContainerRef
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

		this.openUserAccountEditor('Change password', 'Save', userCLO, UserAccountEditorMode.EditCurrent);
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
	abstract UpdatePassword(newPassword:string): Promise<void>;
    abstract Logout(): Promise<boolean>;
}