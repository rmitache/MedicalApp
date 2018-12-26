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
        TodaysHealthViewComponent
    ],
    exports: [HealthGraphComponent],
    entryComponents: [
    ]
})
export class HealthGraphModule { }