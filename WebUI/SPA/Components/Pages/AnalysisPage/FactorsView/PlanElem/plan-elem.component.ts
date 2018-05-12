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
import { GetNrOfDaysBetweenDates, GetNrOfDaysBetweenDatesUsingMoment, EnumerateDaysBetweenDatesUsingMoment, GetDateIndexInTargetRange } from 'SPA/Core/Helpers/Functions/functions';


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
    private createVersionInfoWrappers(): VersionInfoWrapper[] {

        // Variables
        var versionCLOs = this.planCLO.Versions;
        var versionInfoWrappers: VersionInfoWrapper[] = [];
        var nrOfDaysInSelectedDateRange = GetNrOfDaysBetweenDatesUsingMoment(this.viewModel.SelectedDateRange.RangeStart, this.viewModel.SelectedDateRange.RangeEnd, true);
        var widthBetweenDates = 100 / (nrOfDaysInSelectedDateRange -1);

        // Create versionInfoWrappers
        for (var i = 0; i < versionCLOs.length; i++) {
            var versionCLO = versionCLOs[i];

            // Only consider Versions which are within the SelectedDateRange
            var intersectionRange = versionCLO.GetIntersectionWithDateRange(this.viewModel.SelectedDateRange);
            if (intersectionRange !== null) {

                // Determine the Width
                var nrOfDaysInIntersection = GetNrOfDaysBetweenDatesUsingMoment(intersectionRange.RangeStart, intersectionRange.RangeEnd, true);
                var width;
                if (intersectionRange.RangeEnd.isSame(this.viewModel.SelectedDateRange.RangeEnd, 'day')) {
                    width = (nrOfDaysInIntersection - 1) * widthBetweenDates;
                } else {
                    width = (nrOfDaysInIntersection) * widthBetweenDates;
                }
                
                
                // Determine the X and Y positions
                var startDateIndex = GetDateIndexInTargetRange(moment(versionCLO.StartDate), this.viewModel.SelectedDateRange);
                var xPosition = (startDateIndex ) * widthBetweenDates;
                var yPosition = 5;

                // Create the wrapper
                var nrOfRenderedDaysInVersion = GetNrOfDaysBetweenDatesUsingMoment(intersectionRange.RangeStart, intersectionRange.RangeEnd, true);
                var newWrapper = new VersionInfoWrapper(versionCLO, this.planCLO.Name, width, xPosition, yPosition, intersectionRange);
                versionInfoWrappers.push(newWrapper);
            }
        }


        // Special adjustments
        if (versionInfoWrappers.length > 0) {

            // Show plan name above first visible versionElem
            var firstVersionInfoWrapper = versionInfoWrappers[0];
            firstVersionInfoWrapper.ShowPlanName = true;
        }

        return versionInfoWrappers;
    }


    // Constructor
    constructor(
    ) {

    }
    ngOnInit() {
        this.viewModel.PlanCLO = this.planCLO;
        this.viewModel.SelectedDateRange = this.selectedDateRange;
        this.viewModel.XPos = this.xPos;
        this.viewModel.YPos = this.yPos;

        this.viewModel.VersionInfoWrappers = this.createVersionInfoWrappers();
    }

    // Event handlers
    private onHover() {

    }
}
interface ViewModel {
    PlanCLO: CLOs.PlanCLO;
    SelectedDateRange: Range<moment.Moment>;
    XPos: number;
    YPos: number;

    VersionInfoWrappers: VersionInfoWrapper[];
}

//
export class VersionInfoWrapper {
    // Fields
    public VersionCLO: CLOs.VersionCLO;
    public Width: number;
    public XPos: number;
    public YPos: number;
    public IntersectionDateRange: Range<moment.Moment>;
    public ShowPlanName: boolean = false;
    public PlanName: string;

    // Properties
    public get IntersectionStartIsVersionStart(): boolean {
        var areSame = moment(this.VersionCLO.StartDate).isSame(this.IntersectionDateRange.RangeStart, 'day');
        return areSame;
    }
    public get IntersectionEndIsVersionEnd(): boolean {
        var areSame = moment(this.VersionCLO.EndDate).isSame(this.IntersectionDateRange.RangeEnd, 'day');
        return areSame;
    }

    // Constructor
    constructor(versionCLO: CLOs.VersionCLO, planName: string, width: number, xPos: number, yPos: number, intersectionDateRange: Range<moment.Moment>) {

        this.VersionCLO = versionCLO;
        this.PlanName = planName;
        this.Width = width;
        this.XPos = xPos;
        this.YPos = yPos;
        this.IntersectionDateRange = intersectionDateRange;

    }
}