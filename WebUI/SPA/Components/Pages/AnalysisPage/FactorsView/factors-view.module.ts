// Angular and 3rd party stuff
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { BlockUIModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng';
import { AutoCompleteModule } from 'primeng/primeng';

// Project modules
import { SharedModule } from 'SPA/Components/Shared/shared.module';
import { VersionCLOService } from 'SPA/DomainModel/Plans/CLOServices/version-clo.service';

// Components
import { FactorsViewComponent } from './factors-view.component';
import { PlanElemComponent } from './PlanElem/plan-elem.component';
import { VersionElemComponent } from 'SPA/Components/Pages/AnalysisPage/FactorsView/PlanElem/VersionElem/version-elem.component';
import { TimelinePanelComponent } from 'SPA/Components/Pages/AnalysisPage/FactorsView/TimelinePanel/timeline-panel.component';
import { TickElemComponent } from 'SPA/Components/Pages/AnalysisPage/FactorsView/TimelinePanel/TickElem/tick-elem.component';
import { TodayIndicatorComponent } from 'SPA/Components/Pages/AnalysisPage/FactorsView/TodayIndicator/today-indicator.component';
import { VersionTooltipComponent } from 'SPA/Components/Pages/AnalysisPage/FactorsView/VersionTooltip/version-tooltip.component';
import { HoverableVersionPointComponent } from 'SPA/Components/Pages/AnalysisPage/FactorsView/PlanElem/VersionElem/HoverableVersionPoint/hoverable-version-point.component';


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
        TodayIndicatorComponent,
        VersionTooltipComponent,
        HoverableVersionPointComponent
    ],
    exports: [
        FactorsViewComponent],
    entryComponents: [
    ],
    providers: [
        VersionCLOService
    ]
})
export class FactorsViewModule { }