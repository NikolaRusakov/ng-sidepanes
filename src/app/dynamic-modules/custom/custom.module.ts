import { NgModule } from '@angular/core';

import { DynamicComponentLoaderModule } from '../../dynamic-component-loader/dynamic-component-loader.module';
import { CustomComponent } from './custom.component';

@NgModule({
  declarations: [
    CustomComponent,
  ],
  imports: [
    DynamicComponentLoaderModule.forChild(CustomComponent),
  ],
})
export class CustomModule {
}
