import * as CLOs from 'SPA/DomainModel/clo-exports';
import { AnalysisPageApplicationState } from 'SPA/Components/Pages/AnalysisPage/analysis-page-application-state';
import { HeaderBarComponent } from 'SPA/Components/Shared/HeaderBar/header-bar.component';


export function InitAndStartPageFlow(
    componentInstanceDictionary: { [componentClassName: string]: Object },
    applicationStateRef: Object,
    extraParams?: Object[]
): Promise<any> {
   
    // Get strong typed parameters
    const applicationState = applicationStateRef as AnalysisPageApplicationState;
    const loggedInUserCLO = extraParams[0] as CLOs.UserAccountCLO;

    // Get component references
    const headerBarComponent = componentInstanceDictionary['HeaderBarComponent'] as HeaderBarComponent;


    // Main logic --------------------------------------------------------------------------------------------------------------------------
    let promise = new Promise<any>((resolve, reject) => {
        // 1. Init ApplicationState properties
        applicationState.LoggedInUserCLO.Set(loggedInUserCLO);

        resolve();
    });
    //--------------------------------------------------------------------------------------------------------------------------------------

    return promise;
}