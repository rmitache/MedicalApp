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
	@ViewChild('menuItemsBar') menuItemsBarElement: ElementRef;
	private readonly viewModel: ViewModel = {
	};

	// Constructor 
	constructor() {

	}
	ngOnInit() {
	}



	// Events
	//@Output() public ItemClicked: EventEmitter<SplitButtonMenuItem> = new EventEmitter();



}


interface ViewModel {

}
//export interface SplitButtonMenuItem {
//	Label: string;
//	OnClick();
//	Icon?: string;
//}