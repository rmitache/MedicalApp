﻿import { Injectable } from '@angular/core';
import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import { ICLOFactory } from 'SPA/Core/CLO/i-clo.factory';
import * as HelperFunctions from 'SPA/Core/Helpers/Functions/functions';
import * as DataStructures from 'SPA/Core/Helpers/DataStructures/data-structures';


@Injectable()
export class MedicineTypeCLOFactory implements ICLOFactory<CLOs.MedicineTypeCLO> {

	// Public Methods
	public Convert_ToCLO(blo: any): CLOs.MedicineTypeCLO {
		let newCLO = new CLOs.MedicineTypeCLO();
		newCLO.ID = blo['ID'];
		newCLO.Name = blo['Name'];
		newCLO.ProducerName = blo['ProducerName'];

		newCLO.BaseUnitOfMeasure = blo['BaseUnitOfMeasure'];
		newCLO.IsPackagedIntoUnits = blo['IsPackagedIntoUnits'];
		newCLO.PackagedUnitDoseType = blo['PackagedUnitDoseType'];
		newCLO.PackagedUnitDoseSize = blo['PackagedUnitDoseSize'];


		let isInUse: boolean = blo['IsInUse'];
		if (isInUse === true) {
			newCLO.UsageStatus = Enums.MedicineTypeStatus.InUseToday;
		} else if (isInUse === false) {
			newCLO.UsageStatus = Enums.MedicineTypeStatus.NotInUse;
		} else {
			newCLO.UsageStatus = null;
		}
        newCLO.CurrentSupplyAmount = blo['CurrentSupplyAmount'];
        newCLO.CurrentSupplyAmountMeasuredIn = blo['CurrentSupplyAmountMeasuredIn'];
        newCLO.SupplyWillLastUntil = (blo['SupplyWillLastUntil'] !== null) ? new Date(blo['SupplyWillLastUntil']) : null;
        newCLO.HasAssociatedRuleItems = blo['HasAssociatedRuleItems'];

		return newCLO;
	}
	public Create_DefaultCLO(): CLOs.MedicineTypeCLO {
		let newCLO = new CLOs.MedicineTypeCLO();
		newCLO.ID = 0;
		newCLO.Name = null;
        newCLO.ProducerName = null;

		newCLO.BaseUnitOfMeasure = Enums.UnitOfMeasure.mg;
		newCLO.IsPackagedIntoUnits = true;
		newCLO.PackagedUnitDoseType = Enums.PackagedUnitDoseType.Pills;
        newCLO.PackagedUnitDoseSize = null;//100;

		newCLO.UsageStatus = null;
		newCLO.CurrentSupplyAmount = null;
		newCLO.CurrentSupplyAmountMeasuredIn = null;

		return newCLO;
	}
	public Convert_ToCloList(bloArray: Object[]): DataStructures.List<CLOs.MedicineTypeCLO> {
		let cloList = new DataStructures.List<CLOs.MedicineTypeCLO>();
		bloArray.forEach(blo => {
			let clo = this.Convert_ToCLO(blo);
			cloList.Add(clo);
		});

		return cloList;
	}
	public Clone_CLOAsNewBLO(clo: CLOs.MedicineTypeCLO): CLOs.MedicineTypeCLO {
		throw new Error('Clone_CLO Not implemented');
	}
}