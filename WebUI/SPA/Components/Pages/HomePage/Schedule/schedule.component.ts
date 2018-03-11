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
import { CommandManager } from 'SPA/Core/Managers/CommandManager/command.manager';

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
    private availableDataWindowSizeInDays = 10;
    private readonly viewModel: ViewModel = {
        AvailableDateRange: null,
        AvailableFactorRecords: null,

        SelectedDateRange: null,
        NavigationLabel: null,
        VisibleDisplayRepresentation: null,

        SelectedViewMode: ScheduleDisplayMode.Day,
        Blocked: false
    };
    private readonly subscriptions: Subscription[] = [];
    private readonly appState: IReadOnlyApplicationState;

    // Private methods
    private getCurrentDisplayModeInstance(): IDisplayMode {
        // Get Current Mode strategy
        let currentStrategy: IDisplayMode = null;
        if (this.viewModel.SelectedViewMode === ScheduleDisplayMode.Day) {
            currentStrategy = new DayDisplayMode();
        } else if (this.viewModel.SelectedViewMode === ScheduleDisplayMode.Week) {
            // OBS -> Not implemented yet
        }
        return currentStrategy;
    }
    private reloadAvailableFactorRecordsFromServer(newDateRange: Range<moment.Moment>): Promise<void> {
        let jsDateRange = new Range<Date>(newDateRange.RangeStart.toDate(), newDateRange.RangeEnd.toDate());
        let promise = this.dataService.GetFactorRecords(jsDateRange)
            .then(factorRecordCLOs => {
                this.viewModel.AvailableDateRange = newDateRange;
                this.viewModel.AvailableFactorRecords = factorRecordCLOs;
            });
        return promise;
    }
    private recreateDisplayRepresentation() {
        // Use selectedDateRange to get a subset of data from AvailableFactorRecords
        let filteredFactorRecords = this.viewModel.AvailableFactorRecords.filter(fRec => {
            return fRec.OccurenceDateTime >= this.viewModel.SelectedDateRange.RangeStart.toDate() &&
                fRec.OccurenceDateTime <= this.viewModel.SelectedDateRange.RangeEnd.toDate();
        });
        let currentDisplayMode = this.getCurrentDisplayModeInstance();
        this.viewModel.VisibleDisplayRepresentation = currentDisplayMode.GenerateDisplayRepresentation(filteredFactorRecords);
        this.viewModel.NavigationLabel = currentDisplayMode.GetNavigationLabel(this.viewModel.SelectedDateRange);

    }

    // Constructor 
    constructor(
        applicationState: GlobalApplicationState,
        private readonly dataService: GlobalDataService,
        private readonly commandManager: CommandManager,
        private readonly modalDialogService: ModalDialogService,
        private viewContainerRef: ViewContainerRef
    ) {
        this.appState = applicationState as IReadOnlyApplicationState;

        // Register self to CommandManager
        this.commandManager.RegisterComponentInstance(this);

    }
    ngOnInit() {

        // Init Available (super) DataSet
        this.viewModel.AvailableDateRange = new Range<moment.Moment>(
            moment(new Date()).startOf('day').subtract(this.availableDataWindowSizeInDays / 2, 'days'),
            moment(new Date()).endOf('day').add(this.availableDataWindowSizeInDays / 2, 'days'));
        this.viewModel.AvailableFactorRecords = this.dataService.GetFactorRecordsForInitialRangeFromBundle().ToArray();

        // Then init the SelectedDateRange and create the display representation
        this.viewModel.SelectedDateRange = this.getCurrentDisplayModeInstance().GetInitialSelectedDateRange(moment());
        this.recreateDisplayRepresentation();
    }
    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    // Public methods
    public RefreshUI() {
        this.reloadAvailableFactorRecordsFromServer(this.viewModel.AvailableDateRange)
            .then(() => {
                this.recreateDisplayRepresentation();
            });
    }

    // Event handlers
    private onAddNewEventTriggered() {
        this.modalDialogService.openDialog(this.viewContainerRef, {
            title: 'Add new one-off Event',
            childComponent: AddNewEventComponent,
            data: moment().toDate(),
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

                                    this.reloadAvailableFactorRecordsFromServer(this.viewModel.AvailableDateRange)
                                        .then(() => {
                                            this.recreateDisplayRepresentation();
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
        // Check if prevSelectedDateRange is within the AvailableDateRange
        let prevSelectedDateRange = this.getCurrentDisplayModeInstance().GetPreviousSelectedDateRange(this.viewModel.SelectedDateRange);
        if (prevSelectedDateRange.RangeStart > this.viewModel.AvailableDateRange.RangeStart) {
            this.viewModel.SelectedDateRange = prevSelectedDateRange;
            this.recreateDisplayRepresentation();
        }
        else {
            // If it isn't, load a new "window" of FactorRecords from the server
            let newAvailableDateRange = new Range<moment.Moment>(
                this.viewModel.AvailableDateRange.RangeStart.clone().subtract(this.availableDataWindowSizeInDays / 2, 'days'),
                this.viewModel.AvailableDateRange.RangeEnd.clone().subtract(this.availableDataWindowSizeInDays / 2, 'days'));
            this.viewModel.Blocked = true;
            this.reloadAvailableFactorRecordsFromServer(newAvailableDateRange)
                .then(() => {
                    this.viewModel.SelectedDateRange = prevSelectedDateRange;
                    this.recreateDisplayRepresentation();
                    setTimeout(() => {
                        this.viewModel.Blocked = false;
                    }, 200);
                });
        }
    }
    private onNavigateForwardTriggered() {

        // Variables
        let nextSelectedDateRange = this.getCurrentDisplayModeInstance().GetNextSelectedDateRange(this.viewModel.SelectedDateRange);

        // Check if nextSelectedDateRange is within the AvailableDateRange
        if (nextSelectedDateRange.RangeEnd < this.viewModel.AvailableDateRange.RangeEnd) {
            this.viewModel.SelectedDateRange = nextSelectedDateRange;
            this.recreateDisplayRepresentation();
        }
        else {
            
            // If it isn't, load a new "window" of FactorRecords from the server
            let newAvailableDateRange = new Range<moment.Moment>(
                this.viewModel.AvailableDateRange.RangeStart.clone().add(this.availableDataWindowSizeInDays / 2, 'days'),
                this.viewModel.AvailableDateRange.RangeEnd.clone().add(this.availableDataWindowSizeInDays / 2, 'days'));
            this.viewModel.Blocked = true;
            this.reloadAvailableFactorRecordsFromServer(newAvailableDateRange)
                .then(() => {
                    this.viewModel.SelectedDateRange = nextSelectedDateRange;
                    this.recreateDisplayRepresentation();
                    setTimeout(() => {
                        this.viewModel.Blocked = false;
                    }, 200);
                    
                });
        }
    }
}
interface ViewModel {
    AvailableDateRange: Range<moment.Moment>;
    AvailableFactorRecords: CLOs.MedicineFactorRecordCLO[];

    SelectedDateRange: Range<moment.Moment>;
    NavigationLabel: string;
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
    GetInitialSelectedDateRange(referenceDate: moment.Moment): Range<moment.Moment>;
    GetNextSelectedDateRange(currentSelDateRange: Range<moment.Moment>): Range<moment.Moment>;
    GetPreviousSelectedDateRange(currentSelDateRange: Range<moment.Moment>): Range<moment.Moment>;
    GetNavigationLabel(currentSelDateRange: Range<moment.Moment>):string;
    GenerateDisplayRepresentation(factorRecords: CLOs.MedicineFactorRecordCLO[]): DisplayRepresentation;
}
class DayDisplayMode implements IDisplayMode {
    // Fields
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
            Title: 'Mid-Day',
            TimeInterval: new TimeRange(new Time(10, 0), new Time(17, 59))
        },
        {
            Title: 'Evening',
            TimeInterval: new TimeRange(new Time(18, 0), new Time(23, 59))

        }
    ];

    // Public methods
    public GetInitialSelectedDateRange(referenceDate: moment.Moment) {
        return new Range<moment.Moment>(referenceDate.clone().startOf('day'), referenceDate.clone().endOf('day'));
    }
    public GetNextSelectedDateRange(currentSelDateRange: Range<moment.Moment>) {
        // Check if length of range is = 0
        let length = (currentSelDateRange.RangeEnd.diff(currentSelDateRange.RangeStart, 'days'));
        if (length !== 0) {
            throw new Error('Range must be 1 single day. Use GetInitialSelectedDateRange first');
        }

        return new Range<moment.Moment>(currentSelDateRange.RangeStart.clone().add(1, 'days'), currentSelDateRange.RangeEnd.clone().add(1, 'days'));
    }
    public GetPreviousSelectedDateRange(currentSelDateRange: Range<moment.Moment>) {
        // Check if length of range is = 0
        let length = (currentSelDateRange.RangeEnd.diff(currentSelDateRange.RangeStart, 'days'));
        if (length !== 0) {
            throw new Error('Range must be 1 single day. Use GetInitialSelectedDateRange first');
        }

        return new Range<moment.Moment>(currentSelDateRange.RangeStart.clone().subtract(1, 'days'), currentSelDateRange.RangeEnd.clone().subtract(1, 'days'));

    }
    public GetNavigationLabel(currentSelDateRange: Range<moment.Moment>) {
        // Check if length of range is = 0
        let length = (currentSelDateRange.RangeEnd.diff(currentSelDateRange.RangeStart, 'days'));
        if (length !== 0) {
            throw new Error('Range must be 1 single day. Use GetInitialSelectedDateRange first');
        }

        return currentSelDateRange.RangeStart.format('dddd Do MMM, YYYY');
    }
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





