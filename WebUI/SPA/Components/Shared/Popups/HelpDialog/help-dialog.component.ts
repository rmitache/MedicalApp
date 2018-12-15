// Angular and 3rd party stuff
import { Component, Input, EventEmitter, Output, ComponentRef, ViewChildren, QueryList, ViewChild, Inject } from '@angular/core';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators, ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';
import { Calendar } from 'primeng/primeng';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { GenericCLOFactory } from 'SPA/DomainModel/generic-clo.factory';
import { Time } from 'SPA/Core/Helpers/DataStructures/misc';
import * as DataStructures from 'SPA/Core/Helpers/DataStructures/data-structures';
import { IModalDialog, IModalDialogOptions } from 'SPA/Core/Services/ModalDialogService/modal-dialog.interface';
import { HomePageDataService } from 'SPA/Components/Pages/HomePage/home-page-data.service';
import { List } from 'SPA/Core/Helpers/DataStructures/list';
import { ICommonDataService } from 'SPA/Components/Shared/HeaderBar/header-bar.component';

// Components


@Component({
	selector: 'help-dialog',
    templateUrl: './help-dialog.component.html',
    styleUrls: ['./help-dialog.component.css'],
    host: { 'class': 'help-dialog' }
})
export class HelpDialogComponent implements IModalDialog {
	// Fields
	private readonly viewModel: ViewModel = {
	};


	// IModalDialog
	dialogInit(reference: ComponentRef<IModalDialog>, options?: IModalDialogOptions) {
	}
}

interface ViewModel {
	
}
