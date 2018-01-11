import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ScheduleComponent } from './schedule.component';
import { NavigationPanelComponent } from './NavigationPanel/navigation-panel.component';
import { ScheduleUnitComponent } from './ScheduleUnit/schedule-unit.component';
import { AddNewEventComponent } from './AddNewEvent/add-new-event.component';

import { IconButtonComponent } from 'SPA/Components/Shared/IconButton/icon-button.component';
import { KeysPipe } from 'SPA/Components/Shared/Pipes/keys.pipe';

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        ScheduleComponent,
        NavigationPanelComponent,
        ScheduleUnitComponent,
        AddNewEventComponent,

        IconButtonComponent,
        KeysPipe
    ],
    exports: [ScheduleComponent],
    entryComponents: [
        AddNewEventComponent
    ]
})
export class ScheduleModule { }