// Angular and 3rd party stuff
import { Component, ChangeDetectorRef, ApplicationRef, Input } from '@angular/core';
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
    @Input('SelectedDateRange')
    private selectedDateRange: Range<moment.Moment>;
    private readonly viewModel: ViewModel = {
        TickInfoWrappers: null
    };

    // Private methods
    private createTickInfoWrappers(): TickInfoWrapper[] {

        // Variables
        var tickInfoWrappers: TickInfoWrapper[] = [];
        var datesInSelDateRange = EnumerateDaysBetweenDatesUsingMoment(this.selectedDateRange, true);

        // Create tick info wrappers
        for (var i = 0; i < 20; i++) {

            // Compute XPos and Width
            var width = 40;
            var xPos = width * i;

            // Create wrapper
            var newTickInfoWrapper = new TickInfoWrapper(datesInSelDateRange[i], width, xPos, 2);
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
    }
}
interface ViewModel {
    TickInfoWrappers: TickInfoWrapper[];
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