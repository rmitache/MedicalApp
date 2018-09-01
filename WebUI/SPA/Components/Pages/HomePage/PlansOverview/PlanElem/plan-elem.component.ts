// Angular and 3rd party stuff
import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { StringToColour } from 'SPA/Core/Helpers/Functions/functions';

// Components
import { PlanActionType } from 'SPA/Components/Pages/HomePage/PlansOverview/plans-overview.component';
import { SplitButtonMenuItem } from 'SPA/Components/Shared/SplitButton/split-button.component';

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
				Label: 'Stop',
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
				Label: 'Restart',
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
			Icon: 'fa fa-edit',
			ButtonClass: '',
			ButtonText: 'Change',
			OnClick: () => {
				this.ActionTriggered.emit([this.planCLO, PlanActionType.Change]);

			}
		}
	};
	private readonly viewModel: ViewModel = {
		PlanCLO: null,
		GetMenuItems: () => {
			let planStatusName = Enums.PlanStatus[this.viewModel.PlanCLO.Status];
			return this.menuItemsToPlanStatusMap[planStatusName];
		},
		MainAction: null,

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
	private getStatusIconAndColor(status: Enums.PlanStatus) {
		var iconName: string ;
		var colorName: string;
		switch (status) {
			case Enums.PlanStatus.ActiveWITHOUTAnyUpcomingChanges:
			case Enums.PlanStatus.ActiveWITHUpcomingChanges:
			case Enums.PlanStatus.ActiveWITHUpcomingStop:
				iconName = 'fa fa-check';
				colorName = '#2399e5';
				break;

			case Enums.PlanStatus.UpcomingAsNew:
			case Enums.PlanStatus.UpcomingAsRestarted:
				iconName = 'fa fa-clock-o';
				colorName = '#94e1f6';
				break;

			case Enums.PlanStatus.Stopped:
				iconName = 'fa fa-stop-circle';
				colorName = 'red';
				break;

		}

		return {
			iconName: iconName,
			color: colorName
		};
	}

	// Constructor 
	constructor(
	) {
	}
	ngOnInit() {
		this.viewModel.PlanCLO = this.planCLO;
		var statusIconInfo = this.getStatusIconAndColor(this.planCLO.Status);
		this.viewModel.StatusIcon = statusIconInfo.iconName;
		this.viewModel.StatusIconColor = statusIconInfo.color;

		// StartDate and EndDate labels according to Plan.Status
		let latestVersion = this.planCLO.GetLatestVersion();
		let firstVersion = this.planCLO.GetFirstVersion();
		switch (this.planCLO.Status) {
			// ActiveWITHOUTAnyUpcomingChanges
			case Enums.PlanStatus.ActiveWITHOUTAnyUpcomingChanges:
				if (this.planCLO.Versions.Length > 1) {

					this.viewModel.DateInfoLabel = 'Changed/restarted:';
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

	}

	// Event handlers
	private onAdjustTriggered() {
		this.ActionTriggered.emit([this.planCLO, PlanActionType.Change]);

	}

	// Events
	@Output() public ActionTriggered: EventEmitter<any> = new EventEmitter();
}
interface ViewModel {
	PlanCLO: CLOs.PlanCLO;

	GetMenuItems();
	MainAction: MainActionButton;


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