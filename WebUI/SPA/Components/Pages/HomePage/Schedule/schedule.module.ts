import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ScheduleComponent } from './schedule.component';
import { NavigationPanelComponent } from './NavigationPanel/navigation-panel.component';
import { ScheduleUnitComponent } from './ScheduleUnit/schedule-unit.component';
import { AddNewEventComponent } from './AddNewEvent/add-new-event.component';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { IconButtonComponent } from 'SPA/Components/Shared/IconButton/icon-button.component';
import { KeysPipe } from 'SPA/Components/Shared/Pipes/keys.pipe';
import { FactorRecordEditableItem } from 'SPA/Components/Pages/HomePage/Shared/FactorRecordEditableItem/factor-record-editable-item.component';
import { CalendarModule } from 'primeng/primeng';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AngularDateTimePickerModule,
        CalendarModule
    ],
    declarations: [
        ScheduleComponent,
        NavigationPanelComponent,
        ScheduleUnitComponent,
        AddNewEventComponent,

        IconButtonComponent,
        KeysPipe,
        FactorRecordEditableItem
    ],
    exports: [ScheduleComponent],
    entryComponents: [
        AddNewEventComponent
    ]
})
export class ScheduleModule { }