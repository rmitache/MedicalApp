﻿import { Http, RequestMethod, Response, RequestOptions, URLSearchParams, Request, Headers, HttpModule } from '@angular/http';
import { Injectable, Inject, ViewContainerRef } from '@angular/core';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import { ModalDialogService } from '../../../../Core/Services/ModalDialogService/modal-dialog.service';
import { SpinnerService } from '../../../../Core/Services/SpinnerService/spinner.service';
import { AddSymptomTypeDialogComponent } from './add-symptom-type-dialog.component';



@Injectable()
export class AddSymptomTypeDialogService {

    // Constructor
    constructor(
        private readonly modalDialogService: ModalDialogService,
        private readonly spinnerService: SpinnerService
    ) {

    }

    // Public methods
    public Open(symptomTypeCLO: CLOs.SymptomTypeCLO,okCallBack: (symptomTypeCLO:CLOs.SymptomTypeCLO) => void) {
        
        this.modalDialogService.OpenDialog( {
            title: 'Add custom Symptom',
            childComponent: AddSymptomTypeDialogComponent,
            data: {
                symptomTypeCLO: symptomTypeCLO,
            },
            actionButtons: [
                {
                    isDisabledFunction: (childComponentInstance: any) => {
                        let componentInstance = childComponentInstance as AddSymptomTypeDialogComponent;
                        return !componentInstance.GetValidState();
                    },
                    text: 'Save',
                    onAction: (childComponentInstance: any) => {
                        let promiseWrapper = new Promise<void>((resolve) => {
                            this.spinnerService.Show();

                            let componentInstance = childComponentInstance as AddSymptomTypeDialogComponent;
                            componentInstance.SaveData()
                                .then((clo) => {
                                    if (okCallBack) {
                                        okCallBack(clo);
                                    }
                                    resolve();


                                })

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

