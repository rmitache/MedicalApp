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
import { ScheduleModule } from './Schedule/schedule.module';
import { HealthGraphModule } from './HealthGraph/health-graph.module';
import { PlansOverviewModule } from './PlansOverview/plans-overview.module';

// Components
import { HomePageApplicationState } from './home-page-application-state';
import { HomePageDataService } from './home-page-data.service';
import { StartupDataBundleService } from './startup-data-bundle.service';
import { HomePageComponent } from './home-page.component';
import { SharedModule } from 'SPA/Components/Shared/shared.module';
import { IReadOnlyAppStateWithUser, IDataServiceWithLogout } from 'SPA/Components/Shared/HeaderBar/header-bar.component';


@NgModule({
    bootstrap: [HomePageComponent],
    declarations: [
        // HomePage
        HomePageComponent,
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        BrowserModule,
        CoreModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(
            [{ path: '', component: HomePageComponent },
            { path: 'HomePage', component: HomePageComponent }]
        ),

        DomainModelModule,
        SharedModule,

        // Root components
        ScheduleModule,
        PlansOverviewModule,
        HealthGraphModule
    ],
    providers: [
        StartupDataBundleService,
        {
            provide: APP_INITIALIZER,
            useFactory: (initialData: StartupDataBundleService) => () => initialData.InitializeBundle(),
            deps: [StartupDataBundleService],
            multi: true
        },
        HomePageApplicationState,
        HomePageDataService,
        { provide: 'IReadOnlyAppStateWithUser', useExisting: HomePageApplicationState },
        { provide: 'IDataServiceWithLogout', useExisting: HomePageDataService },
    ]
})
export class HomePageModule {
}

