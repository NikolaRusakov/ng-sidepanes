import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutedSidepaneComponent } from './routed-sidepane.component';

@NgModule({
  declarations: [RoutedSidepaneComponent],
  imports: [
    CommonModule
  ],
  exports: [RoutedSidepaneComponent]
})
export class RoutedSidepaneModule {
}
