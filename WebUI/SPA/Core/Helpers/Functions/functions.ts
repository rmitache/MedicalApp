import * as moment from 'moment';


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

export function EnumerateDaysBetweenDates(startDate: Date, endDate: Date, includeEdges: boolean) {
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

export function RandomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}