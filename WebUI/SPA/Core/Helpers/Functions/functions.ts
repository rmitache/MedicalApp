import * as moment from 'moment';
import { Range } from 'SPA/Core/Helpers/DataStructures/misc';
import { FormGroup, FormControl } from '@angular/forms';


export function GetEnumEntryByIndex(enumRef: any, index: number): any {

    let count = -1;

    for (var key in enumRef) {
        count++;
        if (count === index) {
            return key;
        }

    }

    return null;
}

export function EnumerateDaysBetweenDates(startDate: Date, endDate: Date, includeEdges: boolean): Date[] {
    var dates = [];

    var currDate = moment(startDate).startOf('day');
    var lastDate = moment(endDate).startOf('day');

    if (includeEdges) {
        currDate = currDate.subtract(1, 'days');
        lastDate = lastDate.add(1, 'days');
    }

    while (currDate.add(1, 'days').diff(lastDate) < 0) {
        dates.push(currDate.clone().toDate());
    }

    return dates;
};

export function EnumerateDaysBetweenDatesUsingMoment(range: Range<moment.Moment>, includeEdges: boolean): moment.Moment[] {
    var momentDates = [];

    var currDate = range.RangeStart.clone().startOf('day');
    var lastDate = range.RangeEnd.clone().startOf('day');

    if (includeEdges) {
        currDate = currDate.subtract(1, 'days');
        lastDate = lastDate.add(1, 'days');
    }

    while (currDate.add(1, 'days').diff(lastDate) < 0) {
        momentDates.push(currDate.clone());
    }

    return momentDates;
};

export function RandomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function StringToColour(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 0xFF;
        colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
}

// Returns a range of dates starting at the beginning of a month and ending at the end of a month 
export function GetMonthRangeWithPaddingUsingMoment(refStartDate: moment.Moment, refEndDate: moment.Moment, padding: number) {
    if (padding < 0) {
        throw new Error('GetMonthRangeWithPadding - padding must be non-negative');
    }

    // Start
    var startPaddedDate = refStartDate.clone().add(-padding, 'months');
    var actualStartDate = startPaddedDate.startOf('month').startOf('day');

    // End
    var endPaddedDate = refEndDate.clone().add(padding, 'months');
    var actualEndDate = endPaddedDate.endOf('month').endOf('day');


    //
    var range = new Range<moment.Moment>(actualStartDate, actualEndDate);
    return range;
}

export function RemoveWhitespace(str: string): string {
    return str.replace(/ /g, '');
}

export function ValidateAllFields(formGroup: FormGroup) {         
    Object.keys(formGroup.controls).forEach(field => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
            control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {
            ValidateAllFields(control);
        }
    });
}