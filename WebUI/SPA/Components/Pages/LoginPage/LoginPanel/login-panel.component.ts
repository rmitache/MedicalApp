import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientAccountCLO } from 'SPA/DomainModel/Patients/CLOs/patient-account.clo';
import * as  HelperFunctions from 'SPA/Core/Helpers/Functions/functions';
import { LoginPageDataService } from 'SPA/Components/Pages/LoginPage/login-page-data.service';

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
        KeepLoggedIn: false
    };

    // Constructor 
    constructor(
        private readonly fb: FormBuilder,
        private readonly loginPageDataService: LoginPageDataService
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
            // do login logic
            var loginModel = {
                Email: this.viewModel.Email,
                Password: this.viewModel.Password,
                KeepLoggedIn: this.viewModel.KeepLoggedIn
            };
            this.loginPageDataService.Login(loginModel);
        }
    }
    
}


interface ViewModel {
    Email: string;
    Password: string;
    KeepLoggedIn: boolean;
}