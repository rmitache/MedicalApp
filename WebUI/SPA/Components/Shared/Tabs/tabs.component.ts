import { Component, Input, EventEmitter, Output, AfterContentInit, ContentChildren, QueryList } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TabPanelComponent } from 'SPA/Components/Shared/Tabs/TabPanel/tab-panel.component';



@Component({
    selector: 'tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.css'],
    host: { 'class': 'tabs' }
})
export class TabsComponent implements AfterContentInit {
    @ContentChildren(TabPanelComponent) tabPanels: QueryList<TabPanelComponent>;

    // contentChildren are set
    ngAfterContentInit() {
        // get all active tabs
        let activeTabs = this.tabPanels.filter((tab) => tab.active);

        // if there is no active tab set, activate the first
        if (activeTabs.length === 0) {
            this.selectTab(this.tabPanels.first);
        }
    }

    selectTab(tab: TabPanelComponent) {
        // deactivate all tabs
        this.tabPanels.toArray().forEach(tab => tab.active = false);

        // activate the tab the user has clicked on.
        tab.active = true;
    }


}
