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

export interface SidepaneTransitions {
  out: boolean;
  in: boolean;
  move: boolean;
  moveAgain: boolean;
}

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

  values;
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

  constructor(private sidepaneService: SidepaneService) {
    console.log(this.sidepanePosition);
    console.log(this.width);
  }

  ngAfterViewChecked() {

  }

  ngOnInit() {
    // console.log(this.width);
    // console.log(this.sidepanePosition);
    // console.log(this.sidepaneIndex);
    this.sidepaneService.addSidepane(this);
  }

  ngAfterViewInit() {
    // this.cdRef.detectChanges();
  }

  onClose() {
    // if (this.cmpRef) {
    // }
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
