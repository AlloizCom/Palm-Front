import { Component, OnInit } from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  middleIndex: number;
  model;
  images = [{
    image:'../../../../assets/png/sld1.jpg'
  }, {
    image:'../../../../assets/png/sld2.jpg'
  },{
    image: '../../../../assets/png/sld3.jpg'
  },{
    image:'../../../../assets/png/Rectangle.png'
  },{
    image:'../../../../assets/png/sld5.jpg'
  }]

  constructor() {
    this.middleIndex = Math.round(this.images.length/2);
    console.log(this.middleIndex);
  }

  ngOnInit() {

  }

  scroll(event) {
    if (this.middleIndex > 0 && this.middleIndex != this.images.length - 1) {
      event ? this.middleIndex -= 1 : this.middleIndex += 1;
    } else if (this.middleIndex == 0 && event == false) {
      this.middleIndex += 1
    } else if (this.middleIndex == this.images.length - 1 && event == true) {
      this.middleIndex -= 1
    } else if (this.middleIndex == this.images.length - 1 && event == false) {
      this.middleIndex = 0;
    } else if (this.middleIndex == 0 && event == true) {
      this.middleIndex = this.images.length - 1;
    }
    console.log(this.middleIndex);
  }

}
