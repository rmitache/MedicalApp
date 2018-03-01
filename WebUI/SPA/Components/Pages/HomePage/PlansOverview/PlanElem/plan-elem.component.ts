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
            label: 'View/Change',
            command: (event) => {
                this.onChangePlanTriggered();
            }
        },
        //{ label: 'Pause' }
    ];
    private readonly viewModel: ViewModel = {
        PlanCLO: null,
        StatusString: null,
        GetRelativeStartDateString: () => {
            return moment(this.planCLO.GetFirstVersion().StartDate).fromNow().toString();
        },
        GetRelativeEndDateString: () => {
            let str;
            if (this.planCLO.GetLatestVersion().EndDate === null) {
                str = 'Never';
            } else {
                str = moment(this.planCLO.GetLatestVersion().EndDate).fromNow().toString();
            }
            return str;
        }
    };

    // Constructor 
    constructor(
    ) {
    }
    ngOnInit() {
        this.viewModel.PlanCLO = this.planCLO;
        this.viewModel.StatusString = Enums.PlanStatus[this.planCLO.Status];
    }

    // Events
    @Output() public ChangeClicked: EventEmitter<any> = new EventEmitter();


    // Event handlers
    private onChangePlanTriggered() {
        this.ChangeClicked.emit(this.planCLO);
    }

}
interface ViewModel {
    PlanCLO: CLOs.PlanCLO;
    StatusString: string;
    GetRelativeStartDateString(): string;
    GetRelativeEndDateString(): string;
}

