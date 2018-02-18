// Angular and 3rd party stuff
import { Component, Input, EventEmitter, Output, ComponentRef, ViewChildren, QueryList, ViewChild} from '@angular/core';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';

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
    @Output()
    public IsValid: boolean;
    @ViewChild(NgForm)
    private form;
    private readonly viewModel: ViewModel = {
        PlanCLO: null,
        CurrentVersionCLO: null
    };

    // Private methods
    private checkIfChildElemsValid(): boolean {
        let allChildElemsAreValid = true;
        if (!this.ruleElems) {
            return false;
        }

        for (var i = 0; i < this.ruleElems.toArray().length; i++) {
            let elem = this.ruleElems.toArray()[i];

            if (!elem.IsValid) {
                allChildElemsAreValid = false;
                break;
            }
        }

        if (this.ruleElems.toArray().length === 0) {
            allChildElemsAreValid = false;
        }

        return allChildElemsAreValid;
    }
    private checkIfSelfValid(): boolean {
        return (this.form.valid === true);
    }

    // Constructor 
    constructor(
        private readonly genericCLOFactory: GenericCLOFactory
    ) {
    }
    ngOnInit() {

        this.form.
            valueChanges.
            subscribe(() => {
                this.IsValid = this.checkIfChildElemsValid() && this.checkIfSelfValid();
            });
    }
    // Public methods
    public SaveData(): Promise<List<CLOs.MedicineFactorRecordCLO>> {
        alert("save data !");
        return null;
    }

    // EventHandlers
    private onChildGroupListChanged() {
        this.IsValid = this.checkIfChildElemsValid() && this.checkIfSelfValid();
    }
    private onAddNewRuleTriggered() {
        let latestVersion = this.viewModel.PlanCLO.GetLatestVersion();
        latestVersion.Rules.push(this.genericCLOFactory.CreateDefaultClo(CLOs.RuleCLO));

    }

    // IModalDialog
    dialogInit(reference: ComponentRef<IModalDialog>, options?: IModalDialogOptions) {
        // No logic necessary for now
        //if (!options || !options.data) {
        //    throw new Error(`Data information for simple modal dialog is missing`);
        //}
        //this.text = options.data.text;

        let planCLO = options.data as CLOs.PlanCLO;
        this.viewModel.PlanCLO = planCLO;
        this.viewModel.CurrentVersionCLO = planCLO.GetLatestVersion();
    }
}


interface ViewModel {
    PlanCLO: CLOs.PlanCLO;
    CurrentVersionCLO: CLOs.VersionCLO
}
