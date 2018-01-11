import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';



@Component({
    selector: 'icon-button',
    templateUrl: './icon-button.component.html',
    styleUrls: ['./icon-button.component.css'],
    host: { 'class': 'icon-button' }
})
export class IconButtonComponent {
    // Fields
    @Input('IconName')
    private iconName: string = '';
    @Input('TooltipText')
    private tooltipText: string;
    private readonly viewModel: ViewModel = {
        imagePathAndName: null,
        tooltipText: null
    };


    // Constructor 
    constructor(
    ) {


    }
    ngOnInit() {
        this.viewModel.imagePathAndName = '/wwwroot/Images/' + this.iconName + '.png';
        this.viewModel.tooltipText = this.tooltipText;
    }

    // Events
    @Output() public Clicked: EventEmitter<any> = new EventEmitter();

    // Event handlers
    private onClicked() {
        this.Clicked.emit();
    }

    
}


interface ViewModel {
    imagePathAndName: string;
    tooltipText: string;
}