import {
  Component,
  OnInit,
  ElementRef,
  Output,
  ViewContainerRef,
  ViewChild,
  Input,
  ComponentRef,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import { SidepaneService } from '../../sidepane.service';
import { SidepaneData } from '../custom-injector';
import { SidepaneComponent } from '../sidepane/sidepane.component';
import { EventEmitter } from 'events';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-routed-sidepane',
  templateUrl: './routed-sidepane.component.html',
  styleUrls: ['./routed-sidepane.component.scss']
})
export class RoutedSidepaneComponent implements OnInit, AfterViewInit, OnDestroy {

  private unsubscribe$ = new Subject();
  // transition;
  values;
  private sidepanePosition: number;
  private sidepaneIndex: number;

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

  ngOnInit() {
    // console.log(this.sidepaneService);
    // console.log(this.sidepanePosition);
    this.sidepaneIndex = this.sidepaneService.store.length;
    this.sidepaneService.addSidepane(this);
    this.sidepaneService.storeObserve.pipe(takeUntil(this.unsubscribe$))
      .subscribe(item => {
        // console.log(item.widthState[this.sidepaneIndex]);
        const checkInitialPos = this.sidepanePosition !== undefined;
        const checkPos = item.remove &&
          !item.remove.removeLast &&
          this.sidepaneIndex >= item.remove.index &&
          this.sidepaneIndex !== 0;
        this.sidepaneIndex = (checkInitialPos && checkPos) ?
          (this.sidepaneIndex - 1) : this.sidepaneIndex;

        this.sidepanePosition = item.widthState[this.sidepaneIndex];
      });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const sidepaneWidth = this.elementRef.nativeElement.children[0].offsetWidth;
      this.sidepaneService.addSidepanesWidthOb(sidepaneWidth);
    });
  }

  loadAndInitialize(dynamicComponents) {
    // Object.entries(dynamicComponents).forEach(([key, value]) => {
    //   this.loadChildComponent(value);
    // });
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
    this.sidepaneService.removeSidepaneInstances(this.sidepaneIndex);
  }
}
