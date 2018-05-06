import { Component, Input } from '@angular/core';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { TimeGroupRepresentation } from 'SPA/Components/Pages/HomePage/Schedule/schedule.component';

@Component({
    selector: 'schedule-unit',
    templateUrl: './schedule-unit.component.html',
    styleUrls: ['./schedule-unit.component.css'],
    host: { 'class': 'schedule-unit' }
})
export class ScheduleUnitComponent {
    // Fields
    @Input('Title')
    private title: string = '';
    @Input('TimeGroupRepresentations')
    private timeGroupRepresentations: TimeGroupRepresentation[] = [];
    private unitDoseTypesEnum = Enums.UnitDoseType;
    private uomTypesEnum = Enums.UnitOfMeasure;
    private readonly viewModel: ViewModel = {
        Title: null,
        TimeGroups: null
    };


    // Constructor 
    constructor(
    ) {

    }
    ngOnInit() {
        this.viewModel.TimeGroups = this.timeGroupRepresentations;
        this.viewModel.Title = this.title;
    }
}

interface ViewModel {
    Title: string;
    TimeGroups: TimeGroupRepresentation[];
    
}

