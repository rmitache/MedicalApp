import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';



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
    private readonly viewModel: ViewModel = {
        Items: null,
        ShowItemsDiv: false
    };


    // Constructor 

    ngOnInit() {
        this.viewModel.Items = [
            {
                Name: 'Im a test'
            }
        ];
    }

    // Events
    @Output() public Clicked: EventEmitter<any> = new EventEmitter();

    // Event handlers
    private onClicked() {
        this.Clicked.emit();
    }


}


interface ViewModel {
    Items: SplitButtonItem[];
    ShowItemsDiv: boolean;
}
export interface SplitButtonItem {
    Name: string;
    
}