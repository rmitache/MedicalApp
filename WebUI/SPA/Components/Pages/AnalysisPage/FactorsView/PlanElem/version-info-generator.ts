// Angular and 3rd party stuff
import * as moment from 'moment';
import * as momentRange from 'moment-range';
import { Injectable } from '@angular/core';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { Time, Range, TimeRange } from 'SPA/Core/Helpers/DataStructures/misc';
import * as HelperFunctions from 'SPA/Core/Helpers/Functions/functions';
import { VersionCLOService } from 'SPA/DomainModel/Plans/CLOServices/version-clo.service';

@Injectable()
export class VersionInfoGenerator {

    // Constructor
    constructor(
        private versionCLOService: VersionCLOService
    ) {
    }

    // Public methods
    public CreateVersionInfoWrappers(planCLO: CLOs.PlanCLO, selectedDateRange:Range<moment.Moment>): VersionElemInfoWrapper[] {

        // Variables
        var versionCLOs = planCLO.Versions.ToArray();
        var versionInfoWrappers: VersionElemInfoWrapper[] = [];
        var nrOfDaysInSelectedDateRange = HelperFunctions.GetNrOfDaysBetweenDatesUsingMoment(selectedDateRange.RangeStart, selectedDateRange.RangeEnd);
        var widthPerEachDay = 100 / (nrOfDaysInSelectedDateRange - 1);

        // Create versionInfoWrappers for versions within the SelectedDateRange
        for (let i = 0; i < versionCLOs.length; i++) {
            let versionCLO = versionCLOs[i];
            let versionIntersection = versionCLO.GetIntersectionWithDateRange(selectedDateRange, true);
            if (versionIntersection !== null) {

                // IDEA: Width and X position should be based on HOURS during the day 
                //          -> idea: divide widthPerEachDay by 24

                // Calculate the Width for the Version
                let nrOfDaysInIntersection = HelperFunctions.GetNrOfDaysBetweenDatesUsingMoment(versionIntersection.start, versionIntersection.end);
                let width = (nrOfDaysInIntersection - 1) * widthPerEachDay; // minus one is because any date is shown as the nth tick, and the total range is actually is n - 1 ticks WIDE

                // Determine the X and Y positions
                let startDateIndex = HelperFunctions.GetDateIndexInTargetRange(moment(versionCLO.StartDateTime), selectedDateRange);
                let xPosition = (startDateIndex) * widthPerEachDay;
                let yPosition = 5;

                // Create the wrapper
                let newWrapper = new VersionElemInfoWrapper(versionCLO, width, xPosition, yPosition, versionIntersection);
                versionInfoWrappers.push(newWrapper);
            }
        }

        // Second iteration through versionInfoWrappers 
        if (versionInfoWrappers.length > 0) {

            // Show plan name above first visible versionElem
            let firstVersionInfoWrapper = versionInfoWrappers[0];
            firstVersionInfoWrapper.PlanName = planCLO.Name;

            // Handle special width adjustments for adjacent versions
            for (let j = 0; j < versionInfoWrappers.length - 1; j++) {

                // If the versionWrapper is adjacent to its next versionWrapper, slightly expand it's width
                if (j < versionInfoWrappers.length - 1) {
                    var currentVersion = versionInfoWrappers[j].VersionCLO;
                    var nextVersion = versionInfoWrappers[j + 1].VersionCLO;

                    if (this.versionCLOService.AreAdjacent(currentVersion, nextVersion)) {
                        versionInfoWrappers[j].Width += 1 * widthPerEachDay;
                    }

                }
            }

        }

        return versionInfoWrappers;
    }
}


// Representation
export class VersionElemInfoWrapper {
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

