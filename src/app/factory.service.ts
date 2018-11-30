import { Injectable } from '@angular/core';
import { CustomComponent } from './dynamic-modules/custom/custom.component';

export interface SidepaneHeap {
    component: CustomComponent;
}

@Injectable()
export class FactoryService {
    store: any[] = [];
    sidepanesWidthState: number[] = [];
    sidepanesWidth: number[] = [];

    constructor() {
    }

    addSidepane(componentInstance: any) {
        this.store = [
            ...this.store,
            componentInstance,
        ];
    }

    calculateWidthState(width: number) {
        const calculatedNumber = this.sidepanesWidthState[this.sidepanesWidthState.length - 1] ?
            this.sidepanesWidthState[this.sidepanesWidthState.length - 1] + width : width;
        this.sidepanesWidthState.push(calculatedNumber);
    }

    addSidepanesWidth(width: number) {
        this.sidepanesWidth.push(width);
    }

    getLastWidthState(): number {
        return this.sidepanesWidthState[this.sidepanesWidthState.length - 1];
    }

    getLastWidth(): number {
        return this.sidepanesWidthState[this.sidepanesWidth.length - 1];
    }
}
