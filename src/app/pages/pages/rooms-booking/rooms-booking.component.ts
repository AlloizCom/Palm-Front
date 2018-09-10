import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ImagePipePipe} from "../../../shared/pipe/pipe/image.pipe";
import {News} from "../../../shared/models/news";
import {NewsService} from "../../../shared/service/news.service";
import {RoomService} from "../../../shared/service/room.service";
import {Room} from "../../../shared/models/room";
import {RoomTariff} from "../../../shared/enum/room-tariff";
import {TariffService} from "../../../shared/service/tariff.service";
import {RoomWithPrice} from "../../../shared/models/room-with-price";
import {isNullOrUndefined} from "util";
import {MainPage} from "../../../shared/models/main-page";
import {Image} from "../../../shared/models/image";
import {NgbCarouselConfig} from "@ng-bootstrap/ng-bootstrap";
import {RoomParamsService} from "../../../shared/service/room-params.serive";
import {RoomsParams} from "../../../shared/models/rooms-params";

@Component({
  selector: 'app-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.css'],
  providers: [RoomService, NgbCarouselConfig]
})
export class RoomsBookingComponent implements OnInit {

  id: number;
  img: string = '';
  roomTariff: any;
  room: Room;
  images: Image[] = [];

  constructor(private _router: ActivatedRoute, config: NgbCarouselConfig, private _roomService: RoomService, private _roomsParamService: RoomParamsService) {
    _router.params.subscribe(next => {
      _roomService.findOneAvailableWithPrice(next['id']).subscribe(next => {
        this.roomTariff = RoomTariff;
        this.room = next;
        this.id = next['id'];
        console.log(this.room)
        console.log(next);
      })
    }, err => {
      console.log(err);
    });

    this.model1.day = new Date().getUTCDate();
    this.model1.month = new Date().getUTCMonth();
    this.model1.year = new Date().getUTCFullYear();
    this.model2.day = new Date().getUTCDate();
    this.model2.month = new Date().getUTCMonth();
    this.model2.year = new Date().getUTCFullYear();
    this.mounth1 = this.model1?this.model1.month :'MM';
    this.mounth2 = this.model2?this.model2.month :'MM';
  }

  //dataPicker
  model1={day:0,year:0,month:0};
  model2={day:0,year:0,month:0};
  mounth1: any;
  mounth2: any;
  enterDay: number;
  leaveDay: number;
  screenWidth: number =1024;

  //available
  adultsNumber: number = 1;
  childrenNumber: number = 0;
  roomsNumber: number = 1;


  findRoomByParams(){
    console.log(this.model1);
    console.log(this.model2);
    let roomsParams = new RoomsParams();
    roomsParams.dateFrom = this.objectDateToString(this.model1).toString();
    roomsParams.dateTo = this.objectDateToString(this.model2).toString();
    roomsParams.numbersOfRooms = this.roomsNumber;
    roomsParams.adults = this.adultsNumber;
    roomsParams.childrens = this.childrenNumber;
    this._roomsParamService.setRoomsParams(roomsParams);
  }

  objectDateToString(date){
    return new Date(date.year, date.month, date.day);
  }

  isNull(object: any): Boolean {
    if (Array.isArray(object)) {
      return !isNullOrUndefined(object[0]);
    } else {
      return !isNullOrUndefined(object);
    }
  }

  onChoseLocation(event) {
    console.log(event);
  }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
  }
//dataPicker
  chang1(e) {
    this.enterDay = e;
    console.log(e);
    this.mounth1 = this.model1?this.model1.month :'MM';
  }

  chang2(e) {
    this.leaveDay = e;
    console.log(e);
    this.mounth2 = this.model2?this.model2.month :'MM';
  }

  roomsNumberFunc(bull) {
    if (bull) {
      this.roomsNumber += 1;
    }
    if (!bull && this.roomsNumber != 1) {
      this.roomsNumber -= 1;
    }
  }

  adultsNumberFunc(bull) {
    if (bull) {
      this.adultsNumber += 1;
    }
    if (!bull && this.adultsNumber != 1) {
      this.adultsNumber -= 1;
    }
  }

  childrenNumberFunc(bull) {
    if (bull) {
      this.childrenNumber += 1;
    }
    if (!bull && this.childrenNumber != 0) {
      this.childrenNumber -= 1;
    }
  }

}
