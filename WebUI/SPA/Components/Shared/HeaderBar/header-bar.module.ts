// Angular and 3rd party stuff
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';  

// Project modules
import { SharedModule } from 'SPA/Components/Shared/shared.module';
import { HeaderBarComponent } from 'SPA/Components/Shared/HeaderBar/header-bar.component';
import { CommonModule } from '@angular/common';
import { UserAccountEditorDialogServiceModule } from '../Popups/UserAccountEditorDialog/user-account-editor-dialog-service.module';
import { ExportDataDialogServiceModule } from '../Popups/ExportDataDialog/export-data-dialog-service.module';

// Components


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        UserAccountEditorDialogServiceModule,
        ExportDataDialogServiceModule
    ],
	declarations: [
		HeaderBarComponent
    ],
	exports: [HeaderBarComponent],
    providers: [ ]
    
})
export class HeaderBarModule { }