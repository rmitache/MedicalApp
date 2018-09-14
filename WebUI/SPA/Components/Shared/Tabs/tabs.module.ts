// Angular and 3rd party stuff
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Project modules

// Components
import { TabPanelComponent } from 'SPA/Components/Shared/Tabs/TabPanel/tab-panel.component';
import { TabsComponent } from 'SPA/Components/Shared/Tabs/tabs.component';



@NgModule({
    imports: [
        BrowserModule 
    ],
    declarations: [
        TabsComponent,
        TabPanelComponent
    ],
    exports: [TabsComponent, TabPanelComponent],
    entryComponents: [
    ]
})
export class TabsModule { }