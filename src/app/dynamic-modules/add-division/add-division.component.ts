import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationCanDeactivateGuard } from '../../AnimationCanDeactivateGuard';
import { RoutingStateService } from '../../routing-state.service';
import { SidepaneService } from '../../sidepane.service';
import { AbstractSidepaneComponent } from '../abstract-sidepane/abstract-sidepane.component';
import { moveAnim } from '../animations/sidepane-animation';

@Component({
  selector: 'app-add-division',
  templateUrl: './add-division.component.html',
  styleUrls: ['./add-division.component.css'],
  animations: [moveAnim],
})
export class AddDivisionComponent extends AbstractSidepaneComponent implements OnInit, AnimationCanDeactivateGuard {

  width = 400;

  constructor(
    public router: Router,
    public sidepaneService: SidepaneService,
    public routingStateService: RoutingStateService,
  ) {
    super(router,
      routingStateService,
      sidepaneService,
    );
  }

  ngOnInit() {
    super.ngOnInit();
  }

  onNavigateAnother() {
    this.router.navigate(['1', '2', 'another']);
  }

  onNavigate() {
    this.router.navigate(['1', '2', '3']);
  }

  /* stateLogic(states: SidepaneObject, remove) {
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
     return timer(200).pipe(mapTo(true)).toPromise();
   }
   onNavigate() {
     this.router.navigate(['1', '2', '3']);
   }*/
  /*
    ngOnDestroy() {
      console.log('destroy division');
      this.unsubscribe$.next();
    }*/
}
