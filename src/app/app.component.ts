import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { AnimationCanDeactivateGuard } from './AnimationCanDeactivateGuard';
import { AbstractParentSidepaneComponent } from './dynamic-modules/abstract-parent-sidepane/abstract-parent-sidepane.component';
import { moveAnim } from './dynamic-modules/animations/sidepane-animation';
import { SidepaneData } from './dynamic-modules/custom-injector';
import { MessageComponent } from './dynamic-modules/message/message.component';
import { SidepaneRef } from './dynamic-modules/sidepane-ref';
import { RoutingStateService } from './routing-state.service';
import { SidepaneService } from './sidepane.service';

export function* sum() {
  let num = 1;
  while (true) {
    yield num;
    num = num + 1;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [SidepaneService],
  animations: [moveAnim],
})
export class AppComponent extends AbstractParentSidepaneComponent implements OnInit, AfterViewInit, AnimationCanDeactivateGuard {
  width: 300;

  @ViewChild('inputComponent')
  inputComponent;

  gen = sum();

  constructor(
    sidepaneService: SidepaneService,
    router: Router,
    routingStateService: RoutingStateService,
  ) {
    super(router, routingStateService, sidepaneService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit() {
  }

  showSidepane() {
    this.router.navigate(['1']);
  }

  loadCustom() {
    const config = {
      data: {
        content: this.gen.next().value,
        open: true,
        dynamicComponents: {
          childComponent: MessageComponent,
        },
      },
    };
    const map = new WeakMap();
    map.set(SidepaneData, config);
    const sidepaneRef = new SidepaneRef();
    map.set(SidepaneRef, sidepaneRef);
  }
}
