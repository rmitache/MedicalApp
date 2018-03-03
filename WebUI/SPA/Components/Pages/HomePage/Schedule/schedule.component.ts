// Angular and 3rd party stuff
import { Component, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { Time, Range, TimeRange } from 'SPA/Core/Helpers/DataStructures/misc';
import { GlobalApplicationState, IReadOnlyApplicationState } from 'SPA/Components/Pages/HomePage/global-application-state';
import { GlobalDataService } from 'SPA/Components/Pages/HomePage/global-data.service';
import { ModalDialogService } from 'SPA/Core/Services/ModalDialogService/modal-dialog.service';

// Components
import { AddNewEventComponent } from './AddNewEvent/add-new-event.component';

@Component({
    selector: 'schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.css'],
    host: { 'class': 'schedule' }
})
export class ScheduleComponent {
    // Fields
    private availableDataWindowSizeInDays = 60;
    private readonly viewModel: ViewModel = {
        AvailableDateRange: null,
        AvailableFactorRecords: null,

        VisibleDateRange: null,
        VisibleFactorRecords: null,
        VisibleDisplayRepresentation: null,

        SelectedViewMode: ScheduleDisplayMode.Day,
        Blocked: false
    };

    private readonly subscriptions: Subscription[] = [];
    private readonly appState: IReadOnlyApplicationState;

    // Private methods
    private getCurrentDisplayStrategy(): IDisplayMode {
        // Get Current Mode strategy
        let currentStrategy: IDisplayMode = null;
        if (this.viewModel.SelectedViewMode === ScheduleDisplayMode.Day) {
            currentStrategy = new DayDisplayModeStrategy();
        } else if (this.viewModel.SelectedViewMode === ScheduleDisplayMode.Week) {
            // OBS -> Not implemented yet
        }
        return currentStrategy;
    }
    private reloadFactorRecordsFromServer(dateRange: Range<moment.Moment>): Promise<void> {
        let jsDateRange = new Range<Date>(dateRange.RangeStart.toDate(), dateRange.RangeEnd.toDate());
        let promise = this.dataService.GetFactorRecords(jsDateRange)
            .then(factorRecordCLOs => {
                this.viewModel.AvailableFactorRecords = factorRecordCLOs;
                this.refreshDisplayRepresentation();
            });
        return promise;
    }
    private refreshDisplayRepresentation() {
        this.viewModel.VisibleDisplayRepresentation = this.getCurrentDisplayStrategy().GenerateDisplayRepresentation(this.viewModel.AvailableFactorRecords);
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

        // Init Available (super) DataSet
        this.viewModel.AvailableDateRange = new Range<moment.Moment>(
            moment(new Date()).startOf('day').subtract(this.availableDataWindowSizeInDays / 2, 'days'),
            moment(new Date()).endOf('day').add(this.availableDataWindowSizeInDays / 2, 'days'));
        this.viewModel.AvailableFactorRecords = this.dataService.GetFactorRecordsForInitialRangeFromBundle().ToArray();

        debugger;
        //this.viewModel.CurrentDate = new Date();


        this.refreshDisplayRepresentation();
    }
    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    // Event handlers
    private onAddNewEventTriggered() {
        this.modalDialogService.openDialog(this.viewContainerRef, {
            title: 'Add new one-off Event',
            childComponent: AddNewEventComponent,
            data: this.viewModel.AvailableDateRange.RangeStart.toDate(),
            actionButtons: [
                {
                    isDisabledFunction: (childComponentInstance: any) => {
                        let addNewEventComponentInstance = childComponentInstance as AddNewEventComponent;
                        return !addNewEventComponentInstance.IsValid;
                    },
                    text: 'Save',
                    onAction: (childComponentInstance: any) => {
                        let promiseWrapper = new Promise<void>((resolve) => {
                            this.viewModel.Blocked = true;

                            let addNewEventComponentInstance = childComponentInstance as AddNewEventComponent;
                            addNewEventComponentInstance.SaveData()
                                .then((cloList) => {

                                    this.reloadFactorRecordsFromServer(this.viewModel.AvailableDateRange)
                                        .then(() => {
                                            setTimeout(() => {
                                                this.viewModel.Blocked = false;
                                                resolve();
                                            }, 200);
                                        });

                                });
                        });
                        return promiseWrapper;
                    }
                },
                {
                    isDisabledFunction: (childComponentInstance: any) => {
                        return false;
                    },
                    text: 'Cancel',
                    onAction: () => {
                        return true;
                    }
                }
            ]


        });
    }
    private onNavigateBackwardTriggered() {
        //let newDate = moment(this.viewModel.CurrentDate).subtract(1, 'days').toDate();
        this.reloadFactorRecordsFromServer(this.viewModel.AvailableDateRange);
    }
    private onNavigateForwardTriggered() {
        //let newDate = moment(this.viewModel.CurrentDate).add(1, 'days').toDate();
        this.reloadFactorRecordsFromServer(this.viewModel.AvailableDateRange);
    }
}
interface ViewModel {

    AvailableDateRange: Range<moment.Moment>;
    AvailableFactorRecords: CLOs.MedicineFactorRecordCLO[];

    VisibleDateRange: Range<moment.Moment>;
    VisibleFactorRecords: CLOs.MedicineFactorRecordCLO[];
    VisibleDisplayRepresentation: DisplayRepresentation;

    SelectedViewMode: ScheduleDisplayMode;
    Blocked: boolean;
}
enum ScheduleDisplayMode {
    Day,
    Week
}


// STRATEGIES
interface IDisplayMode {
    GenerateDisplayRepresentation(factorRecords: CLOs.MedicineFactorRecordCLO[]): DisplayRepresentation;
}
class DayDisplayModeStrategy implements IDisplayMode {
    private unitsConfiguration = [
        {
            Title: 'Night',
            TimeInterval: new TimeRange(new Time(0, 0), new Time(5, 59))
        },
        {
            Title: 'Morning',
            TimeInterval: new TimeRange(new Time(6, 0), new Time(9, 59))
        },
        {
            Title: 'MidDay',
            TimeInterval: new TimeRange(new Time(10, 0), new Time(17, 59))
        },
        {
            Title: 'Evening',
            TimeInterval: new TimeRange(new Time(18, 0), new Time(23, 59))

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
export class DisplayRepresentation {
    public readonly UnitRepresentations: UnitRepresentation[] = [];
}
export class UnitRepresentation {
    public readonly Title: string;
    public readonly TimeInterval: TimeRange;
    public readonly TimeGroupRepresentations: { [timeKey: string]: TimeGroupRepresentation } = {};

    constructor(init?: Partial<UnitRepresentation>) {
        Object.assign(this, init);
    }
}
export class TimeGroupRepresentation {
    public readonly Time: Time;
    public readonly FactorRecords: CLOs.MedicineFactorRecordCLO[] = [];
    public ToStringLabel(factorRecordCLO: CLOs.MedicineFactorRecordCLO): string {
        let record = factorRecordCLO;
        return factorRecordCLO.MedicineType.Name + ' - ' + record.UnitDoseQuantifier + ' x ' + Enums.UnitDoseType[record.UnitDoseType]
            + ' (' + record.UnitDoseSize + ' ' + Enums.UnitOfMeasure[record.UnitDoseUoM] + ')';

        // - {{record.MedicineType.Name}} ({{unitDoseTypesEnum[record.UnitDoseType]}})  {{record.UnitDoseQuantifier}} x {{record.UnitDoseSize}} {{uomTypesEnum[record.UnitDoseUoM]}}

    }

    constructor(time: Time) {
        this.Time = time;
    }
}





