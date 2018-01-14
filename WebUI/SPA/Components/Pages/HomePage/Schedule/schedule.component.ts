import { Component, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import { Time, Interval, TimeInterval } from 'SPA/Core/Helpers/DataStructures/misc';
import { GlobalApplicationState, IReadOnlyApplicationState } from 'SPA/Components/Pages/HomePage/global-application-state';
import { GlobalDataService } from 'SPA/Components/Pages/HomePage/global-data.service';
import { ModalDialogService } from 'SPA/Core/Services/ModalDialogService/modal-dialog.service';

import { AddNewEventComponent } from './AddNewEvent/add-new-event.component';

@Component({
    selector: 'schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.css'],
    host: { 'class': 'schedule' }
})
export class ScheduleComponent {
    // Fields
    private readonly viewModel: ViewModel = {
        CurrentDate: null,
        CurrentWeekNumber: null,
        FactorRecords: null,
        CurrentDisplayModeEnum: DisplayModes.Day,
        DisplayRepresentation: null
    };
    private readonly subscriptions: Subscription[] = [];
    private readonly appState: IReadOnlyApplicationState;

    // Private methods
    private getCurrentDisplayStrategy(): IDisplayModeStrategy {
        // Get Current Mode strategy
        let currentStrategy: IDisplayModeStrategy = null;
        if (this.viewModel.CurrentDisplayModeEnum === DisplayModes.Day) {
            currentStrategy = new DayDisplayModeStrategy();
        } else if (this.viewModel.CurrentDisplayModeEnum === DisplayModes.Week) {
            // OBS -> Not implemented yet
        }
        return currentStrategy;
    }

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
        this.viewModel.FactorRecords = this.dataService.GetFactorRecordsForTodayFromBundle();
        this.viewModel.CurrentDate = new Date();
        this.viewModel.DisplayRepresentation = this.getCurrentDisplayStrategy().GenerateDisplayRepresentation(this.viewModel.FactorRecords);
    }
    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    // Event handlers
    private onAddNewEventTriggered() {
        this.modalDialogService.openDialog(this.viewContainerRef, {
            title: 'Add new Event',
            childComponent: AddNewEventComponent,
            actionButtons: [
                {
                    text: 'Ok'
                },
                {
                    text: 'Cancel'
                }
            ]


        });
    }
    private onTimeNavigationPreviousTriggered() {
        let newDate = moment(this.viewModel.CurrentDate).subtract(1, 'days');
        this.viewModel.CurrentDate = newDate.toDate();
    }
    private onTimeNavigationNextTriggered() {
        let newDate = moment(this.viewModel.CurrentDate).add(1, 'days');
        this.viewModel.CurrentDate = newDate.toDate();
    }
}
interface ViewModel {
    CurrentDate: Date;
    CurrentWeekNumber: number;
    FactorRecords: CLOs.MedicineFactorRecordCLO[];
    CurrentDisplayModeEnum: DisplayModes;
    DisplayRepresentation: DisplayRepresentation;
}
enum DisplayModes {
    Day,
    Week
}


// STRATEGIES
interface IDisplayModeStrategy {
    GenerateDisplayRepresentation(factorRecords: CLOs.MedicineFactorRecordCLO[]): DisplayRepresentation;
}
class DayDisplayModeStrategy implements IDisplayModeStrategy {
    private unitsConfiguration = [
        {
            Title: 'Night',
            TimeInterval: new TimeInterval(new Time(0, 0), new Time(5, 59))
        },
        {
            Title: 'Morning',
            TimeInterval: new TimeInterval(new Time(6, 0), new Time(9, 59))
        },
        {
            Title: 'MidDay',
            TimeInterval: new TimeInterval(new Time(10, 0), new Time(17, 59))
        },
        {
            Title: 'Evening',
            TimeInterval: new TimeInterval(new Time(18, 0), new Time(23, 59))

        }
    ];
    public GenerateDisplayRepresentation(factorRecords: CLOs.MedicineFactorRecordCLO[]) {

        // Sort 
        factorRecords = factorRecords.sort((f1, f2) => {
            if (f1.GetTime().ToSeconds() > f2.GetTime().ToSeconds()) {
                return 1;
            }

            if (f1.GetTime().ToSeconds() < f2.GetTime().ToSeconds()) {
                return -1;
            }

            return 0;
        });

        // Create the DisplayRepresentation
        let displayRep = new DisplayRepresentation();
        this.unitsConfiguration.forEach((unitConfig) => {
            let newUnitRepr = new UnitRepresentation({
                TimeInterval: unitConfig.TimeInterval,
                Title: unitConfig.Title
            });
            displayRep.UnitRepresentations.push(newUnitRepr);
        });

        // Loop through factorRecords and add them to their corresponding Unit representations
        factorRecords.forEach((record) => {

            // Find which unitRepr it belongs to 
            let matchingUnitRepr = displayRep.UnitRepresentations.find(unitRepr => unitRepr.TimeInterval.ContainsTime(record.GetTime()));
            if (matchingUnitRepr) {

                // Add it 
                let time = record.GetTime();
                if (matchingUnitRepr.TimeGroupRepresentations[time.ToString()] === undefined) {
                    matchingUnitRepr.TimeGroupRepresentations[time.ToString()] = new TimeGroupRepresentation(record.GetTime());
                }
                matchingUnitRepr.TimeGroupRepresentations[time.ToString()].FactorRecords.push(record);
            } else {
                throw new Error("Record with Time =" + record.GetTime().ToString() + " does not match any schedule unit!");
            }

        });



        return displayRep;
    }
};


// REPRESENTATION 
class DisplayRepresentation {
    public readonly UnitRepresentations: UnitRepresentation[] = [];
}
class UnitRepresentation {
    public readonly Title: string;
    public readonly TimeInterval: TimeInterval;
    public readonly TimeGroupRepresentations: { [timeKey: string]: TimeGroupRepresentation } = {};

    constructor(init?: Partial<UnitRepresentation>) {
        Object.assign(this, init);
    }
}
export class TimeGroupRepresentation {
    public readonly Time: Time;
    public readonly FactorRecords: CLOs.MedicineFactorRecordCLO[] = [];

    constructor(time: Time) {
        this.Time = time;
    }
}





