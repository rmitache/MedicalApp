// Angular and 3rd party stuff
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { CalendarModule } from 'primeng/primeng';
import { AutoCompleteModule } from 'primeng/primeng';

// Project modules
import { SharedModule } from 'SPA/Components/Shared/shared.module';

// Components
import { HealthGraphComponent } from './health-graph.component';
import { TodaysHealthViewComponent } from './TodaysHealthView/todays-health-view.component';
import { LongerTermHealthViewComponent } from './LongerTermHealthView/longer-term-health-view.component';
import { HealthStatusDatasetGenerator } from '../../AnalysisPage/IndicatorsView/dataset-generator';
import { ColorProvider } from '../../AnalysisPage/IndicatorsView/color-provider';



@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CalendarModule,
        AutoCompleteModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [
        HealthGraphComponent,
        TodaysHealthViewComponent,
        LongerTermHealthViewComponent
    ],
    exports: [HealthGraphComponent],
    entryComponents: [
    ],
    providers: [
        HealthStatusDatasetGenerator,
        ColorProvider
    ]
})
export class HealthGraphModule { }