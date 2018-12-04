import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '../main/main.component';
import { AppComponent } from '../app.component';
import { AddIntroducerComponent } from '../dynamic-modules/add-introducer/add-introducer.component';
import { AddDivisionComponent } from '../dynamic-modules/add-division/add-division.component';
import { SelectPrimaryContactComponent } from '../dynamic-modules/select-primary-contact/select-primary-contact.component';
import { RoutingStateService } from '../routing-state.service';

const routes: Routes = [
  // {
  // path: '', redirectTo: 'app', pathMatch: 'full',
  // },
  {
    path: 'app',
    component: AppComponent,
  },
  {
    path: '1',
    component: AddIntroducerComponent,
    children: [
      {
        path: '2',
        component: AddDivisionComponent,
        children: [
          {
            path: '3',
            component: SelectPrimaryContactComponent,
          }
      }
    ],
    // loadChildren: './../dynamic-modules/add-introducer/add-introducer.module#AddIntroducerModule'
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  providers: [RoutingStateService],
})
export class RoutingModule {
}
