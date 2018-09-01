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
					//this.ActionTriggered.emit([this.planCLO, PlanActionType.HardEdit]);
				}
			},
			{
				Label: 'Stop plan',
				OnClick: () => {
					//this.ActionTriggered.emit([this.planCLO, PlanActionType.HardEdit]);
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
				Label: 'Hard modify',
				OnClick: () => {
					this.ActionTriggered.emit([this.planCLO, PlanActionType.EditUpcomingChanges]);
				}
			}
		],
		UpcomingAsRestarted: [
			{
				Label: 'Hard modify',
				OnClick: () => {
					this.ActionTriggered.emit([this.planCLO, PlanActionType.EditUpcomingChanges]);
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
		},
		//ActiveWithUpcomingAdjustment: {
		//	Icon: 'fa fa-edit',
		//	ButtonClass: '',
		//	ButtonText:'Change xxx',
		//	OnClick: () => {
		//		this.ActionTriggered.emit([this.planCLO, PlanActionType.Adjust]);

		//	}
		//}
	};
	private readonly viewModel: ViewModel = {
		PlanCLO: null,
		Color: null,
		GetMenuItems: () => {
			let planStatusName = Enums.PlanStatus[this.viewModel.PlanCLO.Status];
			return this.menuItemsToPlanStatusMap[planStatusName];
		},
		MainAction: null,

		StatusString: null,
		StartDatePrefixString: null,
		RelativeStartDateString: null,
		EndDatePrefixString: null,
		RelativeEndDateString: null
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


	// Constructor 
	constructor(
	) {
	}
	ngOnInit() {
		this.viewModel.PlanCLO = this.planCLO;
		this.viewModel.StatusString = Enums.PlanStatus[this.planCLO.Status];
		this.viewModel.Color = StringToColour(this.viewModel.PlanCLO.Name);

		// StartDate and EndDate labels according to Plan.Status
		let latestVersion = this.planCLO.GetLatestVersion();
		let firstVersion = this.planCLO.GetFirstVersion();
		switch (this.planCLO.Status) {
			// Active
			case Enums.PlanStatus.ActiveWITHOUTAnyUpcomingChanges:
				if (this.planCLO.Versions.Length > 1) {
					this.viewModel.StartDatePrefixString = 'Adjusted/restarted:';
					this.viewModel.RelativeStartDateString = this.getRelativeDateAsString(latestVersion.StartDateTime);
				} else {
					this.viewModel.StartDatePrefixString = 'Started:';
					this.viewModel.RelativeStartDateString = this.getRelativeDateAsString(firstVersion.StartDateTime);
				}

				let endDate = moment(latestVersion.EndDateTime).startOf('day');
				if (this.planCLO.GetLatestVersion().EndDateTime !== null) {
					this.viewModel.EndDatePrefixString = 'Ending:';
					this.viewModel.RelativeEndDateString = this.getRelativeDateAsString(latestVersion.EndDateTime);
				}
				break;

			// ActiveWithUpcomingAdjustment
			case Enums.PlanStatus.ActiveWITHUpcomingChanges:
				this.viewModel.StartDatePrefixString = 'Will change:';
				this.viewModel.RelativeStartDateString = this.getRelativeDateAsString(latestVersion.StartDateTime);
				if (this.planCLO.GetLatestVersion().EndDateTime !== null) {
					this.viewModel.EndDatePrefixString = 'Will end:';
					this.viewModel.RelativeEndDateString = moment(latestVersion.EndDateTime).format('MMM DD, YYYY');
				}
				break;

			// Inactive
			case Enums.PlanStatus.Stopped:
				this.viewModel.EndDatePrefixString = 'Ended:';
				this.viewModel.RelativeEndDateString = this.getRelativeDateAsString(latestVersion.EndDateTime);
				break;

			// UpcomingAsNew
			case Enums.PlanStatus.UpcomingAsNew:
				this.viewModel.StartDatePrefixString = 'Will start:';
				this.viewModel.RelativeStartDateString = this.getRelativeDateAsString(latestVersion.StartDateTime);
				break;

			// UpcomingAsRestarted
			case Enums.PlanStatus.UpcomingAsRestarted:
				this.viewModel.StartDatePrefixString = 'Will restart:';
				this.viewModel.RelativeStartDateString = this.getRelativeDateAsString(latestVersion.StartDateTime);
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

	Color: string;
	StatusString: string;
	StartDatePrefixString: string;
	RelativeStartDateString: string;
	EndDatePrefixString: string;
	RelativeEndDateString: string;


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