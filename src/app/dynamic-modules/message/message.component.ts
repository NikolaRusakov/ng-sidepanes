import { Component, OnInit } from '@angular/core';
import { FactoryService } from 'app/factory.service';
import { SidepaneComponent } from '../sidepane/sidepane.component';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
})
export class MessageComponent implements OnInit {
  constructor(
    private factoryService: FactoryService,
    private sidepaneComponent: SidepaneComponent,
  ) {
  }

  ngOnInit() {
    console.log(this.factoryService.getLastWidthState());
  }

  onSubmit(value) {
    console.log(value);
    this.sidepaneComponent.submitted.emit(value);
  }

  onClose() {
    this.sidepaneComponent.onClose();
  }

  onCreate() {
    this.factoryService.parent.loadCustom();
  }

}
