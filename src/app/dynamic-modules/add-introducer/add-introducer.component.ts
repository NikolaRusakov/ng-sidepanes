import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { moveAnim } from '../animations/sidepane-animation';
import { RoutedSidepaneComponent } from '../routed-sidepane/routed-sidepane.component';
import { SidepaneObject, SidepaneService, SidepaneStates } from '../../sidepane.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { delay } from 'rxjs/internal/operators/delay';
import { RoutingStateService } from '../../routing-state.service';
import { timer } from 'rxjs/internal/observable/timer';
import { mapTo } from 'rxjs/operators';
import { AnimationCanDeactivateGuard } from '../../AnimationCanDeactivateGuard';

@Component({
  selector: 'app-add-introducer',
  templateUrl: './add-introducer.component.html',
  styleUrls: ['./add-introducer.component.css'],
  animations: [ moveAnim],
})
export class AddIntroducerComponent implements OnInit, AnimationCanDeactivateGuard {
  private unsubscribe$ = new Subject();
  @ViewChild(RoutedSidepaneComponent)
  sidepaneInstance;
  sidepaneState = 'hidden';

  sidepaneIndex;

  sidepanePosition = -1000;
  width = 400;
  stateResult = {value: 'hidden', params: {pos: -1000}};

  // sidepaneEvent: SidepaneStates = {add: false, remove: false};

  constructor(
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sidepaneService: SidepaneService,
    private routingStateService: RoutingStateService
  ) {
    this.routingStateService.loadRouting();
    console.log(location.path());
    console.log(activatedRoute);
  }

  ngOnInit() {
    console.log('second');
    this.sidepaneIndex = this.sidepaneService.sidepanesWidth.length;
    console.log(this.sidepaneIndex);
    const res = this.sidepaneService.addSidepanesWidthOb(this.width, this.sidepaneIndex);
    console.log(res);
    this.sidepaneIndex = this.sidepaneIndex + 1;

    this.sidepaneService.storeObserve.pipe(
      takeUntil(this.unsubscribe$),
      delay(0))
      .subscribe(item => {
        console.log(item);
        console.log(this.sidepaneIndex);
        console.log(this.sidepanePosition);
        this.sidepanePosition = this.sidepaneService.getWidthState(this.sidepanePosition, this.sidepaneIndex);
        const remove = item.state.remove && item.state.removeIndex === this.sidepaneIndex;
        this.stateLogic(item, remove);
      });
  }

  onNavigate(short: boolean) {
    short ? this.router.navigate(['short', '3']) :
      this.router.navigate(['1', '2']);
  }

  onActivate(componentRef) {
    console.log(componentRef.sidepaneInstance.sidepanePosition);
  }

  canDeactivate(navigate) {
    // this.stateResult = (this.stateResult.value === 'move' ?
    //   {value: 'moveAgain', params: {pos: -1000}} :
    //   {value: 'move', params: {pos: -1000}});
    this.sidepaneService.removeSidepaneInstances(this.sidepaneIndex - 1, [this.routingStateService.getPreviousUrl()]);
    return timer(500).pipe(mapTo(true)).toPromise();
  }

  onBack() {
    console.log('back');
    // this.sidepaneService.removeSidepaneInstances(this.sidepaneIndex - 1);
    // console.log('destroy event');
    console.log(this.routingStateService.getPreviousUrl());
    this.router.navigate([this.routingStateService.getPreviousUrl()]);
    // setTimeout(() => {
    // }, 1500);
  }

  stateLogic(states: SidepaneObject, remove) {
    if (remove && states.state.remove) {
      console.log('removing');

      this.stateResult = (this.stateResult.value === 'move' ?
          {value: 'moveAgain', params: {pos: -1000}} :
          {value: 'move', params: {pos: -1000}}
      );
      // this.router.navigate(['', '1']);
      // setTimeout(() => {
      //   this.router.navigate(['', '1']);
      // }, 1000);
    } else {
      this.stateResult = !states.state.remove && !states.state.add ||
      this.sidepaneState === 'hidden' ?
        {value: 'hidden', params: {pos: -1000}} :
        (this.stateResult.value === 'move' ?
            {value: 'moveAgain', params: {pos: this.sidepanePosition}} :
            {value: 'move', params: {pos: this.sidepanePosition}}
        );
    }
    this.sidepaneState = 'in';
  }
}
