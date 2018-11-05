// Angular and 3rd party stuff
import { Component, Input, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import * as moment from 'moment';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { HealthStatusEntryCLOService, SymptomTypeWithAvgIntensity } from 'SPA/DomainModel/Indicators/Symptoms/CLOServices/health-status-entry-clo.service';



@Component({
    selector: 'single-health-status-tooltip',
    templateUrl: './single-health-status-tooltip.component.html',
    styleUrls: ['./single-health-status-tooltip.component.css'],
    host: { 'class': 'single-health-status-tooltip' }

})
export class SingleHealthStatusTooltipComponent {
    // Fields
    @ViewChild('tooltipDiv')
    private tooltipDiv: ElementRef;
    private readonly healthLevelDefinitions: HealthLevelDefinition[] = [
        {
            ContainsHealthLevelValue: (avgValue) => {
                return avgValue <= 3 && avgValue > 2;
            },
            Label: 'Great'
        },
        {
            ContainsHealthLevelValue: (avgValue) => {
                return avgValue <= 2 && avgValue > 1;
            },
            Label: 'Good'
        },
        {
            ContainsHealthLevelValue: (avgValue) => {
                return avgValue <= 1 && avgValue > 0;
            },
            Label: 'Ok'
        },
        {
            ContainsHealthLevelValue: (avgValue) => {
                return avgValue <= 0 && avgValue > -1;
            },
            Label: 'Not Great'
        },
        {
            ContainsHealthLevelValue: (avgValue) => {
                return avgValue <= -1 && avgValue > -2;
            },
            Label: 'Bad'
        },
        {
            ContainsHealthLevelValue: (avgValue) => {
                return avgValue <= -2 && avgValue >= -3;
            },
            Label: 'Very Bad'
        }];
    private readonly viewModel: ViewModel = {
        Title: '',
        HealthLevelDefinition: null,
        HealthLevelColor: null,
        SymptomTypes: null,

        HideSymptomsDiv: false,
        Visible: false,
        TooltipPos: null,
        CaretPos: null
    };

    // Private methods
    private calculateTooltipPosition(parentPosition: any, hoverPointLeft: number, hoverPointTop: number): PosCoordinates[] {

        // Variables
        let tooltipPos = new PosCoordinates();
        let caretPos = new PosCoordinates();
        var currentWidth = (this.tooltipDiv.nativeElement as HTMLElement).clientWidth;
        var currentHeight = (this.tooltipDiv.nativeElement as HTMLElement).clientHeight;


        // Set position
        var currentHeight = (this.tooltipDiv.nativeElement as HTMLElement).clientHeight;
        var currentWidth = (this.tooltipDiv.nativeElement as HTMLElement).clientWidth;
        tooltipPos.Top = parentPosition.top + hoverPointTop + 30;
        tooltipPos.Left = parentPosition.left + hoverPointLeft - currentWidth / 2 - 1;
        caretPos.Left = currentWidth / 2 - 21;
        caretPos.Top = -15;


        // Handle case when position overflows screen 
        if (tooltipPos.Left < 0) {
            tooltipPos.Left = 10;
            caretPos.Left = parentPosition.left + hoverPointLeft - 35;
        }

        // 
        let returnArray: PosCoordinates[] = [tooltipPos, caretPos];
        return returnArray;
    }


    // Constructor 
    constructor(
        private readonly healthStatusEntryCLOService: HealthStatusEntryCLOService
    ) {

    }

    // Public 
    public SetDataAndPosition(healthEntryCLO: CLOs.HealthStatusEntryCLO, parentPosition: any,
        caretX: number, caretY: number, healthLevelColor: string) {

        // 
        this.viewModel.Title = moment(healthEntryCLO.OccurrenceDateTime).format('H:mm');
        this.viewModel.HealthLevelColor = healthLevelColor;
        let healthLevelValue = healthEntryCLO.HealthLevel;
        this.viewModel.HealthLevelDefinition = this.healthLevelDefinitions.find((def) => {
            return def.ContainsHealthLevelValue(healthLevelValue);
        });

        // Get symptom entries
        this.viewModel.SymptomTypes = this.healthStatusEntryCLOService.GetUniqueSymptomTypesWithAvgDose([healthEntryCLO]);
        this.viewModel.HideSymptomsDiv = (this.viewModel.SymptomTypes.length === 0);

        // Calculate position
        setTimeout(() => {
            var tooltipAndCaretPos = this.calculateTooltipPosition(parentPosition, caretX, caretY);

            this.viewModel.TooltipPos = tooltipAndCaretPos[0];
            this.viewModel.CaretPos = tooltipAndCaretPos[1];
            this.viewModel.Visible = true;

        }, 0);
    }
    public HideAndClear() {
        setTimeout(() => {
            this.viewModel.Visible = false;
            this.viewModel.Title = '';
            this.viewModel.SymptomTypes = null;
            this.viewModel.HealthLevelDefinition = null;
            this.viewModel.HealthLevelColor = null;

            this.viewModel.TooltipPos = null;
            this.viewModel.CaretPos = null;
        }, 0);
    }
}

interface ViewModel {
    Title: string;
    HealthLevelDefinition: HealthLevelDefinition;
    HealthLevelColor: string;
    SymptomTypes: SymptomTypeWithAvgIntensity[];

    HideSymptomsDiv: boolean;
    Visible: boolean;
    TooltipPos: PosCoordinates;
    CaretPos: PosCoordinates;
}
class PosCoordinates {
    constructor(public Left: number = 0, public Top: number = 0) {
    }
}

interface HealthLevelDefinition {
    ContainsHealthLevelValue(avgValue);
    Label: string;
}