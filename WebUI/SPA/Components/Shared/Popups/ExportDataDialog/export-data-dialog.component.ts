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
	private isValid: boolean;
	private reactiveForm: FormGroup;
	private readonly viewModel: ViewModel = {
		StopDate: null,
		PlanCLO: null
	};

	// Private methods
	private refreshIsValid() {
		this.isValid = this.reactiveForm.valid;
	}

	// Constructor 
	constructor(
		private readonly globalDataService: HomePageDataService,
		private fb: FormBuilder

	) {
	}
	ngOnInit() {
		//// Define form
		//this.reactiveForm = this.fb.group({
		//	stopDate: [null, Validators.required]

		//});
		//this.reactiveForm.get('stopDate').setValidators([(control: AbstractControl) => {
		//	return stopDateValidator(control as FormGroup, this.viewModel.PlanCLO.GetLatestVersion(), this.viewModel.PlanCLO.GetSecondLatestVersion());
		//}]);


		//// Subscriptions
		//this.reactiveForm.
		//	valueChanges.
		//	subscribe((value) => {
		//		this.refreshIsValid();
		//	});
	}

	// Public methods
	public ExportData() {
		//let latestVersion = this.viewModel.PlanCLO.GetLatestVersion();
		//latestVersion.EndDateTime = moment(this.viewModel.StopDate).endOf('day').toDate();

		// Export the data
		this.globalDataService.DownloadData();
	}
	public GetValidState() {
		return this.isValid;
	}

	// IModalDialog
	dialogInit(reference: ComponentRef<IModalDialog>, options?: IModalDialogOptions) {
		//this.viewModel.StopDate = options.data.stopDate;
		//this.viewModel.PlanCLO = options.data.planCLO;
	}
}


interface ViewModel {
	StopDate: Date;
	PlanCLO: CLOs.PlanCLO;
}

