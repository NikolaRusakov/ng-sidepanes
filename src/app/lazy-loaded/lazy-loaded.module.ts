import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicComponentLoaderModule } from '../dynamic-component-loader/dynamic-component-loader.module';
import { DynamicComponentManifest } from '../dynamic-component-loader/dynamic-component-manifest';
import { MessageModule } from '../dynamic-modules/message/message.module';

const manifests: DynamicComponentManifest[] = [
  {
    componentId: 'message',
    path: 'dynamic-message', // some globally-unique identifier, used internally by the router
    loadChildren: './../dynamic-modules/message/message.module#MessageModule',
  },
  {
    componentId: 'sidepane',
    path: 'sidepane',
    loadChildren: './../dynamic-modules/sidepane/sidepane.module#SidepaneModule',
  },
];

@NgModule({
  declarations: [],
  imports: [
    DynamicComponentLoaderModule.forRoot(manifests),
    MessageModule,
  ], exports:
    [
      DynamicComponentLoaderModule,
      MessageModule,
    ],
})
export class LazyLoadedModule {
}
