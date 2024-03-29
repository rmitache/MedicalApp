﻿import * as moment from 'moment';


export class Time {



    // Constructors
    constructor(public readonly Hours: number, public readonly Minutes: number) {
    }

    // Static creation methods
    public static ParseString(str: string): Time {

        // Check for colon
        let strArray = str.split(':');
        if (strArray.length !== 2) {
            return null;
        }

        // Parse Hours
        let hours = Number(strArray[0]);
        if (isNaN(hours) || strArray[0].length > 2 || hours < 0 || hours > 23) {
            return null;
        }

        // Parse Minutes
        let minutes = Number(strArray[1]);
        if (isNaN(minutes) || strArray[1].length < 2 || strArray[1].length > 2 || minutes < 0 || minutes > 59) {
            return null;
        }

        // Create Time instance
        let timeObj: Time = new Time(hours, minutes);
        return timeObj;
    }
    public static ParseJSON(json: string): Time {

        let time = new Time(parseInt(json['Hours']), parseInt(json['Minutes']));
        return time;
    }
    public static ParseJSONArray(jsonArray: any[]): Time[] {
        let array: Time[] = [];
        if (jsonArray === null) {
            return array;
        }

        for (var i = 0; i < jsonArray.length; i++) {
            let time = new Time(parseInt(jsonArray[i]['Hours']), parseInt(jsonArray[i]['Minutes']));
            array.push(time);
        }

        return array;
    }

    // Public methods
    public ToSeconds(): number {
        let seconds = (this.Hours * 3600) + (this.Minutes * 60);
        return seconds;
    }
    public ToString(): string {
        let strHours: string, strMins: string;
        strHours = (this.Hours < 10) ? ('' + this.Hours) : this.Hours + '';
        strMins = (this.Minutes < 10) ? ('0' + this.Minutes) : this.Minutes + '';
        return strHours + ":" + strMins;
    }

}


export class Range<T> {
    constructor(public readonly RangeStart: T, public readonly RangeEnd: T) {
    }


}

export class TimeRange extends Range<Time> {


    constructor(public readonly RangeStart: Time, public readonly RangeEnd: Time) {
        super(RangeStart, RangeEnd);
    }

    public ContainsTime(time: Time): boolean {
        if (time.ToSeconds() >= this.RangeStart.ToSeconds() &&
            time.ToSeconds() <= this.RangeEnd.ToSeconds())
            return true;
        else
            return false;
    }
}

export class DaysInWeek {

    public Monday: boolean = true;
    public Tuesday: boolean = true;
    public Wednesday: boolean = true;
    public Thursday: boolean = true;
    public Friday: boolean = true;
    public Saturday: boolean = true;
    public Sunday: boolean = true;

    // Constructor
    constructor(array?: boolean[]) {
        if (array === null || array === undefined) {
            return;
        }

        if (array.length > 0) {
            this.Monday = array[0];
        }
        if (array.length > 1) {
            this.Tuesday = array[1];
        }
        if (array.length > 2) {
            this.Wednesday = array[2];
        }
        if (array.length > 3) {
            this.Thursday = array[3];
        }
        if (array.length > 4) {
            this.Friday = array[4];
        }
        if (array.length > 5) {
            this.Saturday = array[5];
        }
        if (array.length > 6) {
            this.Sunday = array[6];
        }
    }
    public static FromJSON(blo: any): DaysInWeek {
        let newObj = new DaysInWeek();
        newObj.Monday = blo['Monday'];
        newObj.Tuesday = blo['Tuesday'];
        newObj.Wednesday = blo['Wednesday'];
        newObj.Thursday = blo['Thursday'];
        newObj.Friday = blo['Friday'];
        newObj.Saturday = blo['Saturday'];
        newObj.Sunday = blo['Sunday'];

        return newObj;
    }

    // Public methods
    public Clone(): DaysInWeek {
        return new DaysInWeek([
            this.Monday,
            this.Tuesday,
            this.Wednesday,
            this.Thursday,
            this.Friday,
            this.Saturday,
            this.Sunday
        ]);
    }
    public ResetAllDaysToTrue() {
        this.Monday = true;
        this.Tuesday = true;
        this.Wednesday = true;
        this.Thursday = true;
        this.Friday = true;
        this.Saturday = true;
        this.Sunday = true;
    }
    public GetNrOfDaysWhichAreTrue() {
        let nrOfTrueDays = 0;
        if (this.Monday) {
            nrOfTrueDays++;
        }
        if (this.Tuesday) {
            nrOfTrueDays++;
        }
        if (this.Wednesday) {
            nrOfTrueDays++;
        }
        if (this.Thursday) {
            nrOfTrueDays++;
        }
        if (this.Friday) {
            nrOfTrueDays++;
        }
        if (this.Saturday) {
            nrOfTrueDays++;
        }
        if (this.Sunday) {
            nrOfTrueDays++;
        }

        return nrOfTrueDays;
    }
    public ToString() {
        let arr: string[] = [];
        if (this.Monday) {
            arr.push('Mon');
        }
        if (this.Tuesday) {
            arr.push('Tue');
        }
        if (this.Wednesday) {
            arr.push('Wed');
        }
        if (this.Thursday) {
            arr.push('Thu');
        }
        if (this.Friday) {
            arr.push('Fri');
        }
        if (this.Saturday) {
            arr.push('Sat');
        }
        if (this.Sunday) {
            arr.push('Sun');
        }

        // 
        let returnStr = '';
        for (let i = 0; i < arr.length; i++) {
            returnStr += arr[i] + ' ';
        }

        return returnStr;
    }
}

export class CoordinatePair {

    constructor(public readonly X: number, public readonly Y: number) {
    }
}

