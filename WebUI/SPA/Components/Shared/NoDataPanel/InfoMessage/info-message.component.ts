import { Component, Input, EventEmitter, Output } from '@angular/core';


@Component({
    selector: 'info-message',
	templateUrl: './info-message.component.html',
	styleUrls: ['./info-message.component.css'],
	host: { 'class': 'info-message' }
})
export class InfoMessageComponent {
    @Input('ID') id: string;
    @Input() active = false;


}
