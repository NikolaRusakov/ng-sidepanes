import { Injectable } from '@angular/core';
import { CustomComponent } from './dynamic-modules/custom/custom.component';


@Injectable()
export class SidepaneService {
  public width: number;

  constructor() {
  }

}
