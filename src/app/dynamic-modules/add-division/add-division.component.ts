import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-division',
  templateUrl: './add-division.component.html',
  styleUrls: ['./add-division.component.css']
})
export class AddDivisionComponent implements OnInit {

  constructor(
    private location: Location,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  onBack() {
    this.location.back();
  }

  onNavigate() {
    this.router.navigate(['1', '2', '3']);
  }
}
