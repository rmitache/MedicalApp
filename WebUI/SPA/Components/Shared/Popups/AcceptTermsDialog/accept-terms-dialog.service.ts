import { Http, RequestMethod, Response, RequestOptions, URLSearchParams, Request, Headers, HttpModule } from '@angular/http';
import { Injectable, Inject, ViewContainerRef } from '@angular/core';
import { AcceptTermsDialogComponent } from './accept-terms-dialog.component';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import { ModalDialogService } from '../../../../Core/Services/ModalDialogService/modal-dialog.service';
import { SpinnerService } from '../../../../Core/Services/SpinnerService/spinner.service';



@Injectable()
export class AcceptTermsDialogService {

	// Constructor
    constructor(
        private readonly modalDialogService: ModalDialogService,
        private readonly spinnerService: SpinnerService
	) {
		
	}

	// Public methods
    public Open(userCLO: CLOs.UserAccountCLO, viewContainerRef: ViewContainerRef, okCallBack: () => void) {

        this.modalDialogService.OpenDialog(viewContainerRef, {
            title: 'Terms and Conditions',
            childComponent: AcceptTermsDialogComponent,
            data: {
                user: userCLO
            },
            actionButtons: [
                {
                    isDisabledFunction: (childComponentInstance: any) => {
                        let compInstance = childComponentInstance as AcceptTermsDialogComponent;
                        return !compInstance.GetValidState();
                    },
                    text: 'Continue',
                    buttonClass: 'ui-button',
                    onAction: (childComponentInstance: any) => {
                        let promiseWrapper = new Promise<void>((resolve) => {
                            let acceptTermsDialog = childComponentInstance as AcceptTermsDialogComponent;
                            acceptTermsDialog.AcceptTerms()
                                .then(() => {
                                    okCallBack();

                                });

                            resolve();

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

