import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-introducer',
  templateUrl: './add-introducer.component.html',
  styleUrls: ['./add-introducer.component.css']
})
export class AddIntroducerComponent implements OnInit {

  constructor(
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    console.log(this.activatedRoute);
  }

  onSubmit(value) {
    console.log(value);
    // this.sidepaneComponent.submitted.emit(value);
    // this.sidepaneComponent.onSubmit(value);
  }

  onClose() {
    // this.sidepaneComponent.onClose();
  }

  onNavigate() {
    this.router.navigate(['1', '2']);
  }

  onCreate() {
    //   this.sidepaneService.parent.loadCustom();
  }

  onBack() {
    this.location.back();
  }
}
