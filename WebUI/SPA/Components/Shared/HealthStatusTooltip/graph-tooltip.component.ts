// Angular and 3rd party stuff
import { Component, Input, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import * as moment from 'moment';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { HealthStatusEntryCLOService, SymptomTypeAndAvgIntensity } from 'SPA/DomainModel/Indicators/Symptoms/CLOServices/health-status-entry-clo.service';



@Component({
	selector: 'graph-tooltip',
	templateUrl: './graph-tooltip.component.html',
	styleUrls: ['./graph-tooltip.component.css'],
	host: { 'class': 'graph-tooltip' }
})
export class GraphTooltipComponent {
	// Fields
	@ViewChild('tooltipDiv')
	private tooltipDiv: ElementRef;
	private readonly viewModel: ViewModel = {
		Title: '',
		ChartData: null,
		SymptomTypes: null,

		HideSymptomsDiv: false,
		Visible: false,
		TooltipPos: null,
		CaretPos: null
	};
	private options =
		{
			tooltips: {
				enabled: false
			},
			elements: {
				line: {
					tension: 0, // disables bezier curves
				}
			},
			legend: {
				display: false,
			},
			scales: {
				xAxes: [{
					type: "time",
					distribution: 'linear',
					time: {
						minUnit: 'minute',
						unit: 'minute',
						unitStepSize: 30,
						displayFormats: {
							hour: 'H:mm',
							minute: 'H:mm',
						}
					},
					gridLines: {
						display: true,
						drawOnChartArea: false,
						offsetGridLines: false
					},
					ticks: {
						maxTicksLimit: 4,
						fontColor: 'gray',
						beginAtZero: true,
						autoSkip: false,
						callback: function (value, index, values) {
							if (value === '0:00' || value === '6:00' || value === '12:00' || value === '18:00' || value === '23:30') {
								return value;
							}
							else {
								return '';
							}
						}
					}
				}],
				yAxes: [{

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
							//if (label === 3 || label === -3)
							//    return Enums.HealthLevel[label];
							//else
							return '';
						}
					}
				}]
			},
			responsive: true,
			maintainAspectRatio: false
		};

	// Private methods
	private generateDataPointsForChart(healthEntryCLOs: CLOs.HealthStatusEntryCLO[]) {

		// Variables
		var dataPoints = []
		var dataPointsBgColors = [];


		// Loop through clos and create datapoints
		healthEntryCLOs.forEach((clo, index) => {

			// Create datapoints
			var dp = {
				x: moment(clo.OccurrenceDateTime),
				y: clo.HealthLevel
			};
			dataPoints.push(dp);
			if (clo.HealthLevel >= 0) {
				dataPointsBgColors.push('#9dc340'); // green
			} else {
				dataPointsBgColors.push('#f35d5d'); // red
			}
		});

		// Add min/max special datapoints
		if (healthEntryCLOs.length > 0) {
			var minDp = {
				x: moment(healthEntryCLOs[0].OccurrenceDateTime).startOf('day'),
				y: null
			}
			dataPoints.splice(0, 0, minDp);
			dataPointsBgColors.splice(0, 0, 'black');

			var maxDp = {
				x: moment(healthEntryCLOs[0].OccurrenceDateTime).endOf('day'),
				y: null
			}
			dataPoints.push(maxDp);
			dataPointsBgColors.push(maxDp);
		}




		return {
			dataPoints: dataPoints,
			dataPointsBgColors: dataPointsBgColors
		};
	}
	private calculateTooltipPosition(parentPosition: any, hoverPointLeft: number, hoverPointTop: number): PosCoordinates[] {

		// Variables
		let tooltipPos = new PosCoordinates();
		let caretPos = new PosCoordinates();
		var currentWidth = (this.tooltipDiv.nativeElement as HTMLElement).clientWidth;
		var currentHeight = (this.tooltipDiv.nativeElement as HTMLElement).clientHeight;
		

		// Set position
		var currentHeight = (this.tooltipDiv.nativeElement as HTMLElement).clientHeight;
		var currentWidth = (this.tooltipDiv.nativeElement as HTMLElement).clientWidth;
		tooltipPos.Top = parentPosition.top + hoverPointTop - currentHeight - 40;
		tooltipPos.Left = parentPosition.left + hoverPointLeft - currentWidth / 2 - 5;
		caretPos.Left = currentWidth / 2 - 21;
		caretPos.Top =  46;

		
		// Handle case when position overflows screen on the left side
		if (tooltipPos.Left < 0) {
			tooltipPos.Left = 10;
			caretPos.Left = parentPosition.left + hoverPointLeft - 35;
		}


		// 
		let returnArray: PosCoordinates[] = [tooltipPos, caretPos];
		return returnArray;
	}

	// Constructor 
	constructor(
		private readonly healthStatusEntryCLOService: HealthStatusEntryCLOService
	) {

	}
	ngOnInit() {

	}

	// Public 
	public SetDataAndPosition(dateString: string, healthEntryCLOs: CLOs.HealthStatusEntryCLO[], parentPosition: any, caretX: number, caretY: number) {

		this.viewModel.Title = dateString;

		// Generate dataPoints for chart
		var sortedCLOs = healthEntryCLOs.sort((f1, f2) => {
			if (f1.GetTime().ToSeconds() > f2.GetTime().ToSeconds()) {
				return 1;
			}

			if (f1.GetTime().ToSeconds() < f2.GetTime().ToSeconds()) {
				return -1;
			}

			return 0;
		});
		var dataPointsInfo = this.generateDataPointsForChart(sortedCLOs);
		var data = {
			datasets: [
				{
					pointRadius: 5,
					pointStyle: 'circle',
					showLine: true,
					data: dataPointsInfo.dataPoints,
					pointBackgroundColor: dataPointsInfo.dataPointsBgColors,
				}
			]
		}
		this.viewModel.ChartData = data;

		// Get symptom entries
		this.viewModel.SymptomTypes = this.healthStatusEntryCLOService.GetUniqueSymptomTypesWithAvgDose(healthEntryCLOs);
		this.viewModel.HideSymptomsDiv = (this.viewModel.SymptomTypes.length === 0);

		// Calculate position
		setTimeout(() => {
			var tooltipAndCaretPos = this.calculateTooltipPosition(parentPosition, caretX, caretY);

			this.viewModel.TooltipPos = tooltipAndCaretPos[0];
			this.viewModel.CaretPos = tooltipAndCaretPos[1];
			this.viewModel.Visible = true;

		}, 10);
	}
	public HideAndClear() {
		this.viewModel.Visible = false;
		this.viewModel.Title = '';
		this.viewModel.ChartData = null;
		this.viewModel.SymptomTypes = null;

		this.viewModel.TooltipPos = null;
		this.viewModel.CaretPos = null;
	}
}


interface ViewModel {
	Title: string;
	ChartData: any;
	SymptomTypes: SymptomTypeAndAvgIntensity[];

	HideSymptomsDiv: boolean;
	Visible: boolean;
	TooltipPos: PosCoordinates;
	CaretPos: PosCoordinates;

}
class PosCoordinates {
	constructor(public Left: number = 0, public Top: number = 0) {
	}
}
