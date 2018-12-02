import { ComponentFactoryResolver, ViewContainerRef, Inject } from '@angular/core';
import { ModalDialogComponent } from './Components/modal-dialog.component';
import { IModalDialogOptions } from './modal-dialog.interface';
import { ModalDialogInstanceService } from './modal-dialog-instance.service';

export class ModalDialogService {
    /**
     * CTOR
     * @param componentFactoryResolver
     * @param modalDialogInstanceService
     */
    constructor( @Inject(ComponentFactoryResolver) private componentFactoryResolver: ComponentFactoryResolver,
        @Inject(ModalDialogInstanceService) private modalDialogInstanceService: ModalDialogInstanceService) {
    }

    /**
     * Open dialog in given target element with given options
     * @param  {ViewContainerRef} target
     * @param  {IModalDialogOptions} dialogOptions?
     */
    public OpenDialog(target: ViewContainerRef, dialogOptions?: IModalDialogOptions) {
        //this.modalDialogInstanceService.closeAnyExistingModalDialog(); - Commented out to allow multiple modal dialogs

        const factory = this.componentFactoryResolver.resolveComponentFactory(ModalDialogComponent);
        const componentRef = target.createComponent(factory);
        componentRef.instance.dialogInit(componentRef, dialogOptions);

        //this.modalDialogInstanceService.saveExistingModalDialog(componentRef); - Commented out to allow multiple modal dialogs
    }

    public ShowNotificationDialog(target: ViewContainerRef, title:string, message:string) {
        this.modalDialogInstanceService.closeAnyExistingModalDialog();

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


        const factory = this.componentFactoryResolver.resolveComponentFactory(ModalDialogComponent);
        const componentRef = target.createComponent(factory);
        componentRef.instance.dialogInit(componentRef, dialogOptions);

        this.modalDialogInstanceService.saveExistingModalDialog(componentRef);

    }

    
}