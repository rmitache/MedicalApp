import { Component, Input, EventEmitter, Output } from '@angular/core';


@Component({
    selector: 'no-data-mode',
	templateUrl: './no-data-mode.component.html',
	styleUrls: ['./no-data-mode.component.css'],
	host: { 'class': 'no-data-mode' }
})
export class NoDataModeComponent {
	@Input('ID') id: string;
	@Input('IconName') iconName: string = 'info-circle';
	@Input('Visible') visible = false;
}
