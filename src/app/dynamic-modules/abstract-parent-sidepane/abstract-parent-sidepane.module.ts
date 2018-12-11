import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractParentSidepaneComponent } from './abstract-parent-sidepane.component';

@NgModule({
  declarations: [
    AbstractParentSidepaneComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AbstractParentSidepaneComponent
  ]
})
export class AbstractParentSidepaneModule {
}
