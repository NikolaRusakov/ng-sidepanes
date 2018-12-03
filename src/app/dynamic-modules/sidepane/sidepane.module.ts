import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicComponentLoaderModule } from '../../dynamic-component-loader/dynamic-component-loader.module';
import { LazyLoadedModule } from '../../lazy-loaded/lazy-loaded.module';
import { SidepaneComponent } from './sidepane.component';

@NgModule({
    declarations: [
        SidepaneComponent,
    ],
    imports: [
        CommonModule,
        DynamicComponentLoaderModule.forChild(SidepaneComponent),
        LazyLoadedModule,
    ],
    exports: [
        DynamicComponentLoaderModule,
        SidepaneComponent,
    ],
})
export class SidepaneModule {
}
