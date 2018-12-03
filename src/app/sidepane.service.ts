import { Injectable, Injector, Type, ViewContainerRef } from '@angular/core';
import { DynamicComponentLoader } from './dynamic-component-loader/dynamic-component-loader.service';
import { CustomInjector } from './dynamic-modules/custom-injector';
import { SidepaneComponent } from './dynamic-modules/sidepane/sidepane.component';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

export interface SidepaneObject {
    width: number[];
    widthState: number[];
    store: SidepaneComponent[];
    remove?: {
        removeLast: boolean;
        index?: number;
    };
}

@Injectable()
export class SidepaneService {
    storeObserve = new BehaviorSubject<SidepaneObject>({
        width: [],
        widthState: [],
        store: [],
    });

    store: SidepaneComponent[] = [];
    sidepanesWidthState: number[] = [];
    sidepanesWidth: number[] = [];
    data: any[];

    parent: any;

    constructor(
        private dynamicComponentLoader: DynamicComponentLoader,
        private injector: Injector,
    ) {
    }

    addSidepane(componentInstance: any) {
        this.store = [
            ...this.store,
            componentInstance,
        ];
    }

    calculateWidthState(width: number) {
        this.sidepanesWidthState.length > 0 && this.sidepanesWidthState.reverse();

        const calculatedNumber = this.sidepanesWidthState.length > 0 ?
            (this.sidepanesWidthState.length - 1 > 0 ?
                this.sidepanesWidthState[this.sidepanesWidthState.length - 1] + width : width) : 0;
        this.sidepanesWidthState.push(calculatedNumber);
    }

    addSidepanesWidth(width: number) {
        this.sidepanesWidth.push(width);
    }

    addSidepanesWidthOb(width: number) {
        this.calculateWidthState(width);
        this.addSidepanesWidth(width);
        this.sidepanesWidthState.reverse();
        console.log(this.sidepanesWidthState);
        this.storeObserve.next({
            width: this.sidepanesWidth,
            widthState: this.sidepanesWidthState,
            store: this.store,
        });
    }

    getLastWidthState(): number {
        return this.sidepanesWidthState[this.sidepanesWidthState.length - 1];
    }

    getLastWidth(): number {
        return this.sidepanesWidthState[this.sidepanesWidth.length - 1];
    }

    removeSidepaneInstances(position: number) {
        this.sidepanesWidthState.reverse();

        const currentLength = this.sidepanesWidthState.length;
        this.store = this.removeAtPosition(position, this.store);
        this.recalculateSidepaneState(position, this.sidepanesWidthState);
        this.sidepanesWidth = this.removeAtPosition(position, this.sidepanesWidth);

        const removeIndex = {
            index: currentLength !== position && position,
        };
        this.sidepanesWidthState.reverse();
        const removeObject = {
            width: this.sidepanesWidth,
            widthState: this.sidepanesWidthState,
            store: this.store,
            remove: {
                removeLast: currentLength === position,
                ...removeIndex,
            },
        };

        this.storeObserve.next(removeObject);
    }

    private recalculateSidepaneState(position: number, array) {
        const calculateUpperBound = () => [...array.slice(position + 1)]
            .map(item => item - this.sidepanesWidth[position]);

        this.sidepanesWidthState = [
            ...array.slice(0, position),
            ...calculateUpperBound(),
        ];
    }

    private removeAtPosition(position: number, array) {
        return [
            ...array.slice(0, position),
            ...array.slice(position + 1),
        ];
    }

    loadComponent<T>(component: T, componentId: string, outlet: ViewContainerRef, customInjectorMap?: WeakMap<Type<any>, any>) {

        const injector = customInjectorMap ? new CustomInjector(this.injector, customInjectorMap) : this.injector;
        this.dynamicComponentLoader
            .getComponentFactory<T>(componentId, injector)
            .subscribe(componentFactory => {
                const ref = outlet.createComponent(componentFactory);
                // @ts-ignore
                ref.instance.cmpRef = ref;
                ref.changeDetectorRef.detectChanges();
            }, error => {
                console.warn(error);
            });
    }

    // loadComponent<T>(component: T, componentId: string, customInjectorMap?: WeakMap<Type<any>, any>) {
    //
    //     const injector = customInjectorMap ? new CustomInjector(this.injector, customInjectorMap) : this.injector;
    //     this.dynamicComponentLoader
    //         .getComponentFactory<T>(componentId, injector)
    //         .subscribe(componentFactory => {
    //             const ref = this.testOutlet.createComponent(componentFactory);
    //             // @ts-ignore
    //             ref.instance.cmpRef = ref;
    //
    //             ref.changeDetectorRef.detectChanges();
    //         }, error => {
    //             console.warn(error);
    //         });
    // }
}
