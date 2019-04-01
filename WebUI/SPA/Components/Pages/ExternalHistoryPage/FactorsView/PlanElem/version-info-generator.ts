// Angular and 3rd party stuff
import * as moment from 'moment';
import * as momentRange from 'moment-range';
import { Injectable } from '@angular/core';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { Time, Range, TimeRange } from 'SPA/Core/Helpers/DataStructures/misc';
import * as HelperFunctions from 'SPA/Core/Helpers/Functions/functions';
import { VersionCLOService, ChangeType } from 'SPA/DomainModel/Plans/CLOServices/version-clo.service';
import { VersionCLO } from 'SPA/DomainModel/clo-exports';

@Injectable()
export class VersionInfoGenerator {

    // Private methods
    private calculateDimensionsAndPosition(versionCLO: CLOs.VersionCLO, prevVersionCLO: CLOs.VersionCLO, nextVersionCLO: CLOs.VersionCLO,
        versionIntersection, widthPerEachDay, selectedDateRange) {

        // Calculate the base width
        let nrOfDaysInIntersection = HelperFunctions.GetNrOfDaysBetweenDatesUsingMoment(versionIntersection.start, versionIntersection.end);
        let width = (nrOfDaysInIntersection - 1) * widthPerEachDay; // minus one is because any date is shown as the nth tick, and the total range is actually is n - 1 ticks WIDE

        // Calculate special extra width adjustment
        let versionStartsOnSameLocalDateAsPrevious = (prevVersionCLO !== null) ?
            moment(versionCLO.StartDateTime).isSame(moment(prevVersionCLO.EndDateTime), 'day') : false;
        var nextVersionIsAdjacent = (nextVersionCLO !== null && this.versionCLOService.AreAdjacent(versionCLO, nextVersionCLO));
        if (!versionStartsOnSameLocalDateAsPrevious && nextVersionIsAdjacent) {
            width += 1 * widthPerEachDay; // fill in gap to next version if they are adjacent and on separate days
        }


        // Calculate the position
        let startDateIndex = HelperFunctions.GetDateIndexInTargetRange(moment(versionCLO.StartDateTime), selectedDateRange);
        let xPosition = (startDateIndex) * widthPerEachDay;
        let yPosition = 5;

        return {
            Width: width,
            XPos: xPosition,
            YPos: yPosition
        };
    }
    private createStartMarker(versionCLO: CLOs.VersionCLO, versionIntersection) {
        // Explanation: If a version doesnt end at one of the ends of its intersection, it means it goes longer than the selection range
        //              In which case it doesnt make sense to render any marker.
        var versionStartsOnIntersectionLeftEdge = moment(versionCLO.StartDateTime).isSame(versionIntersection.start, 'day');


        // Verify
        if (!versionStartsOnIntersectionLeftEdge) {
            return null;
        } else {

            let marker = new MarkerInfoObj();
            return marker;
        }
    }
    private createEndMarker(versionCLO: CLOs.VersionCLO, nextVersionCLO: CLOs.VersionCLO, versionIntersection) {
        // Explanation: If a version doesnt end at one of the ends of its intersection, it means it goes longer than the selection range
        //              In which case it doesnt make sense to render any marker.
        var versionEndsOnIntersectionRightEdge = moment(versionCLO.EndDateTime).isSame(versionIntersection.end, 'day');
        var nextVersionIsAdjacent = (nextVersionCLO !== null && this.versionCLOService.AreAdjacent(versionCLO, nextVersionCLO));

        // Verify
        if (!versionEndsOnIntersectionRightEdge || nextVersionIsAdjacent) {
            return null;
        } else {



            let marker = new MarkerInfoObj();
            return marker;
        }
    }

    // Constructor
    constructor(
        private versionCLOService: VersionCLOService
    ) {
    }

    // Public methods
    public CreateVersionInfoWrappers(planCLO: CLOs.PlanCLO, selectedDateRange: Range<moment.Moment>): VersionUIRepresentationObj[] {

        // Variables
        var versionCLOs = planCLO.Versions.ToArray();
        var versionInfoWrappers: VersionUIRepresentationObj[] = [];
        var nrOfDaysInSelectedDateRange = HelperFunctions.GetNrOfDaysBetweenDatesUsingMoment(selectedDateRange.RangeStart, selectedDateRange.RangeEnd);
        var widthPerEachDay = 100 / (nrOfDaysInSelectedDateRange - 1);
        var visibleVersionCounter = 0; // this is used to keep track which is the first visible Version

        // Create versionInfoWrappers for versions within the SelectedDateRange
        for (let i = 0; i < versionCLOs.length; i++) {
            let versionCLO = versionCLOs[i];
            let prevVersionCLO = (i > 0) ? versionCLOs[i - 1] : null;
            let nextVersionCLO = (versionCLOs.length > i + 1) ? versionCLOs[i + 1] : null;
            let versionIntersection = versionCLO.GetIntersectionWithDateRange(selectedDateRange, true);
            if (versionIntersection !== null) {

                // Calculate the dimensions and position
                var dimensionsAndPos = this.calculateDimensionsAndPosition(versionCLO, prevVersionCLO, nextVersionCLO,
                    versionIntersection, widthPerEachDay, selectedDateRange);

                // Create the wrapper
                let newWrapper: VersionUIRepresentationObj = {
                    VersionCLO: versionCLO,
                    IntersectionDateRange: versionIntersection,
                    WidthInPercentage: dimensionsAndPos.Width,
                    XPosInPercentage: dimensionsAndPos.XPos,
                    YPosInPx: dimensionsAndPos.YPos,
                    VisiblePlanName: (visibleVersionCounter === 0) ? planCLO.Name : null,
                    StartMarker: this.createStartMarker(versionCLO, versionIntersection),
                    EndMarker: this.createEndMarker(versionCLO, nextVersionCLO, versionIntersection),
                };
                versionInfoWrappers.push(newWrapper);
                visibleVersionCounter++;

            }
        }


        //// Second iteration through versionInfoWrappers 
        //if (versionInfoWrappers.length > 0) {

        //    // Show plan name above first visible versionElem
        //    let firstVersionInfoWrapper = versionInfoWrappers[0];
        //    firstVersionInfoWrapper.PlanName = planCLO.Name;

        //    // Handle special width adjustments for adjacent versions
        //    for (let j = 0; j < versionInfoWrappers.length - 1; j++) {

        //        // If the versionWrapper is adjacent to its next versionWrapper, slightly expand it's width
        //        if (j < versionInfoWrappers.length - 1) {
        //            var currentVersion = versionInfoWrappers[j].VersionCLO;
        //            var nextVersion = versionInfoWrappers[j + 1].VersionCLO;

        //            //if (this.versionCLOService.AreAdjacent(currentVersion, nextVersion)) {
        //            //    versionInfoWrappers[j].Width += 1 * widthPerEachDay;
        //            //}

        //        }
        //    }

        //}

        return versionInfoWrappers;
    }
}


// Representation
export class VersionRepresentationObjsOld {
    // Fields
    public VersionCLO: CLOs.VersionCLO;
    public IntersectionDateRange: momentRange.DateRange;

    public Width: number;
    public XPos: number;
    public YPos: number;
    public PlanName: string;


    // Properties
    public get VersionStartsOnIntersectionStart(): boolean {
        var versionStartSameAsIntersectionStart = moment(this.VersionCLO.StartDateTime).isSame(this.IntersectionDateRange.start, 'day');
        return versionStartSameAsIntersectionStart;
    }
    public get VersionEndsOnIntersectionEnd(): boolean {
        var versionEndSameAsIntersectionEnd = moment(this.VersionCLO.EndDateTime).isSame(this.IntersectionDateRange.end, 'day');
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

export class VersionUIRepresentationObj {
    // Fields
    public VersionCLO: CLOs.VersionCLO = null;
    public IntersectionDateRange: momentRange.DateRange;

    public WidthInPercentage: number;
    public XPosInPercentage: number;
    public YPosInPx: number;

    public VisiblePlanName: string;

    public StartMarker: MarkerInfoObj = null;
    public EndMarker: MarkerInfoObj = null;
}

export class MarkerInfoObj {
    // Fields
    public Type: MarkerTypes = MarkerTypes.Circle;
    public ChangesForTooltip: ChangeType[] = [];

}

enum MarkerTypes {
    Circle,
    ArrowHead
}