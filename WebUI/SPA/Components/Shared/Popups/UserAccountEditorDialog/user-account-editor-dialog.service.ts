import { Http, RequestMethod, Response, RequestOptions, URLSearchParams, Request, Headers, HttpModule } from '@angular/http';
import { Injectable, Inject, ViewContainerRef } from '@angular/core';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import { ModalDialogService } from '../../../../Core/Services/ModalDialogService/modal-dialog.service';
import { UserAccountEditorMode, UserAccountEditorDialogComponent } from './user-account-editor-dialog.component';



@Injectable()
export class UserAccountEditorDialogService {

    // Constructor
    constructor(
        private readonly modalDialogService: ModalDialogService
    ) {

    }

    // Public methods
    public Open(userCLO: CLOs.UserAccountCLO, viewContainerRef: ViewContainerRef, okCallBack: () => void = null) {
        let mode: UserAccountEditorMode = UserAccountEditorMode.EditCurrent;

        this.modalDialogService.OpenDialog(viewContainerRef, {
            title: "Change password",
            childComponent: UserAccountEditorDialogComponent,
            data: {
                userAccountCLO: userCLO,
                userAccountEditorMode: mode
            },
            actionButtons: [
                {
                    isDisabledFunction: (childComponentInstance: any) => {
                        let editorInstance = childComponentInstance as UserAccountEditorDialogComponent;
                        return !editorInstance.GetValidState();
                    },
                    text: "Save",
                    onAction: (childComponentInstance: any) => {
                        let promiseWrapper = new Promise<void>((resolve) => {
                            let editorComponentInstance = childComponentInstance as UserAccountEditorDialogComponent;
                            editorComponentInstance.SaveData()
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

