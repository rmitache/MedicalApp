// Angular and 3rd party stuff
import { Component, Input, ViewContainerRef, ViewChild } from '@angular/core';
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
import { MedicineTypeEditorMode, MedicineTypeEditorComponent } from 'SPA/Components/Pages/HomePage/MedicineTypesOverview/MedicineTypeEditor/medicine-type-editor.component';
import { AddMedicineSupplyComponent } from './AddMedicineSupply/add-medicine-supply.component';
import { MedicineFactorRecordCLO } from 'SPA/DomainModel/clo-exports';
import { SpinnerService } from 'SPA/Core/Services/SpinnerService/spinner.service';



@Component({
    selector: 'medicine-types-overview',
    templateUrl: './medicine-types-overview.component.html',
    styleUrls: ['./medicine-types-overview.component.css'],
    host: { 'class': 'medicine-types-overview' }
})
export class MedicineTypesOverviewComponent {
    // Fields
    private readonly subscriptions: Subscription[] = [];
    private readonly appState: IReadOnlyApplicationState;
	private medicineTypeStatusesEnum = Enums.MedicineTypeStatus;
	private readonly medicineTypeStatusViewModes = {
		// Explanation - this collection is necessary because we are not binding directly to the enum values, but to aggregates
		All: 'All',
		Active: 'Active',
		Inactive: 'Inactive'
	};
    private readonly viewModel: ViewModel = {
        AvailableMedicineTypes: null,
        FilteredMedicineTypes: null,

        GetMenuItems: (medicineTypeCLO: CLOs.MedicineTypeCLO) => {
			var menuItemsA = [
				{
					Label: 'Add supply',
					OnClick: () => {
						this.onAddMedicineTypeSupplyTriggered(medicineTypeCLO);
					}
				}
			];

			var menuItemsB = [
				{
					Label: 'Add supply',
					OnClick: () => {
						this.onAddMedicineTypeSupplyTriggered(medicineTypeCLO);
					}
				},
				{
					Label: 'Clear supply',
					OnClick: () => {
						this.onClearSupplyTriggered(medicineTypeCLO);
					}
				}
			];

			if (medicineTypeCLO.RemainingSupply === null) {
				return menuItemsA;
			} else {
				return menuItemsB;
			}
            
        },
		SelectedViewMode: this.medicineTypeStatusViewModes.All,
    };


    // Private methods
    private openMedicineTypeEditor(title: string, saveButtonText: string, medicineTypeCLO: CLOs.MedicineTypeCLO, mode: MedicineTypeEditorMode) {
        this.modalDialogService.OpenDialog(this.viewContainerRef, {
            title: title,
            childComponent: MedicineTypeEditorComponent,
            data: {
                medicineTypeCLO: medicineTypeCLO,
                medicineTypeEditorMode: mode
            },
            actionButtons: [
                {
                    isDisabledFunction: (childComponentInstance: any) => {
                        let editorInstance = childComponentInstance as MedicineTypeEditorComponent;
                        return !editorInstance.GetValidState();
                    },
                    text: saveButtonText,
                    onAction: (childComponentInstance: any) => {
                        let promiseWrapper = new Promise<void>((resolve) => {
							this.spinnerService.Show();

                            let medicineTypeEditorComponentInstance = childComponentInstance as MedicineTypeEditorComponent;
                            medicineTypeEditorComponentInstance.SaveData()
                                .then((planCLO) => {

                                    this.reloadDataFromServer()
                                        .then(() => {
                                            this.refreshUI();
                                        });

                                    setTimeout(() => {
										this.spinnerService.Hide();
                                        resolve();
                                    }, 200);
                                });


                        });
                        return promiseWrapper;
                    }
                },
                {
                    isDisabledFunction: (childComponentInstance: any) => {
                        return false;
                    },
                    text: 'Cancel',
                    onAction: () => {
                        return true;
					},
					buttonClass: 'ui-button-secondary'
                }
            ]


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
			if (medTypeViewMode === this.medicineTypeStatusViewModes.All) {
				return true;
			}

			// InUse
			if (medTypeViewMode === this.medicineTypeStatusViewModes.Active) {
				return (medType.UsageStatus === Enums.MedicineTypeStatus.InUseToday);
			}

			// Inactive
			if (medTypeViewMode === this.medicineTypeStatusViewModes.Inactive) {
				return (medType.UsageStatus === Enums.MedicineTypeStatus.NotInUse);
			}

			return null;
        });
        return filteredCLOs;
    }
	private refreshUI() {
        this.viewModel.FilteredMedicineTypes = this.filterMedicineTypes(this.viewModel.AvailableMedicineTypes, this.viewModel.SelectedViewMode);
    }

    // Constructor 
    constructor(
        applicationState: HomePageApplicationState,
        private readonly commandManager: CommandManager,
        private readonly genericCLOFactory: GenericCLOFactory,
        private readonly dataService: HomePageDataService,
        private readonly modalDialogService: ModalDialogService,
		private viewContainerRef: ViewContainerRef,
		private readonly spinnerService: SpinnerService
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
    public AddOrRemoveSupplyForMedicineType(medicineFactorRecordCLO: CLOs.MedicineFactorRecordCLO) {

        // Variables
        var chosenMedType = this.viewModel.AvailableMedicineTypes.find(medType => {
            return medType.ID === medicineFactorRecordCLO.MedicineType.ID;
        });
        if (chosenMedType.RemainingSupply === null) {
            return;
        }

        // Determine which supplyValue to use 
        let supplyValue: number;
        if (chosenMedType.IsPackagedIntoUnits === true) {
            supplyValue = 1;
        } else {
            supplyValue = medicineFactorRecordCLO.UserDefinedUnitDoseSize;
        }
        
        // Determine whether to remove or add the supplyValue to the RemainingSupply of the MedicineType
        if (medicineFactorRecordCLO.Taken === true) {
            chosenMedType.RemoveFromRemainingSupply(supplyValue * medicineFactorRecordCLO.UnitDoseQuantifier);
        } else {
            chosenMedType.AddToRemainingSupply(supplyValue * medicineFactorRecordCLO.UnitDoseQuantifier);
        }
        
    }

    // Event handlers
    private onAddNewMedicineTypeTriggered() {
        let newMedicineTypeCLO = this.genericCLOFactory.CreateDefaultClo(CLOs.MedicineTypeCLO);
        this.openMedicineTypeEditor('Add Medicine Type', 'Save', newMedicineTypeCLO, MedicineTypeEditorMode.CreateNew);
    }
    private onSelectedViewModeChanged(event) {
		const newVal = event.target.value;
        this.viewModel.SelectedViewMode = newVal;

        this.refreshUI();
    }
    private onAddMedicineTypeSupplyTriggered(medicineTypeCLO: CLOs.MedicineTypeCLO) {
        this.modalDialogService.OpenDialog(this.viewContainerRef, {
            title: 'Add new supply',
            childComponent: AddMedicineSupplyComponent,
            data: {
                medicineTypeCLO: medicineTypeCLO,
            },
            actionButtons: [
                {
                    isDisabledFunction: (childComponentInstance: any) => {
                        let componentInstance = childComponentInstance as AddMedicineSupplyComponent;
                        return !componentInstance.GetValidState();
                    },
                    text: 'Save',
                    onAction: (childComponentInstance: any) => {
                        let promiseWrapper = new Promise<void>((resolve) => {
							this.spinnerService.Show();

                            let componentInstance = childComponentInstance as AddMedicineSupplyComponent;
                            componentInstance.SaveData()
                                .then((supplyAdded) => {
                                    setTimeout(() => {
                                        medicineTypeCLO.AddToRemainingSupply(supplyAdded);
                                        this.commandManager.InvokeCommandFlow('RefreshScheduleFlow');
										this.spinnerService.Hide();
                                        resolve();
                                    }, 200);
                                    

                                });
                        });
                        return promiseWrapper;
                    }
                },
                {
                    isDisabledFunction: (childComponentInstance: any) => {
                        return false;
                    },
                    text: 'Cancel',
                    onAction: () => {
                        return true;
					},
					buttonClass: 'ui-button-secondary'
                }
            ]
        });
    }
    private onClearSupplyTriggered(medicineTypeCLO: CLOs.MedicineTypeCLO) {
        this.dataService.ClearSupplyEntries(medicineTypeCLO.ID).then(() => {
            medicineTypeCLO.ClearSupply();
            this.commandManager.InvokeCommandFlow('RefreshScheduleFlow');
        });
    }
}
interface ViewModel {
    AvailableMedicineTypes: CLOs.MedicineTypeCLO[];
    FilteredMedicineTypes: CLOs.MedicineTypeCLO[];

    GetMenuItems(medicineTypeCLO: CLOs.MedicineTypeCLO);
    SelectedViewMode: any;
}
export enum MedicineTypeActionType {
    CreateNew
}
