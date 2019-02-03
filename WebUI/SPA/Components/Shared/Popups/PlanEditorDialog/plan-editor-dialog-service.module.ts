import { NgModule } from '@angular/core';
import { SpinnerServiceModule } from '../../../../Core/Services/SpinnerService/spinner-service.module';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule, CalendarModule, ChipsModule, AutoCompleteModule, KeyFilterModule } from 'primeng/primeng';
import { PlanEditorDialogComponent } from './plan-editor-dialog.component';
import { PlanEditorDialogService } from './plan-editor-dialog.service';
import { RuleElemComponent } from './RuleElem/rule-elem.component';
import { KeysPipe } from '../../Pipes/keys.pipe';
import { PipesModule } from '../../Pipes/pipes.module';
import { IFRPGroupListComponent } from './IFRPGroupList/ifrp-group-list.component';
import { IFRPGroupElemComponent } from './IFRPGroupList/IFRPGroupElem/ifrp-group-elem.component';
import { CustomCheckboxComponent } from '../../CustomCheckbox/custom-checkbox.component';

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
        KeyFilterModule
	],
	declarations: [
        PlanEditorDialogComponent,
        RuleElemComponent,
        IFRPGroupListComponent,
        IFRPGroupElemComponent,
        CustomCheckboxComponent
	],
	providers: [
        PlanEditorDialogService
	],
    entryComponents: [
        PlanEditorDialogComponent
    ]
})
export class PlanEditorDialogServiceModule { }