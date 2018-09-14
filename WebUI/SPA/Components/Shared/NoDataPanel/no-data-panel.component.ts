import { Component, Input, EventEmitter, Output, ElementRef, HostListener, ViewChild, Renderer, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as $ from 'jquery';


@Component({
	selector: 'no-data-panel',
	templateUrl: './no-data-panel.component.html',
	styleUrls: ['./no-data-panel.component.css'],
	host: { 'class': 'no-data-panel' }
})
export class NoDataPanelComponent {
	// Fields
	@Input('Message') message:string;
	private readonly viewModel: ViewModel = {
		Message: null
	};

	// Constructor 
	constructor() {

	}
	ngOnInit() {
		this.viewModel.Message = this.message;
	}



	// Events
	//@Output() public ItemClicked: EventEmitter<SplitButtonMenuItem> = new EventEmitter();



}


interface ViewModel {
	Message: string;
}
//export interface SplitButtonMenuItem {
//	Label: string;
//	OnClick();
//	Icon?: string;
//}