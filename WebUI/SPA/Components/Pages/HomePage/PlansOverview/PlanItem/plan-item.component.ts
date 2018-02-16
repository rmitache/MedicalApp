import { Component, Input, Output } from '@angular/core';
import * as moment from 'moment';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';


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
    private readonly viewModel: ViewModel = {
        PlanCLO: null
    };

    // Constructor 
    constructor(
    ) {
    }
    ngOnInit() {
        this.viewModel.PlanCLO = this.planCLO;

    }


    // Event handlers
    private onAddNewPlanTriggered() {
        alert('new plan!');
    }

}
interface ViewModel {
    PlanCLO: CLOs.PlanCLO;
}

