import { Http, RequestMethod, Response, RequestOptions, URLSearchParams, Request, Headers, HttpModule } from '@angular/http';
import { Injectable, Inject, ComponentFactoryResolver, ViewContainerRef, ApplicationRef, Injector, EmbeddedViewRef } from '@angular/core';
import { BlockUIModule, BlockUI } from 'primeng/primeng';
import { ProgressSpinnerModule } from 'primeng/primeng';
import { IconButtonComponent } from 'SPA/Components/Shared/IconButton/icon-button.component';
import { BlockUIWrapperComponent } from 'SPA/Core/Services/SpinnerService/block-ui-wrapper.component';



@Injectable()
export class SpinnerService {
	// Fields
	private wrapperInstance: BlockUIWrapperComponent;

	// Private methods
	private appendComponentToBody(component: any) {
		// 1. Create a component reference from the component 
		const componentRef = this.factoryResolver
			.resolveComponentFactory(component)
			.create(this.injector);


		// 2. Attach component to the appRef so that it's inside the ng component tree
		this.appRef.attachView(componentRef.hostView);

		// 3. Get DOM element from component
		const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
			.rootNodes[0] as HTMLElement;

		// 4. Append DOM element to the body
		document.body.appendChild(domElem);


		return componentRef;

	}

	// Constructor
	constructor(private factoryResolver: ComponentFactoryResolver,
		private appRef: ApplicationRef,
		private injector: Injector
	) {
		//this.blockUIInstance = this.appendComponentToBody(BlockUI).instance as BlockUI;
		this.wrapperInstance = this.appendComponentToBody(BlockUIWrapperComponent).instance as BlockUIWrapperComponent;
	}

	// Public methods
	public Show() {

		
		// 
		//let componentTypeFactory = this.factoryResolver.resolveComponentFactory(componentTypeToInjectIntoDialog);
		//this.blockUIInstance.block();//.instance(componentTypeFactory, dialogOptions);
		
	}
	public Hide() {

	}

}

