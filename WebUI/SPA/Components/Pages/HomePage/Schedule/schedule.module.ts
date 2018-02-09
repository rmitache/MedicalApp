﻿import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ScheduleComponent } from './schedule.component';
import { NavigationPanelComponent } from './NavigationPanel/navigation-panel.component';
import { ScheduleUnitComponent } from './ScheduleUnit/schedule-unit.component';
import { AddNewEventComponent } from './AddNewEvent/add-new-event.component';
import { IconButtonComponent } from 'SPA/Components/Shared/IconButton/icon-button.component';
import { KeysPipe, EnumKeysPipe } from 'SPA/Components/Shared/Pipes/keys.pipe';
import { FactorRecordEditableItem } from 'SPA/Components/Pages/HomePage/Shared/FactorRecordEditableItem/factor-record-editable-item.component';
import { CalendarModule } from 'primeng/primeng';
import { AutoCompleteModule } from 'primeng/primeng';
import { BlockUIModule } from 'primeng/primeng';
import { ProgressSpinnerModule } from 'primeng/primeng';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CalendarModule,
        AutoCompleteModule,
        BlockUIModule,
        ProgressSpinnerModule
    ],
    declarations: [
        ScheduleComponent,
        NavigationPanelComponent,
        ScheduleUnitComponent,
        AddNewEventComponent,

        IconButtonComponent,
        KeysPipe,
        EnumKeysPipe,
        FactorRecordEditableItem
    ],
    exports: [ScheduleComponent],
    entryComponents: [
        AddNewEventComponent
    ]
})
export class ScheduleModule { }