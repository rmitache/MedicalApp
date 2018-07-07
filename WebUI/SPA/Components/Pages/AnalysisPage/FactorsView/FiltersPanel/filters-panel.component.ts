// Angular and 3rd party stuff
import { Component, ChangeDetectorRef, ApplicationRef, Input, ElementRef, ViewChild, HostListener} from '@angular/core';
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
        AvailablePlanCLOs: null,
        SelectedPlanCLOs: null,
        IsSelected: (planCLO) => {
            if (this.viewModel.SelectedPlanCLOs !== null && this.viewModel.SelectedPlanCLOs.indexOf(planCLO) !== -1) {
                return true;
            } else {
                return false;
            }
        }
    };

    // Private methods
    private refreshUI() {
        
    }

    // Public methods
    public SetAvailablePlanCLOs(newPlanCLOs: CLOs.PlanCLO[], selectedPlanCLOs: CLOs.PlanCLO[]) {
        this.viewModel.AvailablePlanCLOs = newPlanCLOs;
        this.viewModel.SelectedPlanCLOs = selectedPlanCLOs;
    }

}
interface ViewModel {
    AvailablePlanCLOs: CLOs.PlanCLO[];
    SelectedPlanCLOs: CLOs.PlanCLO[];
    IsSelected(planCLO);
}
