// Angular and 3rd party stuff
import { Component, ChangeDetectorRef, ApplicationRef, Input, ElementRef, ViewChild, HostListener, Output, EventEmitter} from '@angular/core';
import * as moment from 'moment';
import * as momentRange from 'moment-range';
import { Observable } from 'rxjs/Observable';

// Project modules
import { Time, Range, TimeRange } from 'SPA/Core/Helpers/DataStructures/misc';
import { CommandManager } from 'SPA/Core/Managers/CommandManager/command.manager';
import { FlowDefinitions } from 'SPA/Components/Pages/HomePage/CommandFlows/flow-definitions';
import * as CLOs from 'SPA/DomainModel/clo-exports';

// Components
import { AnalysisPageApplicationState } from 'SPA/Components/Pages/AnalysisPage/analysis-page-application-state';
import { AnalysisPageDataService } from 'SPA/Components/Pages/AnalysisPage/analysis-page-data.service';
import { GetNrOfDaysBetweenDates, GetNrOfDaysBetweenDatesUsingMoment, EnumerateDaysBetweenDatesUsingMoment } from 'SPA/Core/Helpers/Functions/functions';
import { DateRangeMode } from 'SPA/Core/Helpers/Enums/enums';
import { GenericCLOFactory } from 'SPA/DomainModel/generic-clo.factory';


@Component({
    selector: 'filters-panel',
    templateUrl: './filters-panel.component.html',
    styleUrls: ['./filters-panel.component.css'],
    host: { 'class': 'filters-panel' },
})
export class FiltersPanelComponent {
    // Fields
    @ViewChild('frame')
    private frame: ElementRef;
    private dateRangeSelectionMode: DateRangeMode;
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

        // Emit and remove null elems
        let clonedSelectedPlans = this.genericCLOFactory.CloneCLOArray(this.viewModel.SelectedPlans);
        let filteredClonedSelectedPlans = clonedSelectedPlans.filter((elem) => {
            return elem !== null;
        });

        this.SelectedPlansChanged.emit(filteredClonedSelectedPlans);
    }

}
interface ViewModel {
    AvailablePlans: CLOs.PlanCLO[];
    SelectedPlans: CLOs.PlanCLO[];
    IsSelected(planCLO);
}
