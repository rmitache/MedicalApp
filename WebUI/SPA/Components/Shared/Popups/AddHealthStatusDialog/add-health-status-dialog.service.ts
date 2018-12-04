import { Http, RequestMethod, Response, RequestOptions, URLSearchParams, Request, Headers, HttpModule } from '@angular/http';
import { Injectable, Inject, ViewContainerRef } from '@angular/core';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import { ModalDialogService } from '../../../../Core/Services/ModalDialogService/modal-dialog.service';
import { SpinnerService } from '../../../../Core/Services/SpinnerService/spinner.service';
import { HomePageDataService } from '../../../Pages/HomePage/home-page-data.service';
import { AddHealthStatusDialogComponent } from './add-health-status-dialog.component';



@Injectable()
export class AddHealthStatusDialogService {

    // Constructor
    constructor(
        private readonly modalDialogService: ModalDialogService,
        private readonly spinnerService: SpinnerService,
        private readonly dataService: HomePageDataService,

    ) {

    }

    // Public methods
    public Open(viewContainerRef: ViewContainerRef, okCallBack: () => void) {
        this.spinnerService.Show();
        this.dataService.GetRecentSymptoms().then(symptomTypeCLOs => {
            this.spinnerService.Hide();

            this.modalDialogService.OpenDialog(viewContainerRef, {
                title: 'How are you feeling ?',
                showTitleAsterisk:true,
                childComponent: AddHealthStatusDialogComponent,
                data: {
                    recentSymptomTypes: symptomTypeCLOs
                },
                actionButtons: [
                    {
                        isDisabledFunction: (childComponentInstance: any) => {
                            let componentInstance = childComponentInstance as AddHealthStatusDialogComponent;
                            return !componentInstance.GetValidState();
                        },
                        text: 'Done',
                        onAction: (childComponentInstance: any) => {
                            let promiseWrapper = new Promise<void>((resolve) => {
                                this.spinnerService.Show();

                                let componentInstance = childComponentInstance as AddHealthStatusDialogComponent;
                                componentInstance.SaveData()
                                    .then((healthStatusCLO) => {
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

