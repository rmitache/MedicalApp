import * as CLOs from 'SPA/DomainModel/clo-exports';
import { HomePageApplicationState } from 'SPA/Components/Pages/HomePage/home-page-application-state';
import { ScheduleComponent } from 'SPA/Components/Pages/HomePage/Schedule/schedule.component';
import { MedicineTypesOverviewComponent } from 'SPA/Components/Pages/HomePage/MedicineTypesOverview/medicine-types-overview.component';


export function RefreshScheduleFlow(
    componentInstanceDictionary: { [componentClassName: string]: Object },
    applicationStateRef: Object,
    extraParams?: Object[]
): Promise<any> {
   
    // Get strong typed parameters
    const applicationState = applicationStateRef as HomePageApplicationState;

    // Get component references
    const scheduleComponent = componentInstanceDictionary['ScheduleComponent'] as ScheduleComponent;

    // Main logic --------------------------------------------------------------------------------------------------------------------------
    let promise = new Promise<any>((resolve, reject) => {
        scheduleComponent.ReloadData();

        resolve();
    });
    //--------------------------------------------------------------------------------------------------------------------------------------

    return promise;
}