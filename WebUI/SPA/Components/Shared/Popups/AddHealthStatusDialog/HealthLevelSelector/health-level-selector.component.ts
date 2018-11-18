// Angular and 3rd party stuff
import { Component, Input, EventEmitter, Output, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NgForm, AbstractControl } from '@angular/forms';
import { AutoComplete } from 'primeng/primeng';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Project modules
import * as Enums from 'SPA/DomainModel/enum-exports';
import * as CLOs from 'SPA/DomainModel/clo-exports';


@Component({
    selector: 'health-level-selector',
    templateUrl: './health-level-selector.component.html',
    styleUrls: ['./health-level-selector.component.css'],
    host: { 'class': 'health-level-selector' }
})
export class HealthLevelSelectorComponent {
    // Fields
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

    // Private methods
    private isColorDark(colorCode: string) {
       
        if (!colorCode)
            return false;

        var colorCode = colorCode.substring(1);      // strip #
        var rgb = parseInt(colorCode, 16);   // convert rrggbb to decimal
        var r = (rgb >> 16) & 0xff;  // extract red
        var g = (rgb >> 8) & 0xff;  // extract green
        var b = (rgb >> 0) & 0xff;  // extract blue

        var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

        if (luma < 110) {
            return true; // dark color
        } else {
            return false;
        }
    }


    // Events 
    @Output() public HealthLevelSelected: EventEmitter<any> = new EventEmitter();

    // EventHandlers
    private onHealthLevelClicked(targetHealthLevel) {
        this.viewModel.SelectedHealthLevel = targetHealthLevel;
        this.HealthLevelSelected.emit(targetHealthLevel);
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