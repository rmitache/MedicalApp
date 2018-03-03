export class Time {

    // Constructors
    constructor(public readonly Hours: number, public readonly Minutes: number) {
    }
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
    public static FromJSONArray(jsonArray: any[]): Time[] {
        let array:Time[] = [];
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
    public readonly Days = {
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: false
    };

    constructor(array?: boolean[]) {
        if (array === null || array === undefined) {
            return;
        }

        let index = 0;
        for (var key in this.Days) {

            this.Days[key] = array[index];

            // 
            index++;
        }
    }

    public static FromJSON(blo: any): DaysInWeek {
        let newObj = new DaysInWeek();
        newObj.Days.Monday = blo['Monday'];
        newObj.Days.Tuesday = blo['Tuesday'];
        newObj.Days.Wednesday = blo['Wednesday'];
        newObj.Days.Thursday = blo['Thursday'];
        newObj.Days.Friday = blo['Friday'];
        newObj.Days.Saturday = blo['Saturday'];
        newObj.Days.Sunday = blo['Sunday'];

        return newObj;
    }
}

