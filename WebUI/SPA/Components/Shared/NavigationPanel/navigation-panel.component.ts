// Angular and 3rd party stuff
import { Component, ChangeDetectorRef, EventEmitter, Output, Input } from '@angular/core';
import * as moment from 'moment';
import * as momentRange from 'moment-range';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

// Project modules
import { Time, Range, TimeRange } from 'SPA/Core/Helpers/DataStructures/misc';
import { DateRangeMode } from 'SPA/Core/Helpers/Enums/enums';

@Component({
    selector: 'navigation-panel',
    templateUrl: './navigation-panel.component.html',
    styleUrls: ['./navigation-panel.component.css'],
    host: { 'class': 'navigation-panel' }
})
export class NavigationPanelComponent {
    // Fields
    private dateRangeSelectionMode: DateRangeMode;
    private readonly viewModel: ViewModel = {
        LabelText: null,
        SelectedDateRange: null
    };
    @Input('TriggerOnlyModeOn')
    private triggerOnlyModeOn = false; 

    // Private methods
    private getCurrentMode(): IDateRangeSelectionMode {
        // Get Current Mode strategy
        let currentStrategy: IDateRangeSelectionMode = null;
        if (this.dateRangeSelectionMode === DateRangeMode.Month) {
            currentStrategy = new MonthMode();
        } else if (this.dateRangeSelectionMode === DateRangeMode.Day) {
            currentStrategy = new DayMode();
        } else {
            // OBS -> Not implemented yet
            throw new Error('Not implemented yet');
        }
        return currentStrategy;
    }
    private setInnerDateRange(newRange: Range<moment.Moment>) {
        this.viewModel.SelectedDateRange = newRange;

        var currentMode = this.getCurrentMode();
        this.viewModel.LabelText = currentMode.GetNavigationLabel(newRange);
    }

    // Public methods
    public InitAndGetSelDateRange(mode: DateRangeMode, refDate: moment.Moment): Range<moment.Moment> {

        // Initialize and compute the initial range based on the given refDate and DateRangeMode
        this.dateRangeSelectionMode = mode;
        var initialSelDateRange = this.getCurrentMode().GetInitialSelectedDateRange(refDate);

        // 
        this.setInnerDateRange(initialSelDateRange);

        return initialSelDateRange;
    }
    public SetSelectedDateRange(newRange: Range<moment.Moment>) {

        this.setInnerDateRange(newRange);
    }
    
    // Events
    @Output() public DateRangeChangeTriggered: EventEmitter<Range<moment.Moment>> = new EventEmitter();
    @Output() public DateRangeChangedBackward: EventEmitter<Range<moment.Moment>> = new EventEmitter();
    @Output() public DateRangeChangedForward: EventEmitter<Range<moment.Moment>> = new EventEmitter();

    // Event handlers
    private onPreviousClicked() {

        // Determine the new range 
        var currentMode = this.getCurrentMode();
        let prevSelectedDateRange = currentMode.GetPreviousSelectedDateRange(this.viewModel.SelectedDateRange);

        // 
        if (!this.triggerOnlyModeOn) {
            this.setInnerDateRange(prevSelectedDateRange);
            this.DateRangeChangedBackward.emit(prevSelectedDateRange);
        } else {
            this.DateRangeChangeTriggered.emit(prevSelectedDateRange);
        }
        
    }
    private onNextClicked() {

        // Determine the new range 
        var currentMode = this.getCurrentMode();
        let nextSelectedDateRange = currentMode.GetNextSelectedDateRange(this.viewModel.SelectedDateRange);

        // 
        if (!this.triggerOnlyModeOn) {
            this.setInnerDateRange(nextSelectedDateRange);
            this.DateRangeChangedForward.emit(nextSelectedDateRange);
        } else {
            this.DateRangeChangeTriggered.emit(nextSelectedDateRange);
        }
    }
}

interface ViewModel {
    LabelText: string;
    SelectedDateRange: Range<moment.Moment>;
}

interface IDateRangeSelectionMode {
    GetInitialSelectedDateRange(referenceDate: moment.Moment): Range<moment.Moment>;
    GetNextSelectedDateRange(currentSelDateRange: Range<moment.Moment>): Range<moment.Moment>;
    GetPreviousSelectedDateRange(currentSelDateRange: Range<moment.Moment>): Range<moment.Moment>;
    GetNavigationLabel(currentSelDateRange: Range<moment.Moment>): string;
}
class MonthMode implements IDateRangeSelectionMode {


    // Public methods
    public GetInitialSelectedDateRange(referenceDate: moment.Moment) {

        // Get the month of the referenceDate as an initial range
        let range = new Range<moment.Moment>(referenceDate.clone().startOf('month').startOf('day'),
            referenceDate.clone().endOf('month').endOf('day'));
        return range;
    }
    public GetNextSelectedDateRange(currentSelDateRange: Range<moment.Moment>): Range<moment.Moment> {
        let range = new Range<moment.Moment>(currentSelDateRange.RangeStart.clone().add(1, 'months').startOf('month').startOf('day'),
            currentSelDateRange.RangeEnd.clone().add(1, 'months').endOf('month').endOf('day'));
        return range;
    }
    public GetPreviousSelectedDateRange(currentSelDateRange: Range<moment.Moment>): Range<moment.Moment> {

        let range = new Range<moment.Moment>(currentSelDateRange.RangeStart.clone().subtract(1, 'months').startOf('month').startOf('day'),
            currentSelDateRange.RangeEnd.clone().subtract(1, 'months').endOf('month').endOf('day'));
        return range;
    }
    public GetNavigationLabel(currentSelDateRange: Range<moment.Moment>) {
        // Range must be within same month
        if (currentSelDateRange.RangeStart.month() !== currentSelDateRange.RangeEnd.month()) {
            throw new Error('Range must be within same month');
        }

        return currentSelDateRange.RangeStart.format('MMMM, YYYY');
    }

};
class DayMode implements IDateRangeSelectionMode {

    // Public methods
    public GetInitialSelectedDateRange(referenceDate: moment.Moment) {
        return new Range<moment.Moment>(referenceDate.clone().startOf('day'), referenceDate.clone().endOf('day'));
    }
    public GetNextSelectedDateRange(currentSelDateRange: Range<moment.Moment>) {
        // Check if length of range is = 0
        let length = (currentSelDateRange.RangeEnd.diff(currentSelDateRange.RangeStart, 'days'));
        if (length !== 0) {
            throw new Error('Range must be 1 single day. Use GetInitialSelectedDateRange first');
        }

        return new Range<moment.Moment>(currentSelDateRange.RangeStart.clone().add(1, 'days'), currentSelDateRange.RangeEnd.clone().add(1, 'days'));
    }
    public GetPreviousSelectedDateRange(currentSelDateRange: Range<moment.Moment>) {
        // Check if length of range is = 0
        let length = (currentSelDateRange.RangeEnd.diff(currentSelDateRange.RangeStart, 'days'));
        if (length !== 0) {
            throw new Error('Range must be 1 single day. Use GetInitialSelectedDateRange first');
        }

        return new Range<moment.Moment>(currentSelDateRange.RangeStart.clone().subtract(1, 'days'), currentSelDateRange.RangeEnd.clone().subtract(1, 'days'));

    }
    public GetNavigationLabel(currentSelDateRange: Range<moment.Moment>) {
        // Check if length of range is = 0
        let length = (currentSelDateRange.RangeEnd.diff(currentSelDateRange.RangeStart, 'days'));
        if (length !== 0) {
            throw new Error('Range must be 1 single day. Use GetInitialSelectedDateRange first');
        }

        return currentSelDateRange.RangeStart.format('dddd Do MMM, YYYY');
    }
};