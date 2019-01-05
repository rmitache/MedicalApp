// Angular and 3rd party stuff
import { Component, ChangeDetectorRef, ApplicationRef, Input } from '@angular/core';
import * as moment from 'moment';

// Project modules
import { Time, Range, TimeRange } from 'SPA/Core/Helpers/DataStructures/misc';
import * as CLOs from 'SPA/DomainModel/clo-exports';

// Components
import { TickInfoWrapper } from 'SPA/Components/Pages/AnalysisPage/FactorsView/Timeline/timeline.component';


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