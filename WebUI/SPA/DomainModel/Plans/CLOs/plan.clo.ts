﻿import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import * as moment from 'moment';
import * as momentRange from 'moment-range';
import { Time, Range, TimeRange } from 'SPA/Core/Helpers/DataStructures/misc';
import { ObservableList } from 'SPA/Core/Helpers/DataStructures/observable-list';
import { GetNrOfDaysBetweenDatesUsingMoment } from '../../../Core/Helpers/Functions/functions';


export class PlanCLO extends BaseCLO {
    // Fields
    public ID: number;
    public Name: string;
    public DateCreated: Date;
    public Versions: ObservableList<CLOs.VersionCLO> = new ObservableList<CLOs.VersionCLO>();

    // Properties
    public get Status(): Enums.PlanStatus {

        let advancedStatus = this.AdvancedStatus;
        switch (advancedStatus) {

            // Active
            case Enums.AdvancedPlanStatus.ActiveWITHOUTAnyUpcomingChanges:
            case Enums.AdvancedPlanStatus.ActiveWITHChangesTakingEffectToday:
            case Enums.AdvancedPlanStatus.ActiveStartedToday:
            case Enums.AdvancedPlanStatus.ActiveWITHUpcomingChanges:
            case Enums.AdvancedPlanStatus.ActiveWITHUpcomingStop:
            case Enums.AdvancedPlanStatus.ActiveRestartedToday:
                return Enums.PlanStatus.Active;

            // Upcoming
            case Enums.AdvancedPlanStatus.UpcomingAsNew:
            case Enums.AdvancedPlanStatus.UpcomingAsRestarted:
                return Enums.PlanStatus.Upcoming;

            // Stopped
            case Enums.AdvancedPlanStatus.Stopped:
                return Enums.PlanStatus.Inactive;
        }
    }
    public get AdvancedStatus(): Enums.AdvancedPlanStatus {

        // Variables
        let latestVersion = this.GetLatestVersion();
        let secondLatestVersion = this.GetSecondLatestVersion();


        // Determine the Status ----------------------------------------------------------------------------------------

        // ActiveRestartedToday status
        if (latestVersion.Status === Enums.VersionStatus.Active && latestVersion.EndDateTime === null
            && moment(latestVersion.StartDateTime).isSame(moment(), 'date')
            && secondLatestVersion !== null && secondLatestVersion.Status === Enums.VersionStatus.Inactive
            && GetNrOfDaysBetweenDatesUsingMoment(moment(secondLatestVersion.EndDateTime), moment(latestVersion.StartDateTime), false) !== 1 ) {
            return Enums.AdvancedPlanStatus.ActiveRestartedToday;
        }

        // ActiveWITHChangesTakingEffectToday status
        if (latestVersion.Status === Enums.VersionStatus.Active && latestVersion.EndDateTime === null
            && moment(latestVersion.StartDateTime).isSame(moment(), 'date') && secondLatestVersion !== null) {
            return Enums.AdvancedPlanStatus.ActiveWITHChangesTakingEffectToday;
        }

        

        // ActiveStartedToday status
        if (latestVersion.Status === Enums.VersionStatus.Active && latestVersion.EndDateTime === null
            && moment(latestVersion.StartDateTime).isSame(moment(), 'date') && secondLatestVersion === null) {
            return Enums.AdvancedPlanStatus.ActiveStartedToday;
        }

        // ActiveWITHOUTAnyUpcomingChanges status
        if (latestVersion.Status === Enums.VersionStatus.Active && latestVersion.EndDateTime === null) {
            return Enums.AdvancedPlanStatus.ActiveWITHOUTAnyUpcomingChanges;
        }

        // ActiveWITHUpcomingChanges status
        if (secondLatestVersion !== null && secondLatestVersion.Status === Enums.VersionStatus.Active && latestVersion.Status === Enums.VersionStatus.Upcoming) {
            return Enums.AdvancedPlanStatus.ActiveWITHUpcomingChanges;
        }

        // ActiveWITHUpcomingStop status
        if (latestVersion.Status === Enums.VersionStatus.Active && latestVersion.EndDateTime !== null) {
            return Enums.AdvancedPlanStatus.ActiveWITHUpcomingStop;
        }


        
       

        // Stopped status
        if (latestVersion.Status === Enums.VersionStatus.Inactive) {
            return Enums.AdvancedPlanStatus.Stopped;
        }


        // UpcomingAsNew status
        if (latestVersion.Status === Enums.VersionStatus.Upcoming && secondLatestVersion === null) {
            return Enums.AdvancedPlanStatus.UpcomingAsNew;
        }

        // UpcomingAsRestarted status
        if (secondLatestVersion !== null && latestVersion.Status === Enums.VersionStatus.Upcoming && secondLatestVersion.Status === Enums.VersionStatus.Inactive) {
            return Enums.AdvancedPlanStatus.UpcomingAsRestarted;
        }

        //----------------------------------------------------------------------------------------------------------------


        throw new Error('No Status could be determined for Plan with name "' + this.Name + '"');
    }

    // Constructor
    constructor() {
        super();

        this.Versions.ItemAdded.subscribe((addedItem) => {
            this.onVersionAdded(addedItem);
        });
    }

    // Public methods
    public GetLatestVersion(): CLOs.VersionCLO {
        if (this.Versions && this.Versions.Length > 0)
            return this.Versions.GetAt(this.Versions.Length - 1);
        else
            return null;
    }
    public GetSecondLatestVersion(): CLOs.VersionCLO {
        if (this.Versions && this.Versions.Length > 1)
            return this.Versions.GetAt(this.Versions.Length - 2);
        else
            return null;
    }
    public GetFirstVersion(): CLOs.VersionCLO {
        if (this.Versions && this.Versions.Length > 0)
            return this.Versions.GetAt(0);
        else
            return null;
    }
    public GetIntersectionsPerVersionWithDateRange(targetDateRange: Range<moment.Moment>): momentRange.DateRange[] {

        var intersectionsArray: momentRange.DateRange[] = [];
        var allIntersectionsAreNull = true;

        this.Versions.ToArray().forEach((versionCLO) => {
            var intersectionResult = versionCLO.GetIntersectionWithDateRange(targetDateRange);
            intersectionsArray.push(intersectionResult);
            if (intersectionResult !== null) {
                allIntersectionsAreNull = false;
            }
        });

        // Returns an array 
        if (allIntersectionsAreNull) {
            return null;
        } else {
            return intersectionsArray;
        }
    }
    public GetVersionsWhichIntersectWithDateRange(targetDateRange: Range<moment.Moment>): CLOs.VersionCLO[] {

        var versionsWhichIntersect: CLOs.VersionCLO[] = [];

        // 
        this.Versions.ToArray().forEach((versionCLO) => {
            var intersectionResult = versionCLO.GetIntersectionWithDateRange(targetDateRange);

            if (intersectionResult !== null) {
                versionsWhichIntersect.push(versionCLO);
            }
        });

        // Returns an array 
        if (versionsWhichIntersect.length === 0) {
            return null;
        } else {
            return versionsWhichIntersect;
        }
    }
    public GetVersionBeforeTarget(versionCLO): CLOs.VersionCLO {
        if (!this.Versions) {
            throw new Error("Versions is null or undefined");
        }

        let indexOfTarget = this.Versions.FindIndex(versionCLO);
        if (indexOfTarget === -1) {
            throw new Error("VersionCLO couldn't be found");
        }

        if (indexOfTarget > 0) {
            return this.Versions.GetAt(indexOfTarget - 1);
        } else {
            return null;
        }
    }
    public GetVersionAfterTarget(versionCLO: CLOs.VersionCLO): CLOs.VersionCLO {
        if (!this.Versions) {
            throw new Error("Versions is null or undefined");
        }

        let indexOfTarget = this.Versions.FindIndex(versionCLO);
        if (indexOfTarget === -1) {
            throw new Error("VersionCLO couldn't be found");
        }

        if (indexOfTarget > 0 && this.Versions.Length > indexOfTarget + 1) {
            return this.Versions.GetAt(indexOfTarget + 1);
        } else {
            return null;
        }
    }

    // Event handlers 
    private onVersionAdded(addedItem: CLOs.VersionCLO) {
        addedItem.ParentPlan = this;
    }
}