import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutingStateService } from '../../routing-state.service';
import { fadeAnimation, moveAnim } from '../animations/sidepane-animation';
import { SidepaneService } from '../../sidepane.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { delay } from 'rxjs/internal/operators/delay';

@Component({
  selector: 'app-select-primary-contact',
  templateUrl: './select-primary-contact.component.html',
  styleUrls: ['./select-primary-contact.component.css'],
  animations: [fadeAnimation, moveAnim],
})
export class SelectPrimaryContactComponent implements OnInit {
  private unsubscribe$ = new Subject();
  sidepaneState;
  sidepaneInstance;

  sidepaneIndex;

  sidepanePosition;
  width = 300;

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
    const sidepaneWidth = this.width;

    this.sidepaneIndex = this.sidepaneService.sidepanesWidth.length;
    const res = this.sidepaneService.addSidepanesWidthOb(sidepaneWidth, this.sidepaneIndex);
    this.sidepanePosition = res.widthState[this.sidepaneIndex];
    console.log(this.sidepanePosition);
    this.sidepaneService.storeObserve.pipe(
      takeUntil(this.unsubscribe$),
      delay(0))
      .subscribe(item => {
        // this.sidepanePosition = item.widthState[this.sidepaneIndex];
      });
  }

  onNavigate(short: boolean) {
    short ? this.router.navigate(['short', '3', '4']) :
      this.router.navigate(['1', '2', '3', '4']);
  }

  onActivate(componentRef) {
    console.log(componentRef.sidepaneInstance);

  }

  onDeactivate(componentRef) {
    console.log(componentRef);
  }

  onBack() {
    this.sidepaneService.removeSidepaneInstances(this.sidepaneIndex);
    console.log('destroy event');
    setTimeout(() => {
      this.router.navigate([this.routingStateService.getPreviousUrl()]);
    }, 5000);

  }
}
