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
} from '@angular/core';
import { EventEmitter } from 'events';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { SidepaneService } from '../../sidepane.service';
import { SidepaneComponent } from '../sidepane/sidepane.component';

@Component({
  selector: 'app-routed-sidepane',
  templateUrl: './routed-sidepane.component.html',
  styleUrls: ['./routed-sidepane.component.scss']
})
export class RoutedSidepaneComponent implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked {

  private unsubscribe$ = new Subject();
  // transition;
  values;

  private sidepanePosition: number;
  private sidepaneIndex: number;
  private indexModified = false;

  @Input()
  cmpRef?: ComponentRef<SidepaneComponent>;

  @ViewChild('inputComponent')
  container?: ElementRef;

  @ViewChild('childComponent', {read: ViewContainerRef})
  childComponent: ViewContainerRef;

  childComponentRef;
  @Output()
  submitted = new EventEmitter();

  constructor(private sidepaneService: SidepaneService,
              public elementRef: ElementRef) {
  }

  ngAfterViewChecked() {
  }

  ngOnInit() {
    this.sidepaneIndex = this.sidepaneService.store.length;
    this.sidepaneService.addSidepane(this);
    this.sidepaneService.storeObserve.pipe(takeUntil(this.unsubscribe$))
      .subscribe(item => {
        const addIndex = item.state.added && !item.state.modified;
        const increaseIndex = item.state.added && item.state.modified;
        const decreaseIndex = item.state.modified && item.state.removed;
        if (!this.indexModified) {
          this.indexModified = true;
          console.log('again');
        } else {
          console.log('compute');
        }
        console.log(item.widthState);
        this.sidepanePosition = item.widthState[this.sidepaneIndex];
      });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const sidepaneWidth = this.elementRef.nativeElement.children[0].offsetWidth;
      console.log(sidepaneWidth);
      console.log(this.sidepaneIndex);
      this.sidepaneService.addSidepanesWidthOb(sidepaneWidth, this.sidepaneIndex);
    });
  }

  onClose() {
    if (this.cmpRef) {
      this.unsubscribe$.next();
      this.cmpRef.destroy();
    }
  }

  onSubmit(value) {
    this.values = value;
  }

  ngOnDestroy() {
    console.log('destroy');

    this.sidepaneService.removeSidepaneInstances(this.sidepaneIndex);
  }
}
