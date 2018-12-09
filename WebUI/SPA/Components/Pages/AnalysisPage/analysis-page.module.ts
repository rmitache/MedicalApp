// Angular and 3rd party stuff
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Project modules
import { CoreModule } from 'SPA/Core/core.module';
import { DomainModelModule } from 'SPA/DomainModel/domain-model.module';

// Components
import { AnalysisPageApplicationState } from './analysis-page-application-state';
import { AnalysisPageDataService } from 'SPA/Components/Pages/AnalysisPage/analysis-page-data.service';
import { StartupDataBundleService } from './startup-data-bundle.service';
import { AnalysisPageComponent } from './analysis-page.component';
import { SharedModule } from 'SPA/Components/Shared/shared.module';
import { FactorsViewModule } from 'SPA/Components/Pages/AnalysisPage/FactorsView/factors-view.module';
import { IndicatorsViewModule } from 'SPA/Components/Pages/AnalysisPage/IndicatorsView/indicators-view.module';


@NgModule({
    bootstrap: [AnalysisPageComponent],
    declarations: [
        AnalysisPageComponent,
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        BrowserModule,
        CoreModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(
            [{ path: '', component: AnalysisPageComponent },
             { path: 'AnalysisPage', component: AnalysisPageComponent }]
        ),
        DomainModelModule,
        SharedModule,

        // Root components
        FactorsViewModule,
        IndicatorsViewModule
    ],
    providers: [
        StartupDataBundleService,
        {
            provide: APP_INITIALIZER,
            useFactory: (initialData: StartupDataBundleService) => () => initialData.InitializeBundle(),
            deps: [StartupDataBundleService],
            multi: true
        },
        AnalysisPageApplicationState,
        AnalysisPageDataService,
        { provide: 'IReadOnlyAppStateWithUser', useExisting: AnalysisPageApplicationState },
        { provide: 'IDataServiceWithUser', useExisting: AnalysisPageDataService },
        { provide: 'IDataServiceWithSetHasSeenWelcome', useExisting: AnalysisPageDataService },
    ]
})
export class AnalysisPageModule {
}

