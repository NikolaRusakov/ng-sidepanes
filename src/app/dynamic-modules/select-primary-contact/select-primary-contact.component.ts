import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutingStateService } from '../../routing-state.service';

@Component({
  selector: 'app-select-primary-contact',
  templateUrl: './select-primary-contact.component.html',
  styleUrls: ['./select-primary-contact.component.css']
})
export class SelectPrimaryContactComponent implements OnInit {

  constructor(
    private location: Location,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private routingStateService: RoutingStateService,
  ) {
    routingStateService.loadRouting();

    console.log(routingStateService.history);
  }

  ngOnInit() {
  }

  onBack() {
    console.log(this.router);
    console.log(this.activeRouter);
    console.log(this.location);
    console.log(this.routingStateService.getPreviousUrl());
    this.router.navigate([this.routingStateService.getPreviousUrl()]);
    // this.location.back();
  }
}
