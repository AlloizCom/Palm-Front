import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.css']
})
export class CabinetComponent implements OnInit {
  isIn = true;
  constructor() { }

  ngOnInit() {
  }
  toggleState() { // click handler
    this.isIn = !this.isIn;
  }
}
