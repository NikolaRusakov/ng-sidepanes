import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { DynamicComponentLoaderModule } from '../../dynamic-component-loader/dynamic-component-loader.module';
import { MessageComponent } from '../message/message.component';
import { CustomComponent } from './custom.component';

@NgModule({
    declarations: [
        CustomComponent,
        MessageComponent,
    ],
    imports: [
        DynamicComponentLoaderModule.forChild(CustomComponent),
        CommonModule,
    ], entryComponents: [MessageComponent],
})
export class CustomModule {
}
