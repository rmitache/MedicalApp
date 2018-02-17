export class Time {
    constructor(public readonly Hours: number, public readonly Minutes: number) {
    }

    public ToSeconds(): number {
        let seconds = (this.Hours * 3600) + (this.Minutes * 60);
        return seconds;
    }
    public ToString(): string {
        let strHours: string, strMins: string;
        strHours = (this.Hours < 10) ? (' ' + this.Hours) : this.Hours + '';
        strMins = (this.Minutes < 10) ? ('0' + this.Minutes) : this.Minutes + '';
        return strHours + ":" + strMins;
    }
}

export class Range<T> {
    constructor(public readonly IntervalStart: T, public readonly IntervalEnd: T) {
    }

}

export class TimeRange extends Range<Time> {


    constructor(public readonly IntervalStart: Time, public readonly IntervalEnd: Time) {
        super(IntervalStart, IntervalEnd);
    }

    public ContainsTime(time: Time): boolean {
        if (time.ToSeconds() >= this.IntervalStart.ToSeconds() &&
            time.ToSeconds() <= this.IntervalEnd.ToSeconds())
            return true;
        else
            return false;
    }
}

export class DaysInWeek {
    public readonly Days = {
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: false
    };

    constructor(array: boolean[]) {
        let index = 0;
        for (var key in this.Days) {

            this.Days[key] = array[index];

            // 
            index++;
        }
    }
}

export function ParseStringToTime(str: string): Time {
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