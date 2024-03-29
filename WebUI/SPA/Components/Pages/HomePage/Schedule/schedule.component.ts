// Angular and 3rd party stuff
import { Component, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
import { trigger, state, style, animate, transition, keyframes, query, stagger, group } from '@angular/animations';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { Time, Range, TimeRange } from 'SPA/Core/Helpers/DataStructures/misc';
import { HomePageApplicationState, IReadOnlyApplicationState } from 'SPA/Components/Pages/HomePage/home-page-application-state';
import { HomePageDataService } from 'SPA/Components/Pages/HomePage/home-page-data.service';
import { ModalDialogService } from 'SPA/Core/Services/ModalDialogService/modal-dialog.service';
import { CommandManager } from 'SPA/Core/Managers/CommandManager/command.manager';
import { GenericCLOFactory } from 'SPA/DomainModel/generic-clo.factory';

// Components
import { GetMonthRangeWithPaddingUsingMoment } from 'SPA/Core/Helpers/Functions/functions';
import { NavigationPanelComponent } from 'SPA/Components/Shared/NavigationPanel/navigation-panel.component';
import { DateRangeMode } from 'SPA/Core/Helpers/Enums/enums';
import { SpinnerService } from 'SPA/Core/Services/SpinnerService/spinner.service';
import { PlanEditorMode } from 'SPA/Components/Shared/Popups/PlanEditorDialog/plan-editor-dialog.component';
import { PlanEditorDialogService } from 'SPA/Components/Shared/Popups/PlanEditorDialog/plan-editor-dialog.service';


// Animations
export const goForwardAnimation = trigger('goForwardAnimation', [
	transition('* => *', [
		query(':enter', style({ opacity: 0 }), { optional: true }),
		query(':enter', stagger('-150ms', [
			animate('0.5s ease-in', keyframes([
				style({ opacity: 0 }),
				style({ opacity: .5 }),
				style({ opacity: 1 }),
			]))]), { optional: true })
	])
]);
export const goBackwardAnimation = trigger('goBackwardAnimation', [
	transition('* => *', [
		query(':enter', style({ opacity: 0 }), { optional: true }),
		query(':enter', stagger('150ms', [
			animate('0.5s ease-in', keyframes([
				style({ opacity: 0 }),
				style({ opacity: .5 }),
				style({ opacity: 1 }),
			]))]), { optional: true })

	])
]);

@Component({
	selector: 'schedule',
	templateUrl: './schedule.component.html',
	styleUrls: ['./schedule.component.css'],
	host: { 'class': 'schedule' },
	animations: [
		goForwardAnimation,
		goBackwardAnimation
	]
})
export class ScheduleComponent {
	// Fields
	private availableWindowPaddingInMonths = 1;
	@ViewChild('navPanel')
	private navPanelInstance: NavigationPanelComponent;
	private animationVariables = {
		animateForward: 0,
		animateBackward: 0
    }
    private infoTooltipText: string =
        `SCHEDULE shows a detailed picture of all treatments you have to take during the day. <br />
        You can mark which items you have taken by clicking on them.`;
    private readonly noDataModes = NoDataModes;
    private readonly viewModel: ViewModel = {
        UserHasAnyPlans: null,
        CurrentNoDataMode:null,

		AvailableDateRange: null,
        SelectedDateRange: null,

		AvailableFactorRecords: null,
		VisibleDisplayRepresentation: null,

		DateRangeDisplayMode: DateRangeMode.SingleDay
	};
	private readonly subscriptions: Subscription[] = [];
	private readonly appState: IReadOnlyApplicationState;
    private displaySideBar: boolean = false;

	// Private methods
	private getCurrentDisplayModeInstance(): IDisplayMode {
		// Get Current Mode strategy
		let currentStrategy: IDisplayMode = null;
		if (this.viewModel.DateRangeDisplayMode === DateRangeMode.SingleDay) {
			currentStrategy = new DayDisplayMode(this.genericCLOFactory);
		} else {
			// OBS -> Not implemented yet
		}
		return currentStrategy;
	}
    private reloadDataFromServer(newDateRange: Range<moment.Moment>): Promise<void> {

        // Two promises
		let jsDateRange = new Range<Date>(newDateRange.RangeStart.toDate(), newDateRange.RangeEnd.toDate());
        let getFactorRecordsPromise = this.dataService.GetFactorRecords(jsDateRange);
        let getUserHasAnyPlansPromise = this.dataService.UserHasAnyPlans();

        // Then logic
        let promise = Promise.all([getFactorRecordsPromise, getUserHasAnyPlansPromise])
            .then((results) => {
                let factorRecordCLOs = results[0];
                let userHasAnyPlans = results[1];

                //
                this.viewModel.AvailableDateRange = newDateRange;
                this.viewModel.AvailableFactorRecords = factorRecordCLOs;
                this.viewModel.UserHasAnyPlans = userHasAnyPlans;
            });
        return promise;
    }
    private openPlanEditor(planCLO: CLOs.PlanCLO, mode: PlanEditorMode) {

        this.planEditorDialogService.Open(planCLO, mode, () => {

            this.reloadDataFromServer(this.viewModel.AvailableDateRange)
                .then(() => {
                    this.refreshUI();
                });

            this.commandManager.InvokeCommandFlow('RefreshScheduleAndMedicineTypesOverviewFlow');
            this.commandManager.InvokeCommandFlow('RefreshPlansOverviewFlow');
            this.commandManager.InvokeCommandFlow('RefreshRemindersFlow');

            setTimeout(() => {
                this.spinnerService.Hide();
            }, 200);
        });

    }
	private refreshUI() {
		// Use selectedDateRange to get a subset of data from AvailableFactorRecords
		let visibleFactorRecords = this.viewModel.AvailableFactorRecords.filter(fRec => {

			return fRec.OccurrenceDateTime >= this.viewModel.SelectedDateRange.RangeStart.toDate() &&
				fRec.OccurrenceDateTime <= this.viewModel.SelectedDateRange.RangeEnd.toDate();
		});
		
		// Refresh VM properties
		let currentDisplayMode = this.getCurrentDisplayModeInstance();
        this.viewModel.VisibleDisplayRepresentation = currentDisplayMode.GenerateDisplayRepresentation(visibleFactorRecords);

        // NoData
        if (this.viewModel.UserHasAnyPlans === false) {
            this.viewModel.CurrentNoDataMode = NoDataModes.NoAvailablePlans;
        } else {
            this.viewModel.CurrentNoDataMode = null;
        }
	}

	// Constructor 
	constructor(
		applicationState: HomePageApplicationState,
		private readonly dataService: HomePageDataService,
		private readonly commandManager: CommandManager,
		private readonly genericCLOFactory: GenericCLOFactory,
        private readonly spinnerService: SpinnerService,
        private readonly planEditorDialogService: PlanEditorDialogService,


	) {
		this.appState = applicationState as IReadOnlyApplicationState;

		// Register self to CommandManager
		this.commandManager.RegisterComponentInstance(this);

	}
	ngOnInit() {
		// Get the initial range using the current DisplayMode
		var initialSelectedDateRange = this.navPanelInstance.InitAndGetSelDateRange(this.viewModel.DateRangeDisplayMode, moment());

		// Init VM properties
		this.viewModel.AvailableDateRange = GetMonthRangeWithPaddingUsingMoment(initialSelectedDateRange.RangeStart, initialSelectedDateRange.RangeEnd, this.availableWindowPaddingInMonths);
		this.viewModel.AvailableFactorRecords = this.dataService.GetFactorRecordsForInitialRangeFromBundle().ToArray();
        this.viewModel.SelectedDateRange = initialSelectedDateRange;

        // Init info for NoData
        let plans = this.dataService.GetPlansFromBundle();
        this.viewModel.UserHasAnyPlans = (plans.Length > 0) ? true : false;
		
		// Refresh the UI
		this.refreshUI();
	}
	ngOnDestroy() {
		this.subscriptions.forEach(s => s.unsubscribe());
	}

	// Public methods
	public ReloadData() {
		this.reloadDataFromServer(this.viewModel.AvailableDateRange)
			.then(() => {
				this.refreshUI();
			});
	}

	// Event handlers
    private onAddNewPlanTriggered() {

        let newPlanCLO = this.genericCLOFactory.CreateDefaultClo(CLOs.PlanCLO);
        this.openPlanEditor(newPlanCLO, PlanEditorMode.CreateNew);
    }

	private onSelectedDateRangeChangedBackward(newSelDateRange: Range<moment.Moment>) {
		// Check if newSelDateRange is within the AvailableDateRange
		if (newSelDateRange.RangeStart >= this.viewModel.AvailableDateRange.RangeStart) {
			this.viewModel.SelectedDateRange = newSelDateRange;
			this.refreshUI();
		}
		else {
			// If it isn't, load a new "window" of FactorRecords from the server
			var newAvailableDateRange = GetMonthRangeWithPaddingUsingMoment(newSelDateRange.RangeStart.clone(),
				newSelDateRange.RangeEnd.clone(), this.availableWindowPaddingInMonths);

			this.spinnerService.Show();
			this.reloadDataFromServer(newAvailableDateRange)
				.then(() => {
					this.viewModel.SelectedDateRange = newSelDateRange;
					this.refreshUI();
					setTimeout(() => {
						this.spinnerService.Hide();
					}, 200);
				});
		}

		this.animationVariables.animateBackward++;
	}
	private onSelectedDateRangeChangedForward(newSelDateRange: Range<moment.Moment>) {

		// Check if newSelDateRange is within the AvailableDateRange
		if (newSelDateRange.RangeEnd <= this.viewModel.AvailableDateRange.RangeEnd) {
			this.viewModel.SelectedDateRange = newSelDateRange;
			this.refreshUI();
		}
		else {
			// If it isn't, load a new "window" of FactorRecords from the server
			var newAvailableDateRange = GetMonthRangeWithPaddingUsingMoment(newSelDateRange.RangeStart.clone(),
				newSelDateRange.RangeEnd.clone(), this.availableWindowPaddingInMonths);

			this.spinnerService.Show();
			this.reloadDataFromServer(newAvailableDateRange)
				.then(() => {

					this.viewModel.SelectedDateRange = newSelDateRange;
					this.refreshUI();
					setTimeout(() => {
						this.spinnerService.Hide();
					}, 200);

				});
		}


		this.animationVariables.animateForward++;
	}
}
interface ViewModel {
    UserHasAnyPlans: boolean;
    CurrentNoDataMode: NoDataModes;


	AvailableDateRange: Range<moment.Moment>;
	AvailableFactorRecords: CLOs.MedicineFactorRecordCLO[];

	SelectedDateRange: Range<moment.Moment>;
	VisibleDisplayRepresentation: DisplayRepresentation;

	DateRangeDisplayMode: DateRangeMode;
}


enum NoDataModes {
    NoAvailablePlans = 0
}

// Supported Display modes
interface IDisplayMode {
	GenerateDisplayRepresentation(filteredFactorRecords: CLOs.MedicineFactorRecordCLO[]): DisplayRepresentation;
}
class DayDisplayMode implements IDisplayMode {
	// Fields
	private unitsConfiguration = [
		{
			Title: 'Night / Morning',
			TimeInterval: new TimeRange(new Time(0, 0), new Time(9, 59))
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

	// Private methods
    /* BELOW: commented out conflation logic (needs to be rewritten again if one wants to use it again)
    private areEquivalent(firstFactorRecord: CLOs.MedicineFactorRecordCLO, secondFactorRecord: CLOs.MedicineFactorRecordCLO) {
        // Verifies whether two FactorRecords are conflatable (all fields except the quantifiers, which are expected to perhaps be different)
        var areEquivalent: boolean =
            (firstFactorRecord.MedicineType.ID === secondFactorRecord.MedicineType.ID) &&
            (firstFactorRecord.ParentPlanName === secondFactorRecord.ParentPlanName);
        
        return areEquivalent;
    }
    private tryConflateWithEquivalentInList(factorRecord: CLOs.MedicineFactorRecordCLO, list: CLOs.MedicineFactorRecordCLO[]): boolean {
        var wasConflated = false;
        for (var i = 0; i < list.length; i++) {
            var recInList = list[i];
            if (this.areEquivalent(factorRecord, recInList)) {
                recInList.UnitDoseQuantifier += factorRecord.UnitDoseQuantifier;

                wasConflated = true;
                break;
            }
        }

        return wasConflated;
    }
    */
	// Constructor
	constructor(private readonly genericCLOFactory: GenericCLOFactory) {

	}

	// Public methods
	public GenerateDisplayRepresentation(visibleFactorRecords: CLOs.MedicineFactorRecordCLO[]) {

		// Sort by time (ascending)
		visibleFactorRecords = visibleFactorRecords.sort((f1, f2) => {
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
		visibleFactorRecords.forEach((record) => {

			// Find which unitRepr it belongs to 
			let unitRepr = displayRep.UnitRepresentations.find(unitRepr => unitRepr.TimeInterval.ContainsTime(record.GetTime()));
			if (unitRepr) {

				// Find or create the matching TimeGroupRepresentation
				let time = record.GetTime();
				if (unitRepr.TimeGroupRepresentations[time.ToString()] === undefined) {
					unitRepr.TimeGroupRepresentations[time.ToString()] = new TimeGroupRepresentation(record.GetTime());
				}
				let timeGroup = unitRepr.TimeGroupRepresentations[time.ToString()];

				// Then find or create the matching PlanName entry
				if (timeGroup.FactorRecordsByPlanName[record.ParentPlanName] === undefined) {
					timeGroup.FactorRecordsByPlanName[record.ParentPlanName] = [];
				}
				let destArray = timeGroup.FactorRecordsByPlanName[record.ParentPlanName];

				// Add the factorRecord 
				timeGroup.FactorRecordsByPlanName[record.ParentPlanName].push(record);

				// BELOW: commented out CONFLATION LOGIC (needs to be rewritten)
				// Then try to conflate with an existing equivalent factorRecord or add it
				//if (!this.tryConflateWithEquivalentInList(record, destArray)) {
				//}
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

	// Fields
	public readonly Time: Time;
	public readonly FactorRecordsByPlanName: { [planName: string]: CLOs.MedicineFactorRecordCLO[] } = {};

	// Constructor
	constructor(time: Time) {
		this.Time = time;
	}

	// Public methods
	public GetSortedFactorRecords(planName: string): CLOs.MedicineFactorRecordCLO[] {
		let unsortedFactorRecords = this.FactorRecordsByPlanName[planName];
		let sorted = unsortedFactorRecords.sort((a, b) => {
			if (a.MedicineType.Name > b.MedicineType.Name) {
				return 1;
			}

			if (a.MedicineType.Name < b.MedicineType.Name) {
				return -1;
			}

			return 0;
		});
		return sorted;
	}
	public GetTooltipText(factorRecordCLO: CLOs.MedicineFactorRecordCLO): string {

		let record = factorRecordCLO;
		return factorRecordCLO.MedicineType.Name + ' - ' + record.UnitDoseQuantifier + ' x ' + record.UnitDoseTypeName
			+ ' (' + record.UnitDoseSize + ' ' + record.UnitOfMeasureName + ')';
    }
    public GetLabel(factorRecordCLO: CLOs.MedicineFactorRecordCLO): string {

        let record = factorRecordCLO;
        let labelText = factorRecordCLO.MedicineType.Name + ' - ' + record.UnitDoseQuantifier + ' x ' + record.UnitDoseTypeName
            + ' (' + record.UnitDoseSize + ' ' + record.UnitOfMeasureName + ')';
        return labelText;
    }
}
