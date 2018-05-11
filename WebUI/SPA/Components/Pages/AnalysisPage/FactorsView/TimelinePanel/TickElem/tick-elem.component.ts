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


@Component({
    selector: '[tick-elem]',
    templateUrl: './tick-elem.component.html',
    styleUrls: ['./tick-elem.component.css'],
    host: { 'class': 'tick-elem' },
})
export class TickElemComponent {
    // Fields
    @Input('Date')
    private date: moment.Moment;
    @Input('XPos')
    private xPos = 0;
    @Input('YPos')
    private yPos = 0;
    private readonly viewModel: ViewModel = {
        Date: null,
        XPos: 0,
        YPos: 0,
    };

    // Constructor
    constructor(
    ) {
    }
    ngOnInit() {
        this.viewModel.Date = this.date;
        this.viewModel.XPos = this.xPos;
        this.viewModel.YPos = this.yPos;
    }

}

interface ViewModel {
    Date: moment.Moment;
    XPos: number;
    YPos: number;
}