// Angular and 3rd party stuff
import { Component, Input, EventEmitter, Output, ComponentRef, QueryList, ViewChildren, ViewChild, ApplicationRef } from '@angular/core';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators, ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { GenericCLOFactory } from 'SPA/DomainModel/generic-clo.factory';
import { Time } from 'SPA/Core/Helpers/DataStructures/misc';
import { IModalDialog, IModalDialogOptions } from 'SPA/Core/Services/ModalDialogService/modal-dialog.interface';
import * as DataStructures from 'SPA/Core/Helpers/DataStructures/data-structures';
import { HomePageDataService } from 'SPA/Components/Pages/HomePage/home-page-data.service';
import { List } from 'SPA/Core/Helpers/DataStructures/list';

// Components
import { SymptomEntryElemComponent } from 'SPA/Components/Pages/HomePage/HealthGraph/AddNewHealthStatusEntry/SymptomEntryElem/symptom-entry-elem.component';



@Component({
    selector: 'add-new-health-status-entry',
    templateUrl: './add-new-health-status-entry.component.html',
    styleUrls: ['./add-new-health-status-entry.component.css'],
    host: { 'class': 'add-new-health-status-entry' }
})
export class AddNewHealthStatusEntryComponent implements IModalDialog {
    // Fields
    private isValid: boolean = false;
    private searchService: ISymptomTypesSearchService = {
        GetSymptomTypeByName: (name) => {
            return this.availableSymptomTypes.ToArray().find(clo => {
                return clo.Name === name;
            });
        },
		Search: (searchString) => {
			searchString = searchString.toLowerCase();

			let matchingMedTypes = this.availableSymptomTypes.ToArray().filter(clo => {
				return clo.Name.toLowerCase().startsWith(searchString);
			});
			let results = matchingMedTypes.map(clo => {
				return clo.Name;
			});

			return results;
        }
    };
    @ViewChildren('symptomEntryElems')
    private symptomEntryElems: QueryList<SymptomEntryElemComponent>;

    private reactiveForm: FormGroup;
    private initialDateTime: Date = null; // initialized from dialogOnInit
    private readonly healthLevelsEnum = Enums.HealthLevel;
    private readonly availableSymptomTypes: DataStructures.List<CLOs.SymptomTypeCLO>;
    private readonly viewModel: ViewModel = {
		HealthStatusEntryCLO: null,
        ShowSymptomEntriesOverlayDiv: true
    };

    // Private methods
    private checkChildrenAreValid(): boolean {

        let allChildElemsAreValid = true;
        if (!this.symptomEntryElems) {
            return false;
        }

        for (var i = 0; i < this.symptomEntryElems.toArray().length; i++) {

            let elem = this.symptomEntryElems.toArray()[i];

            if (!elem.GetValidState()) {
                allChildElemsAreValid = false;
                break;
            }
        }

        //if (this.symptomEntryElems.length === 0) {
        //    allChildElemsAreValid = false;
        //}

        return allChildElemsAreValid;
    }
    private refreshIsValid() {
        let prevIsValid = this.isValid;
        this.isValid = this.checkChildrenAreValid() && this.reactiveForm.valid;
    }
    

    // Constructor 
    constructor(
        private readonly genericCLOFactory: GenericCLOFactory,
        private readonly globalDataService: HomePageDataService,
        private fb: FormBuilder
    ) {
        this.availableSymptomTypes = this.globalDataService.GetSymptomTypesFromBundle();

        this.viewModel.HealthStatusEntryCLO = this.genericCLOFactory.CreateDefaultClo(CLOs.HealthStatusEntryCLO);
        this.viewModel.HealthStatusEntryCLO.SymptomEntries = [];
    }
	ngOnInit() {
		
		this.viewModel.HealthStatusEntryCLO.OccurrenceDateTime = this.initialDateTime;
        this.reactiveForm = this.fb.group({
            occurrenceDateTime: [null, Validators.compose([
                (control: AbstractControl) => {
                    var selDateTime = moment(control.value);
                    if (selDateTime > moment()) {
                        return { incorrect: true };
                    }
                    else {
                        return null;
                    }
                }
            ])],
            healthLevel: [null, Validators.compose([
                (control: AbstractControl) => {
                    if (parseInt(control.value) === Enums.HealthLevel.Unspecified) {
                        return { incorrect: true };
                    }
                    else {
                        return null;
                    }
                }
            ])]


        });

        this.reactiveForm.
            valueChanges.
            subscribe(() => {
                this.refreshIsValid();
            });
    }

    // Public methods
    public SaveData(): Promise<CLOs.HealthStatusEntryCLO> {
        let saveDataPromise = this.globalDataService.AddHealthStatusEntry(this.viewModel.HealthStatusEntryCLO);
        return saveDataPromise;
    }
    public GetValidState() {
        return this.isValid;
    }

    // IModalDialog
    dialogInit(reference: ComponentRef<IModalDialog>, options?: IModalDialogOptions) {
        let dateFromParent = options.data as Date;
        this.initialDateTime = dateFromParent;
    }

    // Event handlers onRemoveSymptomEntryElemTriggered
    private onSymptomEntryElemValidStateChanged() {
        this.refreshIsValid();
    }
    private onRegisterSymptomsTriggered() {
        this.viewModel.ShowSymptomEntriesOverlayDiv = false;
        this.onAddNewSymptomEntryTriggered();
    }
    private onAddNewSymptomEntryTriggered() {
        this.viewModel.HealthStatusEntryCLO.SymptomEntries.push(this.genericCLOFactory.CreateDefaultClo(CLOs.SymptomEntryCLO));

        setTimeout(() => {
            this.refreshIsValid();
        }, 1);
    }
    private onRemoveSymptomEntryElemTriggered(clo: CLOs.SymptomEntryCLO) {

        const index: number = this.viewModel.HealthStatusEntryCLO.SymptomEntries.indexOf(clo);

        if (index !== -1) {
            this.viewModel.HealthStatusEntryCLO.SymptomEntries.splice(index, 1);
        }

        setTimeout(() => {
            this.refreshIsValid();
        }, 1);
    }
}


interface ViewModel {
	HealthStatusEntryCLO: CLOs.HealthStatusEntryCLO;
    ShowSymptomEntriesOverlayDiv: boolean;
}
export interface ISymptomTypesSearchService {
    GetSymptomTypeByName(name: string): CLOs.SymptomTypeCLO;
    Search(searchString: string): string[];
}