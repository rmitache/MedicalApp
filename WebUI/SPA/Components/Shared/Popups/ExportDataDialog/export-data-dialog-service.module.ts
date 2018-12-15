import { NgModule } from '@angular/core';
import { SpinnerServiceModule } from '../../../../Core/Services/SpinnerService/spinner-service.module';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule, CalendarModule } from 'primeng/primeng';
import { ExportDataDialogComponent } from './export-data-dialog.component';
import { ExportDataDialogService } from './export-data-dialog.service';

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
		ExportDataDialogComponent,
	],
	providers: [
        ExportDataDialogService
	],
    entryComponents: [
        ExportDataDialogComponent
    ]
})
export class ExportDataDialogServiceModule { }