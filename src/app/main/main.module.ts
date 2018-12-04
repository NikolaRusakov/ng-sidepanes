import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { LazyLoadedModule } from '../lazy-loaded/lazy-loaded.module';
import { RoutingModule } from '../routing/routing.module';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
];

@NgModule({
  declarations: [
    // AppComponent,
    // AddIntroducerComponent,
    MainComponent,
  ],
  imports: [
    // NoopAnimationsModule,
    RoutingModule,
    CommonModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    LazyLoadedModule,
  ],
  providers: [],
  // bootstrap: [
  //   MainComponent,
  // ],
  exports: [MainComponent],
})
export class MainModule {
}
