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
//import { HomePageApplicationState } from './home-page-application-state';
//import { HomePageDataService } from './home-page-data.service';
//import { StartupDataBundleService } from './startup-data-bundle.service';
import { AnalysisPageComponent } from './analysis-page.component';
import { SharedModule } from 'SPA/Components/Shared/shared.module';


@NgModule({
    bootstrap: [AnalysisPageComponent],
    declarations: [
        // HomePage
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
        //ScheduleModule,
        //PlansOverviewModule,
        //HealthGraphModule
    ],
    providers: [
        //StartupDataBundleService,
        //{
        //    provide: APP_INITIALIZER,
        //    useFactory: (initialData: StartupDataBundleService) => () => initialData.InitializeBundle(),
        //    deps: [StartupDataBundleService],
        //    multi: true
        //},
        //HomePageApplicationState,
        //HomePageDataService
    ]
})
export class AnalysisPageModule {
}

