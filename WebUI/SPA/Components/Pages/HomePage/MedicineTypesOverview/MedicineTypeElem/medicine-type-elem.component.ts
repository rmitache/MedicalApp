// Angular and 3rd party stuff
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import * as moment from 'moment';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import { Inplace } from 'primeng/primeng';
import { HomePageDataService } from 'SPA/Components/Pages/HomePage/home-page-data.service';
import { SplitButtonComponent } from 'SPA/Components/Shared/SplitButton/split-button.component';
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
        MenuItems: null,

        //GetSupplyInfoTooltip: () => {
        //	if (this.viewModel.MedicineTypeCLO.RemainingSupply !== null) {
        //		return this.viewModel.MedicineTypeCLO.RemainingSupply + ' ' + this.viewModel.MedicineTypeCLO.RemainingSupplyMeasuredIn + ' left'
        //	}
        //},
        GetSupplyInfoForUI: () => {

            // Variables
            let supplyInfo: SupplyInfoForUI = {
                LabelText: null,
                TooltipText: null
            };

            // Handle different scenarios
            if (this.viewModel.MedicineTypeCLO.CurrentSupplyAmount === 0) {

                // Scenario 1: Supply is equal to 0
                supplyInfo.LabelText = this.viewModel.MedicineTypeCLO.CurrentSupplyAmount + ' ' + this.viewModel.MedicineTypeCLO.CurrentSupplyAmountMeasuredIn + ' left';

            } else if (this.viewModel.MedicineTypeCLO.CurrentSupplyAmount > 0) {

                // Scenario 2: Supply is bigger than 0, which means we must show a label with the estimate date supply will run out
                let supplyUntilMom = moment(this.viewModel.MedicineTypeCLO.SupplyWillLastUntil);
                let relativeDateString = this.formatFutureRelativeDate(supplyUntilMom);
                supplyInfo.LabelText = 'Runs out ' + relativeDateString;
                supplyInfo.TooltipText = 'You have supply until ' + supplyUntilMom.format('MMM DD, YYYY');
            }
            return supplyInfo;
        },

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

        if (medicineTypeCLO.CurrentSupplyAmount === null) {
            return menuItemsA;
        } else {
            return menuItemsB;
        }

    }
    private formatFutureRelativeDate(targetDate: moment.Moment) {

        // Variables
        var returnString: string;
        var now = moment();
        let today = moment().startOf('day');
        let tomorrow = moment().add(1,'day');
        let inSevenDays = today.clone().add(7, 'days');

        // Today
        if (targetDate.isSame(today, 'day')) {
            return 'today';
        }
        // Tomorrow
        if (targetDate.isSame(tomorrow, 'day')) {
            return 'tomorrow';
        }

        // After tomorrow and up until 6 days
        let nrOfDaysUntilTargetDate = targetDate.diff(moment(), 'day');
        return 'in ' + nrOfDaysUntilTargetDate + ' days';
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

    GetSupplyInfoForUI(): SupplyInfoForUI;
}

interface SupplyInfoForUI {
    TooltipText: string;
    LabelText: string;
}
