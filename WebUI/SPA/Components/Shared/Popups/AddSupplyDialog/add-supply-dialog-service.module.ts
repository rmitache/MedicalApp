import { NgModule } from '@angular/core';
import { SpinnerServiceModule } from '../../../../Core/Services/SpinnerService/spinner-service.module';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/primeng';
import { AddSupplyDialogComponent } from './add-supply-dialog.component';
import { AddSupplyDialogService } from './add-supply-dialog.service';

@NgModule({
	imports: [
        SpinnerServiceModule,
        BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
	],
	declarations: [
		AddSupplyDialogComponent,
	],
	providers: [
        AddSupplyDialogService
	],
    entryComponents: [
        AddSupplyDialogComponent
    ]
})
export class AddSupplyDialogServiceModule { }