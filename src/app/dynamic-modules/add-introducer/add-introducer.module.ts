import { NgModule } from '@angular/core';

import { AddIntroducerComponent } from './add-introducer.component';
import { RoutedSidepaneModule } from '../routed-sidepane/routed-sidepane.module';
import { RoutingModule } from '../../routing/routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        AddIntroducerComponent,
    ],
    imports: [
        // DynamicComponentLoaderModule.forChild(AddIntroducerComponent),
      CommonModule,
      RoutingModule,
      RoutedSidepaneModule,

    ],
    exports: [
        // DynamicComponentLoaderModule,
        AddIntroducerComponent,
    ],
  schemas: [/*CUSTOM_ELEMENTS_SCHEMA*/],
})
export class AddIntroducerModule {
}
