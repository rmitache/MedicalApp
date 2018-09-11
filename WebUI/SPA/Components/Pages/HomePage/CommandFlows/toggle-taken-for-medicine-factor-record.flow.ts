import * as CLOs from 'SPA/DomainModel/clo-exports';
import { HomePageApplicationState } from 'SPA/Components/Pages/HomePage/home-page-application-state';
import { ScheduleComponent } from 'SPA/Components/Pages/HomePage/Schedule/schedule.component';
import { MedicineTypesOverviewComponent } from 'SPA/Components/Pages/HomePage/MedicineTypesOverview/medicine-types-overview.component';


export function ToggleTakenForMedicineFactorRecordFlow(
    componentInstanceDictionary: { [componentClassName: string]: Object },
    applicationStateRef: Object,
    extraParams?: Object[]
): Promise<any> {
   
    // Get component references
    const medicineTypesOverviewComponent = componentInstanceDictionary['MedicineTypesOverviewComponent'] as MedicineTypesOverviewComponent;
    const medicineFactorRecordCLO = extraParams[0] as CLOs.MedicineFactorRecordCLO;

    // Main logic --------------------------------------------------------------------------------------------------------------------------
    let promise = new Promise<any>((resolve, reject) => {
		
        medicineTypesOverviewComponent.ReloadRemainingSupplyForMedicineTypeFromServer(medicineFactorRecordCLO.MedicineType.ID);

        resolve();
    });
    //--------------------------------------------------------------------------------------------------------------------------------------

    return promise;
}