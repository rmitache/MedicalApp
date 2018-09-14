// Angular and 3rd party stuff
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Project modules


// Components
import { NoDataPanelComponent } from 'SPA/Components/Shared/NoDataPanel/no-data-panel.component';
import { InfoMessageComponent } from './InfoMessage/info-message.component';


@NgModule({
    imports: [
        BrowserModule 
    ],
    declarations: [
        NoDataPanelComponent,
        InfoMessageComponent
    ],
	exports: [NoDataPanelComponent, InfoMessageComponent],
    entryComponents: [
    ]
})
export class NoDataPanelModule { }