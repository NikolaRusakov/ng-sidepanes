import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDivisionComponent } from './add-division.component';
import { RoutedSidepaneModule } from '../routed-sidepane/routed-sidepane.module';
import { RoutingModule } from '../../routing/routing.module';

@NgModule({
  declarations: [AddDivisionModule],
  imports: [
    CommonModule,
    RoutedSidepaneModule,
    RoutingModule
  ],
  exports: [AddDivisionComponent]
})
export class AddDivisionModule {
}
