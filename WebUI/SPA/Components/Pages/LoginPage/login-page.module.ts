// Angular and 3rd party stuff
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Project modules
import { CoreModule } from 'SPA/Core/core.module';
import { DomainModelModule } from 'SPA/DomainModel/domain-model.module';

// Components
import { LoginPageDataService } from './login-page-data.service';
import { LoginPageComponent } from './login-page.component';
import { LoginPanelComponent } from 'SPA/Components/Pages/LoginPage/LoginPanel/login-panel.component';
import { SharedModule } from 'SPA/Components/Shared/shared.module';


@NgModule({
    bootstrap: [LoginPageComponent],
    declarations: [
        LoginPageComponent,
        LoginPanelComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        BrowserModule,
        HttpModule,
        ReactiveFormsModule,
        CoreModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(
            [
                { path: '', component: LoginPageComponent },
                { path: 'LoginPage', component: LoginPageComponent }
            ]
        ),
        DomainModelModule,
        SharedModule

    ],
    providers: [
        LoginPageDataService
    ]
})
export class LoginPageModule {
}

