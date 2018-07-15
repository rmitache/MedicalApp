// Angular and 3rd party stuff
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';  

import { AutoCompleteModule } from 'primeng/primeng';
import { ProgressSpinnerModule } from 'primeng/primeng';

// Project modules
import { SharedModule } from 'SPA/Components/Shared/shared.module';

// Components
import { MedicineTypesOverviewComponent } from './medicine-types-overview.component';
import { MedicineTypeEditorComponent } from 'SPA/Components/Pages/HomePage/MedicineTypesOverview/MedicineTypeEditor/medicine-type-editor.component';



@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AutoCompleteModule,
        ProgressSpinnerModule,
        SharedModule
    ],
    declarations: [
        MedicineTypesOverviewComponent,
        MedicineTypeEditorComponent
    ],
    exports: [MedicineTypesOverviewComponent],
    entryComponents: [
        MedicineTypeEditorComponent
    ]
})
export class MedicineTypesOverviewModule { }