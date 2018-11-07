import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import { ICLOFactory } from 'SPA/Core/CLO/i-clo.factory';
import * as DataStructures from 'SPA/Core/Helpers/DataStructures/data-structures';
import * as CLOs from 'SPA/DomainModel/clo-exports';

export class UserAccountCLOFactory implements ICLOFactory<CLOs.UserAccountCLO> {

    // Public Methods
    public Convert_ToCLO(blo: any): CLOs.UserAccountCLO {
        let newCLO = new CLOs.UserAccountCLO();
        newCLO.ID = blo['ID'];
        newCLO.Email = blo['Email'];
        newCLO.TermsAcceptedDate = blo['TermsAcceptedDate'];

        return newCLO;
    }
    public Create_DefaultCLO(): CLOs.UserAccountCLO {
        throw new Error("Create_DefaultCLO not implemented");
    }
    public Convert_ToCloList(bloArray: Object[]): DataStructures.List<CLOs.UserAccountCLO> {
        throw new Error("Convert_ToCloList not implemented");
    }
    public Clone_CLOAsNewBLO(clo: CLOs.UserAccountCLO): CLOs.UserAccountCLO {
        throw new Error('Clone_CLO Not implemented');
    }
}