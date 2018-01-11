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
    @Input('SelectedDate')
    private selectedDate: Date;
    private readonly viewModel: ViewModel = {
        GetSelectedDateString: () => {
            return moment(this.selectedDate).format('Do MMM, YYYY');
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
    GetSelectedDateString();
}