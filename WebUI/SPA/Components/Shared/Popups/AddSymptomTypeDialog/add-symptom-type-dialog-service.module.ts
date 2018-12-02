import { NgModule } from '@angular/core';
import { SpinnerServiceModule } from '../../../../Core/Services/SpinnerService/spinner-service.module';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule, InputTextModule } from 'primeng/primeng';
import { AddSymptomTypeDialogComponent } from './add-symptom-type-dialog.component';
import { AddSymptomTypeDialogService } from './add-symptom-type-dialog.service';

@NgModule({
	imports: [
        SpinnerServiceModule,
        BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule
	],
	declarations: [
		AddSymptomTypeDialogComponent,
	],
	providers: [
        AddSymptomTypeDialogService
	],
    entryComponents: [
        AddSymptomTypeDialogComponent
    ]
})
export class AddSymptomTypeDialogServiceModule { }