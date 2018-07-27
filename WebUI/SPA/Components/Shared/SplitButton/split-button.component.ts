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
    private menuItems: MenuItem[];
    @ViewChild('menuItemsBar') menuItemsBarElement: ElementRef;
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

    // Events
    @Output() public ItemClicked: EventEmitter<MenuItem> = new EventEmitter();

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
            this.viewModel.MenuPanelLeftPosition = -panelWidth + 24;
            document.addEventListener('click', this.onClickedOutside, true); // Add global click handler to detect "click outside" actions
        }

        //$event.preventDefault();
        //$event.stopPropagation()
    }
    private onClickedOutside = ($event: Event) => {
        this.viewModel.MenuPanelVisible = false;

        // Remove handler 
        document.removeEventListener('click', this.onClickedOutside, true);
    }
    private onMenuItemClicked = (menuItem: MenuItem) => {
        menuItem.OnClick();
    }


}


interface ViewModel {
    MenuItems: MenuItem[];
    MenuPanelVisible: boolean;
    MenuPanelLeftPosition: number;
    MenuPanelTopPosition: number;
}
export interface MenuItem {
    Name: string;
    OnClick();
}