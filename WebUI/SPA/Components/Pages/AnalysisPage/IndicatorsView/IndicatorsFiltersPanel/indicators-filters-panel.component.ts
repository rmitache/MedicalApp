// Angular and 3rd party stuff
import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
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
import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import { FilterListPanelComponent, FilterItem, FilterItemToggledEvent } from 'SPA/Components/Shared/FilterListPanel/filter-list-panel.component';


@Component({
    selector: 'indicators-filters-panel',
    templateUrl: './indicators-filters-panel.component.html',
    styleUrls: ['./indicators-filters-panel.component.css'],
    host: { 'class': 'indicators-filters-panel' },
})
export class IndicatorsFiltersPanelComponent {
    // Fields
    @ViewChild('filterListPanel')
    private filterListPanelInstance: FilterListPanelComponent;
    private readonly viewModel: ViewModel = {
    };

    // Public methods
    public Initialize(availableSymptomTypes: CLOs.SymptomTypeCLO[], selectedSymptomTypes: CLOs.SymptomTypeCLO[]) {
        this.filterListPanelInstance.Initialize(availableSymptomTypes, selectedSymptomTypes, true);
    }

    // Events
    @Output() public SymptomTypeSelected: EventEmitter<SymptomTypeToggledEvent> = new EventEmitter();
    @Output() public SymptomTypeDeselected: EventEmitter<SymptomTypeToggledEvent> = new EventEmitter();

    // Event handlers
    private onFilterItemToggled(event: FilterItemToggledEvent) {
        let specialEvent: SymptomTypeToggledEvent =  {
            CLO: event.CLO as CLOs.SymptomTypeCLO,
            ColorCode: event.ColorCode
        };


        if (event.NewSelectionState === true) {
            this.SymptomTypeSelected.emit(specialEvent);
        } else {
            this.SymptomTypeDeselected.emit(specialEvent);
        }
    }

}
export interface SymptomTypeToggledEvent {
    CLO: CLOs.SymptomTypeCLO;
    ColorCode: string;
}
interface ViewModel {
}
