// Angular and 3rd party stuff
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';  

// Project modules
import { SharedModule } from 'SPA/Components/Shared/shared.module';
import { HeaderBarComponent } from 'SPA/Components/Shared/HeaderBar/header-bar.component';
import { UserAccountEditorComponent } from 'SPA/Components/Shared/HeaderBar/UserAccountEditor/user-account-editor.component';

// Components



@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
    ],
	declarations: [
		UserAccountEditorComponent,
		HeaderBarComponent

    ],
	exports: [HeaderBarComponent],
    providers: [ ],
    entryComponents: [
		UserAccountEditorComponent
    ]
})
export class HeaderBarModule { }