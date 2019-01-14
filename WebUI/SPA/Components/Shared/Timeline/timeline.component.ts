// Angular and 3rd party stuff
import { Component, ChangeDetectorRef, ApplicationRef, Input, ElementRef, ViewChild, HostListener } from '@angular/core';
import * as moment from 'moment';
import * as momentRange from 'moment-range';
import { Observable } from 'rxjs/Observable';

// Project modules
import { Time, Range, TimeRange } from 'SPA/Core/Helpers/DataStructures/misc';
import * as CLOs from 'SPA/DomainModel/clo-exports';

// Components
import { EnumerateDatesBetweenDatesUsingMoment } from 'SPA/Core/Helpers/Functions/functions';
import { DateRangeMode } from 'SPA/Core/Helpers/Enums/enums';


@Component({
    selector: 'timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.css'],
    host: { 'class': 'timeline' },
})
export class TimelineComponent {
    // Fields
    @ViewChild('frame')
    private frame: ElementRef;
    private dateRangeSelectionMode: DateRangeMode;
    private readonly viewModel: ViewModel = {
        SelectedDateRange: null,
        TickInfoWrappers: null,
        DateRangeDisplayMode: DateRangeMode.ThreeMonths
    };

    // Private methods
    private getCurrentDisplayModeInstance(): IDateRangeModeImplementation {

        let modeImplementationClass = displayModesLookup[this.viewModel.DateRangeDisplayMode];
        let currentModeInstance: IDateRangeModeImplementation = new modeImplementationClass();


        return currentModeInstance;
    }
    private refreshUI() {
        let currentMode = this.getCurrentDisplayModeInstance();
        this.viewModel.TickInfoWrappers = currentMode.CreateTickInfoWrappers(this.viewModel.SelectedDateRange);
    }

    // Public methods
    public SetSelectedDateRange(newDateRange: Range<moment.Moment>) {
        this.viewModel.SelectedDateRange = newDateRange;
        this.refreshUI();
    }

    //// Event handlers
    //@HostListener('window:resize', ['$event'])
    //private onResizeWindow(event) {
    //    //this.refreshUI();
    //}
}
interface ViewModel {
    SelectedDateRange: Range<moment.Moment>;
    TickInfoWrappers: TickInfoWrapper[];
    DateRangeDisplayMode: DateRangeMode;
}
export class TickInfoWrapper {

    // Constructor
    constructor(
        public readonly Date: moment.Moment,
        public readonly Width: number,
        public readonly XPos: number,
        public readonly YPos: number) {

    }
}

// Display modes
interface IDateRangeModeImplementation {
    CreateTickInfoWrappers(selectedDateRange: Range<moment.Moment>): TickInfoWrapper[];
}
class SingleMonthDisplayMode implements IDateRangeModeImplementation {

    // Public methods
    public CreateTickInfoWrappers(selectedDateRange: Range<moment.Moment>): TickInfoWrapper[] {

        // Variables
        var tickInfoWrappers: TickInfoWrapper[] = [];
        let datesInSelectedDateRange = EnumerateDatesBetweenDatesUsingMoment(selectedDateRange, true);
        var width = 100 / (datesInSelectedDateRange.length - 1); // the -1 is in order to hit the last tick on the right extreme of the timeline

        // Create tick info wrappers
        for (var i = 0; i < datesInSelectedDateRange.length; i++) {
            var xPos = width * i;
            var newTickInfoWrapper = new TickInfoWrapper(datesInSelectedDateRange[i], width, xPos, 0);
            tickInfoWrappers.push(newTickInfoWrapper);
        }

        // Return only some ticks nth
        var filteredTickInfoWrappers = tickInfoWrappers.filter((wrapper, index) => {
            return index % 2 === 0;
        });

        return filteredTickInfoWrappers;
    }
};
class ThreeMonthsDisplayMode implements IDateRangeModeImplementation {

    // Public methods
    public CreateTickInfoWrappers(selectedDateRange: Range<moment.Moment>): TickInfoWrapper[] {

        // Variables
        var tickInfoWrappers: TickInfoWrapper[] = [];
        let datesInSelectedDateRange = EnumerateDatesBetweenDatesUsingMoment(selectedDateRange, true);
        var width = 100 / (datesInSelectedDateRange.length - 1); // the -1 is in order to hit the last tick on the right extreme of the timeline

        // Create tick info wrappers
        for (var i = 0; i < datesInSelectedDateRange.length; i++) {
            var xPos = width * i;
            var newTickInfoWrapper = new TickInfoWrapper(datesInSelectedDateRange[i], width, xPos, 0);
            tickInfoWrappers.push(newTickInfoWrapper);
        }

        // Return only some ticks nth
        var filteredTickInfoWrappers = tickInfoWrappers.filter((wrapper, index) => {
            return index % 7 === 0;
        });

        return filteredTickInfoWrappers;
    }
};
var displayModesLookup = {};
displayModesLookup[DateRangeMode.SingleMonth] = SingleMonthDisplayMode;
displayModesLookup[DateRangeMode.ThreeMonths] = ThreeMonthsDisplayMode;