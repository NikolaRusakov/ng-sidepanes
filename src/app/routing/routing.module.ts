import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { AnimationCanDeactivateGuard } from '../AnimationCanDeactivateGuard';
import { AppComponent } from '../app.component';
import { AddDivisionComponent } from '../dynamic-modules/add-division/add-division.component';
import { AddIntroducerComponent } from '../dynamic-modules/add-introducer/add-introducer.component';
import { AddPhoneNumberComponent } from '../dynamic-modules/add-phonenumber/add-phone-number.component';
import { SelectPrimaryContactComponent } from '../dynamic-modules/select-primary-contact/select-primary-contact.component';
import { RoutingStateService } from '../routing-state.service';

const routes: Routes = [
  // {
  // path: '', redirectTo: 'app', pathMatch: 'full',
  // },
  {
    path: 'app',
    component: AppComponent,
    canDeactivate: [AnimationCanDeactivateGuard],
    children: [
      {
        path: 'short',
        component: AddIntroducerComponent,
        children: [
          {
            path: '3',
            component: SelectPrimaryContactComponent,
            children: [
              {
                path: '4',
                component: AddPhoneNumberComponent,
              }],
          }],
      }],
  },
  {
    path: '1',
    component: AddIntroducerComponent,
    canDeactivate: [AnimationCanDeactivateGuard],
    children: [
      {
        path: '2',
        component: AddDivisionComponent,
        canDeactivate: [AnimationCanDeactivateGuard],
        children: [
          {
            path: 'another',
            component: AddDivisionComponent,
            canDeactivate: [AnimationCanDeactivateGuard],
            children: [
              {
                path: 'another',
                component: AddDivisionComponent,
                canDeactivate: [AnimationCanDeactivateGuard],
              }],
          },
          {
            path: '3',
            component: SelectPrimaryContactComponent,
            canDeactivate: [AnimationCanDeactivateGuard],
            children: [
              {
                path: '4',
                component: AddPhoneNumberComponent,
                canDeactivate: [AnimationCanDeactivateGuard],
              }],
          }],
      }],
  },
  {
    path: 'short',
    component: AddIntroducerComponent,
    children: [
      {
        path: '3',
        component: SelectPrimaryContactComponent,
        children: [
          {
            path: '4',
            component: AddPhoneNumberComponent,
          }],
      }],
  }];

// loadChildren: './../dynamic-modules/add-introducer/add-introducer.module#AddIntroducerModule'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  providers: [RoutingStateService,
    /* {
       provide: RouteReuseStrategy,
       useClass: CustomReuseStrategy
     },*/
  ],
})
export class RoutingModule {
}
