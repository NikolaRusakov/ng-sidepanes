import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutingStateService } from '../../routing-state.service';
import { SidepaneService } from '../../sidepane.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { delay } from 'rxjs/internal/operators/delay';

@Component({
  selector: 'app-add-phone-number',
  templateUrl: './add-phone-number.component.html',
  styleUrls: ['./add-phone-number.component.css']
})
export class AddPhoneNumberComponent implements OnInit {
  private unsubscribe$ = new Subject();
  sidepaneInstance;

  sidepaneIndex;

  sidepanePosition;
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
    const sidepaneWidth = this.width;

    this.sidepaneIndex = this.sidepaneService.store.length;
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

  onBack() {
    this.sidepaneService.removeSidepaneInstances(this.sidepaneIndex);
    console.log('destroy event');
    setTimeout(() => {
      this.router.navigate([this.routingStateService.getPreviousUrl()]);
    }, 2000);

  }
}
