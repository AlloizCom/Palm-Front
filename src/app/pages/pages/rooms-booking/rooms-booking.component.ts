import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RoomService} from '../../../../shared/service/room.service';
import {Room} from '../../../../shared/models/room';
import {roomTariff} from '../../../../shared/enum/room-tariff';
import {isNullOrUndefined} from 'util';
import {Image} from '../../../../shared/models/image';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {RoomParamsService} from '../../../../shared/service/room-params.serive';
import {RoomsParams} from '../../../../shared/models/rooms-params';
import {Amenity} from '../../../../shared/models/amenity';
import {BookService} from '../../../../shared/service/book.service';
import {BrowserCheckService} from '../../../shared/service/browser-check.service';
import {SeoService} from '../../../../shared/service/seo.service';
import {CarrentLanguadgeService} from "../../../../shared/service/carrent-languadge.service";
import {BsLocaleService} from "ngx-bootstrap/datepicker";

@Component({
  selector: 'app-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.css'],
  providers: [RoomService, NgbCarouselConfig, BookService],
  host: {
    '(document:click)': 'changL()'
  }
})
export class RoomsBookingComponent implements OnInit, OnDestroy {

  id: number;
  img: string = '';
  roomTariff: any;
  room: Room;
  images: Image[] = [];
  amenities: Amenity[] = [];
  roomType: string = '';
  roomParams: RoomsParams;
  errorMessag: boolean = false;

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

  liqPayFormHtml: string = '';
  isBrowser = false;


  locale = 'ru';


  constructor(
    private _router: ActivatedRoute, config: NgbCarouselConfig,
    private router: Router,
    private _roomService: RoomService,
    private _bookService: BookService,
    private _roomsParamService: RoomParamsService,
    private localeService: BsLocaleService,
    private _browserCheck: BrowserCheckService,
    private  _carrentLanguadgeService: CarrentLanguadgeService,
    private _meta: SeoService
  ) {
    this.isBrowser = this._browserCheck.isBrowser();
    _router.params.subscribe(next => {
      _roomService.findOneAvailable(next['id']).subscribe(next => {
        this.roomTariff = roomTariff;
        this.room = next;
        this.images = next.images;
        this.amenities = next.amenities;
        this.roomType = next.type;
        this.id = next.id;
        this._meta.currentDescription = next.description;
        this._meta.currentKeywords = next.keywords;
// console.log(next);
      });
    }, err => {
      console.log(err);
    });
    this.roomParams = _roomsParamService.params;
    this.model1.day = new Date().getUTCDate();
    this.model1.month = new Date().getUTCMonth();
    this.model1.year = new Date().getUTCFullYear();
    this.model2.day = new Date().getUTCDate() + 1;
    this.model2.month = new Date().getUTCMonth();
    this.model2.year = new Date().getUTCFullYear();
  }

  // findRoomByParams() {
  //   let roomsParams = new RoomsParams();
  //   roomsParams.dateFrom = this.objectDateToString(this.model1).toString();
  //   roomsParams.dateTo = this.objectDateToString(this.model2).toString();
  //   roomsParams.numbersOfRooms = this.roomsNumber;
  //   roomsParams.adults = this.adultsNumber;
  //   roomsParams.childrens = this.childrenNumber;
  //   this._roomsParamService.setRoomsParams(roomsParams);
  // }

  objectDateToString(date) {
    return new Date(date.year, date.month, date.day + 1);
  }

  isNull(object: any): Boolean {
    if (Array.isArray(object)) {
      return !isNullOrUndefined(object[0]);
    } else {
      return !isNullOrUndefined(object);
    }
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.screenWidth = window.innerWidth;
      this.autoScrol = setInterval(() => {
        this.scroll(false);
      }, 4000);
    }
  }

//dataPicker
  onValueChange(e) {
    this.model1.day = e[0].getDate();
    this.model1.month = e[0].getMonth();
    this.model1.year = e[0].getFullYear();
    this.amountDaysInYour = this.daysInMonth(e[0]);
    if (e[0].getDate() == e[1].getDate()) {
      let date = new Date(e[1].getFullYear(), e[1].getMonth(), e[1].getDate() + 1);
      this.model2.day = date.getDate();
      this.model2.month = date.getMonth();
      this.model2.year = date.getFullYear();
    } else {
      this.model2.day = e[1].getDate();
      this.model2.month = e[1].getMonth();
      this.model2.year = e[1].getFullYear();
    }
  }

  daysInMonth(anyDateInMonth) {
    return new Date(anyDateInMonth.getFullYear(),
      anyDateInMonth.getMonth() + 1,
      0).getDate();
  }

  findRoomByParams() {
    let roomsParams = this._roomsParamService.params || new RoomsParams();

    roomsParams.dateFrom = this.objectDateToString(this.model1).toISOString().replace(/T.*/, '');
    roomsParams.dateTo = this.objectDateToString(this.model2).toISOString().replace(/T.*/, '');
    roomsParams.numbersOfRooms = this.roomsNumber;
    roomsParams.adults = this.adultsNumber;
    roomsParams.childrens = this.childrenNumber;
    roomsParams.roomType = this.room.type;

    this._roomsParamService.setRoomsParams(roomsParams);
    console.log(this.room);


    this._roomService.findRoomByParamsWithRoomType(roomsParams).subscribe(next => {
      console.log(roomsParams);
      if (next.length > 0) {
        this.router.navigate([`/rooms-booking/${this.id}/bookForm`]);
      } else {
        this.errorMessag = true;
      }
    });
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
    if (this.isBrowser) {
      clearInterval(this.autoScrol);
      this.autoScrol = setInterval(() => {
        this.scroll(false);
      }, 4000);
    }
  }

  ngOnDestroy(): void {
    this._meta.setDefault();
  }

  changL() {
    if (this._carrentLanguadgeService.getCarrentLanguadge() === 'uk') {
      this.locale = 'ru';
    } else {
      this.locale = this._carrentLanguadgeService.getCarrentLanguadge();
    }
    this.localeService.use(this.locale);
    this.getCurrentLang();
  }

  getCurrentLang(){
    if (this._carrentLanguadgeService.getCarrentLanguadge() === 'en') {
      this.model1.month = new Date().getUTCMonth()+12;
      this.model2.month = new Date().getUTCMonth()+12;
    }
    if (this._carrentLanguadgeService.getCarrentLanguadge() === 'uk') {
      this.model1.month = new Date().getUTCMonth();
      this.model2.month = new Date().getUTCMonth();
    }
    if (this._carrentLanguadgeService.getCarrentLanguadge() === 'ru') {
      this.model1.month = new Date().getUTCMonth()+24;
      this.model2.month = new Date().getUTCMonth()+24;
    }
    if (this._carrentLanguadgeService.getCarrentLanguadge() === 'pl') {
      this.model1.month = new Date().getUTCMonth()+36;
      this.model2.month = new Date().getUTCMonth()+36;
    }
  }
}
