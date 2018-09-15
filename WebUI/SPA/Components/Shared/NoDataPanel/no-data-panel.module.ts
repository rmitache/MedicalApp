// Angular and 3rd party stuff
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Project modules


// Components
import { NoDataPanelComponent } from 'SPA/Components/Shared/NoDataPanel/no-data-panel.component';
import { NoDataModeComponent } from './NoDataMode/no-data-mode.component';


@NgModule({
    imports: [
        BrowserModule 
    ],
    declarations: [
        NoDataPanelComponent,
        NoDataModeComponent
    ],
	exports: [NoDataPanelComponent, NoDataModeComponent],
    entryComponents: [
    ]
})
export class NoDataPanelModule { }