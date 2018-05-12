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
import { GetNrOfDaysBetweenDates, GetNrOfDaysBetweenDatesUsingMoment, EnumerateDaysBetweenDatesUsingMoment } from 'SPA/Core/Helpers/Functions/functions';


@Component({
    selector: 'timeline-panel',
    templateUrl: './timeline-panel.component.html',
    styleUrls: ['./timeline-panel.component.css'],
    host: { 'class': 'timeline-panel' },
})
export class TimelinePanelComponent {
    // Fields
    @ViewChild('frame')
    private frame: ElementRef;
    @Input('SelectedDateRange')
    private selectedDateRange: Range<moment.Moment>;
    private readonly viewModel: ViewModel = {
        TickInfoWrappers: null,
        TickDynamicWidthInPX: null,
        DatesInSelectedDateRange: null
    };

    // Private methods
    private refreshTickDynamicWidthInPX() {
        var frameWidth = (this.frame.nativeElement as HTMLElement).offsetWidth;
        var tickWidth = frameWidth / (this.viewModel.DatesInSelectedDateRange.length -1 );

        this.viewModel.TickDynamicWidthInPX = Math.round(tickWidth);
    }
    private createTickInfoWrappers(): TickInfoWrapper[] {

        // Variables
        var tickInfoWrappers: TickInfoWrapper[] = [];
        this.viewModel.DatesInSelectedDateRange = EnumerateDaysBetweenDatesUsingMoment(this.selectedDateRange, true);

        // Compute % width per tick 
        var width = 100 / (this.viewModel.DatesInSelectedDateRange.length - 1); // the -1 is in order to hit the last tick on the right extreme of the timeline

        // Create tick info wrappers
        for (var i = 0; i < this.viewModel.DatesInSelectedDateRange.length; i++) {

            // Compute XPos
            var xPos = width * i;

            // Create wrapper
            var newTickInfoWrapper = new TickInfoWrapper(this.viewModel.DatesInSelectedDateRange[i], width, xPos, 2);
            tickInfoWrappers.push(newTickInfoWrapper);
        }

        return tickInfoWrappers;
    }

    // Constructor
    constructor(
    ) {

    }
    ngOnInit() {
        this.viewModel.TickInfoWrappers = this.createTickInfoWrappers();
        this.refreshTickDynamicWidthInPX();
    }

    // Event handlers
    @HostListener('window:resize', ['$event'])
    private onResizeWindow(event) {
        this.refreshTickDynamicWidthInPX();
    }
}
interface ViewModel {
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