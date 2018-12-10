import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutingStateService } from '../../routing-state.service';
import { SidepaneObject, SidepaneService, SidepaneStates } from '../../sidepane.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { delay } from 'rxjs/internal/operators/delay';
import { AnimationCanDeactivateGuard } from '../../AnimationCanDeactivateGuard';
import { timer } from 'rxjs/internal/observable/timer';
import { mapTo } from 'rxjs/internal/operators/mapTo';

@Component({
  selector: 'app-add-phone-number',
  templateUrl: './add-phone-number.component.html',
  styleUrls: ['./add-phone-number.component.css']
})
export class AddPhoneNumberComponent implements OnInit, AnimationCanDeactivateGuard {
  private unsubscribe$ = new Subject();
  sidepaneState = 'hidden';
  sidepaneInstance;

  sidepaneIndex;

  sidepanePosition = -1000;
  stateResult = {value: 'hidden', params: {pos: -400}};
  width = 200;

  constructor(
    private location: Location,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private routingStateService: RoutingStateService,
    private sidepaneService: SidepaneService,
  ) {
    routingStateService.loadRouting();

    // console.log(routingStateService.history);
  }

  ngOnInit() {
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

  canDeactivate(navigate) {
    /*this.stateResult = (this.stateResult.value === 'move' ?
        {value: 'moveAgain', params: {pos: -1000}} :
        {value: 'move', params: {pos: -1000}});*/
    console.log(this.stateResult);
    this.sidepaneService.removeSidepaneInstances(this.sidepaneIndex - 1, [this.routingStateService.getPreviousUrl()]);
    return timer(300).pipe(mapTo(true)).toPromise();
  }

  onBack() {
    // console.log(this.sidepaneIndex);
    // this.sidepaneService.removeSidepaneInstances(this.sidepaneIndex - 1);
    // console.log('destroy event');
    // setTimeout(() => {
    console.log('back');
    // this.stateResult = (this.stateResult.value === 'move' ?
    //     {value: 'moveAgain', params: {pos: -1000}} :
    //     {value: 'move', params: {pos: -1000}}
    // );

    // console.log(this.routingStateService.getPreviousUrl());
    this.router.navigate([this.routingStateService.getPreviousUrl()]);
    // }, 1500);

  }
}
