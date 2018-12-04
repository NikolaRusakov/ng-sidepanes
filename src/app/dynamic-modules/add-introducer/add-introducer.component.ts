import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-introducer',
  templateUrl: './add-introducer.component.html',
  styleUrls: ['./add-introducer.component.css']
})
export class AddIntroducerComponent implements OnInit {

  constructor(
    private location: Location,
  ) { }

  ngOnInit() {
  }

  onSubmit(value) {
    console.log(value);
    // this.sidepaneComponent.submitted.emit(value);
    // this.sidepaneComponent.onSubmit(value);
  }

  onClose() {
    // this.sidepaneComponent.onClose();
  }

  onCreate() {
  //   this.sidepaneService.parent.loadCustom();
  }
  onBack() {
    this.location.back();
  }
}
