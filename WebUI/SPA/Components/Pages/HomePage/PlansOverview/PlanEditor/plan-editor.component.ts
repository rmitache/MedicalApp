// Angular and 3rd party stuff
import { Component, Input, EventEmitter, Output, ComponentRef, ViewChildren, QueryList, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Calendar } from 'primeng/primeng';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { GenericCLOFactory } from 'SPA/DomainModel/generic-clo.factory';
import { Time } from 'SPA/Core/Helpers/DataStructures/misc';
import * as DataStructures from 'SPA/Core/Helpers/DataStructures/data-structures';
import { IModalDialog, IModalDialogOptions } from 'SPA/Core/Services/ModalDialogService/modal-dialog.interface';
import { GlobalDataService } from 'SPA/Components/Pages/HomePage/global-data.service';

// Components
import { List } from 'SPA/Core/Helpers/DataStructures/list';
import { RuleElemComponent } from './RuleElem/rule-elem.component';


@Component({
    selector: 'plan-editor',
    templateUrl: './plan-editor.component.html',
    styleUrls: ['./plan-editor.component.css'],
    host: { 'class': 'plan-editor' }
})
export class PlanEditorComponent implements IModalDialog {
    // Fields
    @ViewChildren('ruleelems')
    private ruleElems: QueryList<RuleElemComponent>;
    private isValid: boolean = false;
    private currentModeInstance: IPlanEditorModeImplementation = null;
    private reactiveForm: FormGroup;
    private readonly dialogInitParameters = {
        planCLO: null,
        editorMode: null
    };
    private readonly viewModel: ViewModel = {
        PlanCLO: null,
        CurrentVersionCLO: null,
        StartDateLabel: null,
        EndDateLabel: null
    };

    // Private methods
    private checkIfRuleElemsValid(): boolean {
        let allRuleElemsAreValid = true;
        if (!this.ruleElems) {
            return false;
        }

        for (var i = 0; i < this.ruleElems.toArray().length; i++) {
            let elem = this.ruleElems.toArray()[i];

            if (!elem.GetValidState()) {
                allRuleElemsAreValid = false;
                break;
            }
        }

        if (this.viewModel.CurrentVersionCLO.Rules.length === 0) {
            allRuleElemsAreValid = false;
        }

        return allRuleElemsAreValid;
    }
    private refreshIsValid() {
        this.isValid = this.checkIfRuleElemsValid() && this.reactiveForm.valid;
    }

    // Constructor 
    constructor(
        private readonly genericCLOFactory: GenericCLOFactory,
        private readonly globalDataService: GlobalDataService,
        private fb: FormBuilder

    ) {
    }
    ngOnInit() {

        // Define form
        this.reactiveForm = this.fb.group({
            planName: ['', Validators.required],
            dates: this.fb.group({
                startDate: [null,
                    Validators.compose([
                        Validators.required
                    ])],
                endDate: null
            }, {
                    // StartDate <= EndDate validation
                    validator: (group: FormGroup) => {

                        var startDateInput = group.controls['startDate'];
                        var endDateInput = group.controls['endDate'];

                        if ((endDateInput.value !== '' && endDateInput.value !== null) &&
                            (moment(startDateInput.value).startOf('day') >= moment(endDateInput.value).startOf('day'))) {

                            startDateInput.setErrors({ incorrect: true });
                            endDateInput.setErrors({ incorrect: true });
                        } else {
                            startDateInput.setErrors(null);
                            endDateInput.setErrors(null);
                        }
                    }
                }),

        });

        // Create the currentModeInstance
        let modeImplementationClass = modeImplementationsLookup[this.dialogInitParameters.editorMode]
        this.currentModeInstance = new modeImplementationClass(
            this.reactiveForm,
            this.dialogInitParameters.planCLO,
            this.viewModel,
            this.globalDataService
        ) as IPlanEditorModeImplementation;

        // Subscriptions
        this.reactiveForm.
            statusChanges.
            subscribe(() => {
                this.refreshIsValid();
            });
    }

    // Public methods
    public SaveData(): Promise<CLOs.PlanCLO> {
        let saveDataPromise = this.currentModeInstance.SaveData();

        return saveDataPromise;
    }
    public GetValidState() {
        return this.isValid;
    }

    // EventHandlers
    private onChildRuleElemValidStateChanged() {
        this.refreshIsValid();
    }
    private onAddNewRuleTriggered() {
        this.viewModel.CurrentVersionCLO.Rules.push(this.genericCLOFactory.CreateDefaultClo(CLOs.RuleCLO));
    }
    private onRemoveRuleTriggered(ruleCLO: CLOs.RuleCLO) {
        const index: number = this.viewModel.CurrentVersionCLO.Rules.indexOf(ruleCLO);

        if (index !== -1) {
            this.viewModel.CurrentVersionCLO.Rules.splice(index, 1);
        }

        this.refreshIsValid();
    }

    // IModalDialog
    dialogInit(reference: ComponentRef<IModalDialog>, options?: IModalDialogOptions) {
        this.dialogInitParameters.planCLO = options.data.planCLO as CLOs.PlanCLO;
        this.dialogInitParameters.editorMode = options.data.planEditorMode as PlanEditorMode;
    }
}


interface ViewModel {
    PlanCLO: CLOs.PlanCLO;
    CurrentVersionCLO: CLOs.VersionCLO;
    StartDateLabel: string;
    EndDateLabel: string;
}

// PlanMode logic and classes
export enum PlanEditorMode {
    CreateNew,
    Adjust
}
interface IPlanEditorModeImplementation {
    SaveData(): Promise<CLOs.PlanCLO>;
}
class CreateNewMode implements IPlanEditorModeImplementation {

    // Constructor
    constructor(
        private reactiveForm: FormGroup,
        private planCLO: CLOs.PlanCLO,
        private vm: ViewModel,
        private globalDataService: GlobalDataService) {

        // Custom form logic 
        //this.reactiveForm.get();

        // Prepare ViewModel 
        this.vm.PlanCLO = planCLO;
        this.vm.CurrentVersionCLO = this.vm.PlanCLO.GetLatestVersion();
        this.vm.StartDateLabel = 'Start date:';
        this.vm.EndDateLabel = 'End date:';
    }

    // Public methods
    public SaveData() {
        let saveDataPromise = this.globalDataService.AddPlan(this.vm.PlanCLO);
        return saveDataPromise;
    }
}
var modeImplementationsLookup = {};
modeImplementationsLookup[PlanEditorMode.CreateNew] = CreateNewMode;
