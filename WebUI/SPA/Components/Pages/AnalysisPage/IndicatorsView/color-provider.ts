// Angular and 3rd party stuff
import * as moment from 'moment';
import * as momentRange from 'moment-range';
import { Injectable } from '@angular/core';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { Time, Range, TimeRange } from 'SPA/Core/Helpers/DataStructures/misc';
import * as HelperFunctions from 'SPA/Core/Helpers/Functions/functions';

@Injectable()
export class ColorProvider {

    // Fields
    private readonly availableColors = [
        '#9c1a3a', // dark red
        '#000000', // black
        '#857717', // dark yellow
        '#0082c8', // blue
        '#625fad', // dark purple
        '#911eb4', // purple
        '#f032e6', // magenta
        '#008080', // teal
        '#aa6e28', // brown
        '#800000', // maroon
        '#1e5e14', // olive
        '#77ae87', // mint
        '#907355', // coral
        '#000080', // navy
        '#808080', // gray
        '#115c1b', // dark green
        '#61c1c1', // cyan
        '#9e4cbf', // light purple
        '#f032e6', // magenta
        '#008080', // teal
        '#795b4e', // brown
        '#800000', // maroon
        '#808000', // olive
        '#8aaa93', // mint
        '#ffd8b1', // coral
        '#000080', // navy
        '#808080', // gray
        '#000000', // black
        '#46f0f0', // cyan
        '#d2f53c', // lime
    ].reverse(); // reversed so colors are assigned in desc order
    private readonly poppedColors:string [] = [];

    // Public methods
    public GetNextColor() {
        if (this.availableColors.length === 0) {
            throw new Error('No more colors left');
        }

        let poppedColor = this.availableColors.pop();
        this.poppedColors.push(poppedColor);
        return poppedColor;
    }
    public PutBackColor(colorToPutBack:string) {
        if (this.poppedColors.length === 0) {
            throw new Error('No colors left to put back');
        }

        let indexAt = this.poppedColors.findIndex(color => {
            return color === colorToPutBack;
        });


        if (indexAt !== -1) {
            this.poppedColors.splice(indexAt, 1);
            this.availableColors.push(colorToPutBack);
        }
        
    }
}

