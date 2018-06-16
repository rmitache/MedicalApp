// Angular and 3rd party stuff
import { Component, ChangeDetectorRef, ApplicationRef, Input, EventEmitter, ViewChild, Output } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';

// Project modules
import { Time, Range, TimeRange, CoordinatePair } from 'SPA/Core/Helpers/DataStructures/misc';
import { CommandManager } from 'SPA/Core/Managers/CommandManager/command.manager';
import { FlowDefinitions } from 'SPA/Components/Pages/HomePage/CommandFlows/flow-definitions';
import * as CLOs from 'SPA/DomainModel/clo-exports';

// Components
import { AnalysisPageApplicationState } from 'SPA/Components/Pages/AnalysisPage/analysis-page-application-state';
import { AnalysisPageDataService } from 'SPA/Components/Pages/AnalysisPage/analysis-page-data.service';
import { VersionRepresentation } from 'SPA/Components/Pages/AnalysisPage/FactorsView/PlanElem/plan-elem.component';


@Component({
    selector: '[hoverable-version-point]',
    templateUrl: './hoverable-version-point.component.html',
    styleUrls: ['./hoverable-version-point.component.css'],
    host: { 'class': 'hoverable-version-point' },
})
export class HoverableVersionPointComponent {
    // Fields
    @Input('XPos')
    private xPos: number = 0;
    private readonly viewModel: ViewModel = {
        XPos: null,
        ShowHoverEffect: false
    };

    // Constructor
    ngOnInit() {
        this.viewModel.XPos = this.xPos;
    }

    // Events
    @Output() public MouseEnter: EventEmitter<void> = new EventEmitter();
    @Output() public MouseLeave: EventEmitter<void> = new EventEmitter();

    // Event handlers
    private onMouseEnter(event: any) {
        this.viewModel.ShowHoverEffect = true;
        this.MouseEnter.emit();
    }
    private onMouseLeave() {
        this.viewModel.ShowHoverEffect = false;
        this.MouseLeave.emit();

    }
}

interface ViewModel {
    XPos: number;
    ShowHoverEffect: boolean;
}