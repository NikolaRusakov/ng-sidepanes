import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RoutingModule } from '../../routing/routing.module';
import { RoutedSidepaneModule } from '../routed-sidepane/routed-sidepane.module';
import { AddPhoneNumberComponent } from './add-phone-number.component';

@NgModule({
  declarations: [AddPhoneNumberComponent],
  imports: [
    CommonModule,
    RoutedSidepaneModule,
    RoutingModule,
  ],
  exports: [AddPhoneNumberComponent],
})
export class AddPhoneNumberModule {
}
