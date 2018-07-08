// Angular and 3rd party stuff
import { Component, Input, Output, EventEmitter } from '@angular/core';
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
    selector: 'indicators-filters-panel',
    templateUrl: './indicators-filters-panel.component.html',
    styleUrls: ['./indicators-filters-panel.component.css'],
    host: { 'class': 'indicators-filters-panel' },
})
export class IndicatorsFiltersPanelComponent {
    // Fields
    private readonly viewModel: ViewModel = {
        AvailableSymptomTypes: null,
        SelectedSymptomTypes: null,
        IsSelected: (symptomTypeCLO) => {
            if (this.viewModel.SelectedSymptomTypes !== null && this.viewModel.SelectedSymptomTypes.indexOf(symptomTypeCLO) !== -1) {
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
    public InitAndGetSelSymptomTypeCLOs(availableSymptomTypeCLOs: CLOs.SymptomTypeCLO[]): CLOs.SymptomTypeCLO[] {
        this.viewModel.AvailableSymptomTypes = availableSymptomTypeCLOs;

        let selectedSymptomTypes = Object.assign([], this.viewModel.AvailableSymptomTypes);
        this.viewModel.SelectedSymptomTypes = selectedSymptomTypes;

        let clonedSelectedSymptomTypes = this.genericCLOFactory.CloneCLOArray(selectedSymptomTypes);
        return clonedSelectedSymptomTypes;
    }

    // Events
    @Output() public SelectedSymptomTypesChanged: EventEmitter<CLOs.SymptomTypeCLO[]> = new EventEmitter();

    // Event handlers
    private onCheckBoxClicked(symptomTypeCLO: CLOs.SymptomTypeCLO) {
        //var index = this.viewModel.AvailablePlans.findIndex((clo) => {
        //    return clo.ID === planCLO.ID;
        //});
        //if (index === -1) {
        //    throw new Error("FiltersPanel - onCheckBoxClicked -> invalid PlanCLO clicked");
        //}


        //if (this.viewModel.SelectedPlans[index] === null) {
        //    // Add to SelectedPlans - "SELECT"
        //    this.viewModel.SelectedPlans[index] = planCLO;
        //} else {
        //    // Remove from SelectedPlans - "DESELECT"
        //    this.viewModel.SelectedPlans[index] = null;
        //}

        //// Clone and remove null elems and then emit an Event
        //let clonedSelectedPlans = this.genericCLOFactory
        //    .CloneCLOArray(this.viewModel.SelectedPlans)
        //    .filter((elem) => {
        //        return elem !== null;
        //    });
        //this.SelectedPlansChanged.emit(clonedSelectedPlans);
    }

}
interface ViewModel {
    AvailableSymptomTypes: CLOs.SymptomTypeCLO[];
    SelectedSymptomTypes: CLOs.SymptomTypeCLO[];
    IsSelected(symptomTypeCLO);
}
