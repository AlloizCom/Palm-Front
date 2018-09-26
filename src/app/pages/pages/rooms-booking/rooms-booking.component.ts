import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RoomService} from '../../../../shared/service/room.service';
import {Room} from '../../../../shared/models/room';
import {RoomTariff} from '../../../../shared/enum/room-tariff';
import {isNullOrUndefined} from 'util';
import {Image} from '../../../../shared/models/image';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {RoomParamsService} from '../../../../shared/service/room-params.serive';
import {RoomsParams} from '../../../../shared/models/rooms-params';
import {Amenity} from '../../../../shared/models/amenity';
import {BookService} from "../../../../shared/service/book.service";
import {Book} from "../../../../shared/models/book";

@Component({
  selector: 'app-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.css'],
  providers: [RoomService, NgbCarouselConfig, BookService]
})
export class RoomsBookingComponent implements OnInit {

  id: number;
  img: string = '';
  roomTariff: any;
  room: Room;
  images: Image[] = [];
  amenities: Amenity[] = [];
  roomType: string = '';
  //dataPicker
  model1 = {day: 0, year: 0, month: 0};
  model2 = {day: 0, year: 0, month: 0};
  amountDaysInYour: number;
  minDate = new Date();
  screenWidth: number = 1024;
  //available
  adultsNumber: number = 1;
  childrenNumber: number = 0;
  roomsNumber: number = 1;
  //slider
  autoScrol: any = 0;
  index: number = 0;

  liqPayFormHtml: string = "";

  constructor(
    private _router: ActivatedRoute, config: NgbCarouselConfig,
    private router: Router,
    private _roomService: RoomService,
    private _bookService: BookService,
    private _roomsParamService: RoomParamsService) {
    _router.params.subscribe(next => {
      _roomService.findOneAvailableWithPrice(next['id']).subscribe(next => {
        this.roomTariff = RoomTariff;
        this.room = next;
        this.images = next.images;
        this.amenities = next.amenities;
        this.roomType = next.type;
        this.id = next['id'];
        // console.log(next);
      });
    }, err => {
      console.log(err);
    });

    this.model1.day = new Date().getUTCDate();
    this.model1.month = new Date().getUTCMonth();
    this.model1.year = new Date().getUTCFullYear();
    this.model2.day = new Date().getUTCDate() + 1;
    this.model2.month = new Date().getUTCMonth();
    this.model2.year = new Date().getUTCFullYear();
  }

  findRoomByParams() {
    let roomsParams = new RoomsParams();
    roomsParams.dateFrom = this.objectDateToString(this.model1).toString();
    roomsParams.dateTo = this.objectDateToString(this.model2).toString();
    roomsParams.numbersOfRooms = this.roomsNumber;
    roomsParams.adults = this.adultsNumber;
    roomsParams.childrens = this.childrenNumber;
    this._roomsParamService.setRoomsParams(roomsParams);
  }

  objectDateToString(date) {
    return new Date(date.year, date.month, date.day);
  }

  isNull(object: any): Boolean {
    if (Array.isArray(object)) {
      return !isNullOrUndefined(object[0]);
    } else {
      return !isNullOrUndefined(object);
    }
  }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.autoScrol = setInterval(() => {
      this.scroll(false);
    }, 4000);
  }

//dataPicker
  onValueChange(e) {
    this.model1.day = e[0].getUTCDate();
    this.model1.month = e[0].getUTCMonth();
    this.model1.year = e[0].getUTCFullYear();
    this.amountDaysInYour = this.daysInMonth(e[0]);
    if (e[0].getUTCDate() == this.amountDaysInYour && e[1].getUTCDate() == this.amountDaysInYour) {
      if (e[0].getUTCMonth() == 11) {
        this.model2.year = e[1].getUTCFullYear() + 1;
        this.model2.month = 0;
        this.model2.day = 1;
      } else {
        this.model2.month = e[1].getUTCMonth()+1;
        this.model2.year = e[1].getUTCFullYear();
        this.model2.day = 1;
      }
    } else if (e[0].getUTCDate() == e[1].getUTCDate()) {
      this.model2.day = e[1].getUTCDate() + 1;
      this.model2.month = e[1].getUTCMonth();
      this.model2.year = e[1].getUTCFullYear();
    } else {
      this.model2.day = e[1].getUTCDate();
      this.model2.month = e[1].getUTCMonth();
      this.model2.year = e[1].getUTCFullYear();
    }
  }

  daysInMonth(anyDateInMonth) {
    return new Date(anyDateInMonth.getFullYear(),
      anyDateInMonth.getMonth() + 1,
      0).getDate();
  }

//dataPicker

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

  pay() {
    let dateInDay;
    let dateOutDay;
    let dateInMonth;
    let dateOutMonth;
    this.model1.day<10?dateInDay = `0${this.model1.day}`:dateInDay = `${this.model1.day}`
    this.model2.day<10?dateOutDay = `0${this.model2.day}`:dateOutDay = `${this.model2.day}`;
    this.model1.month<10?dateInMonth = `0${this.model1.month}`:dateInMonth = `${this.model1.month}`;
    this.model2.month<10?dateOutMonth = `0${this.model2.month}`:dateOutMonth = `${this.model2.month}`;

    let book = new Book();
    book.kids = this.childrenNumber;
    book.dateIn = `${this.model1.year}-${dateInMonth}-${dateInDay}`;
    book.dateOut = `${this.model2.year}-${dateOutMonth}-${dateOutDay}`;
    book.adults = this.adultsNumber;
    book.amountOfRooms = this.roomsNumber;
    book.roomType = this.roomType;
    // this._bookService.pay(book).subscribe(next => {
    //   this.liqPayFormHtml = next;
    // });
    this.router.navigate([`/rooms-booking/${this.id}/bookForm`]);
  }

  //slider
  scroll(event) {
    if (this.index > 0 && this.index != this.room.images.length - 1) {
      event ? this.index -= 1 : this.index += 1;
    } else if (this.index == 0 && event == false) {
      this.index += 1;
    } else if (this.index == this.room.images.length - 1 && event == true) {
      this.index -= 1;
    } else if (this.index == this.room.images.length - 1 && event == false) {
      this.index = 0;
    } else if (this.index == 0 && event == true) {
      this.index = this.room.images.length - 1;
    }
    clearInterval(this.autoScrol);
    this.autoScrol = setInterval(() => {
      this.scroll(false);
    }, 4000);
  }
}
