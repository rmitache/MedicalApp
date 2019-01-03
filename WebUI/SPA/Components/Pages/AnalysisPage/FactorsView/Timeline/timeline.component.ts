// Angular and 3rd party stuff
import { Component, ChangeDetectorRef, ApplicationRef, Input, ElementRef, ViewChild, HostListener} from '@angular/core';
import * as moment from 'moment';
import * as momentRange from 'moment-range';
import { Observable } from 'rxjs/Observable';

// Project modules
import { Time, Range, TimeRange } from 'SPA/Core/Helpers/DataStructures/misc';
import { CommandManager } from 'SPA/Core/Managers/CommandManager/command.manager';
import { FlowDefinitions } from 'SPA/Components/Pages/HomePage/CommandFlows/flow-definitions';
import * as CLOs from 'SPA/DomainModel/clo-exports';

// Components
import { AnalysisPageApplicationState } from 'SPA/Components/Pages/AnalysisPage/analysis-page-application-state';
import { AnalysisPageDataService } from 'SPA/Components/Pages/AnalysisPage/analysis-page-data.service';
import { GetNrOfDaysBetweenDates, GetNrOfDaysBetweenDatesUsingMoment, EnumerateDatesBetweenDatesUsingMoment } from 'SPA/Core/Helpers/Functions/functions';
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
        TickDynamicWidthInPX: null,
        DatesInSelectedDateRange: null
    };

    // Private methods
    private getTickDynamicWidthInPX() {
        var frameWidth = (this.frame.nativeElement as HTMLElement).offsetWidth;
        var tickWidth = frameWidth / (this.viewModel.DatesInSelectedDateRange.length -1 );

        let newTickDynamicWidthInPX = Math.round(tickWidth);
        return newTickDynamicWidthInPX;
    }
    private createTickInfoWrappers(): TickInfoWrapper[] {

        // Variables
        var tickInfoWrappers: TickInfoWrapper[] = [];
        this.viewModel.DatesInSelectedDateRange = EnumerateDatesBetweenDatesUsingMoment(this.viewModel.SelectedDateRange, true);

        // Compute % width per tick 
        var width = 100 / (this.viewModel.DatesInSelectedDateRange.length - 1); // the -1 is in order to hit the last tick on the right extreme of the timeline

        // Create tick info wrappers
        for (var i = 0; i < this.viewModel.DatesInSelectedDateRange.length; i++) {

            // Compute XPos
            var xPos = width * i;

            // Create wrapper
            var newTickInfoWrapper = new TickInfoWrapper(this.viewModel.DatesInSelectedDateRange[i], width, xPos, 0);
            tickInfoWrappers.push(newTickInfoWrapper);
        }

		// Return nth
		var filteredTickInfoWrappers = tickInfoWrappers.filter((wrapper,index) => {
			return index % 8 === 0;
		});

		return filteredTickInfoWrappers;
    }
    private refreshUI() {
        this.viewModel.TickInfoWrappers = this.createTickInfoWrappers();
        this.viewModel.TickDynamicWidthInPX = this.getTickDynamicWidthInPX();
    }

    // Public methods
    public SetSelectedDateRange(newDateRange: Range<moment.Moment>) {
        this.viewModel.SelectedDateRange = newDateRange;
        this.refreshUI();
    }

    // Event handlers
    @HostListener('window:resize', ['$event'])
    private onResizeWindow(event) {
        this.refreshUI();
    }
}
interface ViewModel {
    SelectedDateRange: Range<moment.Moment>;
    TickInfoWrappers: TickInfoWrapper[];
    TickDynamicWidthInPX: number; 
    DatesInSelectedDateRange: moment.Moment[];

}
export class TickInfoWrapper {
    // Fields
    public Date: moment.Moment;
    public Width: number;
    public XPos: number;
    public YPos: number;
    

    // Constructor
    constructor(date: moment.Moment, width:number, xPos: number, yPos: number) {
        this.Date = date;
        this.Width = width;
        this.XPos = xPos;
        this.YPos = yPos;
    }
}