import { Injectable, Injector, Type, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { DynamicComponentLoader } from './dynamic-component-loader/dynamic-component-loader.service';
import { CustomInjector } from './dynamic-modules/custom-injector';
import { SidepaneComponent } from './dynamic-modules/sidepane/sidepane.component';

export interface SidepaneObject {
    width: number[];
    widthState: number[];
    store: SidepaneComponent[];
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
    indexAccumulator: number[] = [];

    data: any[];

    parent: any;

    constructor(
        private dynamicComponentLoader: DynamicComponentLoader,
        private injector: Injector,
    ) {
    }

    addSidepane(componentInstance: any) {
        this.store.push(componentInstance);
    }

    calculateWidthState() {
        this.sidepanesWidthState = this.sidepanesWidth.reduce((accumulator, currentValue, currentIndex, array) => {
            const accumulate = accumulator.length > 0 ?
                accumulator[currentIndex - 1] + array[currentIndex - 1] : 0;
            accumulator.push(accumulate);
            return accumulator;
        }, []);

    }

    addSidepanesWidth(width: number, index) {

        this.indexAccumulator.length !== 0 ?
            (this.indexAccumulator[this.indexAccumulator.length - 1] > index ?
                this.indexAccumulator = [
                    ...this.indexAccumulator,
                    index,
                ] :
                this.indexAccumulator = [
                    index,
                    ...this.indexAccumulator,
                ]) :
            this.indexAccumulator = [
                index,
            ];

        const currentIndex = this.indexAccumulator.indexOf(index);

        this.sidepanesWidth = [
            ...this.sidepanesWidth.slice(0, currentIndex),
            width,
            ...this.sidepanesWidth.slice(currentIndex),
        ];
    }

    addSidepanesWidthOb(width: number, index) {
        this.addSidepanesWidth(width, index);
        this.calculateWidthState();
        this.sidepanesWidthState.reverse();

        this.storeObserve.next({
            width: this.sidepanesWidth,
            widthState: this.sidepanesWidthState,
            store: this.store,
        });
        console.log('registered');
    }

    removeSidepaneInstances(position: number) {
        this.store = this.store.filter((item, index) => this.indexAccumulator[position] !== index);
        this.sidepanesWidth = this.sidepanesWidth.filter((item, index) => this.indexAccumulator[position] !== index);
        this.indexAccumulator = this.indexAccumulator.filter((item, index) => this.indexAccumulator[position] !== index);
        this.sidepanesWidthState = this.sidepanesWidthState.filter((item, index) => this.indexAccumulator[position] !== index);
        this.calculateWidthState();
        this.sidepanesWidthState.reverse();

        this.storeObserve.next({
            width: this.sidepanesWidth,
            widthState: this.sidepanesWidthState,
            store: this.store,
        });
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

}
