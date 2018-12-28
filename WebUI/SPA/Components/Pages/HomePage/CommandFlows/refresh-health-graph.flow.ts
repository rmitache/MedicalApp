import * as CLOs from 'SPA/DomainModel/clo-exports';
import { HomePageApplicationState } from 'SPA/Components/Pages/HomePage/home-page-application-state';
import { InfoToRememberComponent } from '../InfoToRemember/info-to-remember.component';
import { TodaysHealthViewComponent } from '../HealthGraph/TodaysHealthView/todays-health-view.component';
import { LongerTermHealthViewComponent } from '../HealthGraph/LongerTermHealthView/longer-term-health-view.component';


export function RefreshHealthGraphFlow(
    componentInstanceDictionary: { [componentClassName: string]: Object },
    applicationStateRef: Object,
    extraParams?: Object[]
): Promise<any> {
   
    // Get strong typed parameters
    const applicationState = applicationStateRef as HomePageApplicationState;

    // Get component references
    const todaysHealthView = componentInstanceDictionary['TodaysHealthViewComponent'] as TodaysHealthViewComponent;
    const longerTermHealthView = componentInstanceDictionary['LongerTermHealthViewComponent'] as LongerTermHealthViewComponent;


    // Main logic --------------------------------------------------------------------------------------------------------------------------
    let promise = new Promise<any>((resolve, reject) => {
        todaysHealthView.ReloadData();
        longerTermHealthView.ReloadData();

        resolve();
    });
    //--------------------------------------------------------------------------------------------------------------------------------------

    return promise;
}