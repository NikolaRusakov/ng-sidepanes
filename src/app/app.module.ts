import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LazyLoadedModule } from './lazy-loaded/lazy-loaded.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        NoopAnimationsModule,
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
