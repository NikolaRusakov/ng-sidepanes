import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { SidepaneComponent } from './dynamic-modules/sidepane/sidepane.component';

export interface SidepaneObject {
  width: number[];
  widthState: number[];
  store: SidepaneComponent[];
  state: SidepaneStates;
}

export interface SidepaneStates {
  add?: boolean;
  remove?: boolean;
  removeIndex?: number;
  move?: boolean;
}

@Injectable()
export class SidepaneService {

  storeObserve = new BehaviorSubject<SidepaneObject>({
    width: [],
    widthState: [],
    store: [],
    state: {
      add: false,
      remove: false,
      move: false,
    },
  });

  store: SidepaneComponent[] = [];
  sidepanesWidthState: number[] = [];
  sidepanesWidth: number[] = [];
  indexAccumulator: number[] = [];

  data: any[];

  constructor() {
  }

  addSidepane(componentInstance: any) {
    this.store = [
      ...this.store,
      componentInstance,
    ];
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
      state: {
        add: true,
        remove: false,
        move: this.sidepanesWidthState.length > 1,
      },
    });

    return {
      width: this.sidepanesWidth,
      widthState: this.sidepanesWidthState,
      store: this.store,
      state: {
        add: true,
        remove: false,
        move: this.sidepanesWidthState.length > 1,
      },
    };
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
      state: {
        remove: true,
        removeIndex: position,
        add: false,
      },
    });

    return {
      width: this.sidepanesWidth,
      widthState: this.sidepanesWidthState,
      store: this.store,
      state: {
        remove: true,
        removeIndex: position,
        add: false,
      },
    };
  }

  getWidthState(currentPosition, index: number): number {
    return this.sidepanesWidthState.length - 1 < index ? currentPosition : this.sidepanesWidthState[index];
  }
}
