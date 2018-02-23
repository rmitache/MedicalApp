// Angular and 3rd party stuff
import { Component, Input, EventEmitter, Output, ComponentRef, ViewChildren, QueryList, ViewChild } from '@angular/core';
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
    public IsValid: boolean = false;
    @ViewChild(NgForm)
    private form;
    private readonly viewModel: ViewModel = {
        PlanCLO: null,
        CurrentVersionCLO: null,
        CurrentMode: null
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

        if (this.viewModel.CurrentVersionCLO.Rules.length === 0) {
            allChildElemsAreValid = false;
        }

        return allChildElemsAreValid;
    }
    private checkIfSelfValid(): boolean {
        return (this.form.valid === true);
    }
    private refreshIsValid() {
        this.IsValid = this.checkIfChildElemsValid() && this.checkIfSelfValid();
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
                this.refreshIsValid();
            });
    }
    // Public methods
    public SaveData(): Promise<List<CLOs.MedicineFactorRecordCLO>> {
        alert("save data !");
        return null;
    }

    // EventHandlers
    private onChildGroupElemChanged() {
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
        // No logic necessary for now
        //if (!options || !options.data) {
        //    throw new Error(`Data information for simple modal dialog is missing`);
        //}
        //this.text = options.data.text;

        this.viewModel.PlanCLO = options.data.planCLO as CLOs.PlanCLO;
        this.viewModel.CurrentMode = options.data.planEditorMode as PlanEditorMode;
        this.viewModel.CurrentVersionCLO = this.viewModel.PlanCLO.GetLatestVersion();
    }
}


interface ViewModel {
    PlanCLO: CLOs.PlanCLO;
    CurrentVersionCLO: CLOs.VersionCLO;
    CurrentMode: PlanEditorMode;
}

export enum PlanEditorMode {
    CreateNew,
    Change,
    HardEdit
}