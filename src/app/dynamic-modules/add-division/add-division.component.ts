import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-add-division',
  templateUrl: './add-division.component.html',
  styleUrls: ['./add-division.component.css']
})
export class AddDivisionComponent implements OnInit {

  constructor(
    private location: Location,
              ) { }

  ngOnInit() {
  }

  onBack() {
    this.location.back();
  }
}
