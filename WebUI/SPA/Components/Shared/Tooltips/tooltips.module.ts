// Angular and 3rd party stuff
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SingleHealthStatusTooltipComponent } from './SingleHealthStatusTooltip/single-health-status-tooltip.component';
import { SymptomTypeElemComponent } from './Shared/SymptomTypeElem/symptom-type-elem.component';
import { HealthStatusesOverDayTooltipComponent } from './HealthStatusesOverDayTooltip/health-statuses-over-day-tooltip.component';
import { ChartModule } from 'primeng/primeng';
import { PlanVersionChangesTooltipComponent } from './PlanVersionChangesTooltip/plan-version-changes-tooltip.component';

// Components


@NgModule({
    imports: [BrowserModule, ChartModule],
    declarations: [
        SingleHealthStatusTooltipComponent,
        HealthStatusesOverDayTooltipComponent,
        SymptomTypeElemComponent,
        PlanVersionChangesTooltipComponent
    ],
    exports: [
        SingleHealthStatusTooltipComponent,
        HealthStatusesOverDayTooltipComponent,
        SymptomTypeElemComponent,
        HealthStatusesOverDayTooltipComponent,
        PlanVersionChangesTooltipComponent
    ]
})
export class TooltipsModule { }