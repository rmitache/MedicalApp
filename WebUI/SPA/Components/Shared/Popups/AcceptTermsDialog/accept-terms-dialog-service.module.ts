import { NgModule } from '@angular/core';
import { BlockUIModule } from 'primeng/components/blockui/blockui';
import { SpinnerService } from 'SPA/Core/Services/SpinnerService/spinner.service';
import { AcceptTermsDialogService } from './accept-terms-dialog.service';
import { AcceptTermsDialogComponent } from './accept-terms-dialog.component';
import { SpinnerServiceModule } from '../../../../Core/Services/SpinnerService/spinner-service.module';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/primeng';

@NgModule({
	imports: [
        SpinnerServiceModule,
        BrowserModule,
        CommonModule,
        FormsModule,
        CheckboxModule,

	],
	declarations: [
		AcceptTermsDialogComponent,
	],
	providers: [
        AcceptTermsDialogService
	],
    entryComponents: [
        AcceptTermsDialogComponent
    ]
})
export class AcceptTermsDialogServiceModule { }