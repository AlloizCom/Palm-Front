import {Component, OnInit} from '@angular/core';
import {RoomService} from "../../../../shared/service/room.service";
import {Room} from "../../../../shared/models/room";
import {RoomWithPrice} from "../../../../shared/models/room-with-price";
import {RoomTariff} from "../../../../shared/enum/room-tariff";
import {TariffService} from "../../../../shared/service/tariff.service";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-main-rooms',
  templateUrl: './main-rooms.component.html',
  styleUrls: ['./main-rooms.component.css'],
  providers:[RoomService]
})
export class MainRoomsComponent implements OnInit {
  first1;
  second1;
  third1;
  first2;
  second2;
  third2
  first3;
  second3;
  third3
  first4;
  second4;
  third4;



  scroll(){
    this.first1 = this.rooms[0].images[0].path;
    this.second1 = this.roomTariff[this.rooms[0].type];
    this.third1 = this.rooms[0].price;

    this.rooms[0].images[0].path=this.rooms[1].images[0].path;
    this.roomTariff[this.rooms[0].type]=this.roomTariff[this.rooms[1].type];
    this.rooms[0].price=this.rooms[1].price;

    this.rooms[1].images[0].path= this.first1;
    this.roomTariff[this.rooms[1].type]= this.second1;
    this.rooms[1].price= this.third1;
  }
  scroll2(){
    this.first2 = this.rooms[0].images[0].path;
    this.second2 = this.roomTariff[this.rooms[0].type];
    this.third2 = this.rooms[0].price;

    this.rooms[0].images[0].path=this.rooms[2].images[0].path;
    this.roomTariff[this.rooms[0].type]=this.roomTariff[this.rooms[2].type];
    this.rooms[0].price=this.rooms[2].price;

    this.rooms[2].images[0].path= this.first2;
    this.roomTariff[this.rooms[2].type]= this.second2;
    this.rooms[2].price= this.third2;
  }
  scroll3(){
    this.first3 = this.rooms[0].images[0].path;
    this.second3 = this.roomTariff[this.rooms[0].type];
    this.third3 = this.rooms[0].price;

    this.rooms[0].images[0].path=this.rooms[3].images[0].path;
    this.roomTariff[this.rooms[0].type]=this.roomTariff[this.rooms[3].type];
    this.rooms[0].price=this.rooms[3].price;

    this.rooms[3].images[0].path= this.first3;
    this.roomTariff[this.rooms[3].type]= this.second3;
    this.rooms[3].price= this.third3;
  }
  scroll4(){
    this.first4 = this.rooms[0].images[0].path;
    this.second4 = this.roomTariff[this.rooms[0].type];
    this.third4 = this.rooms[0].price;

    this.rooms[0].images[0].path=this.rooms[4].images[0].path;
    this.roomTariff[this.rooms[0].type]=this.roomTariff[this.rooms[4].type];
    this.rooms[0].price=this.rooms[4].price;

    this.rooms[4].images[0].path= this.first4;
    this.roomTariff[this.rooms[4].type]= this.second4;
    this.rooms[4].price= this.third4;
  }

  roomTariff: any;
  rooms: RoomWithPrice[]=[];

  constructor(private _roomService: RoomService) {
    this._roomService.findAllRoomWithPrice().subscribe(next => {
      this.roomTariff = RoomTariff;
      for (let i of next) {
        if (typeof (i) != undefined && i != null) {
          this.rooms.push(i);
        }
      }
      console.log(this.rooms);
    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
  }

  isNull(object: any): Boolean {
    if (Array.isArray(object)) {
      return !isNullOrUndefined(object[0]);
    } else {
      return !isNullOrUndefined(object);
    }
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
