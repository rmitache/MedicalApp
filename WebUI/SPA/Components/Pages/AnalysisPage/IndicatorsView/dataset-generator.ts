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
export class HealthStatusDatasetGenerator {

    // Fields
    private readonly dateFormatForDictionaryKey = 'DD/MM/YYYY';

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
        if (healthStatusEntryCLOs.length > 0) {
            avgHealthLevel = sum / healthStatusEntryCLOs.length;
        }
        else {
            avgHealthLevel = null;
        }

        if (avgHealthLevel === 0) {
            avgHealthLevel = 0.2;
        }

		//if (avgHealthLevel >= 0) {
		//	color = '#9dc340';
		//} else if (avgHealthLevel < 0) {
		//	color = '#fe6060'
		//} 

		
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
            color = '#e2d77e';
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
    private createDictionaryByDateForHealthStatusCLOs(preFilteredHealthStatusEntriesCLOs: CLOs.HealthStatusEntryCLO[], range: Range<moment.Moment>)
        : { [dateKey: string]: CLOs.HealthStatusEntryCLO[] } {
        var datesToHealthStatusCLOsDictionary: { [dateKey: string]: CLOs.HealthStatusEntryCLO[] } = {};

        preFilteredHealthStatusEntriesCLOs.forEach((clo, index) => {
            let dateKey = moment(clo.OccurrenceDateTime, moment.ISO_8601).format(this.dateFormatForDictionaryKey);

            // Create the entry in the dictionary for the date if it's the first one
            if (datesToHealthStatusCLOsDictionary[dateKey] === undefined) {
                datesToHealthStatusCLOsDictionary[dateKey] = [];
            };
            datesToHealthStatusCLOsDictionary[dateKey].push(clo);
        });

        return datesToHealthStatusCLOsDictionary;
    }

    // Public methods
    public GenerateDataSet(preFilteredHealthStatusEntriesCLOs: CLOs.HealthStatusEntryCLO[], range: Range<moment.Moment>): HealthStatusDataset {

        // Variables
        var datesToHealthStatusCLOsDictionary = this.createDictionaryByDateForHealthStatusCLOs(preFilteredHealthStatusEntriesCLOs, range);
        let newDataSet: HealthStatusDataset = {
            data: [],
            backgroundColor: []
        };

        // Adjust the range to cut it off on today's date (if it intersects with it)
        let today = moment();
        let todayIsInRange = today.isSameOrBefore(range.RangeEnd, 'day') && today.isSameOrAfter(range.RangeStart, 'day');
        let cutOffRangeEnd = (todayIsInRange) ? today.endOf('day') : range.RangeEnd;


        // Loop through ALL dates in the range and create datapoints
        let datesInRangeArray = HelperFunctions.EnumerateDaysBetweenDatesUsingMoment(range, true);
        datesInRangeArray.forEach((date, index) => {

            // Get the HealthStatusCLOs for the date
            let dateKey = date.format(this.dateFormatForDictionaryKey);
            let healthStatusCLOsInDate = (datesToHealthStatusCLOsDictionary[dateKey] !== undefined) ? datesToHealthStatusCLOsDictionary[dateKey] : [];

            // Create the datapoint for HealthStatusLevel for the current date
            let avgHealthLevelAndColorInfo = this.getAverageHealthLevelAndColorForSingleDate(healthStatusCLOsInDate);
            let dp: DataPoint = {
                x: date,
                y: avgHealthLevelAndColorInfo.AvgHealthLevel
            };
            newDataSet.data.push(dp);
            newDataSet.backgroundColor.push(avgHealthLevelAndColorInfo.Color);

        });

        return newDataSet;
    }
}

@Injectable()
export class SymptomTypeDatasetGenerator {

    // Fields
    private readonly dateFormatForDictionaryKey = 'DD/MM/YYYY';

    // Private methods
    private createDictionaryByDateForHealthStatusCLOs(preFilteredHealthStatusEntriesCLOs: CLOs.HealthStatusEntryCLO[], range: Range<moment.Moment>)
        : { [dateKey: string]: CLOs.HealthStatusEntryCLO[] } {
        var datesToHealthStatusCLOsDictionary: { [dateKey: string]: CLOs.HealthStatusEntryCLO[] } = {};

        preFilteredHealthStatusEntriesCLOs.forEach((clo, index) => {
            let dateKey = moment(clo.OccurrenceDateTime, moment.ISO_8601).format(this.dateFormatForDictionaryKey);

            // Create the entry in the dictionary for the date if it's the first one
            if (datesToHealthStatusCLOsDictionary[dateKey] === undefined) {
                datesToHealthStatusCLOsDictionary[dateKey] = [];
            };
            datesToHealthStatusCLOsDictionary[dateKey].push(clo);
        });

        return datesToHealthStatusCLOsDictionary;
    }
    private getAvgIntensityForEachSymptomTypeForSingleDate(healthStatusEntryCLOs: CLOs.HealthStatusEntryCLO[], ) {

        // Variables
        let valuesPerSymptomType: { [symptomTypeName: string]: number[] } = {};
        let avgValuePerSymptomType: { [symptomTypeName: string]: number } = {};

        // Loop through healthStatusEntries and their symptomEntries
        healthStatusEntryCLOs.forEach((healthStatusEntryCLO) => {
            healthStatusEntryCLO.SymptomEntries.forEach((symptomEntryCLO) => {
                let symptomTypeName = symptomEntryCLO.SymptomType.Name;

                if (valuesPerSymptomType[symptomTypeName] === undefined) {
                    valuesPerSymptomType[symptomTypeName] = [];
                }

                // Add the intensity as a value to the valuesPerSymptomType array
                valuesPerSymptomType[symptomTypeName].push(symptomEntryCLO.IntensityLevel as number);
            });
        });

        // Calculate the averages per symptomType
        for (var symptomTypeName in valuesPerSymptomType) {
            let arrayOfSymptomTypeValues = valuesPerSymptomType[symptomTypeName];

            // 
            if (arrayOfSymptomTypeValues === undefined) {
                avgValuePerSymptomType[symptomTypeName] = null;
            } else {
                let sum = arrayOfSymptomTypeValues.reduce((a, b) => a + b, 0);
                let computedAverage = sum / arrayOfSymptomTypeValues.length;
                avgValuePerSymptomType[symptomTypeName] = computedAverage;
            }
        }

        return avgValuePerSymptomType;
    }

    // Public methods
    public GenerateDataSets(availableSymptomTypes: CLOs.SymptomTypeCLO[],
        preFilteredHealthStatusEntriesCLOs: CLOs.HealthStatusEntryCLO[],
        range: Range<moment.Moment>): { [symptomTypeName: string]: SymptomTypeDataset } {

        // Variables
        var datesToHealthStatusCLOsDictionary = this.createDictionaryByDateForHealthStatusCLOs(preFilteredHealthStatusEntriesCLOs, range);
        let newDataSetsDictionary: { [symptomTypeName: string]: SymptomTypeDataset } = {};
        availableSymptomTypes.forEach(symptomTypeCLO => {
            newDataSetsDictionary[symptomTypeCLO.Name] = {
                borderWidth: 2.5,
                borderColor: 'red',
                backgroundColor: 'transparent',
                type: 'line',
                data: []
            };
        });


        // Adjust the range to cut it off on today's date (if it intersects with it)
        let today = moment();
        let todayIsInRange = today.isSameOrBefore(range.RangeEnd, 'day') && today.isSameOrAfter(range.RangeStart, 'day');
        let cutOffRangeEnd = (todayIsInRange) ? today.endOf('day') : range.RangeEnd;


        // Loop through ALL dates in the range and create datapoints
        let targetRange = new Range<moment.Moment>(range.RangeStart, cutOffRangeEnd);
        let datesInRangeArray = HelperFunctions.EnumerateDaysBetweenDatesUsingMoment(targetRange, true);
        datesInRangeArray.forEach((date, index) => {

            // Get the HealthStatusCLOs for the date
            let dateKey = date.format(this.dateFormatForDictionaryKey);
            let healthStatusCLOsInDate = (datesToHealthStatusCLOsDictionary[dateKey] !== undefined) ? datesToHealthStatusCLOsDictionary[dateKey] : [];

            // Add a datapoint for each symptomType
            let avgIntensityValuePerSymptomTypeDictionary = this.getAvgIntensityForEachSymptomTypeForSingleDate(healthStatusCLOsInDate);
            for (var symptomTypeName in newDataSetsDictionary) {
                let avgValue = avgIntensityValuePerSymptomTypeDictionary[symptomTypeName];
                let targetDataset = newDataSetsDictionary[symptomTypeName];

                // Default the average intensity to 0 if it is null 
                if (avgValue === null || avgValue === undefined) {
                    avgValue = 0;
                }

                // Create the datapoint and add it to the targetDataSet
                let newSymptomTypeDataPoint: DataPoint = {
                    x: date,
                    y: avgValue
                };
                targetDataset.data.push(newSymptomTypeDataPoint);
            }

        });


        //
        return newDataSetsDictionary;
    }
}




// Interfaces
export interface DataPoint {
    x: moment.Moment;
    y: number;
}
export interface HealthStatusDataset {
    data: DataPoint[];
    backgroundColor: string[];
}
export interface SymptomTypeDataset {
    type: string;
    borderWidth: number;
    borderColor: string;
    backgroundColor: string;
    data: DataPoint[];
}
interface AverageHealthLevelPerDay {
    AvgHealthLevel: number;
    Color: string;
}

