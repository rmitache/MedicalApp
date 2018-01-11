import { Injectable } from '@angular/core';
import * as DataStructures from 'SPA/Core/Helpers/DataStructures/data-structures';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import { GenericCLOFactory } from 'SPA/DomainModel/generic-clo.factory';

@Injectable()
export class GlobalApplicationState implements IReadOnlyApplicationState {
    // Properties
    public readonly LoggedInUserCLO = new DataStructures.ObservableProperty<CLOs.PatientAccountCLO>(null, (clo) => {
        return this.genericCLOFactory.CloneCLO<CLOs.PatientAccountCLO>(clo);
    });
   

    // Constructor
    constructor(
        private readonly genericCLOFactory: GenericCLOFactory
    ) { }
}

// to ReadOnlyAppState 
export class IReadOnlyApplicationState {
    LoggedInUserCLO: DataStructures.IReadableProperty<CLOs.PatientAccountCLO>;
}