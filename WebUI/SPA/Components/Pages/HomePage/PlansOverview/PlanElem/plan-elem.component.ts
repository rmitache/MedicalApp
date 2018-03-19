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
        Inactive: [],
        Upcoming: []
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

        // StartDate
        this.viewModel.StartDatePrefixString = this.planCLO.HasStarted ? 'Started' : 'Starts';
        this.viewModel.RelativeStartDateString = moment(this.planCLO.GetFirstVersion().StartDate).fromNow().toString();

        // EndDate
        if (this.planCLO.HasEnded) {
            this.viewModel.EndDatePrefixString = 'Ended';
            this.viewModel.RelativeEndDateString = moment(this.planCLO.GetLatestVersion().EndDate).fromNow().toString();
        } else if (this.planCLO.GetLatestVersion().EndDate === null) {
            this.viewModel.RelativeEndDateString = 'Doesnt end';
        } else if (this.planCLO.HasStarted && !this.planCLO.HasEnded) {
            this.viewModel.EndDatePrefixString = 'Ending';
            this.viewModel.RelativeEndDateString = moment(this.planCLO.GetLatestVersion().EndDate).fromNow().toString();
        } else if (this.planCLO.HasStarted && !this.planCLO.HasEnded) {
            
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
