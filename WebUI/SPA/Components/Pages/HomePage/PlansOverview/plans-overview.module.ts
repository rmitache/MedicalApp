// Angular and 3rd party stuff
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';  

import { AutoCompleteModule } from 'primeng/primeng';
import { BlockUIModule } from 'primeng/primeng';
import { ProgressSpinnerModule } from 'primeng/primeng';

// Project modules
import { SharedModule } from 'SPA/Components/Shared/shared.module';

// Components
import { PlansOverviewComponent } from './plans-overview.component';
import { PlanElemComponent } from './PlanElem/plan-elem.component';
import { PlanEditorComponent } from './PlanEditor/plan-editor.component';
import { RuleElemComponent } from './PlanEditor/RuleElem/rule-elem.component';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AutoCompleteModule,
        BlockUIModule,
        ProgressSpinnerModule,

        SharedModule
    ],
    declarations: [
        PlansOverviewComponent,
        PlanElemComponent,
        PlanEditorComponent,
        RuleElemComponent
    ],
    exports: [PlansOverviewComponent],
    entryComponents: [
        PlanEditorComponent
    ]
})
export class PlansOverviewModule { }