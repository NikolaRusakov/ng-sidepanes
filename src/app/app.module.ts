import { NgModule } from '@angular/core';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LazyLoadedModule } from './lazy-loaded/lazy-loaded.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        // NoopAnimationsModule,
        BrowserAnimationsModule,
        BrowserModule,
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
