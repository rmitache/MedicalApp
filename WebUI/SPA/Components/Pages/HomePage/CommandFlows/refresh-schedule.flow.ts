import * as CLOs from 'SPA/DomainModel/clo-exports';
import { GlobalApplicationState } from 'SPA/Components/Pages/HomePage/global-application-state';
import { ScheduleComponent } from 'SPA/Components/Pages/HomePage/Schedule/schedule.component';


export function RefreshScheduleFlow(
    componentInstanceDictionary: { [componentClassName: string]: Object },
    applicationStateRef: Object,
    extraParams?: Object[]
): Promise<any> {
   
    // Get strong typed parameters
    const applicationState = applicationStateRef as GlobalApplicationState;

    // Get component references
    const scheduleComponent = componentInstanceDictionary['ScheduleComponent'] as ScheduleComponent;


    // Main logic --------------------------------------------------------------------------------------------------------------------------
    let promise = new Promise<any>((resolve, reject) => {
        scheduleComponent.RefreshUI();

        resolve();
    });
    //--------------------------------------------------------------------------------------------------------------------------------------

    return promise;
}