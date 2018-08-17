import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';



@Component({
    selector: 'block-ui-wrapper',
	templateUrl: './block-ui-wrapper.component.html',
	host: { 'class': 'block-ui-wrapper' }
})
export class BlockUIWrapperComponent {
    // Fields
	public IsBlocked: boolean = true;

    
}

