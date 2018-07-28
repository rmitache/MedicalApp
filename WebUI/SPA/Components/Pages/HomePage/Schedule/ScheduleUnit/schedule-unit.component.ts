import { Component, Input } from '@angular/core';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { TimeGroupRepresentation } from 'SPA/Components/Pages/HomePage/Schedule/schedule.component';
import { HomePageDataService } from 'SPA/Components/Pages/HomePage/home-page-data.service';
import { CommandManager } from 'SPA/Core/Managers/CommandManager/command.manager';

@Component({
    selector: 'schedule-unit',
    templateUrl: './schedule-unit.component.html',
    styleUrls: ['./schedule-unit.component.css'],
    host: { 'class': 'schedule-unit' }
})
export class ScheduleUnitComponent {
    // Fields
    @Input('Title')
    private title: string = '';
    @Input('TimeGroupRepresentations')
    private timeGroupRepresentations: TimeGroupRepresentation[] = [];
    private uomTypesEnum = Enums.UnitOfMeasure;
    private readonly viewModel: ViewModel = {
        Title: null,
        TimeGroups: null
    };

    // Constructor 
    constructor(
        private readonly dataService: HomePageDataService,
        private readonly commandManager: CommandManager,

    ) {

    }
    ngOnInit() {
        this.viewModel.TimeGroups = this.timeGroupRepresentations;
        this.viewModel.Title = this.title;
    }

    // Event handlers
    private onFactorRecordItemClicked(factorRecordCLO: CLOs.MedicineFactorRecordCLO) {
        let takenStatus = (factorRecordCLO.Taken === true) ? false : true;
        factorRecordCLO.Taken = takenStatus;

        this.dataService.MarkFactorRecordsAsTaken([factorRecordCLO]);
        this.commandManager.InvokeCommandFlow('ToggleTakenForMedicineFactorRecordFlow', [factorRecordCLO]);
    }
}

interface ViewModel {
    Title: string;
    TimeGroups: TimeGroupRepresentation[];
    
}

