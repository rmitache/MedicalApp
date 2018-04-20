// Angular and 3rd party stuff
import { Component, ChangeDetectorRef } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';

// Project modules
import { CommandManager } from 'SPA/Core/Managers/CommandManager/command.manager';
import { FlowDefinitions } from 'SPA/Components/Pages/HomePage/CommandFlows/flow-definitions';
import '../../../Content/styles.css';
import * as CLOs from 'SPA/DomainModel/clo-exports';

// Components


@Component({
    selector: 'login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
    // Constructor
    constructor(
        private readonly changeDetectorRef: ChangeDetectorRef
    ) {

    }
    public ngAfterViewInit() {
        
    }

}
