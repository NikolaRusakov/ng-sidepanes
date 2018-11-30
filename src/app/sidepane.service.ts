import { ComponentRef, Injectable } from '@angular/core';
import { CustomComponent } from './dynamic-modules/custom/custom.component';
import { CustomModule } from './dynamic-modules/custom/custom.module';
import { AppModule } from './app.module';


@Injectable({
  providedIn: AppModule,
})
export class SidepaneService {
  width: number;
  headerOutlet: ComponentRef<any>;
  bodyOutlet: ComponentRef<any>;
  footerOutlet: ComponentRef<any>;

  constructor() {
  }

}
