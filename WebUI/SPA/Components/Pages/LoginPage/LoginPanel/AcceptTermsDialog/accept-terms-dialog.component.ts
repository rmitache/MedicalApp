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
	selector: 'accept-terms-dialog',
    templateUrl: './accept-terms-dialog.component.html',
    styleUrls: ['./accept-terms-dialog.component.css'],
    host: { 'class': 'accept-terms-dialog' }
})
export class AcceptTermsDialogComponent implements IModalDialog {
	// Fields
	private isValid: boolean;
	private reactiveForm: FormGroup;
	private readonly viewModel: ViewModel = {
		
	};

	// Private methods
	private refreshIsValid() {
		this.isValid = this.reactiveForm.valid;
	}

	// Constructor 
	constructor(
		private fb: FormBuilder

	) {
	}
	ngOnInit() {
		//// Define form
		//this.reactiveForm = this.fb.group({
		//	stopDate: [null, Validators.required]

		//});
		


		//// Subscriptions
		//this.reactiveForm.
		//	valueChanges.
		//	subscribe((value) => {
		//		this.refreshIsValid();
		//	});
	}

	// Public methods
	public SaveData(): Promise<void> {
		//let latestVersion = this.viewModel.PlanCLO.GetLatestVersion();
		//latestVersion.EndDateTime = moment(this.viewModel.StopDate).endOf('day').toDate();

		//// Save the data
		//let saveDataPromise = this.globalDataService.UpdatePlan(this.viewModel.PlanCLO);
		//return saveDataPromise;
        return null;
	}
	public GetValidState() {
		return this.isValid;
	}

	// IModalDialog
	dialogInit(reference: ComponentRef<IModalDialog>, options?: IModalDialogOptions) {
		
	}
}


interface ViewModel {
	
}


