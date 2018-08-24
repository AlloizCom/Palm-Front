import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-main-rooms',
  templateUrl: './main-rooms.component.html',
  styleUrls: ['./main-rooms.component.css']
})
export class MainRoomsComponent implements OnInit {


  images = [
    {
      image: '../../../../assets/png/room.png',
      text2: "Dco harum ut est. Cetero aliquam pro ad.9",
      text3: "НАПІВЛЮКС",
      text4: "500 grn"
    }, {
      image: '../../../../assets/png/room2.png',
      text: "10",
      text2: "Dco harum ut est. Cetero aliquam pro ad.10",
      text3: "СТАНДАРТ",
      text4: "400 grn"
    }, {
      image: '../../../../assets/png/room3.png',
      text: "11",
      text2: "Dco harum ut est. Cetero aliquam pro ad.11",
      text3: "ПОКРАЩЕННИЙ СТАНДАРТ",
      text4: "700 grn"
    }, {
      image: '../../../../assets/png/22.jpg',
      text: "12",
      text2: "Dco harum ut est. Cetero aliquam pro ad.12",
      text3: "ПОКРАЩЕННИЙ НАПІВЛЮКС",
      text4: "600 grn"
    }, {
      image: '../../../../assets/png/11.jpg',
      text: "13",
      text2: "Dco harum ut est. Cetero aliquam pro ad.13",
      text3: "ЛЮКС",
      text4: "4400 grn"
    }]

  anton;
  vitalik;
  nazar;
  andriy;
  scroll(){
    this.anton = this.images[0];
    this.images[0]=this.images[1];
    this.images[1]= this.anton;
  }
  scroll2(){
    this.vitalik = this.images[0];
    this.images[0]=this.images[2];
    this.images[2]= this.vitalik;
  }
  scroll3(){
    this.nazar = this.images[0];
    this.images[0]=this.images[3];
    this.images[3]= this.nazar;
  }
  scroll4(){
    this.andriy = this.images[0];
    this.images[0]=this.images[4];
    this.images[4]= this.andriy;
  }



  constructor() {

  }


  ngOnInit() {
  }


  // slider
  // middleIndex: number;
  // middleIndex2: number;
  // middleIndex3: number;
  // middleIndex4: number;
  // middleIndex1: number;
  //
  // images = [{
  //   image: '../../../../assets/png/sld1.jpg',
  //   text: "Кухня",
  //   text2: "Dco harum ut est. Cetero aliquam pro ad."
  // }, {
  //   image: '../../../../assets/png/sld2.jpg',
  //   text: "CСпальня",
  //   text2: "Dco harum ut est. Cetero aliquam pro ad.0"
  // }, {
  //   image: '../../../../assets/png/sld3.jpg',
  //   text: "1",
  //   text2: "Dco harum ut est. Cetero aliquam pro ad.1"
  // }, {
  //   image: '../../../../assets/png/Rectangle.png',
  //   text: "2",
  //   text2: "Dco harum ut est. Cetero aliquam pro ad.2"
  // }, {
  //   image: '../../../../assets/png/sld5.jpg',
  //   text: "3",
  //   text2: "Dco harum ut est. Cetero aliquam pro ad.3"
  // },
  //   {
  //     image: '../../../../assets/png/66.jpg',
  //     text: "4",
  //     text2: "Dco harum ut est. Cetero aliquam pro ad.4"
  //   }, {
  //     image: '../../../../assets/png/22.jpg',
  //     text: "5",
  //     text2: "Dco harum ut est. Cetero aliquam pro ad.5"
  //   }, {
  //     image: '../../../../assets/png/33.jpg',
  //     text: "6",
  //     text2: "Dco harum ut est. Cetero aliquam pro ad.6"
  //   }, {
  //     image: '../../../../assets/png/44.jpg',
  //     text: "7",
  //     text2: "Dco harum ut est. Cetero aliquam pro ad.7"
  //   }, {
  //     image: '../../../../assets/png/55.jpg',
  //     text: "8",
  //     text2: "Dco harum ut est. Cetero aliquam pro ad.8"
  //   },
  //   {
  //     image: '../../../../assets/png/room.png',
  //     text: "9",
  //     text2: "Dco harum ut est. Cetero aliquam pro ad.9"
  //   }, {
  //     image: '../../../../assets/png/room2.png',
  //     text: "10",
  //     text2: "Dco harum ut est. Cetero aliquam pro ad.10"
  //   }, {
  //     image: '../../../../assets/png/room3.png',
  //     text: "11",
  //     text2: "Dco harum ut est. Cetero aliquam pro ad.11"
  //   }, {
  //     image: '../../../../assets/png/room4.png',
  //     text: "12",
  //     text2: "Dco harum ut est. Cetero aliquam pro ad.12"
  //   }, {
  //     image: '../../../../assets/png/room5.png',
  //     text: "13",
  //     text2: "Dco harum ut est. Cetero aliquam pro ad.13"
  //   }]
  //
  // constructor() {
  //   this.middleIndex = Math.round(this.images.length / 8);
  //   this.middleIndex2 = this.middleIndex + 1;
  //   this.middleIndex3 = this.middleIndex + 2;
  //   this.middleIndex4 = this.middleIndex + 3;
  //   this.middleIndex1= this.middleIndex + 4;
  // }
  //
  //
  // scroll(event) {
  //   if (this.middleIndex > 0 && this.middleIndex != this.images.length - 1) {
  //     event ? this.middleIndex -= 1 : this.middleIndex += 1;
  //   } else if (this.middleIndex == 0 && event == false) {
  //     this.middleIndex += 1
  //   } else if (this.middleIndex == this.images.length - 1 && event == true) {
  //     this.middleIndex -= 1
  //   } else if (this.middleIndex == this.images.length - 1 && event == false) {
  //     this.middleIndex = 0;
  //   } else if (this.middleIndex == 0 && event == true) {
  //     this.middleIndex = this.images.length - 1;
  //   }
  //
  //   if (this.middleIndex2 > 0 && this.middleIndex2 != this.images.length - 1) {
  //     event ? this.middleIndex2 -= 1 : this.middleIndex2 += 1;
  //   } else if (this.middleIndex2 == 0 && event == false) {
  //     this.middleIndex2 += 1
  //   } else if (this.middleIndex2 == this.images.length - 1 && event == true) {
  //     this.middleIndex2 -= 1
  //   } else if (this.middleIndex2 == this.images.length - 1 && event == false) {
  //     this.middleIndex2 = 0;
  //   } else if (this.middleIndex2 == 0 && event == true) {
  //     this.middleIndex2 = this.images.length - 1;
  //   }
  //
  //   if (this.middleIndex3 > 0 && this.middleIndex3 != this.images.length - 1) {
  //     event ? this.middleIndex3 -= 1 : this.middleIndex3 += 1;
  //   } else if (this.middleIndex3 == 0 && event == false) {
  //     this.middleIndex3 += 1
  //   } else if (this.middleIndex3 == this.images.length - 1 && event == true) {
  //     this.middleIndex3 -= 1
  //   } else if (this.middleIndex3 == this.images.length - 1 && event == false) {
  //     this.middleIndex3 = 0;
  //   } else if (this.middleIndex3 == 0 && event == true) {
  //     this.middleIndex3 = this.images.length - 1;
  //   }
  //
  //   if (this.middleIndex4 > 0 && this.middleIndex4 != this.images.length - 1) {
  //     event ? this.middleIndex4 -= 1 : this.middleIndex4 += 1;
  //   } else if (this.middleIndex4 == 0 && event == false) {
  //     this.middleIndex4 += 1
  //   } else if (this.middleIndex4 == this.images.length - 1 && event == true) {
  //     this.middleIndex4 -= 1
  //   } else if (this.middleIndex4 == this.images.length - 1 && event == false) {
  //     this.middleIndex4 = 0;
  //   } else if (this.middleIndex4 == 0 && event == true) {
  //     this.middleIndex4 = this.images.length - 1;
  //   }
  //
  //   if (this.middleIndex1 > 0 && this.middleIndex1 != this.images.length - 1) {
  //     event ? this.middleIndex1 -= 1 : this.middleIndex1 += 1;
  //   } else if (this.middleIndex1 == 0 && event == false) {
  //     this.middleIndex1 += 1
  //   } else if (this.middleIndex1 == this.images.length - 1 && event == true) {
  //     this.middleIndex1 -= 1
  //   } else if (this.middleIndex1 == this.images.length - 1 && event == false) {
  //     this.middleIndex1 = 0;
  //   } else if (this.middleIndex1 == 0 && event == true) {
  //     this.middleIndex1 = this.images.length - 1;
  //   }
  // }


  // ngOnInit() {
  // }


}
