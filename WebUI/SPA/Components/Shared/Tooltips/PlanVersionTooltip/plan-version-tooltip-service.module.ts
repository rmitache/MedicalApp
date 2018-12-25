import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { PlanVersionTooltipComponent } from './plan-version-tooltip.component';
import { PlanVersionTooltipService } from './plan-version-tooltip.service';

@NgModule({
	imports: [
        BrowserModule,
        CommonModule,
	],
    declarations: [
        PlanVersionTooltipComponent,
	],
	providers: [
        PlanVersionTooltipService
	],
    entryComponents: [
        PlanVersionTooltipComponent
    ]
})
export class PlanVersionTooltipServiceModule { }