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
    //@Input('TooltipText')
    //private tooltipText: string;
    @ViewChild('frame') frameElement: ElementRef;
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
        this.viewModel.MenuItems = [
            {
                Name: 'Im a test'
            }
        ];
    }

    // Events
    @Output() public ItemClicked: EventEmitter<MenuItem> = new EventEmitter();

    // Event handlers
    private onSplitButtonClicked($event: Event) {
        
        if (this.viewModel.MenuPanelVisible === true) {
            // Hide menu panel 
            this.viewModel.MenuPanelVisible = false;

        } else {
            // Position and show menu panel
            this.viewModel.MenuPanelVisible = true;

            // Add global click handler to detect "click outside" actions
            document.addEventListener('click', this.onClickedOutside, true);
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
        alert(menuItem.Name);
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

}