import { Component, Input } from '@angular/core';
import * as CLOs from 'SPA/DomainModel/clo-exports';

@Component({
    selector: 'factor-record-editable-item',
    templateUrl: './factor-record-editable-item.component.html',
    styleUrls: ['./factor-record-editable-item.component.css'],
    host: { 'class': 'factor-record-editable-item' }
})
export class FactorRecordEditableItem {
    // Fields
    //@Input('TimeGroupRepresentations')
    //private timeGroupRepresentations: TimeGroupRepresentation[] = [];
    //private readonly viewModel: ViewModel = {
    //    Title: null,
    //    TimeGroups: null
    //};


    // Constructor 
    constructor(
    ) {

    }
    ngOnInit() {
        

        //this.viewModel.TimeGroups = this.timeGroupRepresentations;
        //this.viewModel.Title = this.title;
    }
}

//interface ViewModel {
//    Title: string;
//    TimeGroups: TimeGroupRepresentation[];
//}

