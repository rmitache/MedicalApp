import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import { ICLOFactory } from 'SPA/Core/CLO/i-clo.factory';
import * as DataStructures from 'SPA/Core/Helpers/DataStructures/data-structures';
import * as CLOs from 'SPA/DomainModel/clo-exports';

export class PatientAccountCLOFactory implements ICLOFactory<CLOs.PatientAccountCLO> {

    // Public Methods
    public Convert_ToCLO(blo: any): CLOs.PatientAccountCLO {
        let newCLO = new CLOs.PatientAccountCLO();
        newCLO.ID = blo['ID'];
        newCLO.Email = blo['Email'];
        newCLO.SignupDate = new Date(blo['SignupDate']);
        newCLO.BirthDate = new Date(blo['BirthDate']);
        newCLO.Language = blo['Language'];

        return newCLO;
    }
    public Create_DefaultCLO(): CLOs.PatientAccountCLO {
        throw new Error("Create_DefaultCLO not implemented");
    }
    public Convert_ToCloList(bloArray: Object[]): DataStructures.List<CLOs.PatientAccountCLO> {
        throw new Error("Convert_ToCloList not implemented");
    }
    //public Clone_CLO(clo: PatientAccountCLO): PatientAccountCLO {

    //    let clonedClo: PatientAccountCLO = new PatientAccountCLO();
    //    clonedClo.ID = clo.ID;
    //    clonedClo.Email = clo.Email;
    //    clonedClo.Name = clo.Name;

    //    return clonedClo;

    //    return null;
    //}
}