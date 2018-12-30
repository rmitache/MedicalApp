import * as CLOs from 'SPA/DomainModel/clo-exports';
import { HomePageApplicationState } from 'SPA/Components/Pages/HomePage/home-page-application-state';
import { PlansOverviewComponent } from '../PlansOverview/plans-overview.component';


export function RefreshPlansOverviewFlow(
    componentInstanceDictionary: { [componentClassName: string]: Object },
    applicationStateRef: Object,
    extraParams?: Object[]
): Promise<any> {
   
    // Get strong typed parameters
    const applicationState = applicationStateRef as HomePageApplicationState;

    // Get component references
    const plansOverviewComponent = componentInstanceDictionary['PlansOverviewComponent'] as PlansOverviewComponent;

    // Main logic --------------------------------------------------------------------------------------------------------------------------
    let promise = new Promise<any>((resolve, reject) => {
        plansOverviewComponent.ReloadData();

        resolve();
    });
    //--------------------------------------------------------------------------------------------------------------------------------------

    return promise;
}