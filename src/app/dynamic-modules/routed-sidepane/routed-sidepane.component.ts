import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ComponentRef,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { EventEmitter } from 'events';
import { SidepaneService } from '../../sidepane.service';
import { SidepaneComponent } from '../sidepane/sidepane.component';

@Component({
  selector: 'app-routed-sidepane',
  templateUrl: './routed-sidepane.component.html',
  styleUrls: ['./routed-sidepane.component.scss'],
})
export class RoutedSidepaneComponent implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked {

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

  @Output()
  submitted = new EventEmitter();

  constructor(private sidepaneService: SidepaneService) {
  }

  ngAfterViewChecked() {

  }

  ngOnInit() {
    this.sidepaneService.addSidepane(this);
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
  }
}
