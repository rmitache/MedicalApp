// Angular and 3rd party stuff
import { Component, Input, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import * as moment from 'moment';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { HealthStatusEntryCLOService, SymptomTypeAndAvgIntensity } from 'SPA/DomainModel/Indicators/Symptoms/CLOServices/health-status-entry-clo.service';



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
    private readonly viewModel: ViewModel = {
        PlanCLO: null,
        Visible: false,
        TooltipPos: null,
        TooltipOrientationMode: TooltipOrientationMode.Above,
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

    // Public 
    public Show(hoverEventInfo: PlanElemHoverEventInfo) {

        // Calculate position
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
            this.viewModel.Visible = false;

            this.viewModel.TooltipPos = null;
            this.viewModel.CaretPos = null;
        }, 0);
    }
}


interface ViewModel {
    PlanCLO: CLOs.PlanCLO;
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