import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { fadeAnimation, moveAnim, slideIn } from '../animations/sidepane-animation';
import { RoutedSidepaneComponent } from '../routed-sidepane/routed-sidepane.component';
import { SidepaneService } from '../../sidepane.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { delay } from 'rxjs/internal/operators/delay';
import { RoutingStateService } from '../../routing-state.service';
import { AddIntroducerComponent } from '../add-introducer/add-introducer.component';

@Component({
  selector: 'app-add-division',
  templateUrl: './add-division.component.html',
  styleUrls: ['./add-division.component.css'],
  animations: [fadeAnimation, slideIn, moveAnim],
})
export class AddDivisionComponent implements OnInit {
  private unsubscribe$ = new Subject();
  value = false;
  sidepaneState;
  sidepaneEvent;
  @ViewChild(RoutedSidepaneComponent)
  sidepaneInstance;

  sidepaneIndex;

  sidepanePosition;
  width = 400;

  constructor(
    private location: Location,
    private router: Router,
    private sidepaneService: SidepaneService,
    private routingStateService: RoutingStateService,
    private addIntroducerComponent: AddIntroducerComponent,
  ) {
  }

  ngOnInit() {
    this.routingStateService.loadRouting()
    console.log(this.routingStateService.history);
    this.sidepaneIndex = this.sidepaneService.sidepanesWidth.length;
    const res = this.sidepaneService.addSidepanesWidthOb(this.width, this.sidepaneIndex);
    this.sidepanePosition = res.widthState[this.sidepaneIndex];
    console.log(this.sidepanePosition);
    this.sidepaneService.storeObserve.pipe(
      takeUntil(this.unsubscribe$),
      delay(0))
      .subscribe(item => {
        console.log(this.sidepaneEvent);
        console.log(item);
        this.sidepanePosition = item.widthState[this.sidepaneIndex];
        this.sidepaneEvent = res.state.add;
        console.log(this.sidepaneEvent);
        console.log(this.sidepanePosition, this.sidepaneIndex);
      });
  }

  onBack() {
    // this.sidepaneService.removeSidepaneInstances(this.sidepaneIndex);
    console.log('destroy event');
    console.log(this.addIntroducerComponent);
    setTimeout(() => {
      // this.router.navigate([this.routingStateService.getPreviousUrl()]);
    }, 5000);

  }

  onActivate(componentRef) {
    console.log(componentRef.sidepaneInstance);

  }

  onDeactivate(componentRef) {
    console.log(componentRef);
  }

  onNavigate() {
    this.router.navigate(['1', '2', '3']);
  }
}
