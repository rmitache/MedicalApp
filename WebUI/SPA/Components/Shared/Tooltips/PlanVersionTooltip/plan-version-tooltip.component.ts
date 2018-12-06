// Angular and 3rd party stuff
import { Component, Input, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import * as moment from 'moment';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { VersionCLOService } from '../../../../DomainModel/Plans/CLOServices/version-clo.service';
import { ConvertDictionaryToArray } from '../../../../Core/Helpers/Functions/functions';



@Component({
    selector: 'plan-version-tooltip',
    templateUrl: './plan-version-tooltip.component.html',
    styleUrls: ['./plan-version-tooltip.component.css'],
    host: { 'class': 'plan-version-tooltip' }
})
export class PlanVersionTooltipComponent {
    // Fields
    @ViewChild('tooltipDiv')
    private tooltipDiv: ElementRef;
    private orientationModesEnum = TooltipOrientationMode;
    private planStatusesEnum = Enums.PlanStatus;
    private readonly viewModel: ViewModel = {
        CurrentPlanStatus: null,
        CurrentPlanStatusDescription: null,
        VersionCLOToShow: null,
        NrUniqueMedicineTypes: null,

        Visible: false,
        TooltipPos: null,
        TooltipOrientationMode: null,
        CaretPos: null
    };


    // Private methods
    private calculateTooltipPosition(hoverPointLeft: number, hoverPointTop: number) {

        // Variables
        let orientationMode: TooltipOrientationMode = TooltipOrientationMode.Above;
        let tooltipPos = new PosCoordinates();
        let caretPos = new PosCoordinates();
        var tooltipWidth = (this.tooltipDiv.nativeElement as HTMLElement).clientWidth;
        var tooltipHeight = (this.tooltipDiv.nativeElement as HTMLElement).clientHeight;

        // Calculate tooltip and caret position
        var verticalSpacing = 45;
        tooltipPos.Left = hoverPointLeft - tooltipWidth / 2 + 12;
        tooltipPos.Top = hoverPointTop + verticalSpacing;
        caretPos.Left = tooltipWidth / 2 - 24;
        caretPos.Top = -15;

        // Handle case when position overflows screen on the bottom side
        if ((tooltipPos.Top + tooltipHeight + verticalSpacing) > window.innerHeight) {
            let extraMargin = 20;
            tooltipPos.Top -= tooltipHeight + verticalSpacing + extraMargin;
            caretPos.Top = tooltipHeight;

            orientationMode = TooltipOrientationMode.Below;
        }



        // 
        let returnObj = {
            TooltipCoordinates: tooltipPos,
            CaretCoordinates: caretPos,
            OrientationMode: orientationMode

        }
        return returnObj;

    }
    private getStatusDescriptionAndTargetVersionToShow(planCLO: CLOs.PlanCLO) {

        // Variables
        let status = planCLO.Status;
        var statusDescription: string;
        var targetVersionToShow: CLOs.VersionCLO;

        switch (status) {
            case Enums.PlanStatus.Active:
                statusDescription = 'You are currently taking:'
                if (planCLO.GetLatestVersion().Status === Enums.VersionStatus.Active) {
                    targetVersionToShow = planCLO.GetLatestVersion();
                } else {
                    targetVersionToShow = planCLO.GetSecondLatestVersion();
                }

                break;


            case Enums.PlanStatus.Inactive:
                statusDescription = 'You last took:'
                if (planCLO.GetLatestVersion().Status === Enums.VersionStatus.Inactive) {
                    targetVersionToShow = planCLO.GetLatestVersion();
                } else {
                    targetVersionToShow = planCLO.GetSecondLatestVersion();
                }

                break;
            case Enums.PlanStatus.Upcoming:
                statusDescription = 'You will start taking:'
                targetVersionToShow = planCLO.GetLatestVersion();

                break;

        }

        return {
            StatusDescription: statusDescription,
            TargetVersionToShow: targetVersionToShow
        };
    }

    // Constructor
    public constructor(
        private readonly versionCLOService: VersionCLOService
    ) {

    }

    // Public 
    public Show(hoverEventInfo: PlanElemHoverEventInfo) {

        // Load data 
        var uniqueMedTypes = this.versionCLOService.GetUniqueMedicineTypesWithAvgDosePerMonth(hoverEventInfo.PlanCLO.GetLatestVersion());
        this.viewModel.CurrentPlanStatus = hoverEventInfo.PlanCLO.Status;
        let info = this.getStatusDescriptionAndTargetVersionToShow(hoverEventInfo.PlanCLO);
        this.viewModel.CurrentPlanStatusDescription = info.StatusDescription;
        this.viewModel.VersionCLOToShow = info.TargetVersionToShow;
        this.viewModel.NrUniqueMedicineTypes = ConvertDictionaryToArray(uniqueMedTypes).length;

        // Set position and show tooltip
        setTimeout(() => {
            var positionInfo = this.calculateTooltipPosition(hoverEventInfo.Left, hoverEventInfo.Top);
            this.viewModel.TooltipPos = positionInfo.TooltipCoordinates;
            this.viewModel.CaretPos = positionInfo.CaretCoordinates;
            this.viewModel.TooltipOrientationMode = positionInfo.OrientationMode;
            this.viewModel.Visible = true;

        }, 0);
    }
    public HideAndClear() {
        setTimeout(() => {
            this.viewModel.CurrentPlanStatus = null;
            this.viewModel.CurrentPlanStatusDescription = null;
            this.viewModel.VersionCLOToShow = null;
            this.viewModel.NrUniqueMedicineTypes = null;

            this.viewModel.TooltipPos = null;
            this.viewModel.CaretPos = null;
            this.viewModel.TooltipOrientationMode = null;
            this.viewModel.Visible = false;

        }, 0);
    }
}


interface ViewModel {
    CurrentPlanStatus: Enums.PlanStatus;
    CurrentPlanStatusDescription: string;
    VersionCLOToShow: CLOs.VersionCLO;
    NrUniqueMedicineTypes: number;

    Visible: boolean;
    TooltipPos: PosCoordinates;
    TooltipOrientationMode: TooltipOrientationMode;
    CaretPos: PosCoordinates;
}
class PosCoordinates {
    constructor(public Left: number = 0, public Top: number = 0) {
    }
}
export class PlanElemHoverEventInfo {
    constructor(
        public readonly Left: number,
        public readonly Top: number,
        public readonly PlanCLO: CLOs.PlanCLO) {
    }
}
enum TooltipOrientationMode {
    Above = 0,
    Below = 1
}