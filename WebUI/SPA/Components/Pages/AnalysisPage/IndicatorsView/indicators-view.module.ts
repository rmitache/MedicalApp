// Angular and 3rd party stuff
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { CalendarModule } from 'primeng/primeng';
import { AutoCompleteModule } from 'primeng/primeng';
import { ProgressSpinnerModule } from 'primeng/primeng';

// Project modules
import { SharedModule } from 'SPA/Components/Shared/shared.module';

// Components
import { IndicatorsViewComponent } from './indicators-view.component';
import { IndicatorsFiltersPanelComponent } from 'SPA/Components/Pages/AnalysisPage/IndicatorsView/IndicatorsFiltersPanel/indicators-filters-panel.component';



@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CalendarModule,
        AutoCompleteModule,
        ProgressSpinnerModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [
        IndicatorsViewComponent,
        IndicatorsFiltersPanelComponent
    ],
    exports: [IndicatorsViewComponent],
    entryComponents: [
    ]
})
export class IndicatorsViewModule { }