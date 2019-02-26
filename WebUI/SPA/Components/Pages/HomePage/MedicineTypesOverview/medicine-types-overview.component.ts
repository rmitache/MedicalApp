// Angular and 3rd party stuff
import { Component, Input, ViewContainerRef, ViewChild, ChangeDetectorRef, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { HomePageApplicationState, IReadOnlyApplicationState } from 'SPA/Components/Pages/HomePage/home-page-application-state';
import { HomePageDataService } from 'SPA/Components/Pages/HomePage/home-page-data.service';
import { ModalDialogService } from 'SPA/Core/Services/ModalDialogService/modal-dialog.service';
import { GenericCLOFactory } from 'SPA/DomainModel/generic-clo.factory';
import { CommandManager } from 'SPA/Core/Managers/CommandManager/command.manager';
import { SpinnerService } from 'SPA/Core/Services/SpinnerService/spinner.service';
import { MedicineTypeElemComponent } from './MedicineTypeElem/medicine-type-elem.component';
import { AddSupplyDialogService } from '../../../Shared/Popups/AddSupplyDialog/add-supply-dialog.service';
import { MedicineTypeEditorMode } from '../../../Shared/Popups/MedicineTypeEditorDialog/medicine-type-editor-dialog.component';
import { MedicineTypeEditorDialogService } from '../../../Shared/Popups/MedicineTypeEditorDialog/medicine-type-editor-dialog.service';
import { ConvertDictionaryToArray } from 'SPA/Core/Helpers/Functions/functions';



@Component({
    selector: 'medicine-types-overview',
    templateUrl: './medicine-types-overview.component.html',
    styleUrls: ['./medicine-types-overview.component.css'],
    host: { 'class': 'medicine-types-overview' }
})
export class MedicineTypesOverviewComponent {
    // Fields
    @ViewChildren('medicineTypeElems')
    private medicineTypeElems: QueryList<MedicineTypeElemComponent>;
    private readonly subscriptions: Subscription[] = [];
    private readonly appState: IReadOnlyApplicationState;
    private readonly noDataModes = NoDataModes;
    private medicineTypeStatusesEnum = Enums.MedicineTypeStatus;
    private infoTooltipText: string =
        `Here you can see which Supplements you have. These can be herbs, vitamins, etc. <br />
        The app can also track supply for you, so you know when a Supplement will run out.`;
    private readonly medicineTypeStatusViewModes = {
        All: {
            label: 'All',
            value: 'All'
        },
        InUse: {
            label: 'In use',
            value: 'InUse'
        },
    };
    private readonly viewModel: ViewModel = {
        AvailableMedicineTypes: null,
        FilteredMedicineTypes: null,

        SelectedViewMode: this.medicineTypeStatusViewModes.InUse.value,
        CurrentNoDataMode: null
    };


    // Private methods
    private openMedicineTypeEditor(medicineTypeCLO: CLOs.MedicineTypeCLO, mode: MedicineTypeEditorMode) {

        this.medicineTypeEditorDialogService.Open(medicineTypeCLO, mode, () => {
            this.reloadDataFromServer()
                .then(() => {
                    this.refreshUI();
                });

            setTimeout(() => {
                this.spinnerService.Hide();
            }, 200);
        });
    }
    private reloadDataFromServer(): Promise<void> {
        var promise = this.dataService.GetMedicineTypes()
            .then((medTypes) => {
                this.viewModel.AvailableMedicineTypes = medTypes;
            });

        return promise;
    }
    private filterMedicineTypes(medTypesCLOs: CLOs.MedicineTypeCLO[], medTypeViewMode: any) {
        var filteredCLOs = this.viewModel.AvailableMedicineTypes.filter(medType => {

            // All
            if (medTypeViewMode === this.medicineTypeStatusViewModes.All.value) {
                return true;
            }

            // InUse
            if (medTypeViewMode === this.medicineTypeStatusViewModes.InUse.value) {
                return (medType.UsageStatus === Enums.MedicineTypeStatus.InUseToday);
            }


            return null;
        });
        return filteredCLOs;
    }
    private getMedicineTypeElemByCloID(id: number) {
        var target = this.medicineTypeElems.find(x => x.MedicineTypeID === id);
        return target;
    }
    private getMedicineTypeStatusViewModesAsItems() {
        var itemsArray = ConvertDictionaryToArray(this.medicineTypeStatusViewModes);
        return itemsArray;
    }
    private refreshUI() {
        this.viewModel.FilteredMedicineTypes = this.filterMedicineTypes(this.viewModel.AvailableMedicineTypes, this.viewModel.SelectedViewMode);

        // NoData triggers
        if (this.viewModel.AvailableMedicineTypes.length === 0) {
            this.viewModel.CurrentNoDataMode = NoDataModes.NoAvailableMedicineTypes;
        } else if (this.viewModel.SelectedViewMode === this.medicineTypeStatusViewModes.InUse && this.viewModel.FilteredMedicineTypes.length === 0) {
            this.viewModel.CurrentNoDataMode = NoDataModes.NoMedicineTypesInUse;
        } else {
            this.viewModel.CurrentNoDataMode = null;
        }
    }

    // Constructor 
    constructor(
        applicationState: HomePageApplicationState,
        private readonly commandManager: CommandManager,
        private readonly genericCLOFactory: GenericCLOFactory,
        private readonly dataService: HomePageDataService,
        private readonly modalDialogService: ModalDialogService,
        private viewContainerRef: ViewContainerRef,
        private readonly spinnerService: SpinnerService,
        private readonly addSupplyDialogService: AddSupplyDialogService,
        private readonly medicineTypeEditorDialogService: MedicineTypeEditorDialogService
    ) {
        this.appState = applicationState as IReadOnlyApplicationState;

        // Register self to CommandManager
        this.commandManager.RegisterComponentInstance(this);

    }
    ngOnInit() {
        // Set viewModel properties
        this.viewModel.AvailableMedicineTypes = this.dataService.GetMedicineTypesFromBundle().ToArray();
        this.refreshUI();
    }
    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    // Public method 
    public ReloadData() {
        this.reloadDataFromServer()
            .then(() => {
                this.refreshUI();
            });
    }
    public ReloadRemainingSupplyForMedicineTypeFromServer(medicineTypeID: number) {
        var matchingElem = this.getMedicineTypeElemByCloID(medicineTypeID);

        this.dataService.RecalculateRemainingSupplyAmount(medicineTypeID)
            .then((newSupplyInfo) => {
                matchingElem.UpdateCLOSupplyFields(newSupplyInfo.CurrentSupplyAmount, newSupplyInfo.SupplyWillLastUntil);
            });


    }

    // Event handlers
    private onAddNewMedicineTypeTriggered() {
        let newMedicineTypeCLO = this.genericCLOFactory.CreateDefaultClo(CLOs.MedicineTypeCLO);
        this.openMedicineTypeEditor(newMedicineTypeCLO, MedicineTypeEditorMode.CreateNew);

    }
    private onSelectedViewModeChanged(event) {
        
        const newVal = event.value;
        this.viewModel.SelectedViewMode = newVal;

        this.refreshUI();
    }
    private onEditMedicineTypeTriggered(medicineTypeCLO: CLOs.MedicineTypeCLO) {
        alert("edit triggered for " + medicineTypeCLO.Name);
    }
    private onAddMedicineTypeSupplyTriggered(medicineTypeCLO: CLOs.MedicineTypeCLO) {

        this.addSupplyDialogService.Open(medicineTypeCLO, () => {
            this.dataService.RecalculateRemainingSupplyAmount(medicineTypeCLO.ID)
                .then((newSupplyInfo) => {
                    this.getMedicineTypeElemByCloID(medicineTypeCLO.ID)
                        .UpdateCLOSupplyFields(newSupplyInfo.CurrentSupplyAmount, newSupplyInfo.SupplyWillLastUntil);

                    // 
                    this.commandManager.InvokeCommandFlow('RefreshScheduleFlow');
                    this.commandManager.InvokeCommandFlow('RefreshRemindersFlow');

                    this.spinnerService.Hide();
                });
        });

    }
    private onClearSupplyTriggered(medicineTypeCLO: CLOs.MedicineTypeCLO) {
        this.dataService.ClearSupplyEntries(medicineTypeCLO.ID).then(() => {
            this.getMedicineTypeElemByCloID(medicineTypeCLO.ID).UpdateCLOSupplyFields(null, null);

            this.commandManager.InvokeCommandFlow('RefreshScheduleFlow');
            this.commandManager.InvokeCommandFlow('RefreshRemindersFlow');
        });
    }
}
interface ViewModel {
    AvailableMedicineTypes: CLOs.MedicineTypeCLO[];
    FilteredMedicineTypes: CLOs.MedicineTypeCLO[];

    SelectedViewMode: any;
    CurrentNoDataMode: NoDataModes;
}
export enum MedicineTypeActionType {
    CreateNew
}

enum NoDataModes {
    NoAvailableMedicineTypes = 0,
    NoMedicineTypesInUse = 1
}