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
import { VersionCLOService } from 'SPA/DomainModel/Plans/CLOServices/version-clo.service';
import { MedicineTypeElemComponent } from 'SPA/Components/Pages/HomePage/MedicineTypesOverview/MedicineTypeElem/medicine-type-elem.component';



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
        MedicineTypeEditorComponent,
		MedicineTypeElemComponent
    ],
    exports: [MedicineTypesOverviewComponent],
    providers: [ VersionCLOService],
    entryComponents: [
        MedicineTypeEditorComponent,
    ]
})
export class MedicineTypesOverviewModule { }