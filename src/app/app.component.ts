import {
    AfterViewInit,
    Component,
    ComponentRef,
    ElementRef,
    Injector,
    OnInit,
    QueryList,
    Type,
    ViewChild,
    ViewChildren,
    ViewContainerRef,
} from '@angular/core';

import { DynamicComponentLoader } from './dynamic-component-loader/dynamic-component-loader.service';
import { CustomInjector, SidepaneData } from './dynamic-modules/custom-injector';
import { MessageComponent } from './dynamic-modules/message/message.component';
import { SidepaneRef } from './dynamic-modules/sidepane-ref';
import { SidepaneComponent } from './dynamic-modules/sidepane/sidepane.component';
import { FactoryService } from './factory.service';

export function* sum() {
    let num = 1;
    while (true) {
        yield num;
        num = num + 1;
    }
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [FactoryService],
})
export class AppComponent implements OnInit, AfterViewInit {

    componentRef: ComponentRef<any>;

    @ViewChild('testOutlet', {read: ViewContainerRef}) testOutlet: ViewContainerRef;

    @ViewChild('inputComponent')
    inputComponent;

    @ViewChild('testOutlet', {read: ElementRef}) elementRef: ElementRef;

    gen = sum();

    constructor(
        private dynamicComponentLoader: DynamicComponentLoader,
        private factoryService: FactoryService,
        private injector: Injector,
    ) {
    }

    ngOnInit() {
        this.factoryService.parent = this;
    }

    ngAfterViewInit() {
    }

    loadMessage() {
        this.loadComponent(MessageComponent, 'message');
    }

    loadCustom() {
        const lastSidepane = this.factoryService.getLastWidthState();
        console.log(lastSidepane);

        const config = {
            data: {
                content: /*this.inputComponent.nativeElement.value*/this.gen.next().value,
                open: true,
                dynamicComponents: {
                    childComponent: MessageComponent,
                },
            },
        };
        // const components = {
        //     dynamicComponents: {
        //         headerOutlet: MessageComponent,
        //         bodyOutlet: SidepaneComponent,
        //         footerOutlet: MessageComponent,
        //     },
        // };
        const map = new WeakMap();
        map.set(SidepaneData, config);
        const sidepaneRef = new SidepaneRef();
        map.set(SidepaneRef, sidepaneRef);
        this.loadComponent(SidepaneComponent, 'sidepane', map);
    }

    loadComponent<T>(component: T, componentId: string, customInjectorMap?: WeakMap<Type<any>, any>) {

        const injector = customInjectorMap ? new CustomInjector(this.injector, customInjectorMap) : this.injector;
        this.dynamicComponentLoader
            .getComponentFactory<T>(componentId, injector)
            .subscribe(componentFactory => {
                const ref = this.testOutlet.createComponent(componentFactory);
                ref.instance.cmpRef = ref;

                ref.changeDetectorRef.detectChanges();
            }, error => {
                console.warn(error);
            });
    }

}
