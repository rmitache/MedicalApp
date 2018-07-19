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
    private readonly viewModel: ViewModel = {
        AvailableMedicineTypes: null,
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
        let promise = this.dataService.GetMedicineTypes()
            .then(clos => {
                this.viewModel.AvailableMedicineTypes = clos;
            });
        return promise;
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
        // Init ViewModel properties
        this.viewModel.AvailableMedicineTypes = this.dataService.GetMedicineTypesFromBundle().ToArray();
    }
    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    // Event handlers
    private onAddNewMedicineTypeTriggered() {
        let newMedicineTypeCLO = this.genericCLOFactory.CreateDefaultClo(CLOs.MedicineTypeCLO);
        this.openMedicineTypeEditor('Add Medicine Type', 'Save', newMedicineTypeCLO, MedicineTypeEditorMode.CreateNew);
    }

}
interface ViewModel {
    AvailableMedicineTypes: CLOs.MedicineTypeCLO[];
    Blocked: boolean;
}

export enum MedicineTypeActionType {
    CreateNew
}
