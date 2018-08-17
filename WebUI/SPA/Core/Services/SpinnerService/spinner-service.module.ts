import { NgModule } from '@angular/core';
import { BlockUIModule } from 'primeng/components/blockui/blockui';
import { ProgressSpinnerModule } from 'primeng/primeng';
import { BlockUIWrapperComponent } from 'SPA/Core/Services/SpinnerService/block-ui-wrapper.component';
import { SpinnerService } from 'SPA/Core/Services/SpinnerService/spinner.service';

@NgModule({
	imports: [
		BlockUIModule,
		ProgressSpinnerModule
	],
	declarations: [
		BlockUIWrapperComponent,
	],
	providers: [
		// Services
		SpinnerService,
	],
	entryComponents: [
		BlockUIWrapperComponent,
	]
})
export class SpinnerServiceModule { }