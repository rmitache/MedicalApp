import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { MenuItem } from 'primeng/primeng';

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
    private menuItems: MenuItem[] = [
        {
            label: 'Adjust',
            command: (event) => {
                this.onAdjustPlanTriggered();
            }
        }
    ];
    private readonly viewModel: ViewModel = {
        PlanCLO: null,
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
    @Output() public AdjustClicked: EventEmitter<any> = new EventEmitter();


    // Event handlers
    private onAdjustPlanTriggered() {
        this.AdjustClicked.emit(this.planCLO);
    }

}
interface ViewModel {
    PlanCLO: CLOs.PlanCLO;
    StatusString: string;
    StartDatePrefixString: string;
    RelativeStartDateString: string;
    EndDatePrefixString: string;
    RelativeEndDateString: string;
}

