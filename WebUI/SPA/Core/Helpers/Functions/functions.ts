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

//export function GetLocalTime(utcTime: Time) {
//	var clientTZOffsetInMinutes = new Date().getTimezoneOffset();
//	//let utcMoment = moment(utcTime.ToString(), 'HH:mm').format("HH:mm");
//	var testTime = new Time(23, 30);
//	let localMoment = moment.utc(testTime.ToString(), 'HH:mm').local().format("hh:mm");
	

//}
///* Creates a string with the same Year, Date, Hours, Minutes, Seconds as the given local datetime and with UTC tz*/
//export function GetUTCTimeStringFromLocalWithoutChangingOffset(date:Date): string {
//	var mom = moment(date);
//	mom.utcOffset('+00:00', true);

//	return mom.format();
//}
///* Creates a moment with the same Year, Date, Hours, Minutes, Seconds as the given UTC string without performing any conversion */
//export function GetLocalTimeFromUTCStringWithoutChangingOffset(utcString: string): moment.Moment {
//	var clientTZOffsetInMinutes = new Date().getTimezoneOffset();
//	var baseMoment = moment(utcString);
//	baseMoment.add(clientTZOffsetInMinutes, 'minutes');

//	return baseMoment;
//}

//export function ToLocalDateTime(utcString: string) {
//	var date = new Date(utcString);
//	return date;
//}
//export function ToUTCString(localDateTime: Date) {
//	var utcString = localDateTime.toJSON();
//	return utcString;
//}





// Numbers
export function RandomIntFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
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