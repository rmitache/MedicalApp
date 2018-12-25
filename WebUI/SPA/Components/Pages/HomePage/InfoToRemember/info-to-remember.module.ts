// Angular and 3rd party stuff
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { CalendarModule } from 'primeng/primeng';
import { AutoCompleteModule } from 'primeng/primeng';

// Project modules
import { SharedModule } from 'SPA/Components/Shared/shared.module';
import { InfoToRememberComponent } from './info-to-remember.component';
import { MedicineTypesOverviewModule } from '../MedicineTypesOverview/medicine-types-overview.module';

// Components



@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CalendarModule,
        AutoCompleteModule,
        ReactiveFormsModule,
        MedicineTypesOverviewModule,
        SharedModule
    ],
    declarations: [
        InfoToRememberComponent,
    ],
    exports: [InfoToRememberComponent],
    entryComponents: [
    ]
})
export class InfoToRememberModule { }