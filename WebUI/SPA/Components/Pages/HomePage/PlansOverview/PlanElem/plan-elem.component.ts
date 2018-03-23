import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { MenuItem } from 'primeng/primeng';
import { PlanActionType } from 'SPA/Components/Pages/HomePage/PlansOverview/plans-overview.component';

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
        Active: [
            {
                label: 'Adjust',
                command: (event) => {
                    this.ActionTriggered.emit([this.planCLO, PlanActionType.Adjust]);
                }
            }
        ],
        ActiveWithUpcomingAdjustment: [
            {
                label: 'Hard modify',
                command: (event) => {
                    this.ActionTriggered.emit([this.planCLO, PlanActionType.HardEdit]);
                }
            }
        ],
        Inactive: [],
        UpcomingAsNew: [
            {
                label: 'Hard modify',
                command: (event) => {
                    this.ActionTriggered.emit([this.planCLO, PlanActionType.HardEdit]);
                }
            }
        ],
        UpcomingAsRestarted: [
            {
                label: 'Hard modify',
                command: (event) => {
                    this.ActionTriggered.emit([this.planCLO, PlanActionType.HardEdit]);
                }
            }
        ]
    };


    private readonly viewModel: ViewModel = {
        PlanCLO: null,

        GetMenuItems: () => {
            let planStatusName = Enums.PlanStatus[this.viewModel.PlanCLO.Status];
            return this.menuItemsToPlanStatusMap[planStatusName];
        },

        StatusString: null,
        StartDatePrefixString: null,
        RelativeStartDateString: null,
        EndDatePrefixString: null,
        RelativeEndDateString: null
    };

    // Constructor 
    constructor(
    ) {
    }
    ngOnInit() {
        this.viewModel.PlanCLO = this.planCLO;
        this.viewModel.StatusString = Enums.PlanStatus[this.planCLO.Status];


        // StartDate and EndDate labels according to Plan.Status
        let latestVersion = this.planCLO.GetLatestVersion();
        let firstVersion = this.planCLO.GetFirstVersion();
        switch (this.planCLO.Status) {
            // Active
            case Enums.PlanStatus.Active:
            case Enums.PlanStatus.ActiveWithUpcomingAdjustment:
                this.viewModel.StartDatePrefixString = 'Started:';
                this.viewModel.RelativeStartDateString = moment(firstVersion.StartDate).fromNow().toString();

                if (this.planCLO.GetLatestVersion().EndDate !== null) {
                    this.viewModel.EndDatePrefixString = 'Ending:';
                    this.viewModel.RelativeEndDateString = moment(latestVersion.EndDate).fromNow().toString();
                }
                break;

            // Inactive
            case Enums.PlanStatus.Inactive:
                this.viewModel.StartDatePrefixString = 'Started:';
                this.viewModel.RelativeStartDateString = moment(firstVersion.StartDate).fromNow().toString();
                this.viewModel.EndDatePrefixString = 'Ended:';
                this.viewModel.RelativeEndDateString = moment(latestVersion.EndDate).fromNow().toString();
                break;

            // Upcoming
            case Enums.PlanStatus.UpcomingAsNew:
            case Enums.PlanStatus.UpcomingAsRestarted:
                this.viewModel.StartDatePrefixString = 'Starts:';
                this.viewModel.RelativeStartDateString = moment(latestVersion.StartDate).fromNow().toString();

                if (this.planCLO.GetLatestVersion().EndDate !== null) {
                    this.viewModel.EndDatePrefixString = 'Will last:';
                    this.viewModel.RelativeEndDateString = moment(latestVersion.EndDate).from(moment(latestVersion.StartDate), false).toString().substring(3);
                }
                break;
        }


    }

    // Events
    @Output() public ActionTriggered: EventEmitter<any> = new EventEmitter();
}
interface ViewModel {
    PlanCLO: CLOs.PlanCLO;

    GetMenuItems(): MenuItem[];

    StatusString: string;
    StartDatePrefixString: string;
    RelativeStartDateString: string;
    EndDatePrefixString: string;
    RelativeEndDateString: string;
}
interface MenuItemsToPLanStatusMap {
    [planStatusName: string]: MenuItem[];
}
