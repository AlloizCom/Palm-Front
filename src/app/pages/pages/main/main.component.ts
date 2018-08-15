import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  middleIndex: number;
  images = [{
    image:'../../../../assets/png/Rectangle.png'
  }, {
    image:'../../../../assets/png/Rectangle.png'
  },{
    image: '../../../../assets/png/Rectangle.png'
  },{
    image:'../../../../assets/png/Rectangle.png'
  },{
    image:'../../../../assets/png/Rectangle.png'
  }]

  constructor() {
    this.middleIndex = Math.round(this.images.length/2);
    console.log(this.middleIndex);
  }

  ngOnInit() {

  }

}
