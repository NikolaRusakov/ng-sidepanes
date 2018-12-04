import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutedSidepaneModule } from '../routed-sidepane/routed-sidepane.module';
import { SelectPrimaryContactComponent } from './select-primary-contact.component';
import { RoutingModule } from '../../routing/routing.module';

@NgModule({
  declarations: [SelectPrimaryContactComponent],
  imports: [
    CommonModule,
    RoutedSidepaneModule,
    RoutingModule
  ],
  exports: [SelectPrimaryContactComponent]
})
export class SelectPrimaryContactModule {
}
