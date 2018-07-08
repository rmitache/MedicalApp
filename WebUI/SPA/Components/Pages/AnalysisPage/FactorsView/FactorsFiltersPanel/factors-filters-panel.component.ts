// Angular and 3rd party stuff
import { Component, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';

// Project modules
import { Time, Range, TimeRange } from 'SPA/Core/Helpers/DataStructures/misc';
import * as CLOs from 'SPA/DomainModel/clo-exports';

// Components
import { GenericCLOFactory } from 'SPA/DomainModel/generic-clo.factory';


@Component({
    selector: 'factors-filters-panel',
    templateUrl: './factors-filters-panel.component.html',
    styleUrls: ['./factors-filters-panel.component.css'],
    host: { 'class': 'factors-filters-panel' },
})
export class FactorsFiltersPanelComponent {
    // Fields
    private readonly viewModel: ViewModel = {
        AvailablePlans: null,
        SelectedPlans: null,
        IsSelected: (planCLO) => {
            if (this.viewModel.SelectedPlans !== null && this.viewModel.SelectedPlans.indexOf(planCLO) !== -1) {
                return true;
            } else {
                return false;
            }
        }
    };

    // Constructor
    constructor(
        private readonly genericCLOFactory: GenericCLOFactory
    ) {
    }

    // Public methods
    public InitAndGetSelPlanCLOs(availablePlanCLOs: CLOs.PlanCLO[]) {
        this.viewModel.AvailablePlans = availablePlanCLOs;

        let selectedPlans = Object.assign([], this.viewModel.AvailablePlans);
        this.viewModel.SelectedPlans = selectedPlans;

        let clonedSelectedPlans = this.genericCLOFactory.CloneCLOArray(selectedPlans);
        return clonedSelectedPlans;
    }

    // Events
    @Output() public SelectedPlansChanged: EventEmitter<CLOs.PlanCLO[]> = new EventEmitter();

    // Event handlers
    private onCheckBoxClicked(planCLO: CLOs.PlanCLO) {
        var index = this.viewModel.AvailablePlans.findIndex((clo) => {
            return clo.ID === planCLO.ID;
        });
        if (index === -1) {
            throw new Error("FiltersPanel - onCheckBoxClicked -> invalid PlanCLO clicked");
        }


        if (this.viewModel.SelectedPlans[index] === null) {
            // Add to SelectedPlans - "SELECT"
            this.viewModel.SelectedPlans[index] = planCLO;
        } else {
            // Remove from SelectedPlans - "DESELECT"
            this.viewModel.SelectedPlans[index] = null;
        }

        // Clone and remove null elems and then emit an Event
        let clonedSelectedPlans = this.genericCLOFactory
            .CloneCLOArray(this.viewModel.SelectedPlans)
            .filter((elem) => {
                return elem !== null;
            });
        this.SelectedPlansChanged.emit(clonedSelectedPlans);
    }

}
interface ViewModel {
    AvailablePlans: CLOs.PlanCLO[];
    SelectedPlans: CLOs.PlanCLO[];
    IsSelected(planCLO);
}
