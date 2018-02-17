// Angular and 3rd party stuff
import { Component, Input, EventEmitter, Output, ComponentRef, ViewChildren, QueryList } from '@angular/core';
import * as moment from 'moment';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { GenericCLOFactory } from 'SPA/DomainModel/generic-clo.factory';
import { Time } from 'SPA/Core/Helpers/DataStructures/misc';
import * as DataStructures from 'SPA/Core/Helpers/DataStructures/data-structures';
import { IModalDialog, IModalDialogOptions } from 'SPA/Core/Services/ModalDialogService/modal-dialog.interface';
import { GlobalDataService } from 'SPA/Components/Pages/HomePage/global-data.service';

// Components
import { List } from 'SPA/Core/Helpers/DataStructures/list';
import { FactorRecordElem } from 'SPA/Components/Pages/HomePage/Shared/FactorRecordElem/factor-record-elem.component';


@Component({
    selector: 'plan-editor',
    templateUrl: './plan-editor.component.html',
    styleUrls: ['./plan-editor.component.css'],
    host: { 'class': 'plan-editor' }
})
export class PlanEditorComponent implements IModalDialog {
    // Fields
    private searchService: IMedicineTypesSearchService = {
        GetMedicineTypeByName: (name) => {
            return this.availableMedicineTypes.ToArray().find(clo => {
                return clo.Name === name;
            });
        },
        Search: (searchString) => {
            return this.availableMedicineTypes.ToArray().map(clo => {
                return clo.Name;
            });
        }
    };
    private readonly availableMedicineTypes: DataStructures.List<CLOs.MedicineTypeCLO>;
    private readonly availableMedicineTypesNames: string[];
    private readonly viewModel: ViewModel = {
        PlanCLO: null,
        CurrentVersionCLO: null,
        CreateNewRule: () => {
            let latestVersion = this.viewModel.PlanCLO.GetLatestVersion();
            latestVersion.Rules.push(this.genericCLOFactory.CreateDefaultClo(CLOs.RuleCLO));
        },
    };

    // Constructor 
    constructor(
        private readonly genericCLOFactory: GenericCLOFactory,
        private readonly globalDataService: GlobalDataService
    ) {
        this.availableMedicineTypes = this.globalDataService.GetMedicineTypesFromBundle();
    }

    // Public methods
    public SaveData(): Promise<List<CLOs.MedicineFactorRecordCLO>> {
        alert("save data !");
        return null;
    }
    public IsValidForSave(): boolean {
        return false;
    }

    // EventHandlers
    private onRemoveFactorRecordTriggered(medicineFactorRecordCLO: CLOs.MedicineFactorRecordCLO) {


    }

    // IModalDialog
    dialogInit(reference: ComponentRef<IModalDialog>, options?: IModalDialogOptions) {
        // No logic necessary for now
        //if (!options || !options.data) {
        //    throw new Error(`Data information for simple modal dialog is missing`);
        //}
        //this.text = options.data.text;

        let planCLO = options.data as CLOs.PlanCLO;
        this.viewModel.PlanCLO = planCLO;
        this.viewModel.CurrentVersionCLO = planCLO.GetLatestVersion();
    }
}


interface ViewModel {
    PlanCLO: CLOs.PlanCLO;
    CurrentVersionCLO: CLOs.VersionCLO
    CreateNewRule();
}

export interface IMedicineTypesSearchService {
    GetMedicineTypeByName(name: string): CLOs.MedicineTypeCLO;
    Search(searchString: string): string[];
}