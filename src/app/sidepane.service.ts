import { Injectable, Injector, Type, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { DynamicComponentLoader } from './dynamic-component-loader/dynamic-component-loader.service';
import { CustomInjector } from './dynamic-modules/custom-injector';
import { SidepaneComponent } from './dynamic-modules/sidepane/sidepane.component';

export interface SidepaneObject {
    width: number[];
    widthState: number[];
    store: SidepaneComponent[];
    state: {
        added: boolean;
        modified: boolean;
        removed: boolean;
    };
    remove?: {
        removeLast?: boolean;
        returned?: boolean;
        index?: number;
    };
}

@Injectable()
export class SidepaneService {
    storeObserve = new BehaviorSubject<SidepaneObject>({
        width: [],
        widthState: [],
        store: [],
        state: {
            added: false,
            modified: false,
            removed: false,
        },
        remove: {
            returned: false,
        },
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
        console.log(this.indexAccumulator);
        this.indexAccumulator.push(index);
        console.log(this.indexAccumulator);
        // this.indexAccumulator.length - 1 > 0 ?
        //     (this.indexAccumulator[this.indexAccumulator.length - 1] >
        //         this.indexAccumulator[this.indexAccumulator.length - 2]) ?
        //         this.indexAccumulator.unshift(width) : this.indexAccumulator.push(width) :

        this.indexAccumulator.length - 1 > 0 ?
            (this.indexAccumulator[this.indexAccumulator.length - 1] >
                this.indexAccumulator[this.indexAccumulator.length - 2]) ?
                this.sidepanesWidth.unshift(width) : this.sidepanesWidth.push(width) :
            this.sidepanesWidth.push(width);
    }

    addSidepanesWidthOb(width: number, index) {
        this.addSidepanesWidth(width, index);
        this.calculateWidthState();
        this.sidepanesWidthState.reverse();
        this.storeObserve.next({
            width: this.sidepanesWidth,
            widthState: this.sidepanesWidthState,
            store: this.store,
            state: {
                added: this.sidepanesWidth.length > 0,
                modified: this.sidepanesWidth.length > 1,
                removed: false,
            },
            /*remove: {
                returned: (this.storeObserve.value && this.storeObserve.value.remove &&
                    (this.storeObserve.value.remove.returned === undefined ||
                        !this.storeObserve.value.remove.returned)) ? false : true,
            }
        ,*/
        });
        console.log('registered');
        console.log(this.indexAccumulator);
        console.log(this.sidepanesWidth);
        console.log(this.sidepanesWidthState);
    }

    getLastWidthState(): number {
        return this.sidepanesWidthState[this.sidepanesWidthState.length - 1];
    }

    getLastWidth(): number {
        return this.sidepanesWidthState[this.sidepanesWidth.length - 1];
    }

    removeSidepaneInstances(position: number) {
        this.sidepanesWidthState.reverse();
        console.log(position);
        console.log(this.sidepanesWidthState);
        console.log(this.sidepanesWidthState.filter((item, index) => this.indexAccumulator[position] !== index));
        console.log(this.sidepanesWidth);
        console.log(this.sidepanesWidth.filter((item, index) => this.indexAccumulator[position] !== index));
        console.log(this.indexAccumulator);
        console.log(this.indexAccumulator.filter((item, index) => this.indexAccumulator[position] !== index));
        /* const currentLength = this.sidepanesWidthState.length;
         this.store = this.removeAtPosition(position, this.store);
         this.recalculateSidepaneState(position);
         console.log(this.sidepanesWidth);
         // this.removeWidthAtPosition(position);
         console.log(this.sidepanesWidth);
         console.log(this.sidepanesWidthState);
         const removeIndex = {
             index: currentLength !== position && position,
         };
         this.sidepanesWidthState.reverse();
         const removeObject = {
             width: this.sidepanesWidth,
             widthState: this.sidepanesWidthState,
             store: this.store,
             remove: {
                 returned: true,
                 removeLast: currentLength === position,
                 ...removeIndex,
             },
         };
         console.log(this.storeObserve.value);
         this.storeObserve.next(removeObject);
         console.log(this.storeObserve.value);*/
    }

    private recalculateSidepaneState(position: number) {
        console.log(this.sidepanesWidthState);
        // console.log([...array.slice(position + 1)]);
        console.log(position);
        console.log(this.sidepanesWidth);
        this.removeWidthAtPosition(position);
        console.log(this.sidepanesWidth);
        // const removedIndex = [...this.sidepanesWidth.slice(0, position), ...this.sidepanesWidth.slice(position + 1)].reverse();
        const recalculatedState = this.sidepanesWidth.map((item, index) => {
            return index > 0 ? this.sidepanesWidth[index - 1] + this.sidepanesWidthState[index - 1] :
                0;
        });
        console.log(recalculatedState);
        // console.log(recalculatedState);
        // console.log(this.sidepanesWidthState.slice(0, position));
        // console.log(this.sidepanesWidthState.slice(position));
        // this.sidepanesWidth.map((value, index) => {
        // in
        // });
        // const calculateUpperBound = () => [...this.sidepanesWidthState.slice(position + 1)]
        //     .map(item => {
        //         return item - this.sidepanesWidth[position];
        //     });
        // console.log(calculateUpperBound());
        // this.sidepanesWidthState = [
        //     ...array.slice(0, position),
        //     ...calculateUpperBound(),
        // ];
        this.sidepanesWidthState = recalculatedState;
        console.log(this.sidepanesWidthState);
    }

    private removeAtPosition(position: number, array) {
        return [
            ...array.slice(0, position),
            ...array.slice(position + 1),
        ];
    }

    private removeWidthAtPosition(position: number) {
        this.sidepanesWidth = [
            ...this.sidepanesWidth.slice(0, position),
            ...this.sidepanesWidth.slice(position + 1),
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
