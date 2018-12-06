import { Http, RequestMethod, Response, RequestOptions, URLSearchParams, Request, Headers, HttpModule } from '@angular/http';
import { Injectable, Inject, ViewContainerRef } from '@angular/core';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import { ModalDialogService } from '../../../../Core/Services/ModalDialogService/modal-dialog.service';
import { SpinnerService } from '../../../../Core/Services/SpinnerService/spinner.service';
import { HomePageDataService } from '../../../Pages/HomePage/home-page-data.service';
import { MedicineTypeEditorDialogComponent, MedicineTypeEditorMode } from './medicine-type-editor-dialog.component';



@Injectable()
export class MedicineTypeEditorDialogService {

    // Constructor
    constructor(
        private readonly modalDialogService: ModalDialogService,
        private readonly spinnerService: SpinnerService,
        private readonly dataService: HomePageDataService,
    ) {

    }

    // Public methods
    public Open(medicineTypeCLO: CLOs.MedicineTypeCLO, mode: MedicineTypeEditorMode, viewContainerRef: ViewContainerRef, okCallBack: () => void) {

        // Determine variables based on the given editor mode
        let title: string, saveButtonText: string;
        switch (mode) {
            case MedicineTypeEditorMode.CreateNew:
                title = "New Medicine Type";
                saveButtonText = "Create";
                break;

        }

        // Open the dialog
        this.modalDialogService.OpenDialog(viewContainerRef, {
            title: title,
            childComponent: MedicineTypeEditorDialogComponent,
            data: {
                medicineTypeCLO: medicineTypeCLO,
                medicineTypeEditorMode: mode
            },
            actionButtons: [
                {
                    isDisabledFunction: (childComponentInstance: any) => {
                        let editorInstance = childComponentInstance as MedicineTypeEditorDialogComponent;
                        return !editorInstance.GetValidState();
                    },
                    text: saveButtonText,
                    onAction: (childComponentInstance: any) => {
                        let promiseWrapper = new Promise<void>((resolve) => {
                            this.spinnerService.Show();

                            let medicineTypeEditorComponentInstance = childComponentInstance as MedicineTypeEditorDialogComponent;
                            medicineTypeEditorComponentInstance.SaveData()
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

    }
}

