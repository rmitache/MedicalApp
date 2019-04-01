// Angular and 3rd party stuff
import { Component, ChangeDetectorRef, ApplicationRef, Input } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';

// Project modules
import { Time, Range, TimeRange } from 'SPA/Core/Helpers/DataStructures/misc';
import * as CLOs from 'SPA/DomainModel/clo-exports';

// Components


@Component({
    selector: '[today-indicator]',
    templateUrl: './today-indicator.component.html',
    styleUrls: ['./today-indicator.component.css'],
    host: { 'class': 'today-indicator' },
})
export class TodayIndicatorComponent {
    // Fields
    @Input('XPos')
    private xPos: number = 0;
    @Input('YPos')
    private yPos: number = 0;
}
