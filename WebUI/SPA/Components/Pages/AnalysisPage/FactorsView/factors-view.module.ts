// Angular and 3rd party stuff
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { BlockUIModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng';
import { AutoCompleteModule } from 'primeng/primeng';

// Project modules
import { SharedModule } from 'SPA/Components/Shared/shared.module';

// Components
import { FactorsViewComponent } from './factors-view.component';
import { PlanElemComponent } from './PlanElem/plan-elem.component';
import { VersionElemComponent } from 'SPA/Components/Pages/AnalysisPage/FactorsView/PlanElem/VersionElem/version-elem.component';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CalendarModule,
        AutoCompleteModule,
        BlockUIModule,
        SharedModule
    ],
    declarations: [
        FactorsViewComponent,
        PlanElemComponent,
        VersionElemComponent
    ],
    exports: [
        FactorsViewComponent],
    entryComponents: [
    ]
})
export class FactorsViewModule { }