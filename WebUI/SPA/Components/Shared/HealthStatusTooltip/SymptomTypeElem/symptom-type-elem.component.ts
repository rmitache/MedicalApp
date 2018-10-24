// Angular and 3rd party stuff
import { Component, Input, EventEmitter, Output, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NgForm, AbstractControl } from '@angular/forms';
import { AutoComplete } from 'primeng/primeng';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Project modules
import * as Enums from 'SPA/DomainModel/enum-exports';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import { ISymptomTypesSearchService } from 'SPA/Components/Pages/HomePage/HealthGraph/AddNewHealthStatusEntry/add-new-health-status-entry.component';
import { SymptomTypeWithAvgIntensity } from '../../../../DomainModel/Indicators/Symptoms/CLOServices/health-status-entry-clo.service';


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
            Color: '#f3e06a',
            Label: 'Mild'
        },
        {
            IntensityLevel: Enums.SymptomIntensityLevel.Moderate,
            Color: 'Orange',
            Label: 'Moderate'
        },
        {
            IntensityLevel: Enums.SymptomIntensityLevel.Severe,
            Color: 'Red',
            Label: 'Severe'
        }];

    private readonly viewModel: ViewModel = {
        SymptomTypeWithAvgIntensity: null,
        GetBGColorForIntensity: (avgIntensity:number) => {

            return '';
        }
    };


    // Constructor 
    ngOnInit() {
        this.viewModel.SymptomTypeWithAvgIntensity = this.symptomTypeWithAvgIntensity;
    }
}

interface ViewModel {
    SymptomTypeWithAvgIntensity: SymptomTypeWithAvgIntensity;
    GetBGColorForIntensity(avgIntensity: number): string;
}


interface SymptomIntensityDefinition {
    IntensityLevel: Enums.SymptomIntensityLevel;
    Label: string;
    Color: string;
}