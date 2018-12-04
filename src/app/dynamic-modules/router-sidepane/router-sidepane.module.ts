import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LazyLoadedModule } from '../../lazy-loaded/lazy-loaded.module';
import { RouterSidepaneComponent } from './router-sidepane.component';

@NgModule({
  declarations: [
    RouterSidepaneComponent,
  ],
  imports: [
    CommonModule,
    // LazyLoadedModule,
  ],
  exports: [
    RouterSidepaneComponent,
  ],
  schemas: [/*CUSTOM_ELEMENTS_SCHEMA*/],
})
export class RouterSidepaneModule {
}
