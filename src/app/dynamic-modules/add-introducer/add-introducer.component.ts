import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationCanDeactivateGuard } from '../../AnimationCanDeactivateGuard';
import { RoutingStateService } from '../../routing-state.service';
import { SidepaneService } from '../../sidepane.service';
import { AbstractSidepaneComponent } from '../abstract-sidepane/abstract-sidepane.component';
import { moveAnim } from '../animations/sidepane-animation';

@Component({
  selector: 'app-add-introducer',
  templateUrl: './add-introducer.component.html',
  styleUrls: ['./add-introducer.component.css'],
  animations: [moveAnim],
})
export class AddIntroducerComponent extends AbstractSidepaneComponent implements OnInit, AnimationCanDeactivateGuard {

  constructor(
    router: Router,
    routingStateService: RoutingStateService,
    sidepaneService: SidepaneService,
  ) {
    super(router, routingStateService, sidepaneService);
  }

  onNavigate(short: boolean) {
    short ? this.router.navigate(['short', '3']) :
      this.router.navigate(['1', '2']);
  }

  onBack() {
    this.router.navigate([this.routingStateService.getPreviousUrl()]);
  }
}
