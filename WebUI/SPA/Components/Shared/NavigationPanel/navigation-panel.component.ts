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

    // Private methods
    private getCurrentMode(): IDateRangeSelectionMode {
        // Get Current Mode strategy
        let currentStrategy: IDateRangeSelectionMode = null;
        if (this.dateRangeSelectionMode === DateRangeMode.Month) {
            currentStrategy = new MonthMode();
        } else {
            // OBS -> Not implemented yet
            throw new Error('Not implemented yet');
        }
        return currentStrategy;
    }

    // Public methods
    public InitAndGetSelDateRange(mode: DateRangeMode, refDate: moment.Moment): Range<moment.Moment> {
        this.dateRangeSelectionMode = mode;
        var currentMode = this.getCurrentMode();
        var initialSelDateRange = currentMode.GetInitialSelectedDateRange(refDate);
        this.viewModel.SelectedDateRange = initialSelDateRange;
        this.viewModel.LabelText = currentMode.GetNavigationLabel(initialSelDateRange);

        return initialSelDateRange;
    }

    // Events
    @Output() public DateRangeChanged: EventEmitter<Range<moment.Moment>> = new EventEmitter();

    // Event handlers
    private onPreviousClicked() {
        var currentMode = this.getCurrentMode();
        let prevSelectedDateRange = currentMode.GetPreviousSelectedDateRange(this.viewModel.SelectedDateRange);
        this.viewModel.SelectedDateRange = prevSelectedDateRange;
        this.viewModel.LabelText = currentMode.GetNavigationLabel(prevSelectedDateRange);

        this.DateRangeChanged.emit(prevSelectedDateRange);
    }
    private onNextClicked() {
        var currentMode = this.getCurrentMode();
        let nextSelectedDateRange = currentMode.GetNextSelectedDateRange(this.viewModel.SelectedDateRange);
        this.viewModel.SelectedDateRange = nextSelectedDateRange;
        this.viewModel.LabelText = currentMode.GetNavigationLabel(nextSelectedDateRange);

        this.DateRangeChanged.emit(nextSelectedDateRange);
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