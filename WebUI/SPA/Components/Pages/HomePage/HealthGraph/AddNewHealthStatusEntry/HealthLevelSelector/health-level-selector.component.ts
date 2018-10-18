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
    selector: 'health-level-selector',
    templateUrl: './health-level-selector.component.html',
    styleUrls: ['./health-level-selector.component.css'],
    host: { 'class': 'health-level-selector' }
})
export class HealthLevelSelectorComponent {
    // Fields
    private isValid: boolean = false;
    private readonly healthLevelDefinitions: HealthLevelDefinition[] = [
        {
            HealthLevel: Enums.HealthLevel.Great,
            Color: '#284e11',
            Label: 'Great'
        },
        {
            HealthLevel: Enums.HealthLevel.Good,
            Color: '#009e11',
            Label: 'Good'
        },
        {
            HealthLevel: Enums.HealthLevel.Ok,
            Color: '#b5d7a7',
            Label: 'Ok'
        },
        {
            HealthLevel: Enums.HealthLevel.NotGreat,
            Color: '#ff9900',
            Label: 'Not Great'
        },
        {
            HealthLevel: Enums.HealthLevel.Bad,
            Color: '#e06666',
            Label: 'Bad'
        },
        {
            HealthLevel: Enums.HealthLevel.VeryBad,
            Color: 'red',
            Label: 'Very Bad'
        }];
    private readonly viewModel: ViewModel = {
        SelectedHealthLevel: Enums.HealthLevel.Unspecified
    };

    // Constructor 
    constructor() {

    }
    ngOnInit() {

    }

    // Public methods
    public GetValidState() {
        return this.isValid;
    }

    // Events 
    @Output() public RemoveClicked: EventEmitter<any> = new EventEmitter();

    // EventHandlers
    private onHealthLevelClicked() {

    }
}

interface ViewModel {
    SelectedHealthLevel: Enums.HealthLevel;
}

interface HealthLevelDefinition {
    HealthLevel: Enums.HealthLevel;
    Label: string;
    Color: string;
}