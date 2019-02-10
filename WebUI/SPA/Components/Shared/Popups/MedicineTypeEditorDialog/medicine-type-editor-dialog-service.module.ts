import { NgModule } from '@angular/core';
import { SpinnerServiceModule } from '../../../../Core/Services/SpinnerService/spinner-service.module';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule, CalendarModule, ChipsModule, AutoCompleteModule, RadioButtonModule, TooltipModule } from 'primeng/primeng';
import { KeysPipe } from '../../Pipes/keys.pipe';
import { PipesModule } from '../../Pipes/pipes.module';
import { MedicineTypeEditorDialogComponent } from './medicine-type-editor-dialog.component';
import { MedicineTypeEditorDialogService } from './medicine-type-editor-dialog.service';

@NgModule({
	imports: [
        SpinnerServiceModule,
        BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CalendarModule,
        PipesModule,
        ChipsModule,
        AutoCompleteModule,
        RadioButtonModule,
        TooltipModule
	],
	declarations: [
        MedicineTypeEditorDialogComponent
	],
	providers: [
        MedicineTypeEditorDialogService
	],
    entryComponents: [
        MedicineTypeEditorDialogComponent
    ]
})
export class MedicineTypeEditorDialogServiceModule { }