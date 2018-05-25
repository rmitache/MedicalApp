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
    selector: '[version-elem]',
    templateUrl: './version-elem.component.html',
    styleUrls: ['./version-elem.component.css'],
    host: { 'class': 'version-elem' },
})
export class VersionElemComponent {
    // Fields
    @Input('VersionInfoWrapper')
    private versionInfoWrapper: VersionInfoWrapper;
    @Input('ParentGroupYPos')
    private parentGroupYPos: number;
    private readonly viewModel: ViewModel = {
        VersionInfoWrapper: null,
        ShowHoverEffect: null,
        ParentGroupYPos: null
        //GetDates: () => {
        //    if (this.viewModel.VersionInfoWrapper.VersionCLO.EndDate === null) {
        //        return moment(this.viewModel.VersionInfoWrapper.VersionCLO.StartDate).format('MM DD YYYY') + " - No End";
        //    } else {
        //        return moment(this.viewModel.VersionInfoWrapper.VersionCLO.StartDate).format('MM DD YYYY') + " - " +
        //            moment(this.viewModel.VersionInfoWrapper.VersionCLO.EndDate).format('MM DD YYYY');
        //    }
            
        //}
    };

    // Constructor
    constructor(
        private readonly commandManager: CommandManager,
    ) {
    }
    ngOnInit() {
        this.viewModel.VersionInfoWrapper = this.versionInfoWrapper;
        this.viewModel.ParentGroupYPos = this.parentGroupYPos;
    }


    // Event handlers
    private OnMouseEnter() {

        var endDate = (!this.viewModel.VersionInfoWrapper.HasNextAdjacentVersion) ? this.viewModel.VersionInfoWrapper.IntersectionDateRange.end
            : this.viewModel.VersionInfoWrapper.IntersectionDateRange.end.clone().add(1, 'days');
        var newDateRange = new Range<moment.Moment>(this.viewModel.VersionInfoWrapper.IntersectionDateRange.start, endDate);
        this.commandManager.InvokeCommandFlow('ChangeHighlightDateRangeFlow', [newDateRange]);


        this.viewModel.ShowHoverEffect = true;
    }
    private OnMouseLeave() {
        this.commandManager.InvokeCommandFlow('ChangeHighlightDateRangeFlow', [null]);

        this.viewModel.ShowHoverEffect = false;
    }
}

interface ViewModel {
    VersionInfoWrapper: VersionInfoWrapper;
    ShowHoverEffect: boolean;
    ParentGroupYPos: number;
}