﻿import { Http, RequestMethod, Response, RequestOptions, URLSearchParams, Request, Headers, HttpModule } from '@angular/http';
import { Injectable, Inject, ViewContainerRef } from '@angular/core';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import { ModalDialogService } from '../../../../Core/Services/ModalDialogService/modal-dialog.service';
import { HelpDialogComponent } from './help-dialog.component';
import { HomePageDataService } from '../../../Pages/HomePage/home-page-data.service';
import { IDataServiceWithUser } from '../../HeaderBar/header-bar.component';



@Injectable()
export class HelpDialogService {

    // Constructor
    constructor(
        private readonly modalDialogService: ModalDialogService,
        @Inject('IDataServiceWithSetHasSeenWelcome') private readonly globalDataService: IDataServiceWithSetHasSeenWelcome,
    ) {

    }

    // Public methods
    public Open(viewContainerRef: ViewContainerRef, okCallBack: () => void = null) {

        this.modalDialogService.OpenDialog(viewContainerRef, {
            title: "Help",
            childComponent: HelpDialogComponent,
            data:null,
            actionButtons: [
                {
                    isDisabledFunction: (childComponentInstance: any) => {
                        return false;
                    },
                    text: 'Close',
                    onAction: () => {
                        return true;
                    },
                    buttonClass: 'ui-button-secondary'
                }
            ]


        });
    }
    public OpenAsWelcome(viewContainerRef: ViewContainerRef, okCallBack: () => void = null) {

        this.modalDialogService.OpenDialog(viewContainerRef, {
            title: "Welcome to LymeJournal !",
            childComponent: HelpDialogComponent,
            data: null,
            actionButtons: [
                {
                    isDisabledFunction: (childComponentInstance: any) => {
                        return false;
                    },
                    text: 'Continue',
                    onAction: () => {
                        return true;
                    }
                }
            ]
        });

        //
        this.globalDataService.SetHasSeenWelcome();


    }
}

@Injectable()
export abstract class IDataServiceWithSetHasSeenWelcome {
    abstract SetHasSeenWelcome(): void;
}