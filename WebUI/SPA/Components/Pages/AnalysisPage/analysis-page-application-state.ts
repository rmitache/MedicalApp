// Angular and 3rd party stuff
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as momentRange from 'moment-range';

// Project modules
import { Time, Range, TimeRange } from 'SPA/Core/Helpers/DataStructures/misc';
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
    public readonly HighlightedDateRange = new DataStructures.ObservableProperty<Range<moment.Moment>>(null, (range) => {
        var clonedRange = new Range<moment.Moment>(range.RangeStart.clone(), range.RangeEnd.clone());
        return clonedRange;
    });
    public readonly SelectedDateRange = new DataStructures.ObservableProperty<Range<moment.Moment>>(null, (range) => {
        var clonedRange = new Range<moment.Moment>(range.RangeStart.clone(), range.RangeEnd.clone());
        return clonedRange;
    });

    // Constructor
    constructor(
        private readonly genericCLOFactory: GenericCLOFactory
    ) { }
}

// to ReadOnlyAppState 
export class IReadOnlyApplicationState {
    LoggedInUserCLO: DataStructures.IReadableProperty<CLOs.UserAccountCLO>;
    HighlightedDateRange: DataStructures.IReadableProperty<Range<moment.Moment>>;
    SelectedDateRange: DataStructures.IReadableProperty<Range<moment.Moment>>;
}