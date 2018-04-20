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
import { ScheduleComponent } from './schedule.component';
import { ScheduleUnitComponent } from './ScheduleUnit/schedule-unit.component';
import { AddNewEventComponent } from './AddNewEvent/add-new-event.component';


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
        ScheduleComponent,
        ScheduleUnitComponent,
        AddNewEventComponent
    ],
    exports: [
        ScheduleComponent],
    entryComponents: [
        AddNewEventComponent
    ]
})
export class ScheduleModule { }