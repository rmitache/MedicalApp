// Angular and 3rd party stuff
import { Component, Input, EventEmitter, Output, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NgForm, AbstractControl } from '@angular/forms';
import { AutoComplete } from 'primeng/primeng';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Project modules
import * as Enums from 'SPA/DomainModel/enum-exports';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import { ISymptomTypesSearchService } from 'SPA/Components/Pages/HomePage/HealthGraph/AddNewHealthStatusEntry/add-new-health-status-entry.component';


@Component({
    selector: 'symptom-entry-elem',
    templateUrl: './symptom-entry-elem.component.html',
    styleUrls: ['./symptom-entry-elem.component.css'],
    host: { 'class': 'symptom-entry-elem' }
})
export class SymptomEntryElemComponent {
    // Fields
    @Input('SymptomEntryCLO')
    private readonly symptomEntryCLO: CLOs.SymptomEntryCLO;
    private isValid: boolean = false;
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
        SymptomEntryCLO: null,
        GetSelectedIntensityDefinition: () => {
            var selectedDef = this.symptomIntensityDefinitions.find((def) => {
                return def.IntensityLevel === this.viewModel.SymptomEntryCLO.IntensityLevel;
            });
            return selectedDef;
        }
    };

    // Private methods
    private refreshIsValid() {
        let prevIsValid = this.isValid;
        this.isValid = (this.viewModel.SymptomEntryCLO.IntensityLevel !== Enums.SymptomIntensityLevel.NotPresent);

        if (prevIsValid !== this.isValid) {
            this.ValidStateChanged.emit();
        }
    }

    // Constructor 
    ngOnInit() {
        this.viewModel.SymptomEntryCLO = this.symptomEntryCLO;
    }

    // Public methods
    public GetValidState() {
        return this.isValid;
    }

    // Events 
    @Output() public ValidStateChanged: EventEmitter<any> = new EventEmitter();

    // EventHandlers
    private onIntensityLevelClicked(def: SymptomIntensityDefinition) {
        this.viewModel.SymptomEntryCLO.IntensityLevel = def.IntensityLevel;
        this.refreshIsValid();
    }
}

interface ViewModel {
    SymptomEntryCLO: CLOs.SymptomEntryCLO;
    GetSelectedIntensityDefinition(): SymptomIntensityDefinition;
}


interface SymptomIntensityDefinition {
    IntensityLevel: Enums.SymptomIntensityLevel;
    Label: string;
    Color: string;
}