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
    private showColors: boolean = false;
    private wasInitialized: boolean = false;
    private readonly viewModel: ViewModel = {
        FilterItems: null
    };
    private readonly uniqueColors = {
        beige: "#f5f5dc",
        blue: "#0000ff",
        brown: "#a52a2a",
        cyan: "#00ffff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgrey: "#a9a9a9",
        darkgreen: "#006400",
        darkkhaki: "#bdb76b",
        darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",
        darkorchid: "#9932cc",
        darkred: "#8b0000",
        darksalmon: "#e9967a",
        darkviolet: "#9400d3",
        fuchsia: "#ff00ff",
        gold: "#ffd700",
        green: "#008000",
        indigo: "#4b0082",
        khaki: "#f0e68c",
        lightblue: "#add8e6",
        lightcyan: "#e0ffff",
        lightgreen: "#90ee90",
        lightgrey: "#d3d3d3",
        lightpink: "#ffb6c1",
        lightyellow: "#ffffe0",
        lime: "#00ff00",
        magenta: "#ff00ff",
        maroon: "#800000",
        navy: "#000080",
        olive: "#808000",
    };
    private readonly defaultColor = '#e4efff';

    // Private methods
    private getUniqueColorsAsArray() {
        let colorsArray:string[] = [];
        for (let colorName in this.uniqueColors) {
            let colorValue = this.uniqueColors[colorName];
            colorsArray.push(colorValue);
        }
        return colorsArray;
    }
    private generateFilterItems(availableCLOs: BaseCLO[], selectedCLOs: BaseCLO[]): FilterItem[] {

        // Variables
        let filterItems = [];
        let colors = this.getUniqueColorsAsArray();

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
            let color = (this.showColors) ? colors.shift() : this.defaultColor;
            let newFilterItem = new FilterItem(availableCLO, isSelected, color);
            filterItems.push(newFilterItem);

        }
        return filterItems;
    }

    // Public methods
    public Initialize(availableCLOs: BaseCLO[], selectedCLOs: BaseCLO[], showColors:boolean = false) {
        if (this.wasInitialized === true) {
            throw new Error("IndicatorsFiltersPanel -> was already initialized");
        }
        this.wasInitialized = true;

        // Generate FilterItems
        this.showColors = showColors;
        this.viewModel.FilterItems = this.generateFilterItems(availableCLOs, selectedCLOs);
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