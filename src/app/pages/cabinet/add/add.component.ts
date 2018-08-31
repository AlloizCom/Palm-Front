import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  isIn = true;
  constructor() { }

  ngOnInit() {
  }
  toggleState() { // click handler
    this.isIn = !this.isIn;
  }
}

