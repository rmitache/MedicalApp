﻿// Angular and 3rd party stuff
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/primeng';
import { AutoCompleteModule } from 'primeng/primeng';
import { BlockUIModule } from 'primeng/primeng';
import { ProgressSpinnerModule } from 'primeng/primeng';
import { SplitButtonModule } from 'primeng/primeng';
import { ChipsModule } from 'primeng/primeng';
import { ChartModule } from 'primeng/primeng';
import { TabViewModule } from 'primeng/primeng';

// Project modules
import { KeysPipe, EnumKeysPipe } from 'SPA/Components/Shared/Pipes/keys.pipe';

// Components
import { IconButtonComponent } from 'SPA/Components/Shared/IconButton/icon-button.component';
import { IFRPGroupElemComponent } from 'SPA/Components/Pages/HomePage/Shared/IFRPGroupList/IFRPGroupElem/ifrp-group-elem.component';
import { IFRPGroupListComponent } from 'SPA/Components/Pages/HomePage/Shared/IFRPGroupList/ifrp-group-list.component';
import { NavigationPanelComponent } from 'SPA/Components/Shared/NavigationPanel/navigation-panel.component';
import { HeaderBarComponent } from './HeaderBar/header-bar.component';
import { FilterListPanelComponent } from 'SPA/Components/Shared/FilterListPanel/filter-list-panel.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,

        CalendarModule,
        AutoCompleteModule,
        BlockUIModule,
        ProgressSpinnerModule,
        SplitButtonModule,
        ChipsModule,
        ChartModule,
        TabViewModule,
    ],
    declarations: [
        IconButtonComponent,
        KeysPipe,
        EnumKeysPipe,
        IFRPGroupElemComponent,
        IFRPGroupListComponent,
        NavigationPanelComponent,
        HeaderBarComponent,
        FilterListPanelComponent
    ],
    exports: [
        IconButtonComponent,
        KeysPipe,
        EnumKeysPipe,
        IFRPGroupElemComponent,
        IFRPGroupListComponent,
        SplitButtonModule,
        ChipsModule,
        ChartModule,
        CalendarModule,
        BlockUIModule,
        NavigationPanelComponent,
        ProgressSpinnerModule,
        HeaderBarComponent,
        FilterListPanelComponent,
        TabViewModule,
    ]
})
export class SharedModule { }