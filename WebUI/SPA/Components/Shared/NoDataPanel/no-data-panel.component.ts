import { Component, Input, EventEmitter, Output, ElementRef, HostListener, ViewChild, Renderer, ChangeDetectionStrategy, ContentChildren, QueryList } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as $ from 'jquery';
import { NoDataModeComponent } from './NoDataMode/no-data-mode.component';


@Component({
	selector: 'no-data-panel',
	templateUrl: './no-data-panel.component.html',
	styleUrls: ['./no-data-panel.component.css'],
	host: { 'class': 'no-data-panel' }
})
export class NoDataPanelComponent {
	// Fields
	@ContentChildren(NoDataModeComponent) noDataModes: QueryList<NoDataModeComponent>;
	@Input('CurrentNoDataModeID') currentModeID:string;
	private currentIconName: string = 'fa fa-info-circle fa-6x';

	// Private methods
	private refreshUI() {
		if (this.noDataModes) {
			// Get all info messages
			this.noDataModes.forEach((modeComponent) => {
				if (modeComponent.id === this.currentModeID) {
					modeComponent.visible = true;
					//this.currentIconName = modeComponent.iconName;
				} else {
					modeComponent.visible = false;
				}
			});

		}
	}

	// Constructor 
	constructor() {

	}
	ngAfterContentInit() {
		this.refreshUI(); // has to be called here, because ngOnChanges on first call doesnt have access to the ContentChildren
	}
	ngOnChanges() {
		this.refreshUI();

	}
}


