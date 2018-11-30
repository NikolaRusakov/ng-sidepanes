import { Type } from '@angular/compiler/src/core';
import {
    AfterViewInit,
    Component,
    ComponentFactoryResolver,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { FactoryService } from '../../factory.service';
import { SidepaneService } from '../../sidepane.service';
import { SidepaneData } from '../custom-injector';

export enum EnumSection {
    header = 'footerOutlet',
    body = 'footerOutlet',
    footer = 'footerOutlet',
}

@Component({
    selector: 'app-custom',
    templateUrl: './custom.component.html',
    styleUrls: ['./custom.scss'],
    providers: [SidepaneService],
})
export class CustomComponent implements OnInit, AfterViewInit, OnDestroy {

    dynamicComponent: any[];

    @ViewChild('inputComponent')
    container?: ElementRef;

    @ViewChild('headerOutlet', {read: ViewContainerRef}) headerOutlet: ViewContainerRef;

    @ViewChild('bodyOutlet', {read: ViewContainerRef}) bodyOutlet: ViewContainerRef;

    @ViewChild('footerOutlet', {read: ViewContainerRef}) footerOutlet: ViewContainerRef;

    constructor(
        public config: SidepaneData,
        private factoryService: FactoryService,
        public sidepaneService: SidepaneService,
        public elementRef: ElementRef,
        private componentFactoryResolver: ComponentFactoryResolver,
    ) {
    }

    ngOnInit() {
        Object.entries(this.config.data.dynamicComponents).forEach(([key, value]) => {
            this.loadChildComponent(value, key);
        });
        this.factoryService.addSidepane(this);
        console.log(this);
        if (this.factoryService.store.length > 0) {
            console.log(this.factoryService.store[this.factoryService.store.length - 1]);
        }
    }

    ngAfterViewInit() {
        const sidepaneWidth = this.elementRef.nativeElement.children[0].offsetWidth;
        this.sidepaneService.width = sidepaneWidth;
        this.factoryService.calculateWidthState(sidepaneWidth);
        this.factoryService.addSidepanesWidth(sidepaneWidth);
    }

    loadChildComponent(componentType: any, section) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

        // const viewContainerRef = this[section].viewContainerRef;
        this[section].clear();

        this.sidepaneService[section] = this[section].createComponent(componentFactory);
    }

    ngOnDestroy() {
        Object.entries(EnumSection).forEach(([key, value]) => {
            this.sidepaneService[value].destroy();
        });
    }
}
