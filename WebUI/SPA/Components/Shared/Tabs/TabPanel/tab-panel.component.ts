import { Component, Input, EventEmitter, Output } from '@angular/core';


@Component({
    selector: 'tab-panel',
    templateUrl: './tab-panel.component.html',
    styleUrls: ['./tab-panel.component.css'],
    host: { 'class': 'tab-panel' }
})
export class TabPanelComponent {
    @Input('tabTitle') title: string;
    @Input() active = false;


}
