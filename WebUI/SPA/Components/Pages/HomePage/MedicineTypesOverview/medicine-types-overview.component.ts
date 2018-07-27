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
import { AddMedicineSupplyComponent } from './AddMedicineSupply/add-medicine-supply.component';



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

        GetMenuItems: (medicineTypeCLO: CLOs.MedicineTypeCLO) => {
            return [
                {
                    Name: 'Add supply',
                    OnClick: () => {
                        this.onAddMedicineTypeSupplyTriggered(medicineTypeCLO);
                    }
                }
            ];
        },
        SelectedViewMode: Enums.MedicineTypeStatus.InUseToday,
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

                                    this.reloadDataFromServer()
                                        .then(() => {
                                            this.refreshUI();
                                        });

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
    private reloadDataFromServer(): Promise<void> {
        var promise = this.dataService.GetMedicineTypes()
            .then((medTypes) => {
                this.viewModel.AvailableMedicineTypes = medTypes;
            });

        return promise;
    }
    private filterMedicineTypes(medTypesCLOs: CLOs.MedicineTypeCLO[], enumType: Enums.MedicineTypeStatus) {
        var filteredCLOs = medTypesCLOs.filter(medType => {
            return medType.IsInUse === enumType;
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
        private viewContainerRef: ViewContainerRef
    ) {
        this.appState = applicationState as IReadOnlyApplicationState;

        // Register self to CommandManager
        this.commandManager.RegisterComponentInstance(this);

    }
    ngOnInit() {
        // Set viewModel properties
        this.viewModel.AvailableMedicineTypes = this.dataService.GetMedicineTypesFromBundle().ToArray();
        this.refreshUI();
    }
    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    // Public method 
    public ReloadData() {
        this.reloadDataFromServer()
            .then(() => {
                this.refreshUI();
            });
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
    private onAddMedicineTypeSupplyTriggered(medicineTypeCLO: CLOs.MedicineTypeCLO) {
        this.modalDialogService.OpenDialog(this.viewContainerRef, {
            title: 'Add new supply',
            childComponent: AddMedicineSupplyComponent,
            data: {
                medicineTypeCLO: medicineTypeCLO,
            },
            actionButtons: [
                {
                    isDisabledFunction: (childComponentInstance: any) => {
                        let componentInstance = childComponentInstance as AddMedicineSupplyComponent;
                        return !componentInstance.GetValidState();
                    },
                    text: 'Save',
                    onAction: (childComponentInstance: any) => {
                        let promiseWrapper = new Promise<void>((resolve) => {
                            this.viewModel.Blocked = true;

                            let componentInstance = childComponentInstance as AddMedicineSupplyComponent;
                            componentInstance.SaveData()
                                .then(() => {

                                    //this.reloadDataFromServer(this.viewModel.AvailableDateRange)
                                    //    .then(() => {
                                    //        this.refreshUI();
                                    //        setTimeout(() => {
                                    //            this.viewModel.Blocked = false;
                                    //            resolve();
                                    //        }, 200);
                                    //    });

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

}
interface ViewModel {
    AvailableMedicineTypes: CLOs.MedicineTypeCLO[];
    FilteredMedicineTypes: CLOs.MedicineTypeCLO[];

    GetMenuItems(medicineTypeCLO: CLOs.MedicineTypeCLO);
    SelectedViewMode: Enums.MedicineTypeStatus;
    Blocked: boolean;
}
export enum MedicineTypeActionType {
    CreateNew
}
