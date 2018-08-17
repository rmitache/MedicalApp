// Angular and 3rd party stuff
import { Component, Input, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Project modules
import * as  HelperFunctions from 'SPA/Core/Helpers/Functions/functions';
import { ModalDialogService } from 'SPA/Core/Services/ModalDialogService/modal-dialog.service';

// Components
import { LoginPageDataService } from 'SPA/Components/Pages/LoginPage/login-page-data.service';
import { SpinnerService } from 'SPA/Core/Services/SpinnerService/spinner.service';


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

            var loginPromise = this.loginPageDataService.Login(loginModel);
			this.spinnerService.Show();
            loginPromise.then((loginSuccessful) => {
                if (loginSuccessful === true) {
                    window.location.href = '/HomePage';
                }

                else {

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