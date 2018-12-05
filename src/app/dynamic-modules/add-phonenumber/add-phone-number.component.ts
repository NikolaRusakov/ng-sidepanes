import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutingStateService } from '../../routing-state.service';

@Component({
  selector: 'app-add-phone-number',
  templateUrl: './add-phone-number.component.html',
  styleUrls: ['./add-phone-number.component.css']
})
export class AddPhoneNumberComponent implements OnInit {

  constructor(
    private location: Location,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private routingStateService: RoutingStateService,
  ) {
    routingStateService.loadRouting();

    // console.log(routingStateService.history);
  }

  ngOnInit() {
  }

  onBack() {
    // console.log(this.router);
    // console.log(this.activeRouter);
    // console.log(this.location);
    // console.log(this.routingStateService.getPreviousUrl());
    this.router.navigate([this.routingStateService.getPreviousUrl()]);
    // this.location.back();
  }
}
