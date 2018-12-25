import { Http, RequestMethod, Response, RequestOptions, URLSearchParams, Request, Headers, HttpModule } from '@angular/http';
import { Injectable, Inject, ViewContainerRef, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef, ComponentRef } from '@angular/core';
import * as CLOs from 'SPA/DomainModel/clo-exports';
import { PlanVersionTooltipComponent } from './plan-version-tooltip.component';



@Injectable()
export class PlanVersionTooltipService {

    // Fields
    private lastComponentRef: ComponentRef<PlanVersionTooltipComponent>;

    // Constructor
    constructor(
        private factoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector

    ) {

    }

    // Public methods
    public Show(hoverEventInfo: PlanElemHoverEventInfo) {

        const componentRef = this.factoryResolver
            .resolveComponentFactory(PlanVersionTooltipComponent)
            .create(this.injector);


        this.appRef.attachView(componentRef.hostView);
        const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
            .rootNodes[0] as HTMLElement;
        document.body.appendChild(domElem);

        this.lastComponentRef = componentRef;
        componentRef.instance.Show(hoverEventInfo);

    }
    public Hide() {
        this.lastComponentRef.instance.HideAndClear();
    }
}

export class PlanElemHoverEventInfo {
    constructor(
        public readonly Left: number,
        public readonly Top: number,
        public readonly PlanCLO: CLOs.PlanCLO) {
    }
}