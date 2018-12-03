import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { SidepaneService } from 'app/sidepane.service';
import { SidepaneComponent } from '../sidepane/sidepane.component';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  animations: [
    trigger('appear', [
      state('in', style({opacity: 1})),
      transition('void => *', [
        style({opacity: 0}),
        animate(1000),
      ]),
      transition('* => void', [
        animate(100, style({opacity: 1})),
      ]),
    ]),
  ],
})
export class MessageComponent implements OnInit {
  constructor(
    private sidepaneService: SidepaneService,
    private sidepaneComponent: SidepaneComponent,
  ) {
  }

  ngOnInit() {
    console.log(this.sidepaneService.getLastWidthState());
  }

  onSubmit(value) {
    console.log(value);
    this.sidepaneComponent.submitted.emit(value);
    this.sidepaneComponent.onSubmit(value);
  }

  onClose() {
    this.sidepaneComponent.onClose();
  }

  onCreate() {
    this.sidepaneService.parent.loadCustom();
  }

}
