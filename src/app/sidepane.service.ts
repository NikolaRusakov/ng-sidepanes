import { ComponentRef, Injectable } from '@angular/core';
import { CustomComponent } from './dynamic-modules/custom/custom.component';


@Injectable({
  providedIn: CustomComponent,
})
export class SidepaneService {
  width: number;
  headerOutlet: ComponentRef<any>;
  bodyOutlet: ComponentRef<any>;
  footerOutlet: ComponentRef<any>;

  constructor() {
  }

}
