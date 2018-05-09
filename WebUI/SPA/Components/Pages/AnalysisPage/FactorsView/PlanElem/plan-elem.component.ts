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
import { GetNrOfDaysBetweenDates, GetNrOfDaysBetweenDatesUsingMoment } from 'SPA/Core/Helpers/Functions/functions';


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
    @Input('ViewBoxMaxWidth')
    private viewBoxMaxWidth;
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
        else if (versionCLO.EndDate === null &&  moment(versionCLO.StartDate) < targetDateRange.RangeStart) {
            intersectionRange = new Range<moment.Moment>(targetDateRange.RangeStart.clone(), targetDateRange.RangeEnd.clone());
        }
        // If the version has a date, use moment-range to get the intersection
        else if (versionCLO.EndDate !== null) {
            var versionDateRange = new momentRange.DateRange(moment(versionCLO.StartDate).startOf('day'), moment(versionCLO.EndDate).endOf('day'));
            var intersectResult = dateRange.intersect(versionDateRange);
            if (intersectResult !== null) {
                intersectionRange = new Range<moment.Moment>(intersectResult.start, intersectResult.end);
            }
        }

        return intersectionRange;
    }
    private getVersionWidth(versionIntersectRange: Range<moment.Moment>, nrOfMaxDays: number, viewBoxMaxWidth: number) {
        var nrOfDaysInVersion = GetNrOfDaysBetweenDatesUsingMoment(versionIntersectRange.RangeStart, versionIntersectRange.RangeEnd, true);
        var nrOfDaysProportionOfMax = nrOfDaysInVersion / nrOfMaxDays;
        var versionWidth = nrOfDaysProportionOfMax * this.viewBoxMaxWidth;
        return versionWidth;
    }

    // SPECIAL cases to handle:
    //  1. Width:
    //      - If version doesn't end -> width must be the viewboxmaxwidth minus the sum of all the other versionWidths
    //  2. X position:
    //      - If version is the first, x position = 0
    //      - Else -> x position = width of previous version
    //  3. VersionElems:
    //      - Only consider those Versions which intersect themselves with the SelectedDateRange
    //      - Width for VersionElems must be only between their intersection with SelectedDateRange
    //  4. PlanElems should not be rendered at all if they don't contain at least 1 intersecting version


    private createVersionInfoWrappers(): VersionInfoWrapper[] {

        // Variables
        var versionCLOs = this.planCLO.Versions;
        var versionInfoWrappers: VersionInfoWrapper[] = [];
        var nrOfDaysInSelectedDateRange = GetNrOfDaysBetweenDatesUsingMoment(this.viewModel.SelectedDateRange.RangeStart, this.viewModel.SelectedDateRange.RangeEnd, true);
        var xCounter = 0;
        //if (this.planCLO.Name = "My Herbs") {
        //    debugger;
        //}

        // Loop through VersionCLOs
        for (var i = 0; i < versionCLOs.length; i++) {
            var versionCLO = versionCLOs[i];

            // Only consider Versions which are within the SelectedDateRange
            var intersectionRange = this.getIntersection(versionCLO, this.viewModel.SelectedDateRange);
            if (intersectionRange !== null) {

                // Determine the Width
                var width = this.getVersionWidth(intersectionRange, nrOfDaysInSelectedDateRange, this.viewBoxMaxWidth);
                var nrOfRenderedDaysInVersion = GetNrOfDaysBetweenDatesUsingMoment(intersectionRange.RangeStart, intersectionRange.RangeEnd, true);

                // Determine the X position 
                var xPosition = 0;
                if (versionInfoWrappers.length > 0) {
                    var previousVersionInfoWrapper = versionInfoWrappers[versionInfoWrappers.length - 1];
                    xPosition = previousVersionInfoWrapper.XPos + previousVersionInfoWrapper.Width;
                }

                //


                //alert("Days between " + intersectionRange.RangeStart.format('DD/MM/YYYY') + " and " + intersectionRange.RangeEnd.format('DD/MM/YYYY') +
                //    " = " + nrOfRenderedDaysInVersion);
                //alert(nrOfDaysInSelectedDateRange);

                var newWrapper = new VersionInfoWrapper(versionCLO, width, xCounter, nrOfRenderedDaysInVersion);
                xCounter += 150;
                versionInfoWrappers.push(newWrapper);
            }






            //if (versionCLO.EndDate !== null) {
            //    //debugger;
            //    var versionDateRange = new momentRange.DateRange(moment(versionCLO.StartDate).startOf('day'), moment(versionCLO.EndDate).endOf('day'));
            //    var selectedDateRange = new momentRange.DateRange(this.viewModel.SelectedDateRange.RangeStart.clone().startOf('day'),
            //        this.viewModel.SelectedDateRange.RangeEnd.clone().endOf('day'));
            //    var intersection = versionDateRange.intersect(selectedDateRange);


            //    //if (intersection !== null) {
            //    var versionDateRangeString = versionDateRange.start.format('DD/MM/YYYY') + "-" + versionDateRange.end.format('DD/MM/YYYY');
            //    var intersectionString = (intersection === null) ? 'NA' : (intersection.start.format('DD/MM/YYYY') + "-" + intersection.end.format('DD/MM/YYYY'));
            //    alert(versionDateRangeString + " intersected with selDateRange = " + intersectionString);
            //    //} 
            //}

            //// Only consider Versions which are within the SelectedDateRange
            //if (this.versionIsWithinRange(versionCLO, this.viewModel.SelectedDateRange)) {



            //    // Compute Width
            //    var width;
            //    if (i === versionCLOs.length - 1) { // last version
            //        width = this.viewBoxMaxWidth - currentWidthUsedOfMax;
            //    } else {
            //        width = this.getVersionWidth(versionCLO, i, nrOfDaysInSelectedDateRange, this.viewBoxMaxWidth); // OBS what about if last version doesn't end ?
            //        currentWidthUsedOfMax += width;
            //    }

            //    // Compute XPos


            //    var versionInfoWrapper = new VersionInfoWrapper(versionCLO, width, xPosCounter);
            //    versionInfoWrappers.push(versionInfoWrapper);
            //    xPosCounter += 150;
            //}
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
    public VersionCLO: CLOs.VersionCLO;
    public Width: number;
    public XPos: number;
    public NrOfDaysRendered: number;

    public HasEndDate: boolean;
    public StartDateIsInView: boolean;
    public EndDateIsInView: boolean;

    constructor(versionCLO: CLOs.VersionCLO, width: number, xPos: number, nrOfDaysRendered: number) {
        this.VersionCLO = versionCLO;
        this.Width = width;
        this.XPos = xPos;
        this.NrOfDaysRendered = nrOfDaysRendered;
        this.HasEndDate = (this.VersionCLO.EndDate !== null);
    }
}