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
    private getIntersection(versionCLO: CLOs.VersionCLO, targetDateRange: Range<moment.Moment>): Range<moment.Moment> {

        // Variables
        var intersectionRange = null;
        var dateRange = new momentRange.DateRange(targetDateRange.RangeStart.clone().startOf('day'), targetDateRange.RangeEnd.clone().endOf('day'));

        // If a version has no EndDate, check that its StartDate is WITHIN the targetDateRange
        if (versionCLO.EndDate === null && dateRange.contains(moment(versionCLO.StartDate))) {
            intersectionRange = new Range<moment.Moment>(moment(versionCLO.StartDate), targetDateRange.RangeEnd.clone());
        }
        // If a version has no EndDate, check that its StartDate is BEFORE the targetDateRange
        else if (versionCLO.EndDate === null && moment(versionCLO.StartDate) < targetDateRange.RangeStart) {
            intersectionRange = new Range<moment.Moment>(targetDateRange.RangeStart.clone(), targetDateRange.RangeEnd.clone());
        }
        // If the version HAS an end date, use moment-range to get the intersection
        else if (versionCLO.EndDate !== null) {
            var versionDateRange = new momentRange.DateRange(moment(versionCLO.StartDate).startOf('day'), moment(versionCLO.EndDate).endOf('day'));
            var intersectResult = dateRange.intersect(versionDateRange);
            if (intersectResult !== null) {
                intersectionRange = new Range<moment.Moment>(intersectResult.start, intersectResult.end);
            }
        }

        return intersectionRange;
    }
    private getVersionWidth(versionIntersectRange: Range<moment.Moment>, nrOfMaxDays: number) {
        var nrOfDaysInVersion = GetNrOfDaysBetweenDatesUsingMoment(versionIntersectRange.RangeStart, versionIntersectRange.RangeEnd, true);
        var proportionFactor = nrOfDaysInVersion / nrOfMaxDays;
        var versionWidth = proportionFactor * 100;
        return versionWidth;
    }
    private getDateIndexInTargetRange(date: moment.Moment, targetDateRange: Range<moment.Moment>) {
        var datesInRange = EnumerateDaysBetweenDatesUsingMoment(targetDateRange, true);
        for (var i = 0; i < datesInRange.length; i++) {
            var datesMatch = datesInRange[i].isSame(date, 'days');
            if (datesMatch) {
                return i;
            }
        }

        return null;
    }
    private getVersionXPosition(versionStartDate: moment.Moment, targetDateRange: Range<moment.Moment>) {

        // Variables
        var dateIndex = this.getDateIndexInTargetRange(versionStartDate, targetDateRange);
        var daysInTargetDateRange = GetNrOfDaysBetweenDatesUsingMoment(targetDateRange.RangeStart, targetDateRange.RangeEnd, true);

        // Convert to a position (0-100)
        var proportionFactor = dateIndex / daysInTargetDateRange;
        var xPos = proportionFactor * 100;

        return xPos;
    }
    private createVersionInfoWrappers(): VersionInfoWrapper[] {

        // Variables
        var versionCLOs = this.planCLO.Versions;
        var versionInfoWrappers: VersionInfoWrapper[] = [];
        var nrOfDaysInSelectedDateRange = GetNrOfDaysBetweenDatesUsingMoment(this.viewModel.SelectedDateRange.RangeStart, this.viewModel.SelectedDateRange.RangeEnd, true);

        // Loop through VersionCLOs
        var totalWidthRemovedByFlooring = 0;
        
        for (var i = 0; i < versionCLOs.length; i++) {
            var versionCLO = versionCLOs[i];

            // Only consider Versions which are within the SelectedDateRange
            var intersectionRange = this.getIntersection(versionCLO, this.viewModel.SelectedDateRange);
            if (intersectionRange !== null) {

                // Determine the Width
                var decimalWidth = this.getVersionWidth(intersectionRange, nrOfDaysInSelectedDateRange);
                var flooredWidth = Math.floor(decimalWidth);
                totalWidthRemovedByFlooring += decimalWidth - flooredWidth;

                // Determine the X and Y positions
                var xPosition = this.getVersionXPosition(moment(versionCLO.StartDate), this.viewModel.SelectedDateRange);
                var flooredXPosition = Math.floor(xPosition);
                var yPosition = 5;

                // Create the wrapper
                var nrOfRenderedDaysInVersion = GetNrOfDaysBetweenDatesUsingMoment(intersectionRange.RangeStart, intersectionRange.RangeEnd, true);
                var newWrapper = new VersionInfoWrapper(versionCLO, flooredWidth, flooredXPosition, yPosition, intersectionRange);
                versionInfoWrappers.push(newWrapper);
            }
        }
        

        // Special adjustment for rounding accuracy (only for the last version IF it has no end)
        if (versionInfoWrappers.length > 0) {
            var lastVersionInfoWrapper = versionInfoWrappers[versionInfoWrappers.length - 1];
            if (lastVersionInfoWrapper.IntersectionEndIsVersionEnd === false) {
                lastVersionInfoWrapper.Width += Math.round(totalWidthRemovedByFlooring);
            }
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
    public HasVisibleAndAdjacentNextVersion: boolean;

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
    constructor(versionCLO: CLOs.VersionCLO, width: number, xPos: number, yPos: number, intersectionDateRange: Range<moment.Moment>) {
        this.VersionCLO = versionCLO;
        this.Width = width;
        this.XPos = xPos;
        this.YPos = yPos;
        this.IntersectionDateRange = intersectionDateRange;

    }
}