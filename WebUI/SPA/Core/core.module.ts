import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpHandlerService } from 'SPA/Core/Services/HttpHandlerService/http-handler.service';
import { ModalDialogService } from 'SPA/Core/Services/ModalDialogService/modal-dialog.service';
import { ModalDialogInstanceService } from 'SPA/Core/Services/ModalDialogService/modal-dialog-instance.service';
import { CommandManager } from 'SPA/Core/Managers/CommandManager/command.manager';
import { ExecutionEngine } from 'SPA/Core/Managers/CommandManager/Classes/execution-engine';

import { ModalDialogComponent } from 'SPA/Core/Services/ModalDialogService/Components/modal-dialog.component';
import { SpinnerServiceModule } from 'SPA/Core/Services/SpinnerService/spinner-service.module';
import { ButtonModule } from 'primeng/primeng';


@NgModule({
    imports: [
		BrowserModule,
		SpinnerServiceModule,
		ButtonModule

	],
	exports: [],
    declarations: [
		ModalDialogComponent,
    ],
    providers: [
        // Services
        HttpHandlerService,
        ModalDialogService,
		ModalDialogInstanceService,

        // Managers
        CommandManager,
        ExecutionEngine
    ],
    entryComponents: [
		ModalDialogComponent,
    ]
})
export class CoreModule { }