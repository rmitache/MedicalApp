import { Component, Input, EventEmitter, Output} from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'navigation-panel',
    templateUrl: './navigation-panel.component.html',
    styleUrls: ['./navigation-panel.component.css'],
    host: { 'class': 'navigation-panel' }
})
export class NavigationPanelComponent {
    // Fields
    @Input('Label')
    private label: string;
    private readonly viewModel: ViewModel = {
        GetLabel: () => {
            return this.label;
        }
    };

    // Constructor 
    constructor(
    ) {

        
    }
    ngOnInit() {
    }

    // Events
    @Output() public PreviousClicked: EventEmitter<any> = new EventEmitter();
    @Output() public NextClicked: EventEmitter<any> = new EventEmitter();

    // Event handlers
    private onPreviousClicked() {
        this.PreviousClicked.emit();
    }
    private onNextClicked() {
        this.NextClicked.emit();
    }
}


interface ViewModel {
    GetLabel();
}