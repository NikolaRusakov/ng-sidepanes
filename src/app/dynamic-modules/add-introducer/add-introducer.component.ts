import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { fadeAnimation, moveAnim, slideIn } from '../animations/sidepane-animation';
import { RoutedSidepaneComponent } from '../routed-sidepane/routed-sidepane.component';
import { SidepaneService, SidepaneStates } from '../../sidepane.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { delay } from 'rxjs/internal/operators/delay';
import { RoutingStateService } from '../../routing-state.service';

@Component({
  selector: 'app-add-introducer',
  templateUrl: './add-introducer.component.html',
  styleUrls: ['./add-introducer.component.css'],
  animations: [fadeAnimation, slideIn, moveAnim],
})
export class AddIntroducerComponent implements OnInit {
  private unsubscribe$ = new Subject();
  @ViewChild(RoutedSidepaneComponent)
  sidepaneInstance;
  sidepaneState;

  sidepaneIndex;

  sidepanePosition = -1000;
  width = 400;
  stateResult;
  sidepaneEvent: SidepaneStates = {add: false, remove: false};

  constructor(
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sidepaneService: SidepaneService,
    private routingStateService: RoutingStateService
  ) {
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log(event);
      }
    });
    console.log('second');
    this.sidepaneState = 'hidden';
    const res = this.sidepaneService.addSidepanesWidthOb(this.width, this.sidepaneIndex);
    this.sidepaneIndex = this.sidepaneService.sidepanesWidth.length;
    console.log(this.sidepaneIndex);
    console.log(res.widthState[this.sidepaneIndex]);
    // this.sidepanePosition = res.widthState[this.sidepaneIndex];
    console.log(res);
    this.stateLogic();
    // console.log(this.router);
    // console.log(this.activatedRoute);
    // console.log(this.location.path());
    // this.routingStateService.loadRouting();
    // console.log(this.routingStateService.history);
    /*this.sidepaneIndex = this.sidepaneService.store.length;
    const res = this.sidepaneService.addSidepanesWidthOb(500, this.sidepaneIndex);
    this.sidepanePosition = res.widthState[this.sidepaneIndex];
    this.sidepaneEvent = {...res.state};
    this.sidepaneService.parent = this;*/
    // this.stateLogic();

    this.sidepaneService.storeObserve.pipe(
      takeUntil(this.unsubscribe$),
      delay(0))
      .subscribe(item => {
        console.log(item);
        console.log(this.sidepaneIndex);
        this.sidepanePosition = item.widthState[this.sidepaneIndex];
        console.log(this.sidepanePosition);
        this.sidepaneEvent = {...item.state};
        this.stateLogic();
      });
  }

  onSubmit(value) {

    // this.sidepaneComponent.submitted.emit(value);
    // this.sidepaneComponent.onSubmit(value);
  }

  onClose() {
    // this.sidepaneComponent.onClose();
  }

  onNavigate(short: boolean) {

    /* this.sidepaneIndex = this.sidepaneService.store.length;
     const res = this.sidepaneService.addSidepanesWidthOb(this.width, this.sidepaneIndex);
     this.sidepanePosition = res.widthState[this.sidepaneIndex];
     console.log(res);
     console.log(this.sidepanePosition);

     console.log(this.sidepaneEvent);*/
    // this.sidepaneService.storeObserve.pipe(
    //   takeUntil(this.unsubscribe$),
    //   delay(0))
    //   .subscribe(item => {
    //     console.log(item);
    //     this.sidepanePosition = item.widthState[this.sidepaneIndex];
    //     this.sidepaneEvent = {...item.state};
    //     this.stateLogic(this.sidepaneEvent);
    //   });
    short ? this.router.navigate(['short', '3']) :
      this.router.navigate(['1', '2']);
  }

  onCreate() {
    //   this.sidepaneService.parent.loadCustom();
  }

  onActivate(componentRef) {
    console.log(componentRef.sidepaneInstance.sidepanePosition);
  }

  onBack() {
    this.sidepaneService.removeSidepaneInstances(this.sidepaneIndex);
    console.log('destroy event');
    setTimeout(() => {
      this.router.navigate([this.routingStateService.getPreviousUrl()]);
    }, 5000);

  }

  stateLogic() {
    console.log(this.sidepaneEvent);
    console.log(this.sidepanePosition);
    console.log(this.sidepaneIndex);
    console.log(this.stateResult);
    console.log(this.sidepaneState);
    this.stateResult = (!this.sidepaneEvent.remove && !this.sidepaneEvent.add ||
      this.sidepaneState === 'hidden' && this.sidepanePosition === undefined) ?
      {value: 'hidden', params: {pos: -1000, col: 'red'}} :
      (this.sidepaneEvent.add && !this.sidepaneEvent.move ?
        {value: 'in', params: {pos: this.sidepanePosition, col: 'blue'}} :
        {value: 'move', params: {pos: this.sidepanePosition}});
    // this.sidepaneState = 'in';
    // "sidepaneEvent? {value:'out',params: { pos:  0 },col:'purple'}: {value:'in',params: { pos:  sidepanePosition,col:'blue' }}"
    /*this.stateResult = !this.sidepaneEvent.remove && !this.sidepaneEvent.add ?
      {value: 'hidden', params: {pos: -1500}} :
      (this.sidepaneEvent.add ?
        {value: 'out', params: {pos: this.sidepanePosition}} :
        {value: 'in', params: {pos: this.sidepanePosition}});*/
    console.log(this.stateResult);
    console.log(this.sidepaneState);
  }
}
