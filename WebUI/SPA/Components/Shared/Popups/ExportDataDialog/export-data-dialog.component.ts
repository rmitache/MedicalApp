// Angular and 3rd party stuff
import { Component, Input, EventEmitter, Output, ComponentRef, ViewChild, ApplicationRef } from '@angular/core';
import * as moment from 'moment';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { GenericCLOFactory } from 'SPA/DomainModel/generic-clo.factory';
import { Time } from 'SPA/Core/Helpers/DataStructures/misc';
import { IModalDialog, IModalDialogOptions } from 'SPA/Core/Services/ModalDialogService/modal-dialog.interface';
import * as DataStructures from 'SPA/Core/Helpers/DataStructures/data-structures';
import { HomePageDataService } from 'SPA/Components/Pages/HomePage/home-page-data.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

// Components

@Component({
	selector: 'export-data-dialog',
    templateUrl: './export-data-dialog.component.html',
    styleUrls: ['./export-data-dialog.component.css'],
    host: { 'class': 'export-data-dialog' }
})
export class ExportDataDialogComponent implements IModalDialog {
	// Fields
	private readonly viewModel: ViewModel = {
		StopDate: null,
		PlanCLO: null
	};


	// Constructor 
	constructor(
		private readonly globalDataService: HomePageDataService,
		private fb: FormBuilder

	) {
	}
	ngOnInit() {

	}

	// Public methods
	public ExportData():Promise<void> {
        
		// Export the data
        return this.globalDataService.DownloadData("Your LymeJournal data " + moment().format("DD-MM-YYYY"));
	}

	// IModalDialog
	dialogInit(reference: ComponentRef<IModalDialog>, options?: IModalDialogOptions) {
	}
}


interface ViewModel {
	StopDate: Date;
	PlanCLO: CLOs.PlanCLO;
}

