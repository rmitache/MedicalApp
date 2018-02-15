import { Component, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import { Time, Range, TimeRange } from 'SPA/Core/Helpers/DataStructures/misc';
import { GlobalApplicationState, IReadOnlyApplicationState } from 'SPA/Components/Pages/HomePage/global-application-state';
import { GlobalDataService } from 'SPA/Components/Pages/HomePage/global-data.service';
import { ModalDialogService } from 'SPA/Core/Services/ModalDialogService/modal-dialog.service';


@Component({
    selector: 'plans-overview',
    templateUrl: './plans-overview.component.html',
    styleUrls: ['./plans-overview.component.css'],
    host: { 'class': 'plans-overview' }
})
export class PlansOverviewComponent {
    // Fields
    private readonly viewModel: ViewModel = {
        AvailablePlans: null,
        Blocked: false
    };
    private readonly subscriptions: Subscription[] = [];
    private readonly appState: IReadOnlyApplicationState;

    // Constructor 
    constructor(
        applicationState: GlobalApplicationState,
        private readonly dataService: GlobalDataService,
        private readonly modalDialogService: ModalDialogService,
        private viewContainerRef: ViewContainerRef
    ) {
        this.appState = applicationState as IReadOnlyApplicationState;
    }
    ngOnInit() {
        // Init ViewModel properties
        this.viewModel.AvailablePlans = this.dataService.GetPlansFromBundle().ToArray();

    }
    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    // Event handlers
    private onAddNewPlanTriggered() {
        alert('new plan!');
    }

}
interface ViewModel {
    AvailablePlans: CLOs.PlanCLO[]
    Blocked: boolean;
}
enum DisplayModes {
    Active,
    Inactive
}

