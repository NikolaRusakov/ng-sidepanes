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
import { AbstractSidepaneComponent } from '../abstract-sidepane/abstract-sidepane.component';

@Component({
  selector: 'app-select-primary-contact',
  templateUrl: './select-primary-contact.component.html',
  styleUrls: ['./select-primary-contact.component.css'],
  animations: [moveAnim],
})
export class SelectPrimaryContactComponent extends AbstractSidepaneComponent {
  width = 300;

  constructor(
    // private location: Location,
    public router: Router,
    public routingStateService: RoutingStateService,
    public sidepaneService: SidepaneService,
  ) {
    super(router,
      routingStateService,
      sidepaneService);
  }

  onNavigate(short: boolean) {
    short ? this.router.navigate(['short', '3', '4']) :
      this.router.navigate(['1', '2', '3', '4']);
  }

  onBack() {
    this.router.navigate([this.routingStateService.getPreviousUrl()]);
  }
}
