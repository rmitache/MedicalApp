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
        AvailableMedicineTypes: null 
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
                        //let promiseWrapper = new Promise<void>((resolve) => {
                        //    this.viewModel.Blocked = true;

                        //    let planEditorComponentInstance = childComponentInstance as PlanEditorComponent;
                        //    planEditorComponentInstance.SaveData()
                        //        .then((planCLO) => {

                        //            this.reloadPlansFromServer();
                        //            this.commandManager.InvokeCommandFlow('RefreshScheduleFlow');

                        //            setTimeout(() => {
                        //                this.viewModel.Blocked = false;
                        //                resolve();
                        //            }, 200);

                        //        });
                        //});
                        //return promiseWrapper;
                        return null;
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
        this.openMedicineTypeEditor('Add a new Medicine Type', 'Add', newMedicineTypeCLO, MedicineTypeEditorMode.CreateNew);
    }

}
interface ViewModel {
    AvailableMedicineTypes: CLOs.MedicineTypeCLO[];
}

export enum MedicineTypeActionType {
    CreateNew
}
