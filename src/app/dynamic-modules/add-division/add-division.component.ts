import { Location } from '@angular/common';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { moveAnim  } from '../animations/sidepane-animation';
import { RoutedSidepaneComponent } from '../routed-sidepane/routed-sidepane.component';
import { SidepaneObject, SidepaneService, SidepaneStates } from '../../sidepane.service';
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
    this.sidepaneIndex = this.sidepaneService.sidepanesWidth.length;
    const res = this.sidepaneService.addSidepanesWidthOb(this.width, this.sidepaneIndex);
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

  onBack() {
    this.router.navigate([this.routingStateService.getPreviousUrl()]);
  }

  onActivate(componentRef) {
    console.log(componentRef.sidepaneInstance);

  }

  canDeactivate() {
    this.sidepaneService.removeSidepaneInstances(this.sidepaneIndex - 1, [this.routingStateService.getPreviousUrl()]);
    return timer(500).pipe(mapTo(true)).toPromise();
  }

  onNavigate() {
    this.router.navigate(['1', '2', '3']);
  }

  ngOnDestroy() {
    console.log('destroy division');
    this.unsubscribe$.next();
  }
}
