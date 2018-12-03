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
import { HomePageDataService } from 'SPA/Components/Pages/HomePage/home-page-data.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { SymptomTypeCLO } from 'SPA/DomainModel/clo-exports';

// Components

@Component({
    selector: 'add-symptom-type-dialog',
    templateUrl: './add-symptom-type-dialog.component.html',
    styleUrls: ['./add-symptom-type-dialog.component.css'],
    host: { 'class': 'add-symptom-type-dialog' }
})
export class AddSymptomTypeDialogComponent implements IModalDialog {
    // Fields
    private isValid: boolean;
    private reactiveForm: FormGroup;
    private readonly dialogInitParameters = {
        symptomTypeCLO: null
    };
    private readonly viewModel: ViewModel = {
        Name: null,
        SymptomTypeCLO: null
    };

    // Private methods
    private refreshIsValid() {
        this.isValid = this.reactiveForm.valid;
    }

    // Constructor 
    constructor(
        private readonly globalDataService: HomePageDataService,
        private fb: FormBuilder

    ) {
    }
    ngOnInit() {
        // Define form
        this.reactiveForm = this.fb.group({
            name: ['',
                Validators.required,
                ValidateSymptomTypeNameNotTaken.createValidator(this.globalDataService)
            ]
        });

        // Subscriptions
        this.reactiveForm.
            statusChanges.
            subscribe((value) => {
                
                this.refreshIsValid();
            });
    }

    // Public methods
    public SaveData(): Promise<CLOs.SymptomTypeCLO> {
        
        this.viewModel.SymptomTypeCLO.Name = this.viewModel.Name;
        let saveDataPromise = this.globalDataService.AddCustomSymptomType(this.viewModel.SymptomTypeCLO)
            .then((clo) => {
                return clo;
            });

        return saveDataPromise;
    }
    public GetValidState() {
        return this.isValid;
    }

    // IModalDialog
    dialogInit(reference: ComponentRef<IModalDialog>, options?: IModalDialogOptions) {
        this.viewModel.SymptomTypeCLO = options.data.symptomTypeCLO;
    }
}

interface ViewModel {
    Name: string;
    SymptomTypeCLO: CLOs.SymptomTypeCLO;
}



// Async validator for SymptomType Name
export class ValidateSymptomTypeNameNotTaken {
    static createValidator(homePageDataService: HomePageDataService, nameToIgnore: string = null) {
        return (control: AbstractControl) => {
            return homePageDataService.IsSymptomTypeNameTaken(control.value, nameToIgnore).then(isTaken => {
                return (isTaken === false) ? null : { nameTaken: true };
            });
        }
    }
}