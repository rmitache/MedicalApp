// Angular and 3rd party stuff
import { Component, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
import { ChartModule, UIChart } from 'primeng/primeng';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { Time, Range, TimeRange } from 'SPA/Core/Helpers/DataStructures/misc';
import { HomePageDataService } from 'SPA/Components/Pages/HomePage/home-page-data.service';
import * as HelperFunctions from 'SPA/Core/Helpers/Functions/functions';


@Component({
    selector: 'info-to-remember',
    templateUrl: './info-to-remember.component.html',
    styleUrls: ['./info-to-remember.component.css'],
    host: { 'class': 'info-to-remember' }
})
export class InfoToRememberComponent {
    // Fields
    private readonly noDataModes = NoDataModes;
    private readonly viewModel: ViewModel = {
        AvailableMedicineTypes: null,
        TargetMedicineType: null,
        TargetMedTypeDaysUntilSupplyRunsOut: null,
        CurrentNoDataMode: null,

    };
    private readonly subscriptions: Subscription[] = [];

    // Private methods
    private getMedicineTypeWithFirstSupplyToRunOut(medTypesCLOs: CLOs.MedicineTypeCLO[]) {

        // Variables
        var firstToRunOut: CLOs.MedicineTypeCLO = null;

        // Get the medicine types which have supply
        let medTypesWithSupplyInfo = medTypesCLOs.filter(clo => {
            return clo.SupplyWillLastUntil !== null;
        });

        // Find the one with the first supply to run out
        medTypesWithSupplyInfo.forEach(clo => {

            // If there already is a medTypeWithLowestSupply, compare to it
            if (firstToRunOut === null) {
                firstToRunOut = clo;
            } else if (clo.SupplyWillLastUntil < firstToRunOut.SupplyWillLastUntil) {
                firstToRunOut = clo;
            }
        });


        return firstToRunOut;
    }
    private refreshUI() {
        this.viewModel.TargetMedicineType = this.getMedicineTypeWithFirstSupplyToRunOut(this.viewModel.AvailableMedicineTypes);
        let nrOfDaysUntilTargetDate = moment(this.viewModel.TargetMedicineType.SupplyWillLastUntil).diff(moment(), 'day') + 1;
        this.viewModel.TargetMedTypeDaysUntilSupplyRunsOut = nrOfDaysUntilTargetDate;

        // NoData triggers
        if (this.viewModel.TargetMedicineType === null) {
            this.viewModel.CurrentNoDataMode = NoDataModes.NoSupplyInfo;
        } else {
            this.viewModel.CurrentNoDataMode = null;
        }
    }

    // Constructor 
    constructor(
        private readonly dataService: HomePageDataService,
    ) {



    }
    ngOnInit() {
        this.viewModel.AvailableMedicineTypes = this.dataService.GetMedicineTypesFromBundle().ToArray();
        this.refreshUI();

    }
    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

}

interface ViewModel {
    AvailableMedicineTypes: CLOs.MedicineTypeCLO[];
    TargetMedicineType: CLOs.MedicineTypeCLO;
    TargetMedTypeDaysUntilSupplyRunsOut: number;
    CurrentNoDataMode: NoDataModes;
}
enum NoDataModes {
    NoSupplyInfo = 0,
}
