import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs/internal/observable/timer';
import { delay } from 'rxjs/internal/operators/delay';
import { mapTo } from 'rxjs/internal/operators/mapTo';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { AnimationCanDeactivateGuard } from '../../AnimationCanDeactivateGuard';
import { RoutingStateService } from '../../routing-state.service';
import { SidepaneObject, SidepaneService } from '../../sidepane.service';

@Component({template: ''})
export class AbstractSidepaneComponent implements OnInit, AnimationCanDeactivateGuard {

  private unsubscribe$ = new Subject();
  sidepaneState = 'hidden';
  sidepaneInstance;

  sidepaneIndex;

  sidepanePosition = -1000;
  stateResult = {value: 'hidden', params: {pos: -1000}};
  width = 500;

  constructor(
    public router: Router,
    public routingStateService: RoutingStateService,
    public sidepaneService: SidepaneService,
  ) {
  }

  ngOnInit() {
    this.routingStateService.loadRouting();
    this.sidepaneIndex = this.sidepaneService.sidepanesWidth.length;
    this.sidepaneService.addSidepanesWidthOb(this.width, this.sidepaneIndex);
    this.sidepaneIndex = this.sidepaneIndex + 1;
    this.sidepaneService.storeObserve.pipe(
      takeUntil(this.unsubscribe$),
      delay(0))
      .subscribe(item => {
        this.sidepanePosition = this.sidepaneService.getWidthState(this.sidepanePosition, this.sidepaneIndex);
        const remove = item.state.remove && item.state.removeIndex === this.sidepaneIndex;
        this.stateLogic(item, remove);
      });
  }

  stateLogic(states: SidepaneObject, remove) {
    if (remove && states.state.remove) {
      this.stateResult = (this.stateResult.value === 'move' ?
          {value: 'moveAgain', params: {pos: -1000}} :
          {value: 'move', params: {pos: -1000}}
      );
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

  canDeactivate(navigate) {
    this.sidepaneService.removeSidepaneInstances(this.sidepaneIndex - 1, [this.routingStateService.getPreviousUrl()]);
    return timer(500).pipe(mapTo(true)).toPromise();
  }

  onBack() {
    this.router.navigate([this.routingStateService.getPreviousUrl()]);
  }
}
