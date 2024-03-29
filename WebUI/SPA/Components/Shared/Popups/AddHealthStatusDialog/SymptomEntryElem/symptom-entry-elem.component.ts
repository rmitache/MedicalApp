// Angular and 3rd party stuff
import { Component, Input, EventEmitter, Output, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';

// Project modules
import * as Enums from 'SPA/DomainModel/enum-exports';
import * as CLOs from 'SPA/DomainModel/clo-exports';


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
    private isValid: boolean = true;
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

        HoveredIntensityDef: null,
        SelectedIntensityDef: null,
        GetBGColorForIntensityElem: (def: SymptomIntensityDefinition) => {

            // Hover effect (takes precedence over selection effect)
            if (this.viewModel.HoveredIntensityDef !== null &&
                this.viewModel.HoveredIntensityDef.IntensityLevel >= def.IntensityLevel) {
                return this.viewModel.HoveredIntensityDef.Color;
            }

            // Select effect
            if (this.viewModel.SelectedIntensityDef !== null && 
                this.viewModel.SelectedIntensityDef.IntensityLevel >= def.IntensityLevel) {
                return this.viewModel.SelectedIntensityDef.Color;
            }


            return '';
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
        this.viewModel.SelectedIntensityDef = this.symptomIntensityDefinitions.find(def => {
            return def.IntensityLevel === this.viewModel.SymptomEntryCLO.IntensityLevel;

        });
    }

    // Public methods
    public GetValidState() {
        return this.isValid;
    }

    // Events 
    @Output() public ValidStateChanged: EventEmitter<any> = new EventEmitter();
    @Output() public RemoveTriggered: EventEmitter<any> = new EventEmitter();

    // EventHandlers
    private onIntensityLevelClicked(def: SymptomIntensityDefinition) {
        this.viewModel.SymptomEntryCLO.IntensityLevel = def.IntensityLevel;
        this.viewModel.SelectedIntensityDef = def;
        this.refreshIsValid();
    }
    private onIntensityLevelMouseEnter(def: SymptomIntensityDefinition) {
        this.viewModel.HoveredIntensityDef = def;
    }
    private onIntensityLevelMouseLeave(def: SymptomIntensityDefinition) {
        this.viewModel.HoveredIntensityDef = null;
    }
    private onRemoveClicked() {
        this.RemoveTriggered.emit(this.viewModel.SymptomEntryCLO);
    }
}

interface ViewModel {
    SymptomEntryCLO: CLOs.SymptomEntryCLO;

    HoveredIntensityDef: SymptomIntensityDefinition;
    SelectedIntensityDef: SymptomIntensityDefinition;
    GetBGColorForIntensityElem(def: SymptomIntensityDefinition): string;
}


interface SymptomIntensityDefinition {
    IntensityLevel: Enums.SymptomIntensityLevel;
    Label: string;
    Color: string;
}