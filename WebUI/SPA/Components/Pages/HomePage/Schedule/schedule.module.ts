// Angular and 3rd party stuff
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { BlockUIModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng';
import { AutoCompleteModule } from 'primeng/primeng';
import {SidebarModule} from 'primeng/sidebar';

// Project modules
import { SharedModule } from 'SPA/Components/Shared/shared.module';

// Components
import { ScheduleComponent } from './schedule.component';
import { ScheduleUnitComponent } from './ScheduleUnit/schedule-unit.component';
import { PlansOverviewModule } from '../PlansOverview/plans-overview.module';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CalendarModule,
        AutoCompleteModule,
        BlockUIModule,
        SidebarModule,
        SharedModule,
        PlansOverviewModule
    ],
    declarations: [
        ScheduleComponent,
        ScheduleUnitComponent,
    ],
    exports: [
        ScheduleComponent],
    entryComponents: [
    ]
})
export class ScheduleModule { }