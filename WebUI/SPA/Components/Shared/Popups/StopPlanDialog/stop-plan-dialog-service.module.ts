import { NgModule } from '@angular/core';
import { SpinnerServiceModule } from '../../../../Core/Services/SpinnerService/spinner-service.module';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule, CalendarModule } from 'primeng/primeng';
import { StopPlanDialogComponent } from './stop-plan-dialog.component';
import { StopPlanDialogService } from './stop-plan-dialog.service';

@NgModule({
	imports: [
        SpinnerServiceModule,
        BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CalendarModule
	],
	declarations: [
		StopPlanDialogComponent,
	],
	providers: [
        StopPlanDialogService
	],
    entryComponents: [
        StopPlanDialogComponent
    ]
})
export class StopPlanDialogServiceModule { }