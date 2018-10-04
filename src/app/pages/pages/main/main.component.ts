import {Component, HostListener, OnInit} from '@angular/core';
import {isNullOrUndefined} from 'util';
import {MainPageSevice} from '../../../../shared/service/main-page.sevice';
import {RoomParamsService} from '../../../../shared/service/room-params.serive';
import {RoomsParams} from '../../../../shared/models/rooms-params';
import {Router} from '@angular/router';
import {TranslateService} from 'ng2-translate';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import {CarrentLanguadgeService} from '../../../../shared/service/carrent-languadge.service';
import {plLocale, ruLocale} from 'ngx-bootstrap/locale';
defineLocale('pl', plLocale);
defineLocale('ru', ruLocale);

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [MainPageSevice],
  host: {
    '(document:click)': 'changL()',
  }
})

export class MainComponent implements OnInit{

  //grey map

  iconUrl: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png';
  latitude = 49.856338332302016;
  longitude = 24.076377153396606;
  public customStyle = [
    {
      'featureType': 'water',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#e9e9e9'
        },
        {
          'lightness': 17
        }
      ]
    },
    {
      'featureType': 'landscape',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#f5f5f5'
        },
        {
          'lightness': 20
        }
      ]
    },
    {
      'featureType': 'road.highway',
      'elementType': 'geometry.fill',
      'stylers': [
        {
          'color': '#ffffff'
        },
        {
          'lightness': 17
        }
      ]
    },
    {
      'featureType': 'road.highway',
      'elementType': 'geometry.stroke',
      'stylers': [
        {
          'color': '#ffffff'
        },
        {
          'lightness': 29
        },
        {
          'weight': 0.2
        }
      ]
    },
    {
      'featureType': 'road.arterial',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#ffffff'
        },
        {
          'lightness': 18
        }
      ]
    },
    {
      'featureType': 'road.local',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#ffffff'
        },
        {
          'lightness': 16
        }
      ]
    },
    {
      'featureType': 'poi',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#f5f5f5'
        },
        {
          'lightness': 21
        }
      ]
    },
    {
      'featureType': 'poi.park',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#dedede'
        },
        {
          'lightness': 21
        }
      ]
    },
    {
      'elementType': 'labels.text.stroke',
      'stylers': [
        {
          'visibility': 'on'
        },
        {
          'color': '#ffffff'
        },
        {
          'lightness': 16
        }
      ]
    },
    {
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'saturation': 36
        },
        {
          'color': '#333333'
        },
        {
          'lightness': 40
        }
      ]
    },
    {
      'elementType': 'labels.icon',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'featureType': 'transit',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#f2f2f2'
        },
        {
          'lightness': 19
        }
      ]
    },
    {
      'featureType': 'administrative',
      'elementType': 'geometry.fill',
      'stylers': [
        {
          'color': '#fefefe'
        },
        {
          'lightness': 20
        }
      ]
    },
    {
      'featureType': 'administrative',
      'elementType': 'geometry.stroke',
      'stylers': [
        {
          'color': '#fefefe'
        },
        {
          'lightness': 17
        },
        {
          'weight': 1.2
        }
      ]
    }
  ];

  //dataPicker
  model1 = {day: 0, year: 0, month: 0};
  model2 = {day: 0, year: 0, month: 0};
  mounth1: any;
  mounth2: any;
  enterDay: number;
  leaveDay: number;
  screenWidth: number = 1024;
  minDate = new Date();
  amountDaysInYour: number;

  //available
  adultsNumber: number = 1;
  childrenNumber: number = 0;
  roomsNumber: number = 1;
  //change languadge
  locale = 'ru';


  constructor(private _roomsParamService: RoomParamsService,
              private _router: Router,
              private localeService: BsLocaleService,
              private  _carrentLanguadgeService: CarrentLanguadgeService) {
    this.model1.day = new Date().getUTCDate();
    this.model1.month = new Date().getUTCMonth();
    this.model1.year = new Date().getUTCFullYear();
    this.model2.day = new Date().getUTCDate() + 1;
    this.model2.month = new Date().getUTCMonth();
    this.model2.year = new Date().getUTCFullYear();
    this.mounth1 = this.model1 ? this.model1.month : 'MM';
    this.mounth2 = this.model2 ? this.model2.month : 'MM';
  }

  findRoomByParams() {
    let roomsParams = new RoomsParams();
    roomsParams.dateFrom = this.objectDateToString(this.model1).toISOString().replace(/T.*/, '');
    roomsParams.dateTo = this.objectDateToString(this.model2).toISOString().replace(/T.*/, '');
    roomsParams.numbersOfRooms = this.roomsNumber;
    roomsParams.adults = this.adultsNumber;
    roomsParams.childrens = this.childrenNumber;
    this._roomsParamService.setRoomsParams(roomsParams);
    this._router.navigateByUrl('available-rooms');
  }

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

  onChoseLocation(event) {
    console.log(event);
  }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
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

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenWidth = window.innerWidth;
  }

  changL(){
    if(this._carrentLanguadgeService.getCarrentLanguadge() === 'uk'){
      this.locale = 'ru';
    }else{
      this.locale = this._carrentLanguadgeService.getCarrentLanguadge();
    }
    this.localeService.use(this.locale);
  }

}
