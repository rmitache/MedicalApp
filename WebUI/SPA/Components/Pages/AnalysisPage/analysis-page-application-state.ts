import { Injectable } from '@angular/core';
import * as DataStructures from 'SPA/Core/Helpers/DataStructures/data-structures';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import { GenericCLOFactory } from 'SPA/DomainModel/generic-clo.factory';
import { IReadOnlyAppStateWithUser } from 'SPA/Components/Shared/HeaderBar/header-bar.component';

@Injectable()
export class AnalysisPageApplicationState implements IReadOnlyAppStateWithUser, IReadOnlyApplicationState {
    // Properties
    public readonly LoggedInUserCLO = new DataStructures.ObservableProperty<CLOs.UserAccountCLO>(null, (clo) => {
        return this.genericCLOFactory.CloneCLO<CLOs.UserAccountCLO>(clo);
    });
   

    // Constructor
    constructor(
        private readonly genericCLOFactory: GenericCLOFactory
    ) { }
}

// to ReadOnlyAppState 
export class IReadOnlyApplicationState {
    LoggedInUserCLO: DataStructures.IReadableProperty<CLOs.UserAccountCLO>;
}