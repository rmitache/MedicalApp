// Angular and 3rd party stuff
import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import * as momentRange from 'moment-range';
import { Observable } from 'rxjs/Observable';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';

// Components
import { BaseCLO } from 'SPA/Core/CLO/base.clo';


@Component({
    selector: 'filter-list-panel',
    templateUrl: './filter-list-panel.component.html',
    styleUrls: ['./filter-list-panel.component.css'],
    host: { 'class': 'filter-list-panel' },
})
export class FilterListPanelComponent {
    // Fields
    private wasInitialized: boolean = false;
    private readonly viewModel: ViewModel = {
        FilterItems: null
    };
	private readonly defaultBgColor = '#2399e5';

    // Private methods
    private isColorDark(colorCode: string) {
        var colorCode = colorCode.substring(1);      // strip #
        var rgb = parseInt(colorCode, 16);   // convert rrggbb to decimal
        var r = (rgb >> 16) & 0xff;  // extract red
        var g = (rgb >> 8) & 0xff;  // extract green
        var b = (rgb >> 0) & 0xff;  // extract blue

        var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

        if (luma < 140) {
            return true; // dark color
        } else {
            return false;
        }
    }
    private generateFilterItems(availableCLOs: BaseCLO[], selectedCLOs: BaseCLO[], customColorCodes: string[]): FilterItem[] {

        // Variables
        let filterItems = [];

        // Generate a FilterItem for each AvailableCLO
        for (let i = 0; i < availableCLOs.length; i++) {
            let availableCLO = availableCLOs[i];

            // Check whether it should be Selected or Deselected
            let isSelected = (selectedCLOs.find((clo) => {
                if (clo !== null) {
                    return clo['ID'] === availableCLO['ID'];
                } else {
                    return false;
                }
            }) !== undefined) ? true : false;

            // Create the new FilterItem
            let color = (customColorCodes !== null) ? customColorCodes[i] : this.defaultBgColor;
            let newFilterItem = new FilterItem(availableCLO, isSelected, color);
            filterItems.push(newFilterItem);

        }
        return filterItems;
    }

    // Public methods
    public Initialize(availableCLOs: BaseCLO[], selectedCLOs: BaseCLO[], customColorCodes:string[] = null) {
        if (this.wasInitialized === true) {
            throw new Error("IndicatorsFiltersPanel -> was already initialized");
        }
        this.wasInitialized = true;

        // Generate FilterItems
        this.viewModel.FilterItems = this.generateFilterItems(availableCLOs, selectedCLOs, customColorCodes);
    }

    // Events
    @Output() public FilterItemToggled: EventEmitter<FilterItemToggledEvent> = new EventEmitter();

    // Event handlers
    private onCheckBoxClicked(filterItem: FilterItem) {
        let newSelectionState = !filterItem.Selected;
        filterItem.Selected = newSelectionState;


        // Emit the event
        let eventInfo: FilterItemToggledEvent = {
            CLO: filterItem.CLO,
            NewSelectionState: newSelectionState,
            ColorCode: filterItem.ColorCode
        };
        this.FilterItemToggled.emit(eventInfo);
    }

}

interface ViewModel {
    FilterItems: FilterItem[];
}

export interface FilterItemToggledEvent {
    CLO: BaseCLO;
    NewSelectionState: boolean;
    ColorCode: string;
}
export class FilterItem {
    constructor(public CLO: BaseCLO, public Selected: boolean, public ColorCode: string = null) {
    }
}