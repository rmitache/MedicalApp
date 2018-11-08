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
import { LoginPageDataService } from '../../login-page-data.service';

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
    private readonly viewModel: ViewModel = {
        UserCLO: null,
		AcceptTermsChecked: false
	};

	// Private methods
	private refreshIsValid() {
		this.isValid = this.viewModel.AcceptTermsChecked=== true;
	}

	// Constructor 
	constructor(
        private fb: FormBuilder,
        private dataService: LoginPageDataService
	) {
	}


	// Public methods
	public AcceptTerms(): Promise<void> {
        this.viewModel.UserCLO.TermsAcceptedDate = new Date();

		let saveDataPromise = this.dataService.AcceptTerms(this.viewModel.UserCLO);
		return saveDataPromise;
	}
    public GetValidState() {
        
		return this.isValid;
	}

	// IModalDialog
	dialogInit(reference: ComponentRef<IModalDialog>, options?: IModalDialogOptions) {
        this.viewModel.UserCLO = options.data.user;
    }

    // Event handlers
    private onCheckBoxToggled() {
        this.refreshIsValid();
    }
}


interface ViewModel {
    UserCLO: CLOs.UserAccountCLO;
    AcceptTermsChecked: boolean;
}


