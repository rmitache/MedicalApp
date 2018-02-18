// Angular and 3rd party stuff
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Project modules
import { FormsModule } from '@angular/forms';

import { IconButtonComponent } from 'SPA/Components/Shared/IconButton/icon-button.component';

import { KeysPipe, EnumKeysPipe } from 'SPA/Components/Shared/Pipes/keys.pipe';
import { IFRPGroupElemComponent } from 'SPA/Components/Pages/HomePage/Shared/IFRPGroupElem/ifrp-group-elem.component';
import { IFRPGroupListComponent } from 'SPA/Components/Pages/HomePage/Shared/IFRPGroupList/ifrp-group-list.component';
import { CalendarModule } from 'primeng/primeng';
import { AutoCompleteModule } from 'primeng/primeng';
import { BlockUIModule } from 'primeng/primeng';
import { ProgressSpinnerModule } from 'primeng/primeng';
import { SplitButtonModule } from 'primeng/primeng';
import { ChipsModule } from 'primeng/primeng';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CalendarModule,
        AutoCompleteModule,
        BlockUIModule,
        ProgressSpinnerModule,
        SplitButtonModule,
        ChipsModule
    ],
    declarations: [
        IconButtonComponent,
        KeysPipe,
        EnumKeysPipe,
        IFRPGroupElemComponent,
        IFRPGroupListComponent
    ],
    exports: [
        IconButtonComponent,
        KeysPipe,
        EnumKeysPipe,
        IFRPGroupElemComponent,
        IFRPGroupListComponent,
        SplitButtonModule,
        ChipsModule
    ]
})
export class SharedModule { }