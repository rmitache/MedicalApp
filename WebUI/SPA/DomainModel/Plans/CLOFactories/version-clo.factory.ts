// Angular and 3rd party stuff
import { Injectable } from '@angular/core';
import * as moment from 'moment';

// Project modules
import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';
import * as DataStructures from 'SPA/Core/Helpers/DataStructures/data-structures';
import { MedicineTypeCLOFactory } from 'SPA/DomainModel/Factors/Medicine/CLOFactories/medicine-type-clo.factory';
import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import { ICLOFactory } from 'SPA/Core/CLO/i-clo.factory';
import { RuleCLOFactory } from 'SPA/DomainModel/Plans/CLOFactories/rule-clo.factory';

@Injectable()
export class VersionCLOFactory implements ICLOFactory<CLOs.VersionCLO> {

	// Constructor
	constructor(
		private readonly ruleCLOFactory: RuleCLOFactory
	) {

	}

	// Public Methods
	public Convert_ToCLO(blo: any): CLOs.VersionCLO {

		let newCLO = new CLOs.VersionCLO();
		newCLO.ID = blo['ID'];

		newCLO.StartDateTime = new Date(blo['StartDateTime']);
		newCLO.EndDateTime = (blo['EndDateTime'] !== null) ? new Date(blo['EndDateTime']) : null;
		
		newCLO.Rules = (blo['Rules'] !== null) ? this.ruleCLOFactory.Convert_ToCloList(blo['Rules']).ToArray() : null;

		return newCLO;
	}
	public Create_DefaultCLO(): CLOs.VersionCLO {
		let newCLO = new CLOs.VersionCLO();
		newCLO.ID = 0;
		newCLO.StartDateTime = moment().startOf('day').add(1, 'days').toDate();
		newCLO.EndDateTime = null;
		newCLO.Rules = [this.ruleCLOFactory.Create_DefaultCLO()];

		return newCLO;
	}
	public Convert_ToCloList(bloArray: Object[]): DataStructures.List<CLOs.VersionCLO> {
		let cloList = new DataStructures.List<CLOs.VersionCLO>();
		bloArray.forEach((blo, index) => {
			let clo = this.Convert_ToCLO(blo);
			cloList.Add(clo);
		});

		return cloList;
	}
	public Clone_CLOAsNewBLO(clo: CLOs.VersionCLO): CLOs.VersionCLO {
		let newCLO = new CLOs.VersionCLO();
		newCLO.ID = 0;
		newCLO.StartDateTime = clo.StartDateTime;
		newCLO.EndDateTime = clo.EndDateTime;
		newCLO.Rules = [];
		for (var i = 0; i < clo.Rules.length; i++) {
			var newRule = this.ruleCLOFactory.Clone_CLOAsNewBLO(clo.Rules[i]);
			newCLO.Rules.push(newRule);
		}

		return newCLO;
	}
}