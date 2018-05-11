// Angular and 3rd party stuff
import { Component, ChangeDetectorRef, ApplicationRef, Input } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';

// Project modules
import { Time, Range, TimeRange } from 'SPA/Core/Helpers/DataStructures/misc';
import { CommandManager } from 'SPA/Core/Managers/CommandManager/command.manager';
import { FlowDefinitions } from 'SPA/Components/Pages/HomePage/CommandFlows/flow-definitions';
import * as CLOs from 'SPA/DomainModel/clo-exports';

// Components
import { AnalysisPageApplicationState } from 'SPA/Components/Pages/AnalysisPage/analysis-page-application-state';
import { AnalysisPageDataService } from 'SPA/Components/Pages/AnalysisPage/analysis-page-data.service';
import { VersionInfoWrapper } from 'SPA/Components/Pages/AnalysisPage/FactorsView/PlanElem/plan-elem.component';
import { TickInfoWrapper } from 'SPA/Components/Pages/AnalysisPage/FactorsView/TimelinePanel/timeline-panel.component';


@Component({
    selector: '[tick-elem]',
    templateUrl: './tick-elem.component.html',
    styleUrls: ['./tick-elem.component.css'],
    host: { 'class': 'tick-elem' },
})
export class TickElemComponent {
    // Fields
    @Input('TickInfoWrapper')
    private tickInfoWrapper: TickInfoWrapper;
    private readonly viewModel: ViewModel = {
        TickInfoWrapper: null,
        DateText:null
    };

    // Constructor
    constructor(
    ) {
    }
    ngOnInit() {
        this.viewModel.TickInfoWrapper = this.tickInfoWrapper;
        this.viewModel.DateText = this.tickInfoWrapper.Date.format('MMM DD');
    }

}

interface ViewModel {
    TickInfoWrapper: TickInfoWrapper;
    DateText: string;
}