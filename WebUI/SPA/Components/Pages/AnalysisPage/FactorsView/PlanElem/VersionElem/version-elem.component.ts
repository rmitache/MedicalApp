// Angular and 3rd party stuff
import { Component, ChangeDetectorRef, ApplicationRef, Input, EventEmitter, ViewChild, Output } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';

// Project modules
import { Time, Range, TimeRange, CoordinatePair } from 'SPA/Core/Helpers/DataStructures/misc';
import { CommandManager } from 'SPA/Core/Managers/CommandManager/command.manager';
import { FlowDefinitions } from 'SPA/Components/Pages/HomePage/CommandFlows/flow-definitions';
import * as CLOs from 'SPA/DomainModel/clo-exports';

// Components
import { AnalysisPageApplicationState } from 'SPA/Components/Pages/AnalysisPage/analysis-page-application-state';
import { AnalysisPageDataService } from 'SPA/Components/Pages/AnalysisPage/analysis-page-data.service';
import { VersionElemInfoWrapper } from 'SPA/Components/Pages/AnalysisPage/FactorsView/PlanElem/plan-elem.component';
import { VersionCLOService } from 'SPA/DomainModel/Plans/CLOServices/version-clo.service';


@Component({
    selector: '[version-elem]',
    templateUrl: './version-elem.component.html',
    styleUrls: ['./version-elem.component.css'],
    host: { 'class': 'version-elem' },
})
export class VersionElemComponent {
    // Fields
    @Input('VersionInfoWrapper')
    private versionInfoWrapper: VersionElemInfoWrapper;
    @Input('ParentGroupYPos')
    private parentGroupYPos: number;
    @ViewChild("svgElem") svgElem;
    private readonly viewModel: ViewModel = {
        VersionInfoWrapper: null,
        ParentGroupYPos: null,

        StartPointEnabled: false,
        EndPointEnabled: false
    };

    // Constructor
    constructor(
        private readonly commandManager: CommandManager,
        private versionCLOService: VersionCLOService
    ) {
    }
    ngOnInit() {
        this.viewModel.VersionInfoWrapper = this.versionInfoWrapper;
        this.viewModel.ParentGroupYPos = this.parentGroupYPos;

        this.viewModel.StartPointEnabled = (this.viewModel.VersionInfoWrapper.VersionStartsOnIntersectionStart === true);


        // Determine whether the endPoint should be shown 
        let versionCLO = this.viewModel.VersionInfoWrapper.VersionCLO;
        let nextVersion = versionCLO.GetNextVersion();

        if (!nextVersion && this.viewModel.VersionInfoWrapper.VersionEndsOnIntersectionEnd) {
            this.viewModel.EndPointEnabled = true;
        } else if (nextVersion && !this.versionCLOService.AreAdjacent(nextVersion, versionCLO)) {
            this.viewModel.EndPointEnabled = true;
        } else {
            this.viewModel.EndPointEnabled = false;
        }
    }


    // Events
    @Output() public Hover: EventEmitter<VersionElemHoverEventInfo> = new EventEmitter();

    // Event handlers
    private onMouseEnterStartPoint(event: any) {

        var newDateRange = new Range<moment.Moment>(this.viewModel.VersionInfoWrapper.IntersectionDateRange.start, this.viewModel.VersionInfoWrapper.IntersectionDateRange.start);
        this.commandManager.InvokeCommandFlow('ChangeHighlightDateRangeFlow', [newDateRange]);


        // Emit hover event (used to show the tooltip)
        var bRect = this.svgElem.nativeElement.getBoundingClientRect() as ClientRect;
        var eventInfo = new VersionElemHoverEventInfo(bRect.left + 24, bRect.top + 10, this.viewModel.VersionInfoWrapper.VersionCLO, HoverInfoPointType.StartPoint);
        this.Hover.emit(eventInfo);
    }
    private onMouseLeaveStartPoint() {

        //
        this.commandManager.InvokeCommandFlow('ChangeHighlightDateRangeFlow', [null]);

        // Emit event
        this.Hover.emit(null);
    }
    private onMouseEnterEndPoint(event: any) {
        var newDateRange = new Range<moment.Moment>(this.viewModel.VersionInfoWrapper.IntersectionDateRange.end, this.viewModel.VersionInfoWrapper.IntersectionDateRange.end);
        this.commandManager.InvokeCommandFlow('ChangeHighlightDateRangeFlow', [newDateRange]);

        // Emit hover event (used to show the tooltip)
        var bRect = this.svgElem.nativeElement.getBoundingClientRect() as ClientRect;
        var eventInfo = new VersionElemHoverEventInfo(bRect.left + 24, bRect.top + 10, this.viewModel.VersionInfoWrapper.VersionCLO, HoverInfoPointType.EndPoint);
        this.Hover.emit(eventInfo);
    }
    private onMouseLeaveEndPoint() {
        //
        this.commandManager.InvokeCommandFlow('ChangeHighlightDateRangeFlow', [null]);

        // Emit event
        this.Hover.emit(null);
    }
}
interface ViewModel {
    VersionInfoWrapper: VersionElemInfoWrapper;
    ParentGroupYPos: number;

    StartPointEnabled: boolean;
    EndPointEnabled: boolean;
}

export class VersionElemHoverEventInfo {
    constructor(
        public readonly Left: number,
        public readonly Top: number,
        public readonly VersionCLO: CLOs.VersionCLO,
        public readonly PointType: HoverInfoPointType) {

    }
}
export enum HoverInfoPointType {
    StartPoint = 0,
    EndPoint = 1
}