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
import { AcceptTermsDialogService } from '../../../Shared/Popups/AcceptTermsDialog/accept-terms-dialog.service';


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



    // Constructor 
    constructor(
        private readonly fb: FormBuilder,
        private readonly loginPageDataService: LoginPageDataService,
        private readonly modalDialogService: ModalDialogService,
        private viewContainerRef: ViewContainerRef,
        private readonly spinnerService: SpinnerService,
        private readonly acceptTermsDialogService: AcceptTermsDialogService

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
                    this.acceptTermsDialogService.Open(loginResult.User, () => {
                        this.onLoginClicked();
                    });
                }
                // User doesn't exist, or credentials were wrong
                else if (loginResult.LoginResultStatus === LoginResultStatus.Failure_CredentialsWrongOrUserNotFound) {
                    this.spinnerService.Hide();
                    this.modalDialogService.ShowAlert(this.viewContainerRef, "Login failed", "Wrong password or email doesn't exist");
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