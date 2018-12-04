import { NgModule } from '@angular/core';

import { AddIntroducerComponent } from './add-introducer.component';
import { RoutedSidepaneModule } from '../routed-sidepane/routed-sidepane.module';
import { RoutingModule } from '../../routing/routing.module';

@NgModule({
    declarations: [
        AddIntroducerComponent,
    ],
    imports: [
        // DynamicComponentLoaderModule.forChild(AddIntroducerComponent),
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
