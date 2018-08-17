// Angular and 3rd party stuff
import { Component, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
import * as momentRange from 'moment-range';
import { ChartModule, UIChart } from 'primeng/primeng';
import * as Chart from 'chart.js';
import 'chartjs-plugin-annotation';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { Time, Range, TimeRange } from 'SPA/Core/Helpers/DataStructures/misc';
import { ModalDialogService } from 'SPA/Core/Services/ModalDialogService/modal-dialog.service';
import { CommandManager } from 'SPA/Core/Managers/CommandManager/command.manager';
import * as HelperFunctions from 'SPA/Core/Helpers/Functions/functions';
import { GetMonthRangeWithPaddingUsingMoment, IsDateOnFirstOrLastDateInMonth } from 'SPA/Core/Helpers/Functions/functions';

// Components
import { AnalysisPageApplicationState, IReadOnlyApplicationState } from 'SPA/Components/Pages/AnalysisPage/analysis-page-application-state';
import { AnalysisPageDataService } from 'SPA/Components/Pages/AnalysisPage/analysis-page-data.service';
import { NavigationPanelComponent } from 'SPA/Components/Shared/NavigationPanel/navigation-panel.component';
import { DateRangeMode } from 'SPA/Core/Helpers/Enums/enums';
import { IndicatorsFiltersPanelComponent } from 'SPA/Components/Pages/AnalysisPage/IndicatorsView/IndicatorsFiltersPanel/indicators-filters-panel.component';
import { HealthStatusDatasetGenerator, SymptomTypeDatasetGenerator } from 'SPA/Components/Pages/AnalysisPage/IndicatorsView/dataset-generator';
import { GraphTooltipComponent } from 'SPA/Components/Shared/HealthStatusTooltip/graph-tooltip.component';
import { SpinnerService } from 'SPA/Core/Services/SpinnerService/spinner.service';


@Component({
	selector: 'indicators-view',
	templateUrl: './indicators-view.component.html',
	styleUrls: ['./indicators-view.component.css'],
	host: { 'class': 'indicators-view' }
})
export class IndicatorsViewComponent {
	// Fields
	private availableWindowPaddingInMonths = 0;
	private dateRangeDisplayMode: DateRangeMode = DateRangeMode.Month;
	@ViewChild('navPanel')
	private navPanelInstance: NavigationPanelComponent;
	@ViewChild('graphTooltip')
	private graphTooltipInstance: GraphTooltipComponent;
	@ViewChild('filtersPanel')
	private filtersPanelInstance: IndicatorsFiltersPanelComponent;
	private canvas: any;
	private chartCanvasContext: any;
	private chartInstance: any;

	private readonly viewModel: ViewModel = {
		AvailableSymptomTypes: null,
		SelectedSymptomTypes: null,

		AvailableDateRange: null,
		SelectedDateRange: null,
		HealthEntriesInSelectedDateRange: null,

		HighlightRangeStartXPosition: null,
		HighlightRangeEndXPosition: null,

		ChartOptions: null,
		ChartData: null,
		DateRangeDisplayMode: DateRangeMode.Month,
	};
	private readonly subscriptions: Subscription[] = [];
	private readonly appState: IReadOnlyApplicationState;
	private readonly symptomTypesColors = [
		'#e6194b', //red
		'#3cb44b', //green
		'#ffe119', //yellow
		'#0082c8', //blue
		'#f58231', //orange
		'#911eb4', //purple
		'#f032e6', //magenta
		'#008080', //teal
		'#aa6e28', //brown
		'#800000', //maroon
		'#808000', //olive
		'#aaffc3', //mint
		'#ffd8b1', //coral
		'#000080', //navy
		'#808080', //gray
		'#000000', //black
		'#46f0f0', //cyan
		'#d2f53c', //lime
	];

	// Private methods
	private getCurrentDisplayModeInstance(): IDisplayMode {

		var getChartInstanceFunction: GetChartCanvasFunc = () => {
			return this.canvas;
		};

		// Get Current Mode strategy
		let currentStrategy: IDisplayMode = null;
		if (this.viewModel.DateRangeDisplayMode === DateRangeMode.Month) {
			currentStrategy = new MonthDisplayMode(getChartInstanceFunction, this.graphTooltipInstance,
				this.healthStatusDataSetGenerator, this.symptomTypeDatasetGenerator);
		} else {
			// OBS -> Not implemented yet
			throw new Error('HealthGraphDisplayMode not implemented yet');
		}
		return currentStrategy;
	}
	private getSymptomTypesToColorsDictionary(availableSymptomTypes: CLOs.SymptomTypeCLO[]) {

		// Variables
		let symptomTypesToColorsDictionary: { [symptomTypeName: string]: string } = {};

		availableSymptomTypes.forEach((clo, index) => {
			symptomTypesToColorsDictionary[clo.Name] = this.symptomTypesColors[index];
		});

		return symptomTypesToColorsDictionary;
	}
	private reloadDataFromServer(newDateRange: Range<moment.Moment>): Promise<void> {
		let jsDateRange = new Range<Date>(newDateRange.RangeStart.toDate(), newDateRange.RangeEnd.toDate());
		let promise = this.dataService.GetHealthStatusEntries(jsDateRange)
			.then(clos => {
				this.viewModel.AvailableDateRange = newDateRange;
				this.viewModel.HealthEntriesInSelectedDateRange = clos;
			});
		return promise;

	}
	private computeXPositionFromDate(date: moment.Moment) {
		// Check if in range
		var selDateRange = new momentRange.DateRange(this.viewModel.SelectedDateRange.RangeStart, this.viewModel.SelectedDateRange.RangeEnd);
		if (!selDateRange.contains(date)) {
			return null;
		}

		// Variables
		var startDateIndex = HelperFunctions.GetDateIndexInTargetRange(date, this.viewModel.SelectedDateRange);
		var nrOfDaysInSelectedDateRange = HelperFunctions.GetNrOfDaysBetweenDatesUsingMoment(this.viewModel.SelectedDateRange.RangeStart, this.viewModel.SelectedDateRange.RangeEnd);
		var widthBetweenDates = 100 / (nrOfDaysInSelectedDateRange - 1);

		// Compute the width
		let xPosition = (startDateIndex) * widthBetweenDates;
		return xPosition;
	}
	private refreshUI() {
		// Get the healthstatusEntry CLOs which are in the SelectedDateRange
		let filteredHealthStatusEntryCLOs = this.viewModel.HealthEntriesInSelectedDateRange.filter(entry => {
			return moment(entry.OccurrenceDateTime) >= this.viewModel.SelectedDateRange.RangeStart &&
				moment(entry.OccurrenceDateTime) <= this.viewModel.SelectedDateRange.RangeEnd;
		});
		var datesToCLOsDictionary: { [dateKey: string]: CLOs.HealthStatusEntryCLO[] } = {};
		filteredHealthStatusEntryCLOs.forEach((clo, index) => {
			let dateKey = moment(clo.OccurrenceDateTime).format('DD/MM/YYYY');
			if (datesToCLOsDictionary[dateKey] === undefined) {
				datesToCLOsDictionary[dateKey] = [];
			};
			datesToCLOsDictionary[dateKey].push(clo);
		});

		// Refresh VM properties 
		let symptomTypesToColorsDictionary = this.getSymptomTypesToColorsDictionary(this.viewModel.AvailableSymptomTypes);
		let currentDisplayMode = this.getCurrentDisplayModeInstance();



		this.viewModel.ChartOptions = currentDisplayMode.GenerateChartOptions(datesToCLOsDictionary);
		this.viewModel.ChartData = currentDisplayMode.GenerateChartData(this.viewModel.AvailableSymptomTypes, filteredHealthStatusEntryCLOs,
			new Range<moment.Moment>(this.viewModel.SelectedDateRange.RangeStart.clone(), this.viewModel.SelectedDateRange.RangeEnd.clone()),
			this.viewModel.SelectedSymptomTypes, symptomTypesToColorsDictionary);

		// Recreate the chart
		if (this.chartInstance) {
			this.chartInstance.destroy();
		}
		this.chartInstance = new Chart(this.chartCanvasContext, {
			type: 'bar',
			data: this.viewModel.ChartData,
			options: this.viewModel.ChartOptions,

		});
	}

	// Constructor 
	constructor(
		applicationState: AnalysisPageApplicationState,
		private readonly dataService: AnalysisPageDataService,
		private readonly commandManager: CommandManager,
		private viewContainerRef: ViewContainerRef,
		private readonly healthStatusDataSetGenerator: HealthStatusDatasetGenerator,
		private readonly symptomTypeDatasetGenerator: SymptomTypeDatasetGenerator,
		private readonly spinnerService: SpinnerService

	) {
		this.appState = applicationState as IReadOnlyApplicationState;

		// Register self to CommandManager
		this.commandManager.RegisterComponentInstance(this);

		// Subscriptions to AppState
		this.subscriptions.push(this.appState.HighlightedDateRange.Changed.subscribe((newRange) => {
			if (newRange !== null) {
				let start: moment.Moment = newRange.RangeStart;
				let end: moment.Moment = newRange.RangeEnd;

				this.viewModel.HighlightRangeStartXPosition = this.computeXPositionFromDate(start);
				this.viewModel.HighlightRangeEndXPosition = this.computeXPositionFromDate(end);
			} else {
				this.viewModel.HighlightRangeStartXPosition = null;
				this.viewModel.HighlightRangeEndXPosition = null;
			}
		}));
		this.subscriptions.push(this.appState.SelectedDateRange.Changed.subscribe((newValue) => {
			this.onSelectedDateRangeChanged(newValue);
			this.navPanelInstance.SetSelectedDateRange(newValue);
		}));
	}
	ngOnInit() {

		// Initialize symptomTypes and filtersPanel
		this.viewModel.AvailableSymptomTypes = this.dataService.GetSymptomTypesFromBundle().ToArray();
		this.viewModel.SelectedSymptomTypes = new Array(this.viewModel.AvailableSymptomTypes.length).fill(null);
		this.filtersPanelInstance.Initialize(this.viewModel.AvailableSymptomTypes, this.viewModel.SelectedSymptomTypes, this.symptomTypesColors.slice());

		// Initialize date ranges
		var initialSelectedDateRange = this.navPanelInstance.InitAndGetSelDateRange(this.viewModel.DateRangeDisplayMode, moment());
		this.viewModel.AvailableDateRange = GetMonthRangeWithPaddingUsingMoment(initialSelectedDateRange.RangeStart,
			initialSelectedDateRange.RangeEnd, this.availableWindowPaddingInMonths);
		this.viewModel.SelectedDateRange = initialSelectedDateRange;
		this.viewModel.HealthEntriesInSelectedDateRange = this.dataService.GetHealthStatusEntriesForInitialRangeFromBundle().ToArray();

		// OBS: Refresh the UI -> is done in ngAfterViewInit (in order to reference the chart properly)
	}
	ngAfterViewInit() {
		// Get references to the chart canvas context
		this.canvas = document.getElementById('myChart');
		this.chartCanvasContext = this.canvas.getContext('2d');

		// Refresh the UI
		this.refreshUI();
	}
	ngOnDestroy() {
		this.subscriptions.forEach(s => s.unsubscribe());
	}

	// Event handlers
	private onSelectedDateRangeChanged(newSelDateRange: Range<moment.Moment>) {


		// Check if newSelDateRange is within the AvailableDateRange
		if (newSelDateRange.RangeStart >= this.viewModel.AvailableDateRange.RangeStart &&
			newSelDateRange.RangeEnd <= this.viewModel.AvailableDateRange.RangeEnd) {
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
	}
	private onSelectedDateRangeChangeTriggered(newSelDateRange: Range<moment.Moment>) {

		this.commandManager.InvokeCommandFlow('ChangeSelectedDateRangeFlow', [newSelDateRange]);
	}
	private onSymptomTypeSelected(symptomType: CLOs.SymptomTypeCLO) {
		let indexInAvailableSymptomTypesArray = this.viewModel.AvailableSymptomTypes.findIndex((planCLO) => {
			return planCLO.ID === symptomType.ID;
		});
		this.viewModel.SelectedSymptomTypes[indexInAvailableSymptomTypesArray] = symptomType;
		this.refreshUI();
	}
	private onSymptomTypeDeselected(symptomType: CLOs.SymptomTypeCLO) {
		let indexInSelectedSymptomTypesArray = this.viewModel.SelectedSymptomTypes.findIndex((planCLO) => {
			if (planCLO !== null) {
				return planCLO.ID === symptomType.ID;
			} else {
				return false;
			}
		});
		this.viewModel.SelectedSymptomTypes[indexInSelectedSymptomTypesArray] = null;
		this.refreshUI();
	}
}

interface ViewModel {
	AvailableSymptomTypes: CLOs.SymptomTypeCLO[];
	SelectedSymptomTypes: CLOs.SymptomTypeCLO[];

	AvailableDateRange: Range<moment.Moment>;
	SelectedDateRange: Range<moment.Moment>;
	HealthEntriesInSelectedDateRange: CLOs.HealthStatusEntryCLO[];

	HighlightRangeStartXPosition: number;
	HighlightRangeEndXPosition: number;

	ChartOptions: any;
	ChartData: any;
	DateRangeDisplayMode: DateRangeMode;
}



// Supported Display modes
type GetChartCanvasFunc = () => any;
interface IDisplayMode {
	GenerateChartOptions(datesToCLOsDictionary: { [dateKey: string]: CLOs.HealthStatusEntryCLO[] }): any;
	GenerateChartData(availableSymptomTypes: CLOs.SymptomTypeCLO[], preFilteredHealthStatusEntriesCLOs: CLOs.HealthStatusEntryCLO[], currentSelDateRange: Range<moment.Moment>,
		selectedSymptomTypeCLOs: CLOs.SymptomTypeCLO[], symptomTypesToColorsDictionary: { [symptomTypeName: string]: string }): any;
}
class MonthDisplayMode implements IDisplayMode {

	// Constructor
	constructor(
		private readonly getChartCanvas: GetChartCanvasFunc,
		private readonly graphTooltipInstance: GraphTooltipComponent,
		private readonly healthStatusDataSetGenerator: HealthStatusDatasetGenerator,
		private readonly symptomTypeDatasetGenerator: SymptomTypeDatasetGenerator) {
	}

	// Public methods
	public GenerateChartOptions(datesToCLOsDictionary: { [dateKey: string]: CLOs.HealthStatusEntryCLO[] }) {
		let chartOptions = {
			tooltips: {
				enabled:false,
				custom: (tooltipModel) => {
					if (tooltipModel.opacity === 0) {
						this.graphTooltipInstance.HideAndClear()
						return;
					}
					
					// Variables
					var canvas = this.getChartCanvas();
					var dateString = tooltipModel.title[0];
					var dateKey = moment(dateString, "dddd MMM D, YYYY").format('DD/MM/YYYY');
					var healthStatusEntryCLOsForDate = datesToCLOsDictionary[dateKey];
					var parentPosition = canvas.getBoundingClientRect();

					// Hack for positioning of tooltip on negative bar chart values
					var value = tooltipModel.dataPoints[0].yLabel;
					if (value < 0) {
						tooltipModel.caretY = (parentPosition.height / 2);
					}

					//
					this.graphTooltipInstance.SetDataAndPosition(dateString, healthStatusEntryCLOsForDate, parentPosition, tooltipModel.caretX, tooltipModel.caretY);
				}
			},
			elements: {
				line: {
					tension: 0, // disables bezier curves
				}
			},
			legend: {
				display: false,
				position: 'top',
				labels: {
					boxWidth: 15,

				},
			},
			scales: {
				xAxes: [{
					id: 'x-axis-0',
					type: "time",
					time: {
						unit: 'day',
						round: 'day',
						unitStepSize: 1,
						tooltipFormat: "dddd MMM D, YYYY",
						displayFormats: {
							hour: 'MMM D'
						}
					},
					gridLines: {
						color: '#cacaca',
						display: true,
						drawOnChartArea: false,
					},
					ticks: {
						maxRotation: 0,
						minRotation: 0,
						fontColor: 'gray',
						fontFamily: 'Arial',
						fontSize: 10,
						beginAtZero: true,
						autoSkip: false,
						callback: function (value, index, values) {
							return value;
							//if (!(index % 2)) return value;
						}
					}
				}],
				yAxes: [{
					id: 'y-axis-0',
					gridLines: {
						display: true,
						drawTicks: true,
						drawOnChartArea: true,
						tickMarkLength: 5,
						drawBorder: true,
						zeroLineColor: 'black'
					},

					ticks: {
						fontColor: 'gray',
						padding: 5,
						beginAtZero: true,
						min: -3,
						max: 3,
						stepSize: 1,
						callback: function (label, index, labels) {

							return '';

						}
					}
				}]
			},
			responsive: true,
			maintainAspectRatio: false,
			annotation: {

				annotations: []
			}
		};

		// Annotations
		let annotations = [{
			type: 'line',
			mode: 'vertical',
			scaleID: 'x-axis-0',
			value: moment(),
			borderColor: 'gray',
			borderWidth: 1,
			label: {
				fontFamily: 'Arial',
				fontSize: '10px',
				enabled: true,
				position: "top",
				content: 'TODAY'
			}
		}];
		if (!IsDateOnFirstOrLastDateInMonth(moment())) {
			chartOptions.annotation.annotations = annotations;
		}

		return chartOptions;
	}
	public GenerateChartData(availableSymptomTypes: CLOs.SymptomTypeCLO[], preFilteredHealthStatusEntriesCLOs: CLOs.HealthStatusEntryCLO[], currentSelDateRange: Range<moment.Moment>,
		selectedSymptomTypeCLOs: CLOs.SymptomTypeCLO[], symptomTypesToColorsDictionary: { [symptomTypeName: string]: string }) {

		// Variables
		let data = {
			datasets: []
		};

		// Create SymptomType datasets
		let symptomTypeDataSetsDictionary = this.symptomTypeDatasetGenerator.GenerateDataSets(availableSymptomTypes,
			preFilteredHealthStatusEntriesCLOs, currentSelDateRange);
		selectedSymptomTypeCLOs.forEach((selectedSymptomType) => {
			if (selectedSymptomType !== null) {
				let symptomTypeDataset = symptomTypeDataSetsDictionary[selectedSymptomType.Name];
				symptomTypeDataset.borderColor = symptomTypesToColorsDictionary[selectedSymptomType.Name];
				data.datasets.push(symptomTypeDataset);
			}
		});

		// Create HealthStatus dataset
		let healthStatusDataset = this.healthStatusDataSetGenerator.GenerateDataSet(preFilteredHealthStatusEntriesCLOs, currentSelDateRange);
		data.datasets.push(healthStatusDataset);


		return data;
	}
};
