import { Injectable } from '@angular/core';
import { CustomComponent } from './dynamic-modules/custom/custom.component';

export interface SidepaneHeap {
    component: CustomComponent;
}

@Injectable()
export class FactoryService {
    public store: Array<any> = [];
    public sidepanesWidthState: Array<number> = [];
    public sidepanesWidth: Array<number> = [];

    constructor() {
    }

    addSidepane(componentInstance: any) {
        this.store = [
            ...this.store,
            componentInstance
        ];
        // this.store = [...this.store, type];
        // console.log(this.store[0].);
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
        return 0;
    }
}
