import { Http, RequestMethod, Response, RequestOptions, URLSearchParams, Request, Headers, HttpModule } from '@angular/http';
import { Injectable, Inject, ViewContainerRef } from '@angular/core';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import { ModalDialogService } from '../../../../Core/Services/ModalDialogService/modal-dialog.service';
import { SpinnerService } from '../../../../Core/Services/SpinnerService/spinner.service';
import * as moment from 'moment';
import { ExportDataDialogComponent } from './export-data-dialog.component';



@Injectable()
export class ExportDataDialogService {

    // Constructor
    constructor(
        private readonly modalDialogService: ModalDialogService,
        private readonly spinnerService: SpinnerService
    ) {

    }

    // Public methods
    public Open(viewContainerRef: ViewContainerRef, okCallBack: () => void) {

        this.modalDialogService.OpenDialog(viewContainerRef, {
            title: 'Download your data',
            childComponent: ExportDataDialogComponent,
            data: null,
            actionButtons: [
                {
                    isDisabledFunction: (childComponentInstance: any) => {
                        return false;
                    },
                    text: 'Download as Excel',
                    
                    onAction: (childComponentInstance: any) => {
                        let promiseWrapper = new Promise<void>((resolve) => {
                            this.spinnerService.Show();

                            let compInstance = childComponentInstance as ExportDataDialogComponent;
                            compInstance.ExportData().then(() => {
                                this.spinnerService.Hide();
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

