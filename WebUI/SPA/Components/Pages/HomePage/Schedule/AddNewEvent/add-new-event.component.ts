import { Component, Input, EventEmitter, Output, ComponentRef } from '@angular/core';
import * as moment from 'moment';
import { IModalDialog, IModalDialogOptions } from 'SPA/Core/Services/ModalDialogService/modal-dialog.interface';

@Component({
    selector: 'add-new-event',
    templateUrl: './add-new-event.component.html',
    styleUrls: ['./add-new-event.component.css'],
    host: { 'class': 'add-new-event' }
})
export class AddNewEventComponent implements IModalDialog {
    // Fields
    @Input('SelectedDate')
    private selectedDate: Date;
    private readonly viewModel: ViewModel = {

    };

    // Constructor 
    constructor(
    ) {


    }

    // IModalDialog
    dialogInit(reference: ComponentRef<IModalDialog>, options?: IModalDialogOptions) {
        //if (!options || !options.data) {
        //    throw new Error(`Data information for simple modal dialog is missing`);
        //}
        //this.text = options.data.text;
    }

}


interface ViewModel {
}