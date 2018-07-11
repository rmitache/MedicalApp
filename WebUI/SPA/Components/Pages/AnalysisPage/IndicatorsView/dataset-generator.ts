// Angular and 3rd party stuff
import * as moment from 'moment';
import * as momentRange from 'moment-range';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { Time, Range, TimeRange } from 'SPA/Core/Helpers/DataStructures/misc';


export class HealthLevelDataSetGenerator {

    // Private methods
    private getAverageHealthLevelAndColorForSingleDate(healthStatusEntryCLOs: CLOs.HealthStatusEntryCLO[]): AverageHealthLevelPerDay {

        // Variables
        var sum: number = 0;
        var avgHealthLevel = 0;
        var color = 'white';

        //  Calculate the Average Health Level (by adding all HealthLevels and dividing them by their number)
        healthStatusEntryCLOs.forEach(clo => {
            sum += clo.HealthLevel;
        });
        if (healthStatusEntryCLOs.length > 0)
            avgHealthLevel = sum / healthStatusEntryCLOs.length;
        else
            avgHealthLevel = null;
        if (avgHealthLevel === 0) {
            avgHealthLevel = 0.2;
        }

        // Determine the color
        if (avgHealthLevel >= 2) {
            // great
            color = 'green';
        }
        else if (avgHealthLevel >= 1 && avgHealthLevel < 2) {
            // good
            color = '#9dc340';
        }
        else if (avgHealthLevel >= 0 && avgHealthLevel < 1) {
            // ok
            color = '#cfe27e';
        }
        else if (avgHealthLevel > -0.8 && avgHealthLevel < 0) {
            // notgreat 
            color = '#ffc297';
        }
        else if (avgHealthLevel >= -2 && avgHealthLevel <= -0.8) {
            // bad 
            color = '#fe6060';
        }
        else if (avgHealthLevel < -1) {
            // very bad
            color = 'red';
        }


        //
        return {
            AvgHealthLevel: avgHealthLevel,
            Color: color
        };
    }

    // Public methods
    public GenerateDataSet(datesToCLOsDictionary: { [dateKey: string]: CLOs.HealthStatusEntryCLO[] }, currentSelDateRange: Range<moment.Moment>,
        selectedSymptomTypeCLOs: CLOs.SymptomTypeCLO[], symptomTypesToColorsDictionary: { [symptomTypeName: string]: string }): HealthLevelDataset {


        return null;
    }
}

export class SymptomTypeDataSetGenerator {

}



// 
interface AverageHealthLevelPerDay {
    AvgHealthLevel: number;
    Color: string;
}
interface Dataset {
    Data: DataPoint[];
}

interface HealthLevelDataset extends Dataset {
    BackgroundColor: string;
}
interface SymptomTypeDataset extends Dataset{
    BorderWidth: number;
    BorderColor: string;
    BackgroundColor: string;
    Type: string;
}

interface DataPoint {
    x: moment.Moment;
    y: number;
}