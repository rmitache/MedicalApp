// Angular and 3rd party stuff
import { Component, ChangeDetectorRef, ApplicationRef, Input, EventEmitter, Output } from '@angular/core';
import * as moment from 'moment';
import * as momentRange from 'moment-range';
import { Observable } from 'rxjs/Observable';

// Project modules
import { Time, Range, TimeRange, CoordinatePair } from 'SPA/Core/Helpers/DataStructures/misc';
import { CommandManager } from 'SPA/Core/Managers/CommandManager/command.manager';
import { FlowDefinitions } from 'SPA/Components/Pages/HomePage/CommandFlows/flow-definitions';
import * as CLOs from 'SPA/DomainModel/clo-exports';

// Components
import { AnalysisPageApplicationState } from 'SPA/Components/Pages/AnalysisPage/analysis-page-application-state';
import { AnalysisPageDataService } from 'SPA/Components/Pages/AnalysisPage/analysis-page-data.service';
import { GetNrOfDaysBetweenDates, GetNrOfDaysBetweenDatesUsingMoment, EnumerateDaysBetweenDatesUsingMoment, GetDateIndexInTargetRange } from 'SPA/Core/Helpers/Functions/functions';
import { VersionElemHoverEventInfo } from 'SPA/Components/Pages/AnalysisPage/FactorsView/PlanElem/VersionElem/version-elem.component';


@Component({
    selector: '[plan-elem]',
    templateUrl: './plan-elem.component.html',
    styleUrls: ['./plan-elem.component.css'],
    host: { 'class': 'plan-elem' },
})
export class PlanElemComponent {
    // Fields
    @Input('PlanCLO')
    private planCLO: CLOs.PlanCLO;
    @Input('SelectedDateRange')
    private selectedDateRange: Range<moment.Moment>;
    @Input('XPos')
    private xPos = 0;
    @Input('YPos')
    private yPos = 0;
    private readonly viewModel: ViewModel = {
        PlanCLO: null,
        SelectedDateRange: null,
        XPos: 0,
        YPos: 0,
        VersionInfoWrappers: null
    };

    // Private methods
    private createVersionInfoWrappers(): VersionElemInfoWrapper[] {

        // Variables
        var versionCLOs = this.planCLO.Versions.ToArray();
        var versionInfoWrappers: VersionElemInfoWrapper[] = [];
        var nrOfDaysInSelectedDateRange = GetNrOfDaysBetweenDatesUsingMoment(this.viewModel.SelectedDateRange.RangeStart, this.viewModel.SelectedDateRange.RangeEnd, true);
        var widthBetweenDates = 100 / (nrOfDaysInSelectedDateRange - 1);

        // Create versionInfoWrappers
        for (let i = 0; i < versionCLOs.length; i++) {
            let versionCLO = versionCLOs[i];

            // Only consider Versions which are within the SelectedDateRange
            let intersectionRange = versionCLO.GetIntersectionWithDateRange(this.viewModel.SelectedDateRange);
            if (intersectionRange !== null) {

                // Determine the Width
                let nrOfDaysInIntersection = GetNrOfDaysBetweenDatesUsingMoment(intersectionRange.start, intersectionRange.end, true);
                let width = (nrOfDaysInIntersection - 1) * widthBetweenDates; // minus one is because any date is shown as the nth tick, which actually is n - 1 ticks WIDE

                // Determine the X and Y positions
                let startDateIndex = GetDateIndexInTargetRange(moment(versionCLO.StartDate), this.viewModel.SelectedDateRange);
                let xPosition = (startDateIndex) * widthBetweenDates;
                let yPosition = 5;

                // Create the wrapper
                let newWrapper = new VersionElemInfoWrapper(versionCLO, width, xPosition, yPosition, intersectionRange);
                versionInfoWrappers.push(newWrapper);
            }
        }

        // Second iteration through versionInfoWrappers 
        if (versionInfoWrappers.length > 0) {

            // Show plan name above first visible versionElem
            let firstVersionInfoWrapper = versionInfoWrappers[0];
            firstVersionInfoWrapper.PlanName = this.viewModel.PlanCLO.Name;

            // Handle special width adjustments for adjacent versions
            for (let j = 0; j < versionInfoWrappers.length - 1; j++) {

                // If the versionWrapper is adjacent to its next versionWrapper, slightly expand it's width
                if (j < versionInfoWrappers.length - 1) {
                    var currentIntersection = versionInfoWrappers[j].IntersectionDateRange;
                    var nextIntersection = versionInfoWrappers[j + 1].IntersectionDateRange;

                    if (GetNrOfDaysBetweenDatesUsingMoment(nextIntersection.start, currentIntersection.end, true) === 1) {
                        versionInfoWrappers[j].Width += 1 * widthBetweenDates;
                    }

                }
            }



        }
        return versionInfoWrappers;
    }

    // Constructor
    ngOnInit() {
        this.viewModel.PlanCLO = this.planCLO;
        this.viewModel.SelectedDateRange = this.selectedDateRange;
        this.viewModel.XPos = this.xPos;
        this.viewModel.YPos = this.yPos;

        this.viewModel.VersionInfoWrappers = this.createVersionInfoWrappers();
    }

    // Events
    @Output() public VersionElemHover: EventEmitter<VersionElemHoverEventInfo> = new EventEmitter();

    // Event handlers
    private onVersionElemHover(eventInfo: VersionElemHoverEventInfo) {
        this.VersionElemHover.emit(eventInfo);
    }
}
interface ViewModel {
    PlanCLO: CLOs.PlanCLO;
    SelectedDateRange: Range<moment.Moment>;
    XPos: number;
    YPos: number;

    VersionInfoWrappers: VersionElemInfoWrapper[];
}

// Representation
export class VersionElemInfoWrapper {
    // Fields
    public VersionCLO: CLOs.VersionCLO;
    public IntersectionDateRange: momentRange.DateRange;
    public HasNextAdjacentVersion: boolean;

    public Width: number;
    public XPos: number;
    public YPos: number;
    public PlanName: string;

    // Properties
    public get VersionStartsOnIntersectionStart(): boolean {
        var versionStartSameAsIntersectionStart = moment(this.VersionCLO.StartDate).isSame(this.IntersectionDateRange.start, 'day');
        return versionStartSameAsIntersectionStart;
    }
    public get VersionEndsOnIntersectionEnd(): boolean {
        var versionEndSameAsIntersectionEnd = moment(this.VersionCLO.EndDate).isSame(this.IntersectionDateRange.end, 'day');
        return versionEndSameAsIntersectionEnd;
    }
    public get StartMarkerName(): string {

        if (this.VersionStartsOnIntersectionStart === true) {
            return 'url(#circle-tick-start)'
        } else {
            return '';
        }
    }
    public get EndMarkerName(): string {
        if (this.VersionEndsOnIntersectionEnd === true) {
            return 'url(#circle-tick-start)';
        } else {
            return 'url(#arrow)';
        }
    }

    // Constructor
    constructor(
        versionCLO: CLOs.VersionCLO,
        width: number,
        xPos: number,
        yPos: number,
        intersectionWithVisibleDateRange: momentRange.DateRange
    ) {
        this.VersionCLO = versionCLO;
        this.Width = width;
        this.XPos = xPos;
        this.YPos = yPos;
        this.IntersectionDateRange = intersectionWithVisibleDateRange;

    }
}

