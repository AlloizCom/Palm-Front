import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  middleIndex: number;
  images = ['red', 'green', 'indigo', 'yellow','teal']

  constructor() {}

  ngOnInit() {
    this.middleIndex = Math.round(this.images.length/2);
  }

}
