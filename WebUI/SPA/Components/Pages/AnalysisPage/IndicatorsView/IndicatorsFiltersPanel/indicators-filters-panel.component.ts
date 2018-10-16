// Angular and 3rd party stuff
import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import * as moment from 'moment';
import * as momentRange from 'moment-range';

// Project modules
import { Time, Range, TimeRange } from 'SPA/Core/Helpers/DataStructures/misc';
import * as CLOs from 'SPA/DomainModel/clo-exports';

// Components


@Component({
    selector: 'indicators-filters-panel',
    templateUrl: './indicators-filters-panel.component.html',
    styleUrls: ['./indicators-filters-panel.component.css'],
    host: { 'class': 'indicators-filters-panel' },
})
export class IndicatorsFiltersPanelComponent {
    // Fields
    private readonly viewModel: ViewModel = {
        SymptomTypeFilterItems: null
    };

    // Private methods
    private isColorDark(colorCode: string) {
        if (!colorCode)
            return false;

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
    private generateFilterItems(availableCLOs: CLOs.SymptomTypeCLO[], selectedCLOs: CLOs.SymptomTypeCLO[]): SymptomTypeFilterItem[] {

        // Variables
        let filterItems: SymptomTypeFilterItem [] = [];

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
            let color = null;
            let newFilterItem = new SymptomTypeFilterItem(availableCLO, isSelected, color);
            filterItems.push(newFilterItem);

        }
        return filterItems;
    }


    // Public methods
    public InitializeItems(availableSymptomTypes: CLOs.SymptomTypeCLO[], selectedSymptomTypes: CLOs.SymptomTypeCLO[]) {
        this.viewModel.SymptomTypeFilterItems = this.generateFilterItems(availableSymptomTypes, selectedSymptomTypes);
    }

    // Events
    @Output() public SymptomTypeSelected: EventEmitter<CLOs.PlanCLO> = new EventEmitter();
    @Output() public SymptomTypeDeselected: EventEmitter<CLOs.PlanCLO> = new EventEmitter();

    // Event handlers
    private onFilterItemClicked(item: SymptomTypeFilterItem) {
        alert(item.SymptomTypeCLO.Name);
        //if (event.NewSelectionState === true) {
        //    this.SymptomTypeSelected.emit(event.CLO as CLOs.PlanCLO);
        //} else {
        //    this.SymptomTypeDeselected.emit(event.CLO as CLOs.PlanCLO);
        //}
    }

}

interface ViewModel {
    SymptomTypeFilterItems: SymptomTypeFilterItem[];
}

class SymptomTypeFilterItem {
    constructor(
        public SymptomTypeCLO: CLOs.SymptomTypeCLO,
        public IsSelected: boolean,
        public Color: string) {}
}