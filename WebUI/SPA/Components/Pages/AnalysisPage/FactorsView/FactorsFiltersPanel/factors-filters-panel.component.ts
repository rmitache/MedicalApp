// Angular and 3rd party stuff
import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';

// Project modules
import { Time, Range, TimeRange } from 'SPA/Core/Helpers/DataStructures/misc';
import * as CLOs from 'SPA/DomainModel/clo-exports';

// Components
import { GenericCLOFactory } from 'SPA/DomainModel/generic-clo.factory';
import { FilterListPanelComponent, FilterItemToggledEvent } from 'SPA/Components/Shared/FilterListPanel/filter-list-panel.component';


@Component({
    selector: 'factors-filters-panel',
    templateUrl: './factors-filters-panel.component.html',
    styleUrls: ['./factors-filters-panel.component.css'],
    host: { 'class': 'factors-filters-panel' },
})
export class FactorsFiltersPanelComponent {
    // Fields
    @ViewChild('filterListPanel')
    private filterListPanelInstance: FilterListPanelComponent;
    private readonly viewModel: ViewModel = {

    };

    // Constructor
    constructor(
        private readonly genericCLOFactory: GenericCLOFactory
    ) {
    }

    // Public methods
    public Initialize(availableaPlans: CLOs.PlanCLO[], selectedPlans: CLOs.PlanCLO[]) {
        this.filterListPanelInstance.Initialize(availableaPlans, selectedPlans);
    }

    // Events
    @Output() public PlanSelected: EventEmitter<CLOs.PlanCLO> = new EventEmitter();
    @Output() public PlanDeselected: EventEmitter<CLOs.PlanCLO> = new EventEmitter();

    // Event handlers
    private onFilterItemToggled(event: FilterItemToggledEvent) {
        if (event.NewSelectionState === true) {
            this.PlanSelected.emit(event.CLO as CLOs.PlanCLO);
        } else {
            this.PlanDeselected.emit(event.CLO as CLOs.PlanCLO);
        }
    }

}

interface ViewModel {
}
