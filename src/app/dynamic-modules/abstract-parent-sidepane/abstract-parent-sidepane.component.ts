import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { timer } from 'rxjs/internal/observable/timer';
import { delay } from 'rxjs/internal/operators/delay';
import { filter } from 'rxjs/internal/operators/filter';
import { mapTo } from 'rxjs/internal/operators/mapTo';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { RoutingStateService } from '../../routing-state.service';
import { SidepaneObject, SidepaneService } from '../../sidepane.service';
import { DynamicAnimation } from '../abstract-sidepane/abstract-sidepane.component';

@Component({template: ''})
export class AbstractParentSidepaneComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();
  private sidepaneState = 'hidden';

  protected sidepaneIndex: number;

  protected sidepanePosition = -1000;
  protected stateResult: DynamicAnimation = {value: 'hidden', params: {pos: -1000}};
  protected width = 500;

  constructor(
    public router: Router,
    public routingStateService: RoutingStateService,
    public sidepaneService: SidepaneService,
  ) {

    this.router.events
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(event => event instanceof NavigationEnd))
      .subscribe(({urlAfterRedirects}: NavigationEnd) => {
        const result = urlAfterRedirects === '' ? [''] :
          urlAfterRedirects.split('/');
        this.routingStateService.history = [...result];
      });
  }

  ngOnInit() {
    this.sidepaneIndex = this.sidepaneService.sidepanesWidth.length;
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

  canDeactivate() {
    this.sidepaneService.removeSidepaneInstances(this.sidepaneIndex);
    return timer(200).pipe(mapTo(true)).toPromise();
  }

  onBack() {
    this.router.navigate([this.routingStateService.getPreviousUrl()]);
  }

  ngOnDestroy() {
    this.unsubscribe$.next('');
  }
}
