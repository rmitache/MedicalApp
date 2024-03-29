// Angular and 3rd party stuff
import { Component, Input } from '@angular/core';

// Project modules
import * as Enums from 'SPA/DomainModel/enum-exports';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import { SymptomTypeWithAvgIntensity } from '../../../../../DomainModel/Indicators/Symptoms/CLOServices/health-status-entry-clo.service';


@Component({
    selector: 'symptom-type-elem',
    templateUrl: './symptom-type-elem.component.html',
    styleUrls: ['./symptom-type-elem.component.css'],
    host: { 'class': 'symptom-type-elem' }
})
export class SymptomTypeElemComponent {
    // Fields
    @Input('SymptomTypeWithAvgIntensity')
    private readonly symptomTypeWithAvgIntensity: SymptomTypeWithAvgIntensity;
    private readonly symptomIntensityDefinitions: SymptomIntensityDefinition[] = [
        {
            IntensityLevel: Enums.SymptomIntensityLevel.Mild,
            Color: '#fff19b',
            LabelColor: 'gray',
            Label: 'Mild'
        },
        {
            IntensityLevel: Enums.SymptomIntensityLevel.Moderate,
            Color: 'orange',
            LabelColor: 'white',
            Label: 'Moderate'
        },
        {
            IntensityLevel: Enums.SymptomIntensityLevel.Severe,
            Color: 'red',
            LabelColor: 'white',
            Label: 'Severe'
        }];
    private readonly viewModel: ViewModel = {
        SymptomTypeWithAvgIntensity: null,
        SelectedIntensityDef: null,

        
    };

    // Private methods
    private getMatchingIntensityDefinition(avgIntensity: number): SymptomIntensityDefinition {
        let targetIntensity: Enums.SymptomIntensityLevel;
        if (avgIntensity === 0) {
            targetIntensity = Enums.SymptomIntensityLevel.NotPresent;

        } else if (avgIntensity > 0 && avgIntensity <= 1) {
            targetIntensity = Enums.SymptomIntensityLevel.Mild;

        } else if (avgIntensity > 1 && avgIntensity <= 2) {
            targetIntensity = Enums.SymptomIntensityLevel.Moderate;

        } else if (avgIntensity > 2 && avgIntensity <= 3) {
            targetIntensity = Enums.SymptomIntensityLevel.Severe;
        }


        // Get the definition
        return this.symptomIntensityDefinitions.find((def) => {
            return def.IntensityLevel === targetIntensity;
        });
    }

    // Constructor 
    ngOnInit() {
        this.viewModel.SymptomTypeWithAvgIntensity = this.symptomTypeWithAvgIntensity;
        this.viewModel.SelectedIntensityDef = this.getMatchingIntensityDefinition(this.symptomTypeWithAvgIntensity.AvgIntensity);
    }
}

interface ViewModel {
    SymptomTypeWithAvgIntensity: SymptomTypeWithAvgIntensity;
    SelectedIntensityDef: SymptomIntensityDefinition;

}


interface SymptomIntensityDefinition {
    IntensityLevel: Enums.SymptomIntensityLevel;
    Label: string;
    LabelColor: string;
    Color: string;
}