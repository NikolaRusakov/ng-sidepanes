import { ComponentRef, EventEmitter, Injectable } from '@angular/core';

@Injectable(
  // {
  // providedIn: SidepaneComponent,
  // }
  )
export class SidepaneService {
  width: number;
  onSubmit = new EventEmitter();

  constructor() {
  }

}
