// Angular and 3rd party stuff
import { Component, ChangeDetectorRef, EventEmitter, Output, Input, forwardRef } from '@angular/core';
import * as moment from 'moment';
import * as momentRange from 'moment-range';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

// Project modules
import { Time, Range, TimeRange } from 'SPA/Core/Helpers/DataStructures/misc';
import { DateRangeMode } from 'SPA/Core/Helpers/Enums/enums';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgModel } from '@angular/forms';

@Component({
    selector: 'custom-checkbox',
    templateUrl: './custom-checkbox.component.html',
    styleUrls: ['./custom-checkbox.component.css'],
    host: { 'class': 'custom-checkbox' },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CustomCheckboxComponent),
            multi: true
        }
    ]
})
export class CustomCheckboxComponent implements ControlValueAccessor  {
    // Fields
    @Input() ngModel: NgModel;
    @Input('LabelText')
    private labelText = ""; 
    private isChecked: boolean;
    

    // ControlValueAccessor implementation
    writeValue(value: any) {
        this.isChecked = value;
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched(fn) {
    }
    private propagateChange = (_: any) => { };

    // Event handlers
    private onClicked() {
        
        this.isChecked = !this.isChecked;
        this.propagateChange(this.isChecked);
        
    }
}

