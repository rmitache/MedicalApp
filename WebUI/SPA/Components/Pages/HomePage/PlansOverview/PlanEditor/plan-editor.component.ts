// Angular and 3rd party stuff
import { Component, Input, EventEmitter, Output, ComponentRef, ViewChildren, QueryList, ViewChild, ViewContainerRef } from '@angular/core';
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

// Components
import { RuleElemComponent } from './RuleElem/rule-elem.component';
import { ModalDialogService } from 'SPA/Core/Services/ModalDialogService/modal-dialog.service';


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
    private availableMedicineTypes: CLOs.MedicineTypeCLO[];
    private reactiveForm: FormGroup;
    private readonly dialogInitParameters = {
        planCLO: null,
        editorMode: null,
        availableMedicineTypes: null
    };
    private readonly viewModel: ViewModel = {
        PlanCLO: null,
        CurrentVersionCLO: null,

        InfoMessage: null,
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
    private onNewMedTypeTriggered() {

        this.modalDialogService.ShowNotificationDialog(this.viewContainerRef, "Hello", "This is a message");
    }

    // Constructor 
    constructor(
        private readonly genericCLOFactory: GenericCLOFactory,
        private readonly globalDataService: HomePageDataService,
        private fb: FormBuilder,
        private readonly modalDialogService: ModalDialogService,
        private viewContainerRef: ViewContainerRef,
    ) {
    }
    ngOnInit() {

        // Define form
        this.reactiveForm = this.fb.group({
            planName: ['',
                Validators.compose([Validators.required])
            ],
            dates: this.fb.group({
                startDate: [null, Validators.compose([Validators.required, startDateMustNotBeBeforeTodayValidator])],
                endDate: null
            }, { validator: startDateMustBeBeforeOrSameAsEndDateValidator }),
        });

        // Create the currentModeInstance
        this.availableMedicineTypes = this.dialogInitParameters.availableMedicineTypes;
        let modeImplementationClass = modeImplementationsLookup[this.dialogInitParameters.editorMode]
        this.currentModeInstance = new modeImplementationClass(
            this.reactiveForm,
            this.dialogInitParameters.planCLO,
            this.viewModel,
            this.globalDataService,
            this.genericCLOFactory
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

        // Set dates to startOf/endOf day 
        this.viewModel.CurrentVersionCLO.StartDateTime = moment(this.viewModel.CurrentVersionCLO.StartDateTime).startOf('day').toDate();
        if (this.viewModel.CurrentVersionCLO.EndDateTime !== null) {
            this.viewModel.CurrentVersionCLO.EndDateTime = moment(this.viewModel.CurrentVersionCLO.EndDateTime).endOf('day').toDate();
        }




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
        setTimeout(() => {
            this.refreshIsValid();
        }, 1);
    }
    private onRemoveRuleTriggered(ruleCLO: CLOs.RuleCLO) {
        const index: number = this.viewModel.CurrentVersionCLO.Rules.indexOf(ruleCLO);

        if (index !== -1) {
            this.viewModel.CurrentVersionCLO.Rules.splice(index, 1);
        }

        setTimeout(() => {
            this.refreshIsValid();
        }, 1);
    }

    // IModalDialog
    dialogInit(reference: ComponentRef<IModalDialog>, options?: IModalDialogOptions) {
        this.dialogInitParameters.planCLO = options.data.planCLO as CLOs.PlanCLO;
        this.dialogInitParameters.editorMode = options.data.planEditorMode as PlanEditorMode;
        this.dialogInitParameters.availableMedicineTypes = options.data.availableMedicineTypes as CLOs.MedicineTypeCLO[];
    }
}


interface ViewModel {
    PlanCLO: CLOs.PlanCLO;
    CurrentVersionCLO: CLOs.VersionCLO;

    InfoMessage: string;
    StartDateLabel: string;
    EndDateLabel: string;
}

// PlanMode logic and classes
export enum PlanEditorMode {
    CreateNew = 0,
    Change = 1,
    EditUpcomingChanges = 2, // Aka hard edit
    EditTodaysChanges = 3, // Aka hard edit
    EditPlanStartedToday = 4, // Aka hard edit
    EditPlanRestartedToday = 5, // Aka hard edit
    Restart = 6
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
        private globalDataService: HomePageDataService) {

        // Prepare ViewModel 
        this.vm.PlanCLO = planCLO;
        this.vm.CurrentVersionCLO = this.vm.PlanCLO.GetLatestVersion();
        this.vm.InfoMessage = 'This will create a new Plan from scratch. You can stop it manually later';
        this.vm.StartDateLabel = 'Start date:';
        this.vm.EndDateLabel = 'Ends on:';
    }

    // Public methods
    public SaveData() {

        let saveDataPromise = this.globalDataService.AddPlan(this.vm.PlanCLO);
        return saveDataPromise;
    }
}
class ChangeMode implements IPlanEditorModeImplementation {

    // Fields
    private prevVersion: CLOs.VersionCLO = null;

    // Constructor
    constructor(
        private reactiveForm: FormGroup,
        private planCLO: CLOs.PlanCLO,
        private vm: ViewModel,
        private globalDataService: HomePageDataService,
        private genericCLOFactory: GenericCLOFactory) {

        this.prevVersion = planCLO.GetLatestVersion();

        // If prevVersion starts in the future - throw exception -> this should have different logic as in HardEdit instead of creating a new version
        if (this.prevVersion === null) {
            throw new Error('Adjusting a plan only works for plans with at least 1 previous version!');
        }
        if (moment(this.prevVersion.StartDateTime).startOf('day') > moment().startOf('day')) {
            throw new Error('Adjusting a plan whose last version starts in the future is not yet supported!');
        }


        // Create a new version for the planCLO
        let newVersion = this.genericCLOFactory.CloneCLOAsNewBLO(this.prevVersion);
        let defaultStartDate = moment().add(1, 'days').startOf('day'); // default startdate = tomorrow
        if (moment(this.prevVersion.EndDateTime).isSame(defaultStartDate, 'date')) {
            defaultStartDate.add(1, 'days');
        }
        newVersion.StartDateTime = defaultStartDate.toDate();

        planCLO.Versions.Add(newVersion);


        // Custom form logic 
        this.reactiveForm.get('planName').disable();
        this.reactiveForm.get('dates').setValidators([(control: AbstractControl) => {
            return advancedPlanDatesValidator(control as FormGroup, this.prevVersion);
        }]);


        // Prepare ViewModel 
        this.vm.PlanCLO = planCLO;
        this.vm.CurrentVersionCLO = this.vm.PlanCLO.GetLatestVersion();
        this.vm.InfoMessage = 'You are about to make changes to this Plan. ' +
            'The previous period of the Plan started on ' + moment(this.prevVersion.StartDateTime).format('Do MMM YYYY');
        this.vm.InfoMessage += ' and will end on the day before the new changes will take effect';
        this.vm.StartDateLabel = 'Taking effect from:';
        this.vm.EndDateLabel = 'New end date will be:';
    }

    // Public methods
    public SaveData() {

        // Automatically end the next last version before starting the new one
        this.prevVersion.EndDateTime = moment(this.vm.CurrentVersionCLO.StartDateTime).subtract(1, 'days').endOf('day').toDate();

        // Save the data
        let saveDataPromise = this.globalDataService.UpdatePlan(this.vm.PlanCLO);
        return saveDataPromise;
    }
}
class EditUpcomingChangesMode implements IPlanEditorModeImplementation {

    // Fields
    private prevVersion: CLOs.VersionCLO = null;

    // Constructor
    constructor(
        private reactiveForm: FormGroup,
        private planCLO: CLOs.PlanCLO,
        private vm: ViewModel,
        private globalDataService: HomePageDataService,
        private genericCLOFactory: GenericCLOFactory) {

        this.prevVersion = planCLO.GetSecondLatestVersion();


        // Custom form logic
        this.reactiveForm.get('planName').disable();
        this.reactiveForm.get('dates').setValidators([(control: AbstractControl) => {
            return advancedPlanDatesValidator(control as FormGroup, this.prevVersion);
        }]);

        // Prepare ViewModel 
        this.vm.PlanCLO = planCLO;
        this.vm.CurrentVersionCLO = this.vm.PlanCLO.GetLatestVersion();
        this.vm.InfoMessage = 'You are about to edit the upcoming changes for this Plan. ';
        this.vm.StartDateLabel = 'Taking effect from:';
        this.vm.EndDateLabel = 'New end date will be:';
    }

    // Public methods
    public SaveData() {

        // Automatically adjust the previous version's endDate
        if (this.prevVersion !== null) {
            this.prevVersion.EndDateTime = moment(this.vm.CurrentVersionCLO.StartDateTime).subtract(1, 'days').endOf('day').toDate();
        }


        // Save the data
        let saveDataPromise = this.globalDataService.UpdatePlan(this.vm.PlanCLO);
        return saveDataPromise;
    }
}
class EditTodaysChangesMode implements IPlanEditorModeImplementation {

    // Fields
    private prevVersion: CLOs.VersionCLO = null;

    // Constructor
    constructor(
        private reactiveForm: FormGroup,
        private planCLO: CLOs.PlanCLO,
        private vm: ViewModel,
        private globalDataService: HomePageDataService,
        private genericCLOFactory: GenericCLOFactory) {

        this.prevVersion = planCLO.GetSecondLatestVersion();


        // Custom form logic
        this.reactiveForm.get('planName').disable();
        this.reactiveForm.get('dates').setValidators([(control: AbstractControl) => {
            return advancedPlanDatesValidator(control as FormGroup, this.prevVersion);
        }]);

        // Prepare ViewModel 
        this.vm.PlanCLO = planCLO;
        this.vm.CurrentVersionCLO = this.vm.PlanCLO.GetLatestVersion();
        this.vm.InfoMessage = 'You are about to edit the changes which took effect today for this Plan. ';
        this.vm.StartDateLabel = 'Taking effect from:';
        this.vm.EndDateLabel = 'New end date will be:';
    }

    // Public methods
    public SaveData() {

        // Automatically adjust the previous version's endDate
        if (this.prevVersion !== null && this.prevVersion.Status === Enums.VersionStatus.Active) {
            this.prevVersion.EndDateTime = moment(this.vm.CurrentVersionCLO.StartDateTime).subtract(1, 'days').endOf('day').toDate();
        }


        // Save the data
        let saveDataPromise = this.globalDataService.UpdatePlan(this.vm.PlanCLO);
        return saveDataPromise;
    }
}
class EditPlanStartedTodayMode implements IPlanEditorModeImplementation {

    // Constructor
    constructor(
        private reactiveForm: FormGroup,
        private planCLO: CLOs.PlanCLO,
        private vm: ViewModel,
        private globalDataService: HomePageDataService,
        private genericCLOFactory: GenericCLOFactory) {

        // Custom form logic
        this.reactiveForm.get('planName').disable();


        // Prepare ViewModel 
        this.vm.PlanCLO = planCLO;
        this.vm.CurrentVersionCLO = this.vm.PlanCLO.GetLatestVersion();
        this.vm.InfoMessage = 'You are about to edit the Plan which just started today.';
        this.vm.StartDateLabel = 'Starting from:';
        this.vm.EndDateLabel = 'New end date will be:';
    }

    // Public methods
    public SaveData() {

        // Save the data
        let saveDataPromise = this.globalDataService.UpdatePlan(this.vm.PlanCLO);
        return saveDataPromise;
    }
}
class EditPlanRestartedTodayMode implements IPlanEditorModeImplementation {

    // Constructor
    constructor(
        private reactiveForm: FormGroup,
        private planCLO: CLOs.PlanCLO,
        private vm: ViewModel,
        private globalDataService: HomePageDataService,
        private genericCLOFactory: GenericCLOFactory) {

        // Custom form logic
        this.reactiveForm.get('planName').disable();


        // Prepare ViewModel 
        this.vm.PlanCLO = planCLO;
        this.vm.CurrentVersionCLO = this.vm.PlanCLO.GetLatestVersion();
        this.vm.InfoMessage = 'You are about to edit the Plan which just restarted today.';
        this.vm.StartDateLabel = 'Restarting from:';
        this.vm.EndDateLabel = 'New end date will be:';
    }

    // Public methods
    public SaveData() {

        // Save the data
        let saveDataPromise = this.globalDataService.UpdatePlan(this.vm.PlanCLO);
        return saveDataPromise;
    }
}
class RestartMode implements IPlanEditorModeImplementation {

    // Fields
    private prevVersion: CLOs.VersionCLO = null;

    // Constructor
    constructor(
        private reactiveForm: FormGroup,
        private planCLO: CLOs.PlanCLO,
        private vm: ViewModel,
        private globalDataService: HomePageDataService,
        private genericCLOFactory: GenericCLOFactory) {
        this.prevVersion = planCLO.GetLatestVersion();

        // If prevVersion isn't inactive - throw exception
        if (this.prevVersion === null || this.prevVersion.Status !== Enums.VersionStatus.Inactive) {
            throw new Error('Can only Restart a Plan where the previous version is Inactive!');
        }

        // Create a new version for the planCLO
        let newVersion = this.genericCLOFactory.CloneCLOAsNewBLO(this.prevVersion);
        newVersion.StartDateTime = moment().add(1, 'days').startOf('day').toDate(); // default restartdate = tomorrow
        newVersion.EndDateTime = null;
        planCLO.Versions.Add(newVersion);


        // Custom form logic 
        this.reactiveForm.get('planName').disable();
        this.reactiveForm.get('dates').setValidators([(control: AbstractControl) => {
            return advancedPlanDatesValidator(control as FormGroup, this.prevVersion, false);
        }]);

        // Prepare ViewModel 
        this.vm.PlanCLO = planCLO;
        this.vm.CurrentVersionCLO = this.vm.PlanCLO.GetLatestVersion();
        this.vm.InfoMessage = 'You are about to restart this Plan. ' +
            'Previously the Plan ended on ' + moment(this.prevVersion.EndDateTime).format('Do MMM YYYY');
        this.vm.StartDateLabel = 'Starting again on:';
        this.vm.EndDateLabel = 'Ending on:';
    }

    // Public methods
    public SaveData() {

        // Save the data
        let saveDataPromise = this.globalDataService.UpdatePlan(this.vm.PlanCLO);
        return saveDataPromise;
    }
}
var modeImplementationsLookup = {};
modeImplementationsLookup[PlanEditorMode.CreateNew] = CreateNewMode;
modeImplementationsLookup[PlanEditorMode.Change] = ChangeMode;
modeImplementationsLookup[PlanEditorMode.EditUpcomingChanges] = EditUpcomingChangesMode;
modeImplementationsLookup[PlanEditorMode.EditTodaysChanges] = EditTodaysChangesMode;
modeImplementationsLookup[PlanEditorMode.EditPlanStartedToday] = EditPlanStartedTodayMode;
modeImplementationsLookup[PlanEditorMode.EditPlanRestartedToday] = EditPlanRestartedTodayMode;
modeImplementationsLookup[PlanEditorMode.Restart] = RestartMode;

// Custom validators
function startDateMustNotBeBeforeTodayValidator(control: AbstractControl) {
    // Variables
    var startDate = moment(control.value).startOf('day');
    var todayDate = moment().startOf('day');

    if (startDate < todayDate) {
        return { startBeforeToday: true };
    } else {
        return null;
    }
}
function startDateMustNotBeBeforeTomorrowValidator(control: AbstractControl) {
    // Variables
    var startDate = moment(control.value).startOf('day');
    var tomorrow = moment().add(1, 'days').startOf('day');

    if (startDate < tomorrow) {
        return { startBeforeTomorrow: true };
    } else {
        return null;
    }
}
function startDateMustBeBeforeOrSameAsEndDateValidator(control: AbstractControl) {
    let group = control as FormGroup;

    // Variables
    var startDateInput = group.controls['startDate'];
    var endDateInput = group.controls['endDate'];

    // Validation logic
    if ((endDateInput.value !== '' && endDateInput.value !== null) &&
        (moment(startDateInput.value).startOf('day') > moment(endDateInput.value).startOf('day'))) {

        startDateInput.setErrors({ startDateAfterEndDate: true });
        endDateInput.setErrors({ startDateAfterEndDate: true });

    } else {
        startDateInput.updateValueAndValidity({ onlySelf: true, emitEvent: false });
        endDateInput.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    }



    return null;
}
function advancedPlanDatesValidator(group: FormGroup, prevVersion: CLOs.VersionCLO, newStartDateCanBeBeforePrevVersionEndDate: boolean = true) {

    // Variables
    var startDateInput = group.controls['startDate'];
    var endDateInput = group.controls['endDate'];
    var startDateErrorsCount = 0;
    var endDateErrorsCount = 0;

    // Rule 1. newVersion.StartDate must be > prevVersion.StartDate
    if (prevVersion !== null && (moment(startDateInput.value).startOf('day') <= moment(prevVersion.StartDateTime).startOf('day'))) {
        startDateErrorsCount++;
    }

    // Rule 2. newVersion.StartDate must be < newDate.EndVersion
    if ((endDateInput.value !== '' && endDateInput.value !== null) &&
        (moment(startDateInput.value).startOf('day') >= moment(endDateInput.value).startOf('day'))) {
        startDateErrorsCount++;
        endDateErrorsCount++;
    }

    // Rule 3. Conditional: newversion.StartDate must be > prevVersion.EndDate 
    if (newStartDateCanBeBeforePrevVersionEndDate === false) {
        if (prevVersion !== null && (moment(startDateInput.value).startOf('day') <= moment(prevVersion.EndDateTime).endOf('day'))) {
            startDateErrorsCount++;
        }
    }

    // Apply logic
    if (startDateErrorsCount > 0) {
        startDateInput.setErrors({ incorrect: true });
    } else {
        //startDateInput.setErrors({ incorrect: null });
        startDateInput.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    }
    if (endDateErrorsCount > 0) {
        endDateInput.setErrors({ incorrect: true });
    } else {
        endDateInput.setErrors(null);
    }

    return null;
}