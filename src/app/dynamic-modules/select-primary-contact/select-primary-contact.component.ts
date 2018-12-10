import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutingStateService } from '../../routing-state.service';
import { moveAnim } from '../animations/sidepane-animation';
import { SidepaneObject, SidepaneService, SidepaneStates } from '../../sidepane.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { delay } from 'rxjs/internal/operators/delay';
import { timer } from 'rxjs/internal/observable/timer';
import { mapTo } from 'rxjs/internal/operators/mapTo';
import { AnimationCanDeactivateGuard } from '../../AnimationCanDeactivateGuard';

@Component({
  selector: 'app-select-primary-contact',
  templateUrl: './select-primary-contact.component.html',
  styleUrls: ['./select-primary-contact.component.css'],
  animations: [moveAnim],
})
export class SelectPrimaryContactComponent implements OnInit, AnimationCanDeactivateGuard {
  private unsubscribe$ = new Subject();
  sidepaneState = 'hidden';
  sidepaneInstance;

  sidepaneIndex;

  sidepanePosition = -1000;
  stateResult = {value: 'hidden', params: {pos: -400}};
  width = 300;

  constructor(
    private location: Location,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private routingStateService: RoutingStateService,
    private sidepaneService: SidepaneService,
  ) {
  }

  ngOnInit() {
    this.routingStateService.loadRouting();
    this.sidepaneIndex = this.sidepaneService.sidepanesWidth.length;
    const res = this.sidepaneService.addSidepanesWidthOb(this.width, this.sidepaneIndex);
    this.sidepaneIndex = this.sidepaneIndex + 1;
    console.log(this.sidepaneIndex);
    console.log(res);
    // this.sidepanePosition = res.widthState[this.sidepaneIndex];
    // console.log(this.sidepanePosition);
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

  stateLogic(states: SidepaneObject, remove) {
    if (remove && states.state.remove) {
      console.log('removing');

      this.stateResult = (this.stateResult.value === 'move' ?
          {value: 'moveAgain', params: {pos: -1000}} :
          {value: 'move', params: {pos: -1000}}
      );
      // this.router.navigate(['', '1']);
      // setTimeout(() => {
      //     this.router.navigate(['']);
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

  onNavigate(short: boolean) {
    short ? this.router.navigate(['short', '3', '4']) :
      this.router.navigate(['1', '2', '3', '4']);
  }

  onActivate(componentRef) {
    console.log(componentRef.sidepaneInstance);

  }

  canDeactivate(navigate) {
    this.sidepaneService.removeSidepaneInstances(this.sidepaneIndex - 1, [this.routingStateService.getPreviousUrl()]);
    return timer(500).pipe(mapTo(true)).toPromise();
  }

  onBack() {
    this.router.navigate([this.routingStateService.getPreviousUrl()]);
  }
}
