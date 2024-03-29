﻿// Angular and 3rd party stuff
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
import { TodayIndicatorComponent } from 'SPA/Components/Pages/AnalysisPage/FactorsView/TodayIndicator/today-indicator.component';
import { HoverableVersionPointComponent } from 'SPA/Components/Pages/AnalysisPage/FactorsView/PlanElem/VersionElem/HoverableVersionPoint/hoverable-version-point.component';
import { FactorsFiltersPanelComponent } from 'SPA/Components/Pages/AnalysisPage/FactorsView/FactorsFiltersPanel/factors-filters-panel.component';
import { VersionInfoGenerator } from './PlanElem/version-info-generator';


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
        
        TodayIndicatorComponent,
        HoverableVersionPointComponent,
        FactorsFiltersPanelComponent
    ],
    providers: [
        VersionInfoGenerator
    ],
    exports: [
        FactorsViewComponent,
        SharedModule
    ]
})
export class FactorsViewModule { }