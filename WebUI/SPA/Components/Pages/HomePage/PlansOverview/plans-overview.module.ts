// Angular and 3rd party stuff
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';  
import { AutoCompleteModule, InplaceModule } from 'primeng/primeng';
import { ProgressSpinnerModule } from 'primeng/primeng';

// Project modules
import { SharedModule } from 'SPA/Components/Shared/shared.module';

// Components
import { PlansOverviewComponent } from './plans-overview.component';
import { PlanElemComponent } from './PlanElem/plan-elem.component';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AutoCompleteModule,
        ProgressSpinnerModule,
		SharedModule,
		
    ],
    declarations: [
        PlansOverviewComponent,
        PlanElemComponent,
    ],
    exports: [PlansOverviewComponent],
    entryComponents: [
    ]
})
export class PlansOverviewModule { }