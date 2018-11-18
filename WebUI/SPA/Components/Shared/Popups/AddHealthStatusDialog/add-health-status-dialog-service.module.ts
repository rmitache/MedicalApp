import { NgModule } from '@angular/core';
import { BlockUIModule } from 'primeng/components/blockui/blockui';
import { SpinnerService } from 'SPA/Core/Services/SpinnerService/spinner.service';
import { SpinnerServiceModule } from '../../../../Core/Services/SpinnerService/spinner-service.module';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckboxModule, AutoCompleteModule, ButtonModule } from 'primeng/primeng';
import { AddHealthStatusDialogComponent } from './add-health-status-dialog.component';
import { AddHealthStatusDialogService } from './add-health-status-dialog.service';
import { SymptomEntryElemComponent } from './SymptomEntryElem/symptom-entry-elem.component';
import { HealthLevelSelectorComponent } from './HealthLevelSelector/health-level-selector.component';

@NgModule({
	imports: [
        SpinnerServiceModule,
        BrowserModule,
        CommonModule,
        FormsModule,
        CheckboxModule,
        AutoCompleteModule,
        ButtonModule
	],
	declarations: [
        AddHealthStatusDialogComponent,
        SymptomEntryElemComponent,
        HealthLevelSelectorComponent
	],
	providers: [
        AddHealthStatusDialogService
	],
    entryComponents: [
        AddHealthStatusDialogComponent
    ]
})
export class AddHealthStatusDialogServiceModule { }