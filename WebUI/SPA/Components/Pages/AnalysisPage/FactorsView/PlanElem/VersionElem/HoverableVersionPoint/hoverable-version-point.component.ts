// Angular and 3rd party stuff
import { Component, Input, EventEmitter,  Output } from '@angular/core';
import * as moment from 'moment';

// Project modules
import { Time, Range, TimeRange, CoordinatePair } from 'SPA/Core/Helpers/DataStructures/misc';
import * as CLOs from 'SPA/DomainModel/clo-exports';

// Components


@Component({
    selector: '[hoverable-version-point]',
    templateUrl: './hoverable-version-point.component.html',
    styleUrls: ['./hoverable-version-point.component.css'],
    host: { 'class': 'hoverable-version-point' },
})
export class HoverableVersionPointComponent {
    // Fields
    @Input('XPos')
    private xPos: number = 0;
    @Input('TargetDate')
    private targetDate: Date;
    private readonly viewModel: ViewModel = {
        XPos: null,
        ShowHoverEffect: false,
        TargetDateText: null
    };

    // Constructor
    ngOnInit() {
        this.viewModel.XPos = this.xPos;
        this.viewModel.TargetDateText = moment(this.targetDate).format("MMM D");
    }

    // Events
    @Output() public MouseEnter: EventEmitter<void> = new EventEmitter();
    @Output() public MouseLeave: EventEmitter<void> = new EventEmitter();

    // Event handlers
    private onMouseEnter(event: any) {
        this.viewModel.ShowHoverEffect = true;
        this.MouseEnter.emit();
    }
    private onMouseLeave() {
        this.viewModel.ShowHoverEffect = false;
        this.MouseLeave.emit();

    }
}

interface ViewModel {
    XPos: number;
    ShowHoverEffect: boolean;
    TargetDateText: string;
}