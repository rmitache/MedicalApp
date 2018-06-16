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
import { VersionRepresentation } from 'SPA/Components/Pages/AnalysisPage/FactorsView/PlanElem/plan-elem.component';
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
    @Input('TickWidthInPX')
    private tickWidthInPX: number;
    private readonly viewModel: ViewModel = {
        TickInfoWrapper: null,
        TickWidthInPX: null,
        DateText:null
    };

    // Constructor
    ngOnInit() {
        this.viewModel.TickInfoWrapper = this.tickInfoWrapper;
        this.viewModel.TickWidthInPX = this.tickWidthInPX;
        this.viewModel.DateText = this.tickInfoWrapper.Date.format('MMM D');
    }
}

interface ViewModel {
    TickInfoWrapper: TickInfoWrapper;
    TickWidthInPX: number;
    DateText: string;
}