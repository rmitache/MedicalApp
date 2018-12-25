import { ComponentFactoryResolver, ViewContainerRef, Inject, ApplicationRef, Injector, EmbeddedViewRef, Injectable } from '@angular/core';
import { ModalDialogComponent } from './Components/modal-dialog.component';
import { IModalDialogOptions } from './modal-dialog.interface';
import { ModalDialogInstanceService } from './modal-dialog-instance.service';

@Injectable()
export class ModalDialogService {
    /**
     * CTOR
     * @param componentFactoryResolver
     * @param modalDialogInstanceService
     */
    constructor(
        @Inject(ModalDialogInstanceService) private modalDialogInstanceService: ModalDialogInstanceService,
        private factoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector) {
    }

    /**
     * Open dialog in given target element with given options
     * @param  {IModalDialogOptions} dialogOptions?
     */
    public OpenDialog(dialogOptions?: IModalDialogOptions) {
        const componentRef = this.factoryResolver
            .resolveComponentFactory(ModalDialogComponent)
            .create(this.injector);

        
        this.appRef.attachView(componentRef.hostView);
        const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
            .rootNodes[0] as HTMLElement;
        document.body.appendChild(domElem);

        componentRef.instance.dialogInit(componentRef, dialogOptions);
    }

    public ShowAlert(target: ViewContainerRef, title: string, message: string) {

        var dialogOptions: IModalDialogOptions = {
            title: title,
            bodyContentText: message,
            actionButtons: [
                {
                    isDisabledFunction: (childComponentInstance: any) => {
                        return false;
                    },
                    text: 'OK',
                    onAction: () => {
                        return true;
                    }
                }
            ]
        };

        const componentRef = this.factoryResolver
            .resolveComponentFactory(ModalDialogComponent)
            .create(this.injector);
        this.appRef.attachView(componentRef.hostView);
        const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
            .rootNodes[0] as HTMLElement;
        document.body.appendChild(domElem);
        componentRef.instance.dialogInit(componentRef, dialogOptions);
    }


}