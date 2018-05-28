// Angular and 3rd party stuff
import { Component, Input, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import * as moment from 'moment';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { VersionElemHoverEventInfo } from 'SPA/Components/Pages/AnalysisPage/FactorsView/PlanElem/VersionElem/version-elem.component';
import { GetNrOfDaysBetweenDatesUsingMoment, GetNrOfDaysBetweenDates } from 'SPA/Core/Helpers/Functions/functions';



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
    private readonly viewModel: ViewModel = {
        VersionCLO: null,
        PlanName: null,
        DurationInVersion: null,

        Visible: false,
        TopPos: 0,
        LeftPos: 0
    };



    // Constructor 
    constructor(
    ) {


    }
    ngOnInit() {
    }

    // Public 
    public SetDataAndPosition(versionHoverEventInfo: VersionElemHoverEventInfo) {

        // Set other fields
        this.viewModel.Visible = true;
        this.viewModel.VersionCLO = versionHoverEventInfo.InfoWrapper.VersionCLO;
        this.viewModel.PlanName = versionHoverEventInfo.InfoWrapper.PlanName;
        if (versionHoverEventInfo.InfoWrapper.VersionCLO.EndDate !== null) {
            this.viewModel.DurationInVersion = GetNrOfDaysBetweenDates(versionHoverEventInfo.InfoWrapper.VersionCLO.StartDate,
                versionHoverEventInfo.InfoWrapper.VersionCLO.EndDate, true);
        } else {
            this.viewModel.DurationInVersion = GetNrOfDaysBetweenDates(versionHoverEventInfo.InfoWrapper.VersionCLO.StartDate,
                versionHoverEventInfo.InfoWrapper.IntersectionDateRange.end.toDate(), true);
        }

        // Calculate position
        var currentWidth = (this.tooltipDiv.nativeElement as HTMLElement).clientWidth;
        var currentHeight = (this.tooltipDiv.nativeElement as HTMLElement).clientHeight;
        this.viewModel.LeftPos = versionHoverEventInfo.Left - currentWidth / 2;
        var verticalMargin = 55;
        this.viewModel.TopPos =  versionHoverEventInfo.Top + verticalMargin;
    }
    public HideAndClear() {
        this.viewModel.Visible = false;
        this.viewModel.VersionCLO = null;
        this.viewModel.DurationInVersion = null;

        this.viewModel.TopPos = 0;
        this.viewModel.LeftPos = 0;
    }
}


interface ViewModel {
    VersionCLO: CLOs.VersionCLO;
    PlanName: string;
    DurationInVersion: number;

    Visible: boolean;
    TopPos: number;
    LeftPos: number;
}

