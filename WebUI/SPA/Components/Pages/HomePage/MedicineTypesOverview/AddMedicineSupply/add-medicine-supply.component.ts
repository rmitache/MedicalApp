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
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// Components

@Component({
    selector: 'add-medicine-supply',
    templateUrl: './add-medicine-supply.component.html',
    styleUrls: ['./add-medicine-supply.component.css'],
    host: { 'class': 'add-medicine-supply' }
})
export class AddMedicineSupplyComponent implements IModalDialog {
    // Fields
    private isValid: boolean;
    private reactiveForm: FormGroup;
    private readonly dialogInitParameters = {
        medicineTypeCLO: null
    };
    private readonly viewModel: ViewModel = {
        NewSupplyAmount: 0,
        MedicineTypeCLO: null
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
            newSupplyAmount: [null,
                Validators.compose([
                    Validators.required,
                    Validators.min(1),
                    Validators.pattern(new RegExp(/^\d+$/))])]
        });

        // Subscriptions
        this.reactiveForm.
            valueChanges.
            subscribe((value) => {
                this.refreshIsValid();
            });
    }

    // Public methods
    public SaveData(): Promise<number> {

        let saveDataPromise = this.globalDataService.AddMedicineTypeSupplyEntry(this.viewModel.MedicineTypeCLO.ID, this.viewModel.NewSupplyAmount)
            .then(() => {
                return parseInt(this.viewModel.NewSupplyAmount.toString());
            });
        return saveDataPromise;
    }
    public GetValidState() {
        return this.isValid;
    }

    // IModalDialog
    dialogInit(reference: ComponentRef<IModalDialog>, options?: IModalDialogOptions) {
        this.viewModel.MedicineTypeCLO = options.data.medicineTypeCLO;
    }
}


interface ViewModel {
    NewSupplyAmount: number;
    MedicineTypeCLO: CLOs.MedicineTypeCLO;
}

export interface IMedicineTypesSearchService {
    GetMedicineTypeByName(name: string): CLOs.MedicineTypeCLO;
    Search(searchString: string): string[];
}