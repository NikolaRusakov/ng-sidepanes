import {
    Component,
    ViewChild,
    ViewContainerRef,
    Injector,
    ComponentRef,
    Type,
    ViewChildren,
    QueryList,
    AfterViewInit,
    ElementRef
} from '@angular/core';
import { MatDialog } from '@angular/material';

import { DynamicComponentLoader } from './dynamic-component-loader/dynamic-component-loader.service';
import { DialogComponent } from './dynamic-modules/dialog/dialog.component';
import { MessageComponent } from './dynamic-modules/message/message.component';
import { CustomComponent } from './dynamic-modules/custom/custom.component';
import { FactoryService } from './factory.service';
import { SidepaneData, CustomInjector } from './dynamic-modules/custom-injector';
import { SidepaneRef } from './dynamic-modules/sidepane-ref';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [FactoryService]
})
export class AppComponent implements AfterViewInit {

    componentRef: ComponentRef<Type<any>>;

    @ViewChild('testOutlet', {read: ViewContainerRef}) testOutlet: ViewContainerRef;

    @ViewChild('inputComponent')
    inputComponent;

    @ViewChild('testOutlet', {read: ElementRef}) elementRef: ElementRef;

    constructor(
        private dynamicComponentLoader: DynamicComponentLoader,
        private dialog: MatDialog,
        private factoryService: FactoryService,
        private injector: Injector
    ) {
    }

    ngAfterViewInit() {
    }

    loadMessage() {
        this.loadComponent<MessageComponent>('message');
    }

    loadCustom() {
        const lastSidepane = this.factoryService.getLastWidthState();
        console.log(lastSidepane);
        const config = {
            data: {
                header: this.inputComponent.nativeElement.value,
                position: lastSidepane ? lastSidepane : 0
            }
        };
        const map = new WeakMap();
        map.set(SidepaneData, config);

        const sidepaneRef = new SidepaneRef();
        map.set(SidepaneRef, sidepaneRef);
        this.loadComponent<CustomComponent>('custom', map);
    }

    loadComponent<T>(componentId: string, customInjectorMap?: WeakMap<Type<any>, any>) {

        const injector = customInjectorMap ? new CustomInjector(this.injector, customInjectorMap) : this.injector;
        this.dynamicComponentLoader
            .getComponentFactory<T>(componentId, injector)
            .subscribe(componentFactory => {
                const ref = this.testOutlet.createComponent(componentFactory);
                // console.log(ref);
                // componentId === 'custom' && this.factoryService.addSidepane(ref);
                ref.changeDetectorRef.detectChanges();
            }, error => {
                console.warn(error);
            });
    }

    showDialog() {
        this.dialog.open(DialogComponent);
    }
}
