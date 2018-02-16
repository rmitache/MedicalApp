import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { MenuItem } from 'primeng/primeng';

@Component({
    selector: 'plan-item',
    templateUrl: './plan-item.component.html',
    styleUrls: ['./plan-item.component.css'],
    host: { 'class': 'plan-item' }
})
export class PlanItemComponent {
    // Fields
    @Input('Plan')
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
        RelativeStartDateString: null,
        RelativeEndDateString: null
    };

    // Constructor 
    constructor(
    ) {
    }
    ngOnInit() {
        this.viewModel.PlanCLO = this.planCLO;
        this.viewModel.RelativeStartDateString = moment(this.planCLO.Versions[0].StartDate).fromNow().toString();
        this.viewModel.RelativeEndDateString = moment(this.planCLO.Versions[this.planCLO.Versions.length - 1].EndDate).fromNow().toString();
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
    RelativeStartDateString: string;
    RelativeEndDateString: string;
}

