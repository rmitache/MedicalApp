import { Component, Input, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import * as moment from 'moment';

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
        Visible: false,
        TopPos: 0,
        LeftPos: 0
    };

    // Constructor 
    constructor(
    ) {


    }
    ngOnInit() {
    }

    // Public 
    public SetDataAndPosition(title: string, parentPosition: any, caretX: number, caretY: number) {

        this.viewModel.Visible = true;
        this.viewModel.Title = title;

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
    Visible: boolean;
    TopPos: number;
    LeftPos: number;

}