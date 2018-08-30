// Angular and 3rd party stuff
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';  

import { AutoCompleteModule } from 'primeng/primeng';
import { ProgressSpinnerModule } from 'primeng/primeng';

// Project modules
import { SharedModule } from 'SPA/Components/Shared/shared.module';

// Components
import { PlansOverviewComponent } from './plans-overview.component';
import { PlanElemComponent } from './PlanElem/plan-elem.component';
import { PlanEditorComponent } from './PlanEditor/plan-editor.component';
import { RuleElemComponent } from './PlanEditor/RuleElem/rule-elem.component';
import { StopPlanDialogComponent } from 'SPA/Components/Pages/HomePage/PlansOverview/StopPlanDialog/stop-plan-dialog.component';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AutoCompleteModule,
        ProgressSpinnerModule,
        SharedModule
    ],
    declarations: [
        PlansOverviewComponent,
        PlanElemComponent,
        PlanEditorComponent,
		RuleElemComponent,
		StopPlanDialogComponent
    ],
    exports: [PlansOverviewComponent],
    entryComponents: [
		PlanEditorComponent,
		StopPlanDialogComponent
    ]
})
export class PlansOverviewModule { }