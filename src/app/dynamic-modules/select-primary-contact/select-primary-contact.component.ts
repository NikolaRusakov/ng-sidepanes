import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutingStateService } from '../../routing-state.service';
import { moveAnim } from '../animations/sidepane-animation';
import { SidepaneService, SidepaneStates } from '../../sidepane.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { delay } from 'rxjs/internal/operators/delay';

@Component({
  selector: 'app-select-primary-contact',
  templateUrl: './select-primary-contact.component.html',
  styleUrls: ['./select-primary-contact.component.css'],
  animations: [moveAnim],
})
export class SelectPrimaryContactComponent implements OnInit {
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
        // this.sidepanePosition = item.widthState[this.sidepaneIndex];
        console.log(this.sidepaneIndex);
        this.sidepanePosition = this.sidepaneService.getWidthState(this.sidepanePosition, this.sidepaneIndex);
        // console.log(this.sidepanePosition);
        console.log(this.sidepanePosition);
        // this.sidepaneEvent = {...item.state};
        this.stateLogic(item.state);
      });
  }

  stateLogic(states: SidepaneStates) {
    // console.log(this.sidepaneEvent);
    // console.log(this.sidepanePosition);
    this.stateResult = !states.remove && !states.add ||
    this.sidepaneState === 'hidden' ?
      {value: 'hidden', params: {pos: -400}} :
      (this.stateResult.value === 'move' ?
          {value: 'moveAgain', params: {pos: this.sidepanePosition}} :
          {value: 'move', params: {pos: this.sidepanePosition}}
      );
    this.sidepaneState = 'in';
    // console.log(this.stateResult);

  }

  onNavigate(short: boolean) {
    short ? this.router.navigate(['short', '3', '4']) :
      this.router.navigate(['1', '2', '3', '4']);
  }

  onActivate(componentRef) {
    console.log(componentRef.sidepaneInstance);

  }

  onDeactivate(componentRef) {
    console.log('destroy event');
    this.sidepaneState = 'hidden';
    // setTimeout(() => {
    // this.sidepaneService.removeSidepaneInstances(this.sidepaneIndex);
    // }, 1500);
    // setTimeout(() => {
    //   this.router.navigate([this.routingStateService.getPreviousUrl()]);
    // }, 1500);
  }

  onBack() {
    // this.sidepaneService.removeSidepaneInstances(this.sidepaneIndex - 1);
    // console.log('destroy event');
    console.log('back');
    // setTimeout(() => {
    this.router.navigate([this.routingStateService.getPreviousUrl()]);
    // }, 1500);

  }
}
