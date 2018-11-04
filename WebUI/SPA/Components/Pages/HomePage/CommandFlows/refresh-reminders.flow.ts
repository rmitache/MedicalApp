import * as CLOs from 'SPA/DomainModel/clo-exports';
import { HomePageApplicationState } from 'SPA/Components/Pages/HomePage/home-page-application-state';
import { InfoToRememberComponent } from '../InfoToRemember/info-to-remember.component';


export function RefreshRemindersFlow(
    componentInstanceDictionary: { [componentClassName: string]: Object },
    applicationStateRef: Object,
    extraParams?: Object[]
): Promise<any> {
   
    // Get strong typed parameters
    const applicationState = applicationStateRef as HomePageApplicationState;

    // Get component references
    const infoToRemComponent = componentInstanceDictionary['InfoToRememberComponent'] as InfoToRememberComponent;

    // Main logic --------------------------------------------------------------------------------------------------------------------------
    let promise = new Promise<any>((resolve, reject) => {
        infoToRemComponent.ReloadData();

        resolve();
    });
    //--------------------------------------------------------------------------------------------------------------------------------------

    return promise;
}