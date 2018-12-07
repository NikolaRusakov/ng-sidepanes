import { Component, OnInit } from '@angular/core';
import { moveAnim } from '../dynamic-modules/animations/sidepane-animation';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [moveAnim],
})
export class MainComponent implements OnInit {
  sidepaneState;

  constructor() {
  }

  ngOnInit() {
  }

  onActivate(componentRef) {
    console.log(componentRef);
  }
}
