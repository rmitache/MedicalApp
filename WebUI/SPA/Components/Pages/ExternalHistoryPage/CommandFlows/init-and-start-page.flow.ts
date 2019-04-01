// Angular and 3rd party stuff
import { Component, ChangeDetectorRef, ApplicationRef, ViewContainerRef, } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

// Project modules
import { Time, Range, TimeRange } from 'SPA/Core/Helpers/DataStructures/misc';
import { CommandManager } from 'SPA/Core/Managers/CommandManager/command.manager';
import { FlowDefinitions } from 'SPA/Components/Pages/HomePage/CommandFlows/flow-definitions';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import { ModalDialogService } from 'SPA/Core/Services/ModalDialogService/modal-dialog.service';
import { GenericCLOFactory } from 'SPA/DomainModel/generic-clo.factory';

// Components
import { HeaderBarComponent } from 'SPA/Components/Shared/HeaderBar/header-bar.component';
import { ExternalHistoryPageApplicationState } from '../external-history-page-application-state';


export function InitAndStartPageFlow(
    componentInstanceDictionary: { [componentClassName: string]: Object },
    applicationStateRef: Object,
    extraParams?: Object[]
): Promise<any> {
   
    // Get strong typed parameters
    const applicationState = applicationStateRef as ExternalHistoryPageApplicationState;
    const loggedInUserCLO = extraParams[0] as CLOs.UserAccountCLO;

    // Get component references
    const headerBarComponent = componentInstanceDictionary['HeaderBarComponent'] as HeaderBarComponent;

    // Main logic --------------------------------------------------------------------------------------------------------------------------
    let promise = new Promise<any>((resolve, reject) => {
        applicationState.LoggedInUserCLO.Set(loggedInUserCLO);

        resolve();
    });
    //--------------------------------------------------------------------------------------------------------------------------------------

    return promise;
}