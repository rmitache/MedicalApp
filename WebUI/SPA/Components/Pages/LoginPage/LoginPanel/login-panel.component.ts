// Angular and 3rd party stuff
import { Component, Input, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as  HelperFunctions from 'SPA/Core/Helpers/Functions/functions';
import { ModalDialogService } from 'SPA/Core/Services/ModalDialogService/modal-dialog.service';
import { LoginResultStatus } from 'SPA/Core/Helpers/Enums/enums';

// Components
import { LoginPageDataService } from 'SPA/Components/Pages/LoginPage/login-page-data.service';
import { SpinnerService } from 'SPA/Core/Services/SpinnerService/spinner.service';
import { AcceptTermsDialogComponent } from './AcceptTermsDialog/accept-terms-dialog.component';


@Component({
    selector: 'login-panel',
    templateUrl: './login-panel.component.html',
    styleUrls: ['./login-panel.component.css'],
    host: { 'class': 'login-panel' }
})
export class LoginPanelComponent {
    // Fields
    private reactiveForm: FormGroup;
    private readonly viewModel: ViewModel = {
        Email: null,
        Password: null,
        KeepLoggedIn: false,
    };

    // Private methods
    private openAcceptTermsDialog(userCLO: CLOs.UserAccountCLO) {
        this.modalDialogService.OpenDialog(this.viewContainerRef, {
            title: 'Terms and Conditions',
            childComponent: AcceptTermsDialogComponent,
            data: {
                user: userCLO
            },
            actionButtons: [
                {
                    isDisabledFunction: (childComponentInstance: any) => {
                        let compInstance = childComponentInstance as AcceptTermsDialogComponent;
                        return !compInstance.GetValidState();
                    },
                    text: 'Continue',
                    buttonClass: 'ui-button',
                    onAction: (childComponentInstance: any) => {
                        let promiseWrapper = new Promise<void>((resolve) => {
                            let acceptTermsDialog = childComponentInstance as AcceptTermsDialogComponent;
                            acceptTermsDialog.AcceptTerms()
                                .then(() => {

                                    // After accepting the terms (eg: updating the datestamp)
                                    // Try to log in again, if successful
                                    this.onLoginClicked();
                                });

                            resolve();

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
        private readonly fb: FormBuilder,
        private readonly loginPageDataService: LoginPageDataService,
        private readonly modalDialogService: ModalDialogService,
        private viewContainerRef: ViewContainerRef,
        private readonly spinnerService: SpinnerService

    ) {
        this.reactiveForm = this.fb.group({
            email: ['',
                Validators.compose([
                    Validators.required])],
            password: ['',
                Validators.compose([
                    Validators.required])],
            keepLoggedIn: null
        });

    }

    // Event handlers
    private onLoginClicked() {
        HelperFunctions.ValidateAllFields(this.reactiveForm);
        if (this.reactiveForm.valid) {
            var loginModel = {
                Email: this.viewModel.Email,
                Password: this.viewModel.Password,
                KeepLoggedIn: this.viewModel.KeepLoggedIn
            };

            this.spinnerService.Show();
            var loginPromise = this.loginPageDataService.Login(loginModel);
            loginPromise.then((loginResult) => {

                // Login successful
                if (loginResult.LoginResultStatus === LoginResultStatus.Success) {

                    window.location.href = '/HomePage';
                }
                // User exists, but hasn't accepted Terms and Conditions
                else if (loginResult.LoginResultStatus === LoginResultStatus.Failure_TermsNotAccepted) {
                    this.spinnerService.Hide();
                    this.openAcceptTermsDialog(loginResult.User);
                }
                // User doesn't exist, or credentials were wrong
                else if (loginResult.LoginResultStatus === LoginResultStatus.Failure_CredentialsWrongOrUserNotFound) {
                    this.spinnerService.Hide();
                    this.modalDialogService.ShowNotificationDialog(this.viewContainerRef, "Login failed", "Wrong password or email doesn't exist");
                }
            });

        }
    }

}


interface ViewModel {
    Email: string;
    Password: string;
    KeepLoggedIn: boolean;
}