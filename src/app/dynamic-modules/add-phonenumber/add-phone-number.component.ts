import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationCanDeactivateGuard } from '../../AnimationCanDeactivateGuard';
import { RoutingStateService } from '../../routing-state.service';
import { SidepaneService } from '../../sidepane.service';
import { AbstractSidepaneComponent } from '../abstract-sidepane/abstract-sidepane.component';

@Component({
  selector: 'app-add-phone-number',
  templateUrl: './add-phone-number.component.html',
  styleUrls: ['./add-phone-number.component.css'],
})
export class AddPhoneNumberComponent extends AbstractSidepaneComponent implements OnInit, AnimationCanDeactivateGuard {
  width = 200;

  constructor(
    public router: Router,
    public routingStateService: RoutingStateService,
    public sidepaneService: SidepaneService,
  ) {
    super(router, routingStateService, sidepaneService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  /*ngOnInit() {
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

  canDeactivate(navigate) {
    /!*this.stateResult = (this.stateResult.value === 'move' ?
        {value: 'moveAgain', params: {pos: -1000}} :
        {value: 'move', params: {pos: -1000}});*!/
    console.log(this.stateResult);
    this.sidepaneService.removeSidepaneInstances(this.sidepaneIndex - 1, [this.routingStateService.getPreviousUrl()]);
    return timer(300).pipe(mapTo(true)).toPromise();
  }
*/
    onBack() {
      this.router.navigate([this.routingStateService.getPreviousUrl()]);

    }
}
