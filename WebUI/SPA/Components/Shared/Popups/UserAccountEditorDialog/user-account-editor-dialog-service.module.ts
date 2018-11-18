import { NgModule } from '@angular/core';
import { BlockUIModule } from 'primeng/components/blockui/blockui';
import { SpinnerService } from 'SPA/Core/Services/SpinnerService/spinner.service';
import { SpinnerServiceModule } from '../../../../Core/Services/SpinnerService/spinner-service.module';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule, SharedModule, InputTextModule } from 'primeng/primeng';
import { UserAccountEditorDialogComponent } from './user-account-editor-dialog.component';
import { UserAccountEditorDialogService } from './user-account-editor-dialog.service';

@NgModule({
	imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule
	],
	declarations: [
		UserAccountEditorDialogComponent,
	],
	providers: [
        UserAccountEditorDialogService
	],
    entryComponents: [
        UserAccountEditorDialogComponent
    ]
})
export class UserAccountEditorDialogServiceModule { }