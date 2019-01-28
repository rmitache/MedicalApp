import { Http, RequestMethod, Response, RequestOptions, URLSearchParams, Request, Headers, HttpModule } from '@angular/http';
import { Injectable, Inject, ViewContainerRef } from '@angular/core';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import { ModalDialogService } from '../../../../Core/Services/ModalDialogService/modal-dialog.service';
import { SpinnerService } from '../../../../Core/Services/SpinnerService/spinner.service';
import { PlanEditorMode, PlanEditorDialogComponent } from './plan-editor-dialog.component';
import { HomePageDataService } from '../../../Pages/HomePage/home-page-data.service';



@Injectable()
export class PlanEditorDialogService {

    // Constructor
    constructor(
        private readonly modalDialogService: ModalDialogService,
        private readonly spinnerService: SpinnerService,
        private readonly dataService: HomePageDataService,
    ) {

    }

    // Public methods
    public Open(planCLO: CLOs.PlanCLO, mode: PlanEditorMode, okCallBack: () => void) {

        // Determine variables based on the given editor mode
        let title: string, saveButtonText: string;
        switch (mode) {
            case PlanEditorMode.CreateNew:
                title = "New Treatment Plan";
                saveButtonText = "Create";
                break;
            case PlanEditorMode.Change:
                title = "Make changes to Plan";
                saveButtonText = "Confirm changes";
                break;
            case PlanEditorMode.EditUpcomingChanges:
                title = "Edit upcoming changes";
                saveButtonText = "Save";
                break;
            case PlanEditorMode.EditTodaysChanges:
                title = "Edit todays changes";
                saveButtonText = "Save";
                break;
            case PlanEditorMode.EditPlanStartedToday:
                title = "Edit plan started today";
                saveButtonText = "Save";
                break;
            case PlanEditorMode.EditPlanRestartedToday:
                title = "Edit plan restarted today";
                saveButtonText = "Save";
                break;
            case PlanEditorMode.Restart:
                title = "Restart Plan";
                saveButtonText = "Restart";
                break;
        }

        // Open the dialog
        this.spinnerService.Show();
        this.dataService.GetMedicineTypes().then(medicineTypeCLOs => {

            this.spinnerService.Hide();
            this.modalDialogService.OpenDialog({
                title: title,
                childComponent: PlanEditorDialogComponent,
                data: {
                    planCLO: planCLO,
                    planEditorMode: mode,
                    availableMedicineTypes: medicineTypeCLOs
                },
                actionButtons: [
                    {
                        isDisabledFunction: (childComponentInstance: any) => {
                            let planEditorInstance = childComponentInstance as PlanEditorDialogComponent;
                            return !planEditorInstance.GetValidState();
                        },
                        text: saveButtonText,
                        onAction: (childComponentInstance: any) => {
                            let promiseWrapper = new Promise<void>((resolve) => {
                                this.spinnerService.Show();

                                let planEditorComponentInstance = childComponentInstance as PlanEditorDialogComponent;
                                planEditorComponentInstance.SaveData()
                                    .then((planCLO) => {

                                        if (okCallBack) {
                                            okCallBack();
                                        }

                                        resolve();
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
                        },
                        buttonClass: 'ui-button-secondary'
                    }
                ]


            });
        });

    }
}

