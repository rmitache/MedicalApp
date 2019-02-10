import { Component, Input } from '@angular/core';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { TimeGroupRepresentation } from 'SPA/Components/Pages/HomePage/Schedule/schedule.component';
import { HomePageDataService } from 'SPA/Components/Pages/HomePage/home-page-data.service';
import { CommandManager } from 'SPA/Core/Managers/CommandManager/command.manager';
import * as moment from 'moment';

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
    private userDefinedUnitDoseTypesEnum = Enums.UserDefinedUnitDoseType;
    private uomTypesEnum = Enums.UnitOfMeasure;
    private readonly viewModel: ViewModel = {
        Title: null,
        TimeGroups: null
    };

    // Private methods
    private FactorRecordIsMoreThanOneDayInTheFuture(factorRecordCLO: CLOs.MedicineFactorRecordCLO) {
        var isTrue = moment(factorRecordCLO.OccurrenceDateTime) >= moment().add(1, 'days');
        return isTrue;
    }

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
        if (!this.FactorRecordIsMoreThanOneDayInTheFuture(factorRecordCLO)) {
            let takenStatus = (factorRecordCLO.Taken === true) ? false : true;
            factorRecordCLO.Taken = takenStatus;

			this.dataService.MarkFactorRecordsAsTaken([factorRecordCLO])
				.then(() => {
					this.commandManager.InvokeCommandFlow('ToggleTakenForMedicineFactorRecordFlow', [factorRecordCLO]);
                    this.commandManager.InvokeCommandFlow('RefreshRemindersFlow');
				});
        } else {
            alert('You cannot take medicine more than 24 hours in the future');
        }
    }
}

interface ViewModel {
    Title: string;
    TimeGroups: TimeGroupRepresentation[];
    
}

