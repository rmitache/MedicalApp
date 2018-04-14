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
import { HealthGraphComponent } from './health-graph.component';
import { AddNewHealthStatusEntryComponent } from 'SPA/Components/Pages/HomePage/HealthGraph/AddNewHealthStatusEntry/add-new-health-status-entry.component';
import { SymptomEntryElemComponent } from 'SPA/Components/Pages/HomePage/HealthGraph/AddNewHealthStatusEntry/SymptomEntryElem/symptom-entry-elem.component';
import { GraphTooltipComponent } from 'SPA/Components/Pages/HomePage/HealthGraph/GraphTooltip/graph-tooltip.component';



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
        HealthGraphComponent,
        AddNewHealthStatusEntryComponent,
        SymptomEntryElemComponent,
        GraphTooltipComponent
    ],
    exports: [HealthGraphComponent],
    entryComponents: [
        AddNewHealthStatusEntryComponent
    ]
})
export class HealthGraphModule { }