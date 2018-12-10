import { Location } from '@angular/common';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { moveAnim  } from '../animations/sidepane-animation';
import { RoutedSidepaneComponent } from '../routed-sidepane/routed-sidepane.component';
import { SidepaneService, SidepaneStates } from '../../sidepane.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { delay } from 'rxjs/internal/operators/delay';
import { RoutingStateService } from '../../routing-state.service';
import { AnimationCanDeactivateGuard } from '../../AnimationCanDeactivateGuard';
import { Observable } from 'rxjs/internal/Observable';
import { timer } from 'rxjs/internal/observable/timer';
import { mapTo } from 'rxjs/internal/operators/mapTo';

@Component({
  selector: 'app-add-division',
  templateUrl: './add-division.component.html',
  styleUrls: ['./add-division.component.css'],
  animations: [ moveAnim],
})
export class AddDivisionComponent implements OnInit, OnDestroy, AnimationCanDeactivateGuard {
  private unsubscribe$ = new Subject();
  value = false;
  sidepaneState = 'hidden';
  sidepaneEvent;
  @ViewChild(RoutedSidepaneComponent)
  sidepaneInstance;

  sidepaneIndex;

  sidepanePosition = -1000;

  stateResult = {value: 'hidden', params: {pos: -400}};
  width = 400;

  constructor(
    private location: Location,
    private router: Router,
    private sidepaneService: SidepaneService,
    private activatedRoute: ActivatedRoute,
    private routingStateService: RoutingStateService,
  ) {
    this.routingStateService.loadRouting();
    console.log(location.path());
    console.log(activatedRoute);
  }

  ngOnInit() {
    // this.routingStateService.loadRouting()
    // console.log(this.routingStateService.history);
    this.sidepaneIndex = this.sidepaneService.sidepanesWidth.length;
    const res = this.sidepaneService.addSidepanesWidthOb(this.width, this.sidepaneIndex);
    this.sidepaneIndex = this.sidepaneIndex + 1;
    console.log(this.sidepaneIndex);
    console.log(res);
    // this.stateLogic(res.state);
    // this.sidepanePosition = res.widthState[this.sidepaneIndex];
    // console.log(this.sidepanePosition);
    this.sidepaneService.storeObserve.pipe(
      takeUntil(this.unsubscribe$),
      delay(0))
      .subscribe(item => {
        // console.log(this.sidepaneEvent);
        console.log(this.sidepaneIndex);
        console.log(item);
        console.log(this.sidepanePosition);
        this.sidepanePosition = this.sidepaneService.getWidthState(this.sidepanePosition, this.sidepaneIndex);
        console.log(this.sidepanePosition);

        // this.sidepanePosition = item.widthState[this.sidepaneIndex];
        this.stateLogic(item.state);
        // this.sidepaneEvent = item.state.add;
      });
  }

  stateLogic(states: SidepaneStates) {
    // console.log(this.sidepaneEvent);
    console.log(this.sidepanePosition);
    console.log(this.stateResult);

    this.stateResult = !states.remove && !states.add ||
    this.sidepaneState === 'hidden' ?
      {value: 'hidden', params: {pos: -400}} :
      (this.stateResult.value === 'move' ?
          {value: 'moveAgain', params: {pos: this.sidepanePosition}} :
          {value: 'move', params: {pos: this.sidepanePosition}}
      );
    this.sidepaneState = 'in';
    console.log(this.stateResult);
    // console.log(this.stateResult);

  }

  onBack() {
    console.log('back');
    // this.canDeactivate();
    this.router.navigate([this.routingStateService.getPreviousUrl()]);
    // this.router.navigate(['','1']);
  }

  onActivate(componentRef) {
    console.log(componentRef.sidepaneInstance);

  }

  canDeactivate() {
    // this.stateResult = (this.stateResult.value === 'move' ?
    //     {value: 'moveAgain', params: {pos: -1000}} :
    //     {value: 'move', params: {pos: -1000}}
    // );
    this.sidepaneService.removeSidepaneInstances(this.sidepaneIndex - 1, [this.routingStateService.getPreviousUrl()]);
    return timer(500).pipe(mapTo(true)).toPromise();
  }

  onDeactivate(componentRef) {
    console.log('deactivated');
    this.sidepaneState = 'hidden';
    // this.canDeactivate(true)
    // setTimeout(() => {
    // this.sidepaneService.removeSidepaneInstances(this.sidepaneIndex - 1, [this.routingStateService.getPreviousUrl()]);
    // this.sidepaneService.removeSidepaneInstances(this.sidepaneIndex);
    // }, 1500);

  }

  onNavigate() {
    this.router.navigate(['1', '2', '3']);
  }

  ngOnDestroy() {
    console.log('destroy division');
    this.unsubscribe$.next();
  }
}
