// Angular and 3rd party stuff
import { Component, Input, EventEmitter, Output, ComponentRef, ViewChild, ApplicationRef } from '@angular/core';
import * as moment from 'moment';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { GenericCLOFactory } from 'SPA/DomainModel/generic-clo.factory';
import { Time } from 'SPA/Core/Helpers/DataStructures/misc';
import { IModalDialog, IModalDialogOptions } from 'SPA/Core/Services/ModalDialogService/modal-dialog.interface';
import * as DataStructures from 'SPA/Core/Helpers/DataStructures/data-structures';
import { GlobalDataService } from 'SPA/Components/Pages/HomePage/global-data.service';
import { List } from 'SPA/Core/Helpers/DataStructures/list';

// Components

@Component({
    selector: 'add-new-health-status-entry',
    templateUrl: './add-new-health-status-entry.component.html',
    styleUrls: ['./add-new-health-status-entry.component.css'],
    host: { 'class': 'add-new-health-status-entry' }
})
export class AddNewHealthStatusEntryComponent implements IModalDialog {
    // Fields
    private isValid: boolean;
    private readonly viewModel: ViewModel = {
        OccurenceDateTime: null,
    };

    

    // Constructor 
    constructor(
        private readonly genericCLOFactory: GenericCLOFactory,
        private readonly globalDataService: GlobalDataService
    ) {
    }

    // Public methods
    public SaveData(): Promise<List<CLOs.HealthStatusEntryCLO>> {

        return null;
    }
    public GetValidState() {
        return this.isValid;
    }

    // EventHandlers

    // IModalDialog
    dialogInit(reference: ComponentRef<IModalDialog>, options?: IModalDialogOptions) {
        // No logic necessary for now
        //if (!options || !options.data) {
        //    throw new Error(`Data information for simple modal dialog is missing`);
        //}
        //this.text = options.data.text;

        let dateFromParent = options.data as Date;
        this.viewModel.OccurenceDateTime = dateFromParent;
    }
}


interface ViewModel {
    OccurenceDateTime: Date;
}
