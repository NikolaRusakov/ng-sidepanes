import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AbstractSidepaneComponent } from './abstract-sidepane.component';

@NgModule({
  declarations: [AbstractSidepaneComponent],
  imports: [
    CommonModule,
  ], exports: [AbstractSidepaneComponent],
})
export class AbstractSidepaneModule {
}
