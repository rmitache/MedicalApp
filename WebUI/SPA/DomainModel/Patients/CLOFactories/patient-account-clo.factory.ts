import { BaseCLO } from 'SPA/Core/CLO/base.clo';
import { PatientAccountCLO } from 'SPA/DomainModel/Patients/CLOs/patient-account.clo';
import { ICLOFactory } from 'SPA/Core/CLO/i-clo.factory';

export class PatientAccountCLOFactory implements ICLOFactory<PatientAccountCLO> {
    // Fields


    // Constructor
    constructor() {

    }

    // Public Methods
    public Convert_ToCLO(blo: any): PatientAccountCLO {
        let newCLO = new PatientAccountCLO();
        newCLO.ID = blo['ID'];
        newCLO.Email = blo['Email'];
        newCLO.SignupDate = new Date(blo['SignupDate']);
        newCLO.BirthDate = new Date(blo['BirthDate']);
        newCLO.Language = blo['Language'];

        return newCLO;
    }
    public Create_DefaultCLO(): PatientAccountCLO {
        throw new Error("Create_DefaultCLO not implemented");
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