import * as moment from 'moment';
import { Range, Time } from 'SPA/Core/Helpers/DataStructures/misc';
import { FormGroup, FormControl } from '@angular/forms';


// Enums
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

// Dates
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
export function GetNrOfDaysBetweenDates(firstDate: Date, secondDate: Date, includeEdges: boolean = true) {

	return GetNrOfDaysBetweenDatesUsingMoment(moment(firstDate), moment(secondDate), includeEdges);
}
export function GetNrOfDaysBetweenDatesUsingMoment(firstDate: moment.Moment, secondDate: moment.Moment, includeEdges: boolean = true) {

	var largestDate;
	var smallestDate;
	if (firstDate.isSameOrAfter(secondDate)) {
		largestDate = moment(firstDate).clone().endOf('day');
		smallestDate = moment(secondDate).clone().startOf('day');
	} else {
		largestDate = moment(secondDate).clone().endOf('day');
		smallestDate = moment(firstDate).clone().startOf('day');
	}

	var nrOfDays = largestDate.diff(smallestDate, 'days');

	if (includeEdges) {
		nrOfDays += 1;
	}




	return nrOfDays;
}
export function GetDateIndexInTargetRange(date: moment.Moment, targetDateRange: Range<moment.Moment>) {
	var datesInRange = EnumerateDaysBetweenDatesUsingMoment(targetDateRange, true);
	for (var i = 0; i < datesInRange.length; i++) {
		var datesMatch = datesInRange[i].isSame(date, 'days');
		if (datesMatch) {
			return i;
		}
	}

	return null;
}
/* 
 * Returns a range of dates starting at the beginning of a month and ending at the end of a month 
 */
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
export function IsDateOnFirstOrLastDateInMonth(date: moment.Moment) {
	let firstDateInMonth = date.clone().startOf('month');
	let lastDateInMonth = date.clone().endOf('month');
	let isFirstDate = date.isSame(firstDateInMonth, 'day');
	let isLastDate = date.isSame(lastDateInMonth, 'day');

	return isFirstDate || isLastDate;

}



// Numbers
export function RandomIntFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
export function GetOrdinalSuffix(nr:number) {
    var j = nr % 10,
        k = nr % 100;
    if (j == 1 && k != 11) {
        return nr + "st";
    }
    if (j == 2 && k != 12) {
        return nr + "nd";
    }
    if (j == 3 && k != 13) {
        return nr + "rd";
    }
    return nr + "th";
}

// Colors
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
export function HexToRgbA(hex, opacity: number) {
    if (hex === null) {
        return '';
    }

    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length == 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + opacity +')';
    }
    throw new Error('Bad Hex');
}


// Strings
export function RemoveWhitespace(str: string): string {
	return str.replace(/ /g, '');
}

// Validation
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

// Datastructures
export function ConvertArrayToDictionary<T>(array: Array<T>, indexKey: keyof T) {
	const normalizedObject: any = {}
	for (let i = 0; i < array.length; i++) {
		const key = array[i][indexKey]
		normalizedObject[key] = array[i]
	}
	return normalizedObject as { [key: string]: T }
}
export function ConvertDictionaryToArray<T>(dictionary: { [key: string]: T }) {
	var array: Array<T> = [];
	for (var key in dictionary) {
		array.push(dictionary[key]);
	}

	return array;
}