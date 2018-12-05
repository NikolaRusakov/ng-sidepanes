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
import { SidepaneService } from './sidepane.service';

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
    providers: [SidepaneService],
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
        private sidepaneService: SidepaneService,
        private injector: Injector,
    ) {
    }

    ngOnInit() {
        this.sidepaneService.parent = this;
    }

    ngAfterViewInit() {
    }

    loadMessage() {
        this.sidepaneService.loadComponent(MessageComponent, 'message', this.testOutlet);
    }

    loadCustom() {
        console.log(lastSidepane);

        const config = {
            data: {
                content: this.gen.next().value,
                open: true,
                dynamicComponents: {
                    childComponent: MessageComponent,
                },
            },
        };
        const map = new WeakMap();
        map.set(SidepaneData, config);
        const sidepaneRef = new SidepaneRef();
        map.set(SidepaneRef, sidepaneRef);
        this.sidepaneService.loadComponent(SidepaneComponent, 'sidepane', this.testOutlet, map);
    }
}
