// Angular and 3rd party stuff
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { StringToColour } from 'SPA/Core/Helpers/Functions/functions';

// Components
import { PlanActionType } from 'SPA/Components/Pages/HomePage/PlansOverview/plans-overview.component';
import { SplitButtonMenuItem } from 'SPA/Components/Shared/SplitButton/split-button.component';
import { Inplace } from 'primeng/primeng';
import { HomePageDataService } from 'SPA/Components/Pages/HomePage/home-page-data.service';

@Component({
	selector: 'plan-elem',
	templateUrl: './plan-elem.component.html',
	styleUrls: ['./plan-elem.component.css'],
	host: { 'class': 'plan-elem' }
})
export class PlanElemComponent {
	// Fields
	@Input('PlanCLO')
	private readonly planCLO: CLOs.PlanCLO;
	private readonly planStatusesEnum = Enums.PlanStatus;
	private menuItemsToPlanStatusMap: MenuItemsToPLanStatusMap = {
		ActiveWITHOUTAnyUpcomingChanges: [
			{
				Label: 'Stop plan',
				OnClick: () => {
					this.ActionTriggered.emit([this.planCLO, PlanActionType.Stop]);

				}
			}
		],
		ActiveWITHUpcomingChanges: [
			{
				Label: 'Edit upcoming changes',
				OnClick: () => {
					this.ActionTriggered.emit([this.planCLO, PlanActionType.EditUpcomingChanges]);
				}
			},
			{
				Label: 'Cancel changes',
				OnClick: () => {
					this.ActionTriggered.emit([this.planCLO, PlanActionType.CancelUpcomingChanges]);
				}
			}
		],
		ActiveWITHUpcomingStop: [
			{
				Label: 'Cancel stop',
				OnClick: () => {
					this.ActionTriggered.emit([this.planCLO, PlanActionType.CancelStop]);
				}
			}
		],
		Stopped: [
			{
				Label: 'Restart plan',
				OnClick: () => {
					this.ActionTriggered.emit([this.planCLO, PlanActionType.Restart]);
				}
			}
		],
		UpcomingAsNew: [
			{
				Label: 'Edit upcoming plan',
				OnClick: () => {
					this.ActionTriggered.emit([this.planCLO, PlanActionType.EditUpcomingChanges]);
				}
			}
		],
		UpcomingAsRestarted: [
			{
				Label: 'Cancel restart',
				OnClick: () => {
					this.ActionTriggered.emit([this.planCLO, PlanActionType.CancelRestart]);
				}
			}
		]
	};
	private mainActionToPlanStatusMap: MainActionsToPLanStatusMap = {
		ActiveWITHOUTAnyUpcomingChanges: {
			TooltipText: 'Change plan',
			Icon: 'fa fa-angle-double-right',
			ButtonClass: '',
			ButtonText: 'Change',
			OnClick: () => {
				this.ActionTriggered.emit([this.planCLO, PlanActionType.Change]);

			}
		}
	};
	@ViewChild('inplace')
	private inplaceInstance: Inplace;
	@ViewChild('inplaceTextbox')
	private inplaceTextbox: ElementRef;
	private readonly viewModel: ViewModel = {
		PlanCLO: null,
		GetMenuItems: () => {
			let planStatusName = Enums.PlanStatus[this.viewModel.PlanCLO.Status];
			return this.menuItemsToPlanStatusMap[planStatusName];
		},
		MainAction: null,

		StatusIconTooltipText: null,
		StatusIcon: null,
		StatusIconColor: null,

		DateInfoLabel: null,
		DateInfoValue: null,

	};

	// Private methods
	private getRelativeDateAsString(refDate: Date) {
		return moment(refDate).calendar(null, {
			lastDay: '[Yesterday]',
			sameDay: '[Today]',
			nextDay: '[Tomorrow]',
			lastWeek: 'MMM DD, YYYY',//'[Last] dddd',
			nextWeek: 'MMM DD, YYYY',//'[Next] dddd',
			sameElse: 'MMM DD, YYYY',
			//sameElse: (dt) => {
			//    return 'wtf';
			//}
		});


	}
	private getStatusIconInfo(status: Enums.PlanStatus) {
		// Variables
		var iconName: string;
		var colorName: string;
		var tooltipText: string;

		// Handle different types of Statuses
		switch (status) {
			case Enums.PlanStatus.ActiveWITHOUTAnyUpcomingChanges:
			case Enums.PlanStatus.ActiveWITHUpcomingChanges:
			case Enums.PlanStatus.ActiveWITHUpcomingStop:
				iconName = 'fa fa-arrow-alt-circle-right';
				colorName = '#afe036';
				tooltipText = 'Active';
				break;

			case Enums.PlanStatus.UpcomingAsNew:
			case Enums.PlanStatus.UpcomingAsRestarted:
				iconName = 'fa fa-clock-o';
				colorName = '#94e1f6';
				tooltipText = 'Upcoming';
				break;

			case Enums.PlanStatus.Stopped:
				iconName = 'fa fa-stop-circle';
				colorName = '#e05d5d';
				tooltipText = 'Stopped';
				break;

		}

		return {
			tooltipText: tooltipText,
			iconName: iconName,
			color: colorName
		};
	}

	// Constructor 
	constructor(
		private readonly dataService: HomePageDataService
	) {
	}
	ngOnInit() {

		// Setup VM fields
		this.viewModel.PlanCLO = this.planCLO;
		var statusIconInfo = this.getStatusIconInfo(this.planCLO.Status);
		this.viewModel.StatusIconTooltipText = statusIconInfo.tooltipText;
		this.viewModel.StatusIcon = statusIconInfo.iconName;
		this.viewModel.StatusIconColor = statusIconInfo.color;

		// StartDate and EndDate labels according to Plan.Status
		let latestVersion = this.planCLO.GetLatestVersion();
		let firstVersion = this.planCLO.GetFirstVersion();
		switch (this.planCLO.Status) {
			// ActiveWITHOUTAnyUpcomingChanges
			case Enums.PlanStatus.ActiveWITHOUTAnyUpcomingChanges:
				if (this.planCLO.Versions.Length > 1) {

					this.viewModel.DateInfoLabel = 'Last changed:';
					this.viewModel.DateInfoValue = this.getRelativeDateAsString(latestVersion.StartDateTime);
				} else {
					this.viewModel.DateInfoLabel = 'Started:';
					this.viewModel.DateInfoValue = this.getRelativeDateAsString(firstVersion.StartDateTime);
				}
				break;

			// ActiveWITHUpcomingChanges
			case Enums.PlanStatus.ActiveWITHUpcomingChanges:
				this.viewModel.DateInfoLabel = 'Will change:';
				this.viewModel.DateInfoValue = this.getRelativeDateAsString(latestVersion.StartDateTime);
				break;

			// ActiveWITHUpcomingStop
			case Enums.PlanStatus.ActiveWITHUpcomingStop:
				this.viewModel.DateInfoLabel = 'Will stop:';
				this.viewModel.DateInfoValue = moment(latestVersion.EndDateTime).format('MMM DD, YYYY');
				break;

			// Stopped
			case Enums.PlanStatus.Stopped:
				this.viewModel.DateInfoLabel = 'Stopped:';
				this.viewModel.DateInfoValue = this.getRelativeDateAsString(latestVersion.EndDateTime);
				break;

			// UpcomingAsNew
			case Enums.PlanStatus.UpcomingAsNew:
				this.viewModel.DateInfoLabel = 'Will start:';
				this.viewModel.DateInfoValue = this.getRelativeDateAsString(latestVersion.StartDateTime);
				break;

			// UpcomingAsRestarted
			case Enums.PlanStatus.UpcomingAsRestarted:
				this.viewModel.DateInfoLabel = 'Will restart:';
				this.viewModel.DateInfoValue = this.getRelativeDateAsString(latestVersion.StartDateTime);
				break;
		}

		let planStatusName = Enums.PlanStatus[this.viewModel.PlanCLO.Status];
		this.viewModel.MainAction = this.mainActionToPlanStatusMap[planStatusName];


		// Special handlers
		this.inplaceInstance.onActivate.subscribe(() => {
			this.onInplaceEditStarted();
		});
	}

	// Event handlers
	private onAdjustTriggered() {
		this.ActionTriggered.emit([this.planCLO, PlanActionType.Change]);

	}
	private onInplaceEditStarted() {
		this.inplaceTextbox.nativeElement.value = this.viewModel.PlanCLO.Name;
		setTimeout(() => {
			this.inplaceTextbox.nativeElement.focus();

		}, 10);
	}
	private onInplaceAcceptChangesTriggered() {
		var currentValueTrimmed = (this.inplaceTextbox.nativeElement.value as string).trim();
		if (currentValueTrimmed !== "" && currentValueTrimmed!== this.viewModel.PlanCLO.Name) {
			this.inplaceTextbox.nativeElement.value;
			this.viewModel.PlanCLO.Name = currentValueTrimmed;
			this.dataService.RenamePlan(this.viewModel.PlanCLO.ID, currentValueTrimmed);
		} else {

		}
		
		this.inplaceInstance.deactivate(null);
	}
	private onInplaceCancelChangesTriggered() {

		this.inplaceInstance.deactivate(null);
	}

	// Events
	@Output() public ActionTriggered: EventEmitter<any> = new EventEmitter();
}
interface ViewModel {
	PlanCLO: CLOs.PlanCLO;

	GetMenuItems();
	MainAction: MainActionButton;

	StatusIconTooltipText: string;
	StatusIcon: string;
	StatusIconColor: string;

	DateInfoLabel: string;
	DateInfoValue: string;
}
interface MenuItemsToPLanStatusMap {
	[planStatusName: string]: SplitButtonMenuItem[];

}

interface MainActionsToPLanStatusMap {
	[planStatusName: string]: MainActionButton;

}
interface MainActionButton {
	TooltipText?: string;
	Icon: string;
	ButtonClass: string;
	ButtonText: string;
	OnClick();
}