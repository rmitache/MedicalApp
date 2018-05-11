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
        SelectedDateRange: null
    };
    private array = [3, 3, 3, 3, 3, 3, 3];

 
    // Constructor
    constructor(
    ) {

    }
    ngOnInit() {
        this.viewModel.SelectedDateRange = this.selectedDateRange;
    }

    
}
interface ViewModel {
    SelectedDateRange: Range<moment.Moment>;
}

