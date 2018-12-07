import { animate, state, style, transition, trigger, query, animateChild, group } from '@angular/animations';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ComponentRef,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
  ChangeDetectorRef,
} from '@angular/core';
import { EventEmitter } from 'events';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { SidepaneService } from '../../sidepane.service';
import { SidepaneComponent } from '../sidepane/sidepane.component';
import { delay } from 'rxjs/internal/operators/delay';

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('* <=> *', [
      style({position: 'relative'}),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({left: '-100%'})
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('300ms ease-out', style({left: '100%'}))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({left: '0%'}))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
    transition('* <=> FilterPage', [
      style({position: 'relative'}),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({left: '-100%'})
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('200ms ease-out', style({left: '100%'}))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({left: '0%'}))
        ])
      ]),
      query(':enter', animateChild()),
    ])
  ]);

@Component({
  selector: 'app-routed-sidepane',
  templateUrl: './routed-sidepane.component.html',
  styleUrls: ['./routed-sidepane.component.scss'],
  // animations: [
  //   trigger('slideIn', [
  //     state('open', style({}), {
  //       params: {
  //         pos: '1000',
  //       },
  //     }),
  //     state('move', style({
  //       right: '{{pos}}',
  //     }), {
  //       params: {
  //         pos: '1000',
  //       },
  //     }),
  //
  //     transition('* => *', animate('1000ms ease-in')),
  //   ]),
  // ],
})
export class RoutedSidepaneComponent implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked {

  private unsubscribe$ = new Subject();
  // transition;
  values;
  animateState: string;
  @Input()
  sidepanePosition = -1000;

  @Input()
  sidepaneIndex: number;

  @Input()
  cmpRef?: ComponentRef<SidepaneComponent>;

  @Input()
  width: number;

  @ViewChild('inputComponent')
  container?: ElementRef;

  @ViewChild('childComponent', {read: ViewContainerRef})
  childComponent: ViewContainerRef;

  childComponentRef;
  @Output()
  submitted = new EventEmitter();

  constructor(private sidepaneService: SidepaneService,
              public elementRef: ElementRef,
              private cdRef: ChangeDetectorRef) {
    console.log(this.sidepanePosition);
  }

  ngAfterViewChecked() {

  }

  ngOnInit() {
    console.log(this.width);
    console.log(this.sidepanePosition);
    console.log(this.sidepaneIndex);
    // this.sidepaneIndex = this.sidepaneService.store.length;
    this.sidepaneService.addSidepane(this);
    this.animateState = 'open';
    // const sidepaneWidth = this.elementRef.nativeElement.children[0].offsetWidth;
    const sidepaneWidth = this.width;
    // console.log(sidepaneWidth);
    // console.log(this.sidepaneIndex);
    // const res = this.sidepaneService.addSidepanesWidthOb(sidepaneWidth, this.sidepaneIndex);
    // this.sidepanePosition = res.widthState[this.sidepaneIndex];
    this.sidepaneService.storeObserve.pipe(
      takeUntil(this.unsubscribe$),
      delay(0))
      .subscribe(item => {
        // this.sidepanePosition = item.widthState[this.sidepaneIndex];
        // console.log(item);
        console.log(this.sidepanePosition);
        // console.log(this.sidepaneIndex);
      });
    // console.log(this.elementRef.nativeElement.children[0].offsetWidth);
    /*this.sidepaneService.storeObserve.pipe(
      takeUntil(this.unsubscribe$),
      // delay(0),
      tap(item => {
        this.sidepanePosition = item.widthState[this.sidepaneIndex];
        console.log(item);
        console.log(this.sidepanePosition);
        console.log(this.sidepaneIndex);
      })).subscribe();*/
  }

  ngAfterViewInit() {
    // this.animateState = 'open';
    // this.cdRef.detectChanges();
    // setTimeout(() => {
    /*const sidepaneWidth = this.elementRef.nativeElement.children[0].offsetWidth;
    console.log(sidepaneWidth);
    console.log(this.sidepaneIndex);
    const res = this.sidepaneService.addSidepanesWidthOb(sidepaneWidth, this.sidepaneIndex);*/
    this.animateState = 'open';

    // this.sidepanePosition = res.widthState[this.sidepaneIndex];
    // this.sidepanePosition = 300;

    this.cdRef.detectChanges();

    // });
  }

  onClose() {
    if (this.cmpRef) {
      this.unsubscribe$.next();

      setTimeout(() => {
        console.log('destroy');
        // this.cmpRef.destroy();
      }, 2000);

    }
  }

  onSubmit(value) {
    this.values = value;
  }

  ngOnDestroy() {
    // setTimeout(() => {
      console.log('destroy');
    //   // this.cmpRef.destroy();
    //
    // }, 2000);

  }
}
