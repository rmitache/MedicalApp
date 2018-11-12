// Angular and 3rd party stuff
import { Component, Input, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import * as moment from 'moment';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { VersionElemHoverEventInfo, HoverInfoPointType } from 'SPA/Components/Pages/AnalysisPage/FactorsView/PlanElem/VersionElem/version-elem.component';
import { GetNrOfDaysBetweenDatesUsingMoment, GetNrOfDaysBetweenDates } from 'SPA/Core/Helpers/Functions/functions';
import { VersionCLOService, MedicineTypeAndChangeTypePair, ChangeType } from 'SPA/DomainModel/Plans/CLOServices/version-clo.service';



@Component({
    selector: 'plan-version-changes-tooltip',
    templateUrl: './plan-version-changes-tooltip.component.html',
    styleUrls: ['./plan-version-changes-tooltip.component.css'],
    host: { 'class': 'plan-version-changes-tooltip' }
})
export class PlanVersionChangesTooltipComponent {
    // Fields
    @ViewChild('tooltipDiv')
    private tooltipDiv: ElementRef;
    private changeTypeEnum: ChangeType;
    private readonly viewModel: ViewModel = {
        VersionCLO: null,
        AllChanges: null,
        Changes_Started: null, 
        Changes_Stopped: null,
        Changes_Increased: null,
        Changes_Decreased: null,


        Visible: false,
        TooltipPos: null,
        CaretPos: null
    };

    // Private methods
    private calculateTooltipPosition(hoverPointLeft: number, hoverPointTop: number): PosCoordinates[] {

        // Variables
        let tooltipPos = new PosCoordinates();
        let caretPos = new PosCoordinates();
        var currentWidth = (this.tooltipDiv.nativeElement as HTMLElement).clientWidth;
        var currentHeight = (this.tooltipDiv.nativeElement as HTMLElement).clientHeight;

        // Calculate tooltip and caret position
        var verticalSpacing = 55;
        tooltipPos.Left = hoverPointLeft - currentWidth / 2 - 1;
        tooltipPos.Top = hoverPointTop + verticalSpacing + 6;
        caretPos.Left = currentWidth / 2 - 23;
        caretPos.Top = -22;

        // Handle case when position overflows screen on the left side
        if (tooltipPos.Left < 0) {

            let extraMargin = 10;
            tooltipPos.Left -= (tooltipPos.Left - extraMargin);
            caretPos.Left = hoverPointLeft - 27;
        }

        // 
        let returnArray: PosCoordinates[] = [tooltipPos, caretPos];
        return returnArray;
    }

    // Constructor
    constructor(private versionCLOService: VersionCLOService) {

    }

    // Public 
    public Show(versionHoverEventInfo: VersionElemHoverEventInfo) {

        // Variables
        this.viewModel.VersionCLO = versionHoverEventInfo.VersionCLO;
        let currentVersion = this.viewModel.VersionCLO;
        let prevVersion = currentVersion.GetPreviousVersion();
        let nextVersion = currentVersion.GetNextVersion();
        let adjacentToPrevVersion = (prevVersion) ? this.versionCLOService.AreAdjacent(prevVersion, currentVersion) : false;
        let adjacentToNextVersion = (nextVersion) ? this.versionCLOService.AreAdjacent(nextVersion, currentVersion) : false;

        // Get all changes----------------------------------------------------------------------------------------------------------
        // StartPoint, on version without any previous adjacent version -> show list of all medTypes as NEW  
        if (versionHoverEventInfo.PointType === HoverInfoPointType.StartPoint &&
            (prevVersion === null || !this.versionCLOService.AreAdjacent(prevVersion, currentVersion))) {
            this.viewModel.AllChanges = this.versionCLOService.GetChangesBetween(this.viewModel.VersionCLO, null);
        }
        // EndPoint, on version without any next adjacent version -> show list of all medTypes as STOPPED  
        else if (versionHoverEventInfo.PointType === HoverInfoPointType.EndPoint &&
            (nextVersion === null || !this.versionCLOService.AreAdjacent(nextVersion, currentVersion))) {
            this.viewModel.AllChanges = this.versionCLOService.GetChangesBetween(null, this.viewModel.VersionCLO);
        }
        // Any normal Points
        else {
            this.viewModel.AllChanges = this.versionCLOService.GetChangesBetween(currentVersion, prevVersion);
        }
        //--------------------------------------------------------------------------------------------------------------------------


        // 
        this.viewModel.Changes_Started = this.viewModel.AllChanges.filter(change => {
            return change.ChangeType === ChangeType.Started;
        });
        this.viewModel.Changes_Stopped = this.viewModel.AllChanges.filter(change => {
            return change.ChangeType === ChangeType.Stopped;
        });
        this.viewModel.Changes_Increased = this.viewModel.AllChanges.filter(change => {
            return change.ChangeType === ChangeType.Increased;
        });
        this.viewModel.Changes_Decreased = this.viewModel.AllChanges.filter(change => {
            return change.ChangeType === ChangeType.Decreased;
        });


        // Calculate position
        setTimeout(() => {
            var tooltipAndCaretPos = this.calculateTooltipPosition(versionHoverEventInfo.Left, versionHoverEventInfo.Top);

            this.viewModel.TooltipPos = tooltipAndCaretPos[0];
            this.viewModel.CaretPos = tooltipAndCaretPos[1];
            this.viewModel.Visible = true;
        }, 10);


        setTimeout(() => {
            if (this.viewModel.AllChanges === null) {
                this.HideAndClear();
            }
        }, 100);

    }
    public HideAndClear() {
        this.viewModel.Visible = false;
        this.viewModel.TooltipPos = null;
        this.viewModel.CaretPos = null;
        this.viewModel.AllChanges = null;
        this.viewModel.Changes_Started = null;
        this.viewModel.Changes_Stopped = null;
        this.viewModel.Changes_Increased = null;
        this.viewModel.Changes_Decreased = null;
    }
}


interface ViewModel {
    VersionCLO: CLOs.VersionCLO;

    AllChanges: MedicineTypeAndChangeTypePair[];
    Changes_Started: MedicineTypeAndChangeTypePair[];
    Changes_Stopped: MedicineTypeAndChangeTypePair[];
    Changes_Increased: MedicineTypeAndChangeTypePair[];
    Changes_Decreased: MedicineTypeAndChangeTypePair[];

    Visible: boolean;
    TooltipPos: PosCoordinates;
    CaretPos: PosCoordinates;
}
class PosCoordinates {
    constructor(public Left: number = 0, public Top: number = 0) {
    }
}

