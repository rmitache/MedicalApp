// Angular and 3rd party stuff
import { Component, Input, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import * as moment from 'moment';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';



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
        HealthEntryCLOs: null,
        Visible: false,
        TopPos: 0,
        LeftPos: 0
    };

    options = {
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
                        
                    },
                    min: '00:00',
                    max: '23:59'
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
    data = {
        datasets: [
            {
                
                pointBackgroundColor: 'black',
                pointRadius: 3,
                showLine: true,
                data: [
                    {
                        x: moment().startOf('day'),
                        y: 2
                    },
                    {
                        x: moment().endOf('day'),
                        y: -3
                    }
                ]
            }
        ]
    };

    // Constructor 
    constructor(
    ) {


    }
    ngOnInit() {
    }

    // Public 
    public SetDataAndPosition(dateString: string, healthEntryCLOs: CLOs.HealthStatusEntryCLO[], parentPosition: any, caretX: number, caretY: number) {

        this.viewModel.Visible = true;
        this.viewModel.Title = dateString;
        this.viewModel.HealthEntryCLOs = healthEntryCLOs;

        var currentHeight = (this.tooltipDiv.nativeElement as HTMLElement).clientHeight;
        var currentWidth = (this.tooltipDiv.nativeElement as HTMLElement).clientWidth;
        this.viewModel.TopPos = parentPosition.top + caretY - currentHeight - 20;
        this.viewModel.LeftPos = parentPosition.left + caretX - currentWidth / 2;

    }
    public HideAndClear() {
        this.viewModel.Title = '';
        this.viewModel.TopPos = 0;
        this.viewModel.LeftPos = 0;
        this.viewModel.Visible = false;
    }
}


interface ViewModel {
    Title: string;
    HealthEntryCLOs: Object;
    Visible: boolean;
    TopPos: number;
    LeftPos: number;

}