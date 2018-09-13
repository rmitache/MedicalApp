// Angular and 3rd party stuff
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { StringToColour } from 'SPA/Core/Helpers/Functions/functions';

// Components
import { PlanActionType } from 'SPA/Components/Pages/HomePage/PlansOverview/plans-overview.component';
import { SplitButtonMenuItem, SplitButtonComponent } from 'SPA/Components/Shared/SplitButton/split-button.component';
import { Inplace } from 'primeng/primeng';
import { HomePageDataService } from 'SPA/Components/Pages/HomePage/home-page-data.service';
import { MedicineTypeActionType } from 'SPA/Components/Pages/HomePage/MedicineTypesOverview/medicine-types-overview.component';
import { CommandManager } from 'SPA/Core/Managers/CommandManager/command.manager';

@Component({
	selector: 'medicine-type-elem',
	templateUrl: './medicine-type-elem.component.html',
	styleUrls: ['./medicine-type-elem.component.css'],
	host: { 'class': 'medicine-type-elem' }
})
export class MedicineTypeElemComponent {
	// Fields
	@Input('MedicineTypeCLO')
	private readonly medicineTypeCLO: CLOs.MedicineTypeCLO;
	@ViewChild('inplace')
	private inplaceInstance: Inplace;
	@ViewChild('inplaceTextbox')
	private inplaceTextbox: ElementRef;
	@ViewChild('splitButton')
	private readonly splitButton: SplitButtonComponent;
	private readonly viewModel: ViewModel = {
		MedicineTypeCLO: null,
		MenuItems: null
	};

	// Properties
	public get MedicineTypeID() {
		if (this.medicineTypeCLO) {
			return this.medicineTypeCLO.ID;
		} else {
			return null;
		}
	}
	public get MedicineTypeCLO() {
		return this.medicineTypeCLO;
	}

	// Private methods
	private getMenuItems() {

		var medicineTypeCLO = this.medicineTypeCLO;

		var menuItemsA = [
			{
				Label: 'Add supply',
				OnClick: () => {
					this.AddSupplyTriggered.emit(medicineTypeCLO);
				}
			}
		];

		var menuItemsB = [
			{
				Label: 'Add supply',
				OnClick: () => {
					this.AddSupplyTriggered.emit(medicineTypeCLO);
				}
			},
			{
				Label: 'Clear supply',
				OnClick: () => {
					this.ClearSupplyTriggered.emit(medicineTypeCLO);
				}
			}
		];

		if (medicineTypeCLO.RemainingSupply === null) {
			return menuItemsA;
		} else {
			return menuItemsB;
		}

	}

	// Constructor 
	constructor(
		private readonly dataService: HomePageDataService,
		private readonly commandManager: CommandManager,

	) {
	}
	ngOnInit() {

		// Setup VM fields
		this.viewModel.MedicineTypeCLO = this.medicineTypeCLO;
		this.viewModel.MenuItems = this.getMenuItems();

		// Special handlers
		this.inplaceInstance.onActivate.subscribe(() => {
			this.onInplaceEditStarted();
		});
	}

	// Public methods
	public RefreshMenuItems() {
		this.viewModel.MenuItems = this.getMenuItems();
		this.splitButton.UpdateMenuItems(this.viewModel.MenuItems);
	}

	// Events
	@Output() public AddSupplyTriggered: EventEmitter<CLOs.MedicineTypeCLO> = new EventEmitter();
	@Output() public ClearSupplyTriggered: EventEmitter<CLOs.MedicineTypeCLO> = new EventEmitter();

	// Event handlers
	private onInplaceEditStarted() {
		this.inplaceTextbox.nativeElement.value = this.viewModel.MedicineTypeCLO.Name;
		setTimeout(() => {
			this.inplaceTextbox.nativeElement.focus();

		}, 10);
	}
	private onInplaceAcceptChangesTriggered() {
		var currentValueTrimmed = (this.inplaceTextbox.nativeElement.value as string).trim();
		if (currentValueTrimmed !== "" && currentValueTrimmed !== this.viewModel.MedicineTypeCLO.Name) {
			this.inplaceTextbox.nativeElement.value;
			this.viewModel.MedicineTypeCLO.Name = currentValueTrimmed;
			this.dataService.RenameMedicineType(this.viewModel.MedicineTypeCLO.ID, currentValueTrimmed)
				.then(() => {
					this.commandManager.InvokeCommandFlow('RefreshScheduleFlow');
				});
		} else {
			// do nothing if the name hasnt changed
		}

		this.inplaceInstance.deactivate(null);
	}
	private onInplaceCancelChangesTriggered() {
		this.inplaceInstance.deactivate(null);
	}
}
interface ViewModel {
	MedicineTypeCLO: CLOs.MedicineTypeCLO;
	MenuItems: any;
}
