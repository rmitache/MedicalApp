import { Http, RequestMethod, Response, RequestOptions, URLSearchParams, Request, Headers, HttpModule } from '@angular/http';
import { Injectable, Inject, ViewContainerRef } from '@angular/core';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import { ModalDialogService } from '../../../../Core/Services/ModalDialogService/modal-dialog.service';
import { SpinnerService } from '../../../../Core/Services/SpinnerService/spinner.service';
import { StopPlanDialogComponent } from './stop-plan-dialog.component';
import * as moment from 'moment';



@Injectable()
export class StopPlanDialogService {

    // Constructor
    constructor(
        private readonly modalDialogService: ModalDialogService,
        private readonly spinnerService: SpinnerService
    ) {

    }

    // Public methods
    public Open(planCLO: CLOs.PlanCLO, viewContainerRef: ViewContainerRef, okCallBack: () => void) {

        this.modalDialogService.OpenDialog(viewContainerRef, {
            title: 'Stop Plan',
            childComponent: StopPlanDialogComponent,
            data: {
                stopDate: moment().endOf('day').toDate(),
                planCLO: planCLO
            },
            actionButtons: [
                {
                    isDisabledFunction: (childComponentInstance: any) => {
                        let compInstance = childComponentInstance as StopPlanDialogComponent;
                        return !compInstance.GetValidState();
                    },
                    text: 'Stop',
                    buttonClass: 'ui-button-danger',
                    onAction: (childComponentInstance: any) => {
                        let promiseWrapper = new Promise<void>((resolve) => {
                            this.spinnerService.Show();

                            let compInstance = childComponentInstance as StopPlanDialogComponent;
                            compInstance.SaveData()
                                .then(() => {
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

