// Angular and 3rd party stuff
import { Component, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { HomePageApplicationState, IReadOnlyApplicationState } from 'SPA/Components/Pages/HomePage/home-page-application-state';
import { HomePageDataService } from 'SPA/Components/Pages/HomePage/home-page-data.service';
import { ModalDialogService } from 'SPA/Core/Services/ModalDialogService/modal-dialog.service';
import { GenericCLOFactory } from 'SPA/DomainModel/generic-clo.factory';
import { CommandManager } from 'SPA/Core/Managers/CommandManager/command.manager';
import { MedicineTypeEditorMode, MedicineTypeEditorComponent } from 'SPA/Components/Pages/HomePage/MedicineTypesOverview/MedicineTypeEditor/medicine-type-editor.component';
import { MedicineTypeCLOService } from 'SPA/DomainModel/Factors/Medicine/CLOServices/medicine-type-clo.service';

// Components


@Component({
    selector: 'medicine-types-overview',
    templateUrl: './medicine-types-overview.component.html',
    styleUrls: ['./medicine-types-overview.component.css'],
    host: { 'class': 'medicine-types-overview' }
})
export class MedicineTypesOverviewComponent {
    // Fields
    private readonly subscriptions: Subscription[] = [];
    private readonly appState: IReadOnlyApplicationState;
    private medicineTypeStatusesEnum = Enums.MedicineTypeStatus;
    private readonly viewModel: ViewModel = {
        AvailableMedicineTypes: null,
        FilteredMedicineTypes: null,
        SelectedViewMode: Enums.MedicineTypeStatus.CurrentlyInUse,
        Blocked: false
    };


    // Private methods
    private openMedicineTypeEditor(title: string, saveButtonText: string, medicineTypeCLO: CLOs.MedicineTypeCLO, mode: MedicineTypeEditorMode) {
        this.modalDialogService.OpenDialog(this.viewContainerRef, {
            title: title,
            childComponent: MedicineTypeEditorComponent,
            data: {
                medicineTypeCLO: medicineTypeCLO,
                medicineTypeEditorMode: mode
            },
            actionButtons: [
                {
                    isDisabledFunction: (childComponentInstance: any) => {
                        let editorInstance = childComponentInstance as MedicineTypeEditorComponent;
                        return !editorInstance.GetValidState();
                    },
                    text: saveButtonText,
                    onAction: (childComponentInstance: any) => {
                        let promiseWrapper = new Promise<void>((resolve) => {
                            this.viewModel.Blocked = true;

                            let medicineTypeEditorComponentInstance = childComponentInstance as MedicineTypeEditorComponent;
                            medicineTypeEditorComponentInstance.SaveData()
                                .then((planCLO) => {

                                    this.reloadMedicineTypesFromServer();
                                    setTimeout(() => {
                                        this.viewModel.Blocked = false;
                                        resolve();
                                    }, 200);
                                });

                            
                        });
                        return promiseWrapper;
                    }
                },
                {
                    isDisabledFunction: (childComponentInstance: any) => {
                        return false;
                    },
                    text: 'Cancel',
                    onAction: () => {
                        return true;
                    }
                }
            ]


        });

    }
    private reloadMedicineTypesFromServer(): Promise<void> {
        let getMedTypesPromise = this.dataService.GetMedicineTypes();
        let getPlansPromise = this.dataService.GetPlans();

        // 
        var promise= Promise.all([getMedTypesPromise, getPlansPromise])
            .then((values) => {
                let medicineTypes = values["0"];
                let plans = values["1"];
                this.setMedicineTypesWithSupplyAndStatus(medicineTypes, plans);

                // Set viewModel properties
                this.viewModel.AvailableMedicineTypes = medicineTypes;
                this.refreshUI();
            });
        return promise;
    }
    private setMedicineTypesWithSupplyAndStatus(medicineTypes: CLOs.MedicineTypeCLO[], plans: CLOs.PlanCLO[]) {
        
        let isInUseStatusArray = this.medicineTypeCLOService.GetInUsePropertyForMedicineTypes(medicineTypes, plans, moment());
        
        for (let i = 0; i < medicineTypes.length; i++) {
            if (isInUseStatusArray[i] === true) {
                medicineTypes[i].InUse = Enums.MedicineTypeStatus.CurrentlyInUse;
            } else {
                medicineTypes[i].InUse = Enums.MedicineTypeStatus.NotInUse;
            }
        }

    }
    private filterMedicineTypes(medTypesCLOs:CLOs.MedicineTypeCLO[], enumType: Enums.MedicineTypeStatus) {
        var filteredCLOs = medTypesCLOs.filter(medType => {
            return medType.InUse === enumType;
        });
        return filteredCLOs;
    }
    private refreshUI() {
        this.viewModel.FilteredMedicineTypes = this.filterMedicineTypes(this.viewModel.AvailableMedicineTypes, this.viewModel.SelectedViewMode);
    }

    // Constructor 
    constructor(
        applicationState: HomePageApplicationState,
        private readonly commandManager: CommandManager,
        private readonly genericCLOFactory: GenericCLOFactory,
        private readonly dataService: HomePageDataService,
        private readonly modalDialogService: ModalDialogService,
        private viewContainerRef: ViewContainerRef,
        private readonly medicineTypeCLOService: MedicineTypeCLOService
    ) {
        this.appState = applicationState as IReadOnlyApplicationState;

        // Register self to CommandManager
        this.commandManager.RegisterComponentInstance(this);

    }
    ngOnInit() {
        // Get the MedicineTypes with "IsInUse" properties set
        let medicineTypes = this.dataService.GetMedicineTypesFromBundle().ToArray();
        let plans = this.dataService.GetPlansFromBundle().ToArray();
        this.setMedicineTypesWithSupplyAndStatus(medicineTypes, plans);

        // Set viewModel properties
        this.viewModel.AvailableMedicineTypes = medicineTypes;
        this.refreshUI();
    }
    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    // Event handlers
    private onAddNewMedicineTypeTriggered() {
        let newMedicineTypeCLO = this.genericCLOFactory.CreateDefaultClo(CLOs.MedicineTypeCLO);
        this.openMedicineTypeEditor('Add Medicine Type', 'Save', newMedicineTypeCLO, MedicineTypeEditorMode.CreateNew);
    }
    private onSelectedViewModeChanged(event) {
        const newVal = parseInt(event.target.value);
        this.viewModel.SelectedViewMode = newVal;

        this.refreshUI();
    }

}
interface ViewModel {
    AvailableMedicineTypes: CLOs.MedicineTypeCLO[];
    FilteredMedicineTypes: CLOs.MedicineTypeCLO[];
    SelectedViewMode: Enums.MedicineTypeStatus;
    Blocked: boolean;
}
export enum MedicineTypeActionType {
    CreateNew
}
