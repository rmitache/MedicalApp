// Angular and 3rd party stuff
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/primeng';
import { AutoCompleteModule } from 'primeng/primeng';
import { BlockUIModule } from 'primeng/primeng';
import { ProgressSpinnerModule } from 'primeng/primeng';

// Project modules
import { SharedModule } from 'SPA/Components/Shared/shared.module';

// Components
import { PlansOverviewComponent } from './plans-overview.component';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CalendarModule,
        AutoCompleteModule,
        BlockUIModule,
        ProgressSpinnerModule,

        SharedModule
    ],
    declarations: [
        PlansOverviewComponent
    ],
    exports: [PlansOverviewComponent],
    entryComponents: [
        
    ]
})
export class PlansOverviewModule { }