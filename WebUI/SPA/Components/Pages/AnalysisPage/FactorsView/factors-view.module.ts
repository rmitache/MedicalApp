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
import { TimelinePanelComponent } from 'SPA/Components/Pages/AnalysisPage/FactorsView/TimelinePanel/timeline-panel.component';
import { TickElemComponent } from 'SPA/Components/Pages/AnalysisPage/FactorsView/TimelinePanel/TickElem/tick-elem.component';
import { TodayIndicatorComponent } from 'SPA/Components/Pages/AnalysisPage/FactorsView/TodayIndicator/today-indicator.component';


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
        VersionElemComponent,
        TimelinePanelComponent,
        TickElemComponent,
        TodayIndicatorComponent
    ],
    exports: [
        FactorsViewComponent],
    entryComponents: [
    ]
})
export class FactorsViewModule { }