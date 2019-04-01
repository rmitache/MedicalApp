// Angular and 3rd party stuff
import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import * as moment from 'moment';
import * as momentRange from 'moment-range';

// Project modules
import { Time, Range, TimeRange } from 'SPA/Core/Helpers/DataStructures/misc';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import { SymptomTypeDatasetItem } from '../indicators-view.component';

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
        FilterItems: null
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

    // Public methods
    public InitializeItems(dataSetItems: SymptomTypeDatasetItem[]) {
        this.viewModel.FilterItems = dataSetItems;
    }

    // Events
    @Output() public SymptomTypeToggleTriggered: EventEmitter<SymptomTypeDatasetItem> = new EventEmitter();

    // Event handlers
    private onFilterItemClicked(item: SymptomTypeDatasetItem) {
        this.SymptomTypeToggleTriggered.emit(item);
    }

}

interface ViewModel {
    FilterItems: SymptomTypeDatasetItem[];
}

