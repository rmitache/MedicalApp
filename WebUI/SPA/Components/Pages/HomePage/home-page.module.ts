// Angular and 3rd party stuff
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
// Project modules
import { CoreModule } from 'SPA/Core/core.module';
import { DomainModelModule } from 'SPA/DomainModel/domain-model.module';
import { ScheduleModule } from './Schedule/schedule.module';
// Components
import { GlobalApplicationState } from './global-application-state';
import { GlobalDataService } from './global-data.service';
import { StartupDataBundleService } from './startup-data-bundle.service';
import { HomePageComponent } from './home-page.component';
import { HeaderBarComponent } from './HeaderBar/header-bar.component';


@NgModule({
    bootstrap: [HomePageComponent],
    declarations: [
        // HomePage
        HomePageComponent,
        HeaderBarComponent,

        // Shared
        
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        BrowserModule,
        CoreModule,

        DomainModelModule,
        ScheduleModule
    ],
    providers: [
        StartupDataBundleService,
        {
            provide: APP_INITIALIZER,
            useFactory: (initialData: StartupDataBundleService) => () => initialData.InitializeBundle(),
            deps: [StartupDataBundleService],
            multi: true
        },
        GlobalApplicationState,
        GlobalDataService
    ]
})
export class HomePageModule {
}

