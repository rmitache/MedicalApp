// Angular and 3rd party stuff
import { Component, Input, EventEmitter, Output, ComponentRef, ViewChild, ApplicationRef } from '@angular/core';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators, ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';

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
    private isValid: boolean = false;
    private reactiveForm: FormGroup;
    private initialDateTime: Date = null;
    private readonly healthLevelsEnum = Enums.HealthLevel;
    private readonly viewModel: ViewModel = {
        HealthStatusEntryCLO: null
    };

    // Private methods
    private refreshIsValid() {
        this.isValid = this.reactiveForm.valid;
    }

    // Constructor 
    constructor(
        private readonly genericCLOFactory: GenericCLOFactory,
        private readonly globalDataService: GlobalDataService,
        private fb: FormBuilder
    ) {
        this.viewModel.HealthStatusEntryCLO = this.genericCLOFactory.CreateDefaultClo(CLOs.HealthStatusEntryCLO);
    }
    ngOnInit() {
        this.viewModel.HealthStatusEntryCLO.OccurenceDateTime = this.initialDateTime;

        this.reactiveForm = this.fb.group({
            occurrenceDateTime: [null, Validators.compose([
                (control: AbstractControl) => {
                    //var selDateTime = moment(control.value);
                    //if (selDateTime > moment()) {
                    //    return { incorrect: true };
                    //}
                    //else {
                        return null;
                    //}
                }
            ])],
            healthLevel: [null, Validators.compose([
                (control: AbstractControl) => {
                    if (parseInt(control.value) === Enums.HealthLevel.Unspecified) {
                        return { incorrect: true };
                    }
                    else {
                        return null;
                    }
                }
            ])]


        });

        this.reactiveForm.
            valueChanges.
            subscribe(() => {
                this.refreshIsValid();
            });
    }

    // Public methods
    public SaveData(): Promise<CLOs.HealthStatusEntryCLO> {

        let saveDataPromise = this.globalDataService.AddHealthStatusEntry(this.viewModel.HealthStatusEntryCLO);
        return saveDataPromise;
    }
    public GetValidState() {
        return this.isValid;
    }

    // IModalDialog
    dialogInit(reference: ComponentRef<IModalDialog>, options?: IModalDialogOptions) {
        let dateFromParent = options.data as Date;
        this.initialDateTime = dateFromParent;
    }
}


interface ViewModel {
    HealthStatusEntryCLO: CLOs.HealthStatusEntryCLO;
}
