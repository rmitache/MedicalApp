// Angular and 3rd party stuff
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as momentRange from 'moment-range';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import * as DataStructures from 'SPA/Core/Helpers/DataStructures/data-structures';
import { MedicineTypeCLOFactory } from 'SPA/DomainModel/Factors/Medicine/CLOFactories/medicine-type-clo.factory';
import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import { ICLOFactory } from 'SPA/Core/CLO/i-clo.factory';
import { RuleCLOFactory } from 'SPA/DomainModel/Plans/CLOFactories/rule-clo.factory';
import { GetNrOfDaysBetweenDatesUsingMoment, ConvertDictionaryToArray } from 'SPA/Core/Helpers/Functions/functions';

@Injectable()
export class HealthStatusEntryCLOService {
	// Public Methods
	public GetUniqueSymptomTypesWithAvgDose(healthEntryCLOs: CLOs.HealthStatusEntryCLO[]) {
		let symptomTypesDict: { [symptomTypeName: string]: SymptomTypeAndAvgIntensity } = {};

		
		// Loop through healthEntryCLOs  
		healthEntryCLOs.forEach((healthEntryCLO, index) => {
			healthEntryCLO.SymptomEntries.forEach((symptomEntryCLO, index) => {

				if (symptomTypesDict[symptomEntryCLO.SymptomType.Name] === undefined) {
					symptomTypesDict[symptomEntryCLO.SymptomType.Name] = new SymptomTypeAndAvgIntensity(symptomEntryCLO.SymptomType);
				}
				symptomTypesDict[symptomEntryCLO.SymptomType.Name].AddSymptomTypeIntensity(symptomEntryCLO.IntensityLevel as number);
			});
		});

		// Sort and return as array
		let uniqueSymptomTypesArray = ConvertDictionaryToArray<SymptomTypeAndAvgIntensity>(symptomTypesDict);
		uniqueSymptomTypesArray = uniqueSymptomTypesArray.sort((entry1, entry2) => (entry1.AvgIntensity > entry2.AvgIntensity ? -1 : 1));

		return uniqueSymptomTypesArray;
	}

}

// Special classes 

export class SymptomTypeAndAvgIntensity {

	// Fields
	private totalIntensitySum: number = 0;
	private numberOfSymptomEntries: number = 0;

	// Properties
	public get AvgIntensity(): number {
		return this.totalIntensitySum / this.numberOfSymptomEntries;
	}
	public get Color(): string {
		var colorCode = "";
		if (this.AvgIntensity < 3 && this.AvgIntensity >= 2) {
			colorCode = "red";
		} else if (this.AvgIntensity < 2 && this.AvgIntensity >= 1) {
			colorCode = "orange";
		} else if (this.AvgIntensity < 1 && this.AvgIntensity > 0) {
			colorCode = "yellow";
		}

		return colorCode;
	}

	// Constructor
	constructor(public readonly SymptomType: CLOs.SymptomTypeCLO) { }

	// Public methods
	public AddSymptomTypeIntensity(intensityLevel: number) {
		this.totalIntensitySum += intensityLevel;
		this.numberOfSymptomEntries++;
	}
}