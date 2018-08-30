import { Component, Input, EventEmitter, Output, ElementRef, HostListener, ViewChild, Renderer } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as $ from 'jquery';


@Component({
	selector: 'split-button',
	templateUrl: './split-button.component.html',
	styleUrls: ['./split-button.component.css'],
	host: { 'class': 'split-button' }
})
export class SplitButtonComponent {
	// Fields
	@Input('MenuItems')
	private menuItems: SplitButtonMenuItem[];
	@ViewChild('menuItemsBar') menuItemsBarElement: ElementRef;
	@ViewChild('button') buttonElement: ElementRef;
	private readonly viewModel: ViewModel = {
		MenuItems: null,
		MenuPanelVisible: false,

		MenuPanelLeftPosition: null,
		MenuPanelTopPosition: null
	};
	private globalListenFunction: Function;

	// Constructor 
	constructor(
		private eRef: ElementRef,
		private renderer: Renderer) {

	}
	ngOnInit() {
		this.viewModel.MenuItems = this.menuItems;
	}
	buttonRight: number;

	// Events
	@Output() public ItemClicked: EventEmitter<SplitButtonMenuItem> = new EventEmitter();

	// Event handlers
	private onSplitButtonClicked($event: Event) {
		// Hide menu panel 
		if (this.viewModel.MenuPanelVisible === true) {
			this.viewModel.MenuPanelVisible = false;
			this.viewModel.MenuPanelLeftPosition = null;
		}
		// Position and show menu panel
		else {
			this.viewModel.MenuPanelVisible = true;

			var panelWidth = (this.menuItemsBarElement.nativeElement as HTMLElement).clientWidth;
			var buttonWidth = (this.buttonElement.nativeElement as HTMLElement).clientWidth;
			let buttonLeftOffset = (this.buttonElement.nativeElement as HTMLElement).offsetLeft;

			this.viewModel.MenuPanelLeftPosition = -panelWidth + buttonWidth + buttonLeftOffset;
			document.addEventListener('click', this.onClickedOutside, true); // Add global click handler to detect "click outside" actions

		}
	}
	private onClickedOutside = ($event: Event) => {
		this.viewModel.MenuPanelVisible = false;

		// Remove handler 
		document.removeEventListener('click', this.onClickedOutside, true);
	}
	private onMenuItemClicked = (menuItem: SplitButtonMenuItem) => {
		menuItem.OnClick();
	}


}


interface ViewModel {
	MenuItems: SplitButtonMenuItem[];
	MenuPanelVisible: boolean;
	MenuPanelLeftPosition: number;
	MenuPanelTopPosition: number;
}
export interface SplitButtonMenuItem {
	Label: string;
	OnClick();
	Icon?: string;
}