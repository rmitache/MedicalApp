﻿import { Injectable } from '@angular/core';
import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import { ICLOFactory } from 'SPA/Core/CLO/i-clo.factory';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import * as DataStructures from 'SPA/Core/Helpers/DataStructures/data-structures';
import { MedicineTypeCLOFactory } from 'SPA/DomainModel/Factors/Medicine/Library/CLOFactories/medicine-type-clo.factory';
import { DaysInWeek, Time } from 'SPA/Core/Helpers/DataStructures/misc';
import { MedicineRuleItemCLOFactory } from 'SPA/DomainModel/Factors/Medicine/History/CLOFactories/medicine-rule-item-clo.factory';


@Injectable()
export class RuleCLOFactory implements ICLOFactory<CLOs.RuleCLO> {

    // Constructor
    constructor(
        private readonly medicineRuleItemCLOFactory: MedicineRuleItemCLOFactory) {

    }

    // Public Methods
    public Convert_ToCLO(blo: any): CLOs.RuleCLO {

        let newCLO = new CLOs.RuleCLO();
        //newCLO.ID = blo['ID'];
        //newCLO.StartDate = new Date(blo['StartDate']);
        //newCLO.EndDate = new Date(blo['EndDate']);
        


        return newCLO;
    }
    public Create_DefaultCLO(): CLOs.RuleCLO {
        let newCLO = new CLOs.RuleCLO();
        newCLO.ID = 0;
        newCLO.OrdinalFrequencyType = Enums.OrdinalFrequencyType.Every;
        newCLO.FrequencyType = Enums.RuleFrequencyType.Day;
        newCLO.DaysInWeek = new DaysInWeek([true, true, true, true, true, true, true]); // all days of week as default
        newCLO.MomentsInDay = [];
        newCLO.MedicineRuleItems = [this.medicineRuleItemCLOFactory.Create_DefaultCLO()];

        return newCLO;
    }
    public Convert_ToCloList(bloArray: Object[]): DataStructures.List<CLOs.RuleCLO> {
        let cloList = new DataStructures.List<CLOs.RuleCLO>();
        bloArray.forEach(blo => {
            let clo = this.Convert_ToCLO(blo);
            cloList.Add(clo);
        });

        return cloList;
    }
}