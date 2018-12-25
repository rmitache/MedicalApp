import { Http, RequestMethod, Response, RequestOptions, URLSearchParams, Request, Headers, HttpModule } from '@angular/http';
import { Injectable, Inject, ViewContainerRef } from '@angular/core';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import { ModalDialogService } from '../../../../Core/Services/ModalDialogService/modal-dialog.service';
import { SpinnerService } from '../../../../Core/Services/SpinnerService/spinner.service';
import { AddSupplyDialogComponent } from './add-supply-dialog.component';



@Injectable()
export class AddSupplyDialogService {

    // Constructor
    constructor(
        private readonly modalDialogService: ModalDialogService,
        private readonly spinnerService: SpinnerService
    ) {

    }

    // Public methods
    public Open(medicineTypeCLO: CLOs.MedicineTypeCLO, okCallBack: () => void) {

        this.modalDialogService.OpenDialog( {
            title: 'Add new supply',
            childComponent: AddSupplyDialogComponent,
            data: {
                medicineTypeCLO: medicineTypeCLO,
            },
            actionButtons: [
                {
                    isDisabledFunction: (childComponentInstance: any) => {
                        let componentInstance = childComponentInstance as AddSupplyDialogComponent;
                        return !componentInstance.GetValidState();
                    },
                    text: 'Save',
                    onAction: (childComponentInstance: any) => {
                        let promiseWrapper = new Promise<void>((resolve) => {
                            this.spinnerService.Show();

                            let componentInstance = childComponentInstance as AddSupplyDialogComponent;
                            componentInstance.SaveData()
                                .then(() => {
                                    if (okCallBack) {
                                        okCallBack();
                                    }
                                    resolve();


                                })
                            //this.dataService.RecalculateRemainingSupplyAmount(medicineTypeCLO.ID);
                            //    .then((newSupplyInfo) => {
                            //        this.getMedicineTypeElemByCloID(medicineTypeCLO.ID)
                            //            .UpdateCLOSupplyFields(newSupplyInfo.CurrentSupplyAmount, newSupplyInfo.SupplyWillLastUntil);

                            //        // 
                            //        this.commandManager.InvokeCommandFlow('RefreshScheduleFlow');
                            //        this.commandManager.InvokeCommandFlow('RefreshRemindersFlow');

                            //        this.spinnerService.Hide();

                            //    });
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

