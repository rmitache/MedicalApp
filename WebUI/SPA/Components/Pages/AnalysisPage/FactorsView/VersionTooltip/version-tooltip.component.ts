// Angular and 3rd party stuff
import { Component, Input, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import * as moment from 'moment';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { VersionElemHoverEventInfo } from 'SPA/Components/Pages/AnalysisPage/FactorsView/PlanElem/VersionElem/version-elem.component';
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
        TopPos: 0,
        LeftPos: 0
    };

    // Private methods
    private calculateTooltipPosition(hoverPointLeft: number, hoverPointTop: number): PosCoordinates {

        // Variables
        let leftPos = 0;
        let topPos = 0;
        var verticalSpacing = 55;
        var currentWidth = (this.tooltipDiv.nativeElement as HTMLElement).clientWidth;
        var currentHeight = (this.tooltipDiv.nativeElement as HTMLElement).clientHeight;

        // Calculate position
        leftPos = hoverPointLeft - currentWidth / 2;
        topPos = hoverPointTop + verticalSpacing + 15;


        // 
        let pos = {
            Left: leftPos,
            Top: topPos
        };
        return pos;
    }

    // Constructor
    constructor(private versionCLOService: VersionCLOService) {

    }

    // Public 
    public Show(versionHoverEventInfo: VersionElemHoverEventInfo) {

        // Set other fields
        this.viewModel.VersionCLO = versionHoverEventInfo.VersionCLO;
        this.viewModel.Changes = this.versionCLOService.GetVersionChanges(this.viewModel.VersionCLO, this.viewModel.VersionCLO.GetPreviousVersion());

        // Calculate position
        setTimeout(() => {
            var newPos = this.calculateTooltipPosition(versionHoverEventInfo.Left, versionHoverEventInfo.Top);

            this.viewModel.LeftPos = newPos.Left;
            this.viewModel.TopPos = newPos.Top;

            this.viewModel.Visible = true;
        }, 10);

    }
    public HideAndClear() {
        this.viewModel.Visible = false;

        this.viewModel.TopPos = 0;
        this.viewModel.LeftPos = 0;
    }
}


interface ViewModel {
    VersionCLO: CLOs.VersionCLO;
    Changes: MedicineTypeChangeSet[];
    GetChangeTypeIcon(changeType: ChangeType);

    Visible: boolean;
    TopPos: number;
    LeftPos: number;
}
interface PosCoordinates {
    Left: number;
    Top: number;

}

