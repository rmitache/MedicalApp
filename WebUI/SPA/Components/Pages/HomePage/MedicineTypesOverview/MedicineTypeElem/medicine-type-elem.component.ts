// Angular and 3rd party stuff
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Inplace } from 'primeng/primeng';
import * as moment from 'moment';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
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

        CurrentSupplyInfoState: null,
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
    private getCurrentSupplyInfoState(medicineTypeCLO: CLOs.MedicineTypeCLO) {

        // NotInUseButHasSupply 
        if (medicineTypeCLO.UsageStatus === Enums.MedicineTypeStatus.NotInUse) {
            return new NotInUseButNotEmptySupply(medicineTypeCLO.CurrentSupplyAmount, medicineTypeCLO.CurrentSupplyAmountMeasuredIn,
                medicineTypeCLO.SupplyWillLastUntil);
        }


        // HighSupply - more than 5 weeks 
        if (moment(medicineTypeCLO.SupplyWillLastUntil) > moment().add(35, 'days')) {
            return new HighSupply(medicineTypeCLO.CurrentSupplyAmount, medicineTypeCLO.CurrentSupplyAmountMeasuredIn,
                medicineTypeCLO.SupplyWillLastUntil);
        }
        // MediumSupply - more than 3 weeks
        else if (moment(medicineTypeCLO.SupplyWillLastUntil) > moment().add(21, 'days')) {
            return new MediumSupply(medicineTypeCLO.CurrentSupplyAmount, medicineTypeCLO.CurrentSupplyAmountMeasuredIn,
                medicineTypeCLO.SupplyWillLastUntil);
        }
        // LowSupply - less than 3 weeks
        else if (medicineTypeCLO.SupplyWillLastUntil !== null ) {
        return new LowSupply(medicineTypeCLO.CurrentSupplyAmount, medicineTypeCLO.CurrentSupplyAmountMeasuredIn,
            medicineTypeCLO.SupplyWillLastUntil);
        }
        // EmptySupply 
        else if (medicineTypeCLO.SupplyWillLastUntil === null) {
            return new EmptySupply(medicineTypeCLO.CurrentSupplyAmount, medicineTypeCLO.CurrentSupplyAmountMeasuredIn,
                medicineTypeCLO.SupplyWillLastUntil);
        }

    }
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
        this.viewModel.CurrentSupplyInfoState = this.getCurrentSupplyInfoState(this.viewModel.MedicineTypeCLO);

        // Special handlers
        this.inplaceInstance.onActivate.subscribe(() => {
            this.onInplaceEditStarted();
        });
    }

    // Public methods
    public UpdateCLOSupplyFields(newCurrentSupplyAmount: number, newSupplyWillLastUntil: Date) {
        this.MedicineTypeCLO.CurrentSupplyAmount = newCurrentSupplyAmount;
        this.MedicineTypeCLO.SupplyWillLastUntil = newSupplyWillLastUntil;

        // Refresh
        this.viewModel.MenuItems = this.getMenuItems();
        this.splitButton.UpdateMenuItems(this.viewModel.MenuItems);
        this.viewModel.CurrentSupplyInfoState = this.getCurrentSupplyInfoState(this.viewModel.MedicineTypeCLO);
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

    CurrentSupplyInfoState: ISupplyInfoState;
}


// Special states for how to render SupplyInfo
function FormatFutureRelativeDate(targetDate: moment.Moment) {

    // Variables
    var returnString: string;
    var now = moment();
    let today = moment().startOf('day');
    let tomorrow = moment().add(1, 'day');
    let inSevenDays = today.clone().add(7, 'days');

    // Today
    if (targetDate.isSame(today, 'day')) {
        return 'today';
    }
    // Tomorrow
    if (targetDate.isSame(tomorrow, 'day')) {
        return 'tomorrow';
    }

    // After tomorrow just say the nr of 'days'
    let nrOfDaysUntilTargetDate = targetDate.diff(moment(), 'day') + 1;
    return 'in ' + nrOfDaysUntilTargetDate + ' days';
}
interface ISupplyInfoState {

    MainLabelText: string;
    MainLabelColor: string;

    TooltipText: string;

    IconName: string;
}
class HighSupply implements ISupplyInfoState {
    // Fields
    public readonly MainLabelText: string = 'Runs out ' + FormatFutureRelativeDate(moment(this.untilDate));
    public readonly MainLabelColor: string = '#54a514';
    public readonly TooltipText: string = 'Will run' +
        ' out on ' + moment(this.untilDate).format('MMM DD, YYYY') + ' (you currently have ' +
        this.currentSupplyAmount + ' ' + this.currentSupplyAmountUnitOfMeasureName + ')';

    public readonly IconName: string = 'fa fa-check-circle';

    // Constructor
    public constructor(
        private readonly currentSupplyAmount: number,
        private readonly currentSupplyAmountUnitOfMeasureName: string,
        private readonly untilDate: Date) {

        if (moment(this.untilDate) > moment().add(120, 'days')) {
            this.MainLabelText = 'More than 4 months left';
        }
    }


}
class MediumSupply implements ISupplyInfoState {
    // Fields
    public readonly MainLabelText: string = 'Runs out ' + FormatFutureRelativeDate(moment(this.untilDate));
    public readonly MainLabelColor: string = 'darkorange';
    public readonly TooltipText: string = this.currentSupplyAmount + ' ' + this.currentSupplyAmountUnitOfMeasureName + ' will run' +
        ' out on ' + moment(this.untilDate).format('MMM DD, YYYY');

    public readonly IconName: string = 'fa fa-info-circle';

    // Constructor
    public constructor(
        private readonly currentSupplyAmount: number,
        private readonly currentSupplyAmountUnitOfMeasureName: string,
        private readonly untilDate: Date) {

    }


}
class LowSupply implements ISupplyInfoState {
    // Fields
    public readonly MainLabelText: string = 'Runs out ' + FormatFutureRelativeDate(moment(this.untilDate));
    public readonly MainLabelColor: string = 'red';
    public readonly TooltipText: string = 'You have ' + this.currentSupplyAmount + ' ' + this.currentSupplyAmountUnitOfMeasureName + ' which will run' +
        ' out on ' + moment(this.untilDate).format('MMM DD, YYYY');

    public readonly IconName: string = 'fa fa-exclamation-triangle';

    // Constructor
    public constructor(
        private readonly currentSupplyAmount: number,
        private readonly currentSupplyAmountUnitOfMeasureName: string,
        private readonly untilDate: Date) {

    }


}
class EmptySupply implements ISupplyInfoState {
    // Fields
    public readonly MainLabelText: string = 'Supply is finished';
    public readonly MainLabelColor: string = '#f6a3a3';
    public readonly TooltipText: string = this.currentSupplyAmount + ' ' + this.currentSupplyAmountUnitOfMeasureName + ' left';

    public readonly IconName: string = 'fa fa-ban';

    // Constructor
    public constructor(
        private readonly currentSupplyAmount: number,
        private readonly currentSupplyAmountUnitOfMeasureName: string,
        private readonly untilDate: Date) {

    }
}
class NotInUseButNotEmptySupply implements ISupplyInfoState {
    // Fields
    public readonly MainLabelText: string = this.currentSupplyAmount + ' ' + this.currentSupplyAmountUnitOfMeasureName + ' left';
    public readonly MainLabelColor: string = 'gray';
    public readonly TooltipText: string = '';

    public readonly IconName: string = '';

    // Constructor
    public constructor(
        private readonly currentSupplyAmount: number,
        private readonly currentSupplyAmountUnitOfMeasureName: string,
        private readonly untilDate: Date) {

    }
}