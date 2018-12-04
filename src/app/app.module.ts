import { NgModule } from '@angular/core';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LazyLoadedModule } from './lazy-loaded/lazy-loaded.module';
import { BrowserModule } from '@angular/platform-browser';
import { AddIntroducerComponent } from './dynamic-modules/add-introducer/add-introducer.component';
import { RoutedSidepaneComponent } from './dynamic-modules/routed-sidepane/routed-sidepane.component';
import { MainComponent } from './main/main.component';
import { RoutingModule } from './routing/routing.module';
import { AddDivisionComponent } from './dynamic-modules/add-division/add-division.component';
import { SelectPrimaryContactComponent } from './dynamic-modules/select-primary-contact/select-primary-contact.component';

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        AddDivisionComponent,
        SelectPrimaryContactComponent,
    ],
    imports: [
        // NoopAnimationsModule,
        BrowserAnimationsModule,
        BrowserModule,
        RoutingModule,
        LazyLoadedModule,
    ],
    providers: [
    ],
    bootstrap: [
        AppComponent,
    ],
})
export class AppModule {
}
