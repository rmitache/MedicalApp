// Angular and 3rd party stuff
import { Component, Input, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import * as moment from 'moment';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { VersionElemHoverEventInfo, HoverInfoPointType } from 'SPA/Components/Pages/AnalysisPage/FactorsView/PlanElem/VersionElem/version-elem.component';
import { GetNrOfDaysBetweenDatesUsingMoment, GetNrOfDaysBetweenDates } from 'SPA/Core/Helpers/Functions/functions';
import { VersionCLOService, MedicineTypeChangeSet, ChangeType } from 'SPA/DomainModel/Plans/CLOServices/version-clo.service';



@Component({
    selector: 'version-tooltip',
    templateUrl: './version-tooltip.component.html',
    styleUrls: ['./version-tooltip.component.css'],
    host: { 'class': 'version-tooltip' }
})
export class VersionTooltipComponent {
    // Fields
    @ViewChild('tooltipDiv')
    private tooltipDiv: ElementRef;
    private changeTypeEnum: ChangeType;
    private readonly viewModel: ViewModel = {
        VersionCLO: null,
        Changes: null,
        GetChangeTypeIcon: (changeType: number) => {

            let iconName: string;
            if (changeType == ChangeType.Increased) {
                iconName = 'increase';
            } else if (changeType == ChangeType.Decreased) {
                iconName = 'decrease';
            } else if (changeType == ChangeType.Stopped) {
                iconName = 'stop';
            } else if (changeType == ChangeType.New) {
                iconName = 'new';
            }

            return '/Images/' + iconName + '.png'
        },

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
        tooltipPos.Top = hoverPointTop + verticalSpacing + 15;
        caretPos.Left = currentWidth / 2 - 16;
        caretPos.Top = -18;

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
        let version = this.viewModel.VersionCLO;
        let prevVersion = version.GetPreviousVersion();
        let nextVersion = version.GetNextVersion();
        let adjacentToPrevVersion = (prevVersion) ? this.versionCLOService.AreAdjacent(prevVersion, version) : false;
        let adjacentToNextVersion = (nextVersion) ? this.versionCLOService.AreAdjacent(nextVersion, version) : false;


        // StartPoint, on version without any previous adjacent version -> show list of all medTypes as NEW  
        if (versionHoverEventInfo.PointType === HoverInfoPointType.StartPoint &&
            (prevVersion === null || !this.versionCLOService.AreAdjacent(prevVersion, version))) {
            this.viewModel.Changes = this.versionCLOService.GetChangesBetween(this.viewModel.VersionCLO, null);
        }
        // EndPoint, on version without any next adjacent version -> show list of all medTypes as STOPPED  
        else if (versionHoverEventInfo.PointType === HoverInfoPointType.EndPoint &&
            (nextVersion === null || !this.versionCLOService.AreAdjacent(nextVersion, version))) {
            this.viewModel.Changes = this.versionCLOService.GetChangesBetween(null, this.viewModel.VersionCLO);
        }
        // Any normal Points
        else {
            this.viewModel.Changes = this.versionCLOService.GetChangesBetween(version, prevVersion);
        }


        // Calculate position
        setTimeout(() => {
            var tooltipAndCaretPos = this.calculateTooltipPosition(versionHoverEventInfo.Left, versionHoverEventInfo.Top);

            this.viewModel.TooltipPos = tooltipAndCaretPos[0];
            this.viewModel.CaretPos = tooltipAndCaretPos[1];
            this.viewModel.Visible = true;
        }, 10);

    }
    public HideAndClear() {
        this.viewModel.Visible = false;
        this.viewModel.TooltipPos = null;
        this.viewModel.CaretPos = null;
        this.viewModel.Changes = null;
    }
}


interface ViewModel {
    VersionCLO: CLOs.VersionCLO;
    Changes: MedicineTypeChangeSet[];
    GetChangeTypeIcon(changeType: ChangeType);

    Visible: boolean;
    TooltipPos: PosCoordinates;
    CaretPos: PosCoordinates;
}
class PosCoordinates {
    constructor(public Left: number = 0, public Top: number = 0) {
    }
}

