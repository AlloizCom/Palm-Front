import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  middleIndex: number;

  //dataPicker
  model1: Date;
  model2: Date;
  enterDay;
  leaveDay;
  month: string[] =[
    'січень', 'лютий', 'березень', 'квітень', 'травень', 'червень','липень', 'серпень', 'вересень', 'жовтень', 'листопад', 'грудень'
  ]

  //available
  adultsNumber: number = 1;
  childrenNumber: number = 1;
  roomsNumber: number = 1;

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
  }
  //data picker
  get today() {
    return new Date();
  }
  chang1(e){
    this.enterDay = e;
    console.log(e);
  }
  chang2(e){
    this.leaveDay = e;
    console.log(e);
  }

  //dataPicker
  roomsNumberFunc(bull){
    console.log("work")
    if(bull){
      this.roomsNumber+=1;
    }
    if(!bull && this.roomsNumber!=1){
      this.roomsNumber-=1;
    }
  }
  adultsNumberFunc(bull){
    console.log("work")
    if(bull){
      this.adultsNumber+=1;
    }
    if(!bull && this.adultsNumber!=1){
      this.adultsNumber-=1;
    }
  }
  childrenNumberFunc(bull){
    console.log("work")
    if(bull){
      this.childrenNumber+=1;
    }
    if(!bull && this.childrenNumber!=1){
      this.childrenNumber-=1;
    }
  }

}
