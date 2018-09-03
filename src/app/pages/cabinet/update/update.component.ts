import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  isIn = true;
  constructor() { }

  ngOnInit() {
  }
  toggleState() { // click handler
    this.isIn = !this.isIn;
  }
}
