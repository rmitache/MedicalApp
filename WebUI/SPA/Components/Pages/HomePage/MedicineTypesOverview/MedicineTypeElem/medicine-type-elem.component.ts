// Angular and 3rd party stuff
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { StringToColour } from 'SPA/Core/Helpers/Functions/functions';

// Components
import { PlanActionType } from 'SPA/Components/Pages/HomePage/PlansOverview/plans-overview.component';
import { SplitButtonMenuItem } from 'SPA/Components/Shared/SplitButton/split-button.component';
import { Inplace } from 'primeng/primeng';
import { HomePageDataService } from 'SPA/Components/Pages/HomePage/home-page-data.service';

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
	private readonly viewModel: ViewModel = {
		MedicineTypeCLO: null,
		GetMenuItems: () => {
			var medicineTypeCLO = this.medicineTypeCLO;
			var menuItemsA = [
				{
					Label: 'Add supply',
					OnClick: () => {
						//this.onAddMedicineTypeSupplyTriggered(medicineTypeCLO);
						alert('add supply');
					}
				}
			];

			var menuItemsB = [
				{
					Label: 'Add supply',
					OnClick: () => {
						//this.onAddMedicineTypeSupplyTriggered(medicineTypeCLO);
						alert('add supply');
					}
				},
				{
					Label: 'Clear supply',
					OnClick: () => {
						//this.onClearSupplyTriggered(medicineTypeCLO);
						alert('clear supply');
					}
				}
			];

			if (medicineTypeCLO.RemainingSupply === null) {
				return menuItemsA;
			} else {
				return menuItemsB;
			}

		},
	};

	
	// Constructor 
	constructor(
		private readonly dataService: HomePageDataService
	) {
	}
	ngOnInit() {

		// Setup VM fields
		this.viewModel.MedicineTypeCLO = this.medicineTypeCLO;
	}

	// Event handlers
	

	// Events
	@Output() public ActionTriggered: EventEmitter<any> = new EventEmitter();
}
interface ViewModel {
	MedicineTypeCLO: CLOs.MedicineTypeCLO;
	GetMenuItems();
}
