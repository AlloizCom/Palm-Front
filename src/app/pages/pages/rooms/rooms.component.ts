import {Component, OnInit} from '@angular/core';
import {isNullOrUndefined} from 'util';
import {RoomService} from '../../../../shared/service/room.service';
import {TariffService} from '../../../../shared/service/tariff.service';
import {roomTariff} from '../../../../shared/enum/room-tariff';
import {Router} from '@angular/router';
import {ScrollToService} from 'ng2-scroll-to-el';
import {RoomIdService} from '../../../../shared/service/room-id.service';
import {BrowserCheckService} from '../../../shared/service/browser-check.service';
import {Room} from '../../../../shared/models/room';
import {Language} from '../../../../shared/enum/language';
import {CurrentLanguageService} from '../../../../shared/service/current-language.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
  providers: [RoomService, TariffService, ScrollToService]
})
export class RoomsComponent implements OnInit {

  roomTariff: any;
  // rooms: RoomWithPrice[] = [];
  rooms: Room [] = [];
  isBrowser = false;
  currentLanguage: Language;

  constructor(
    private _roomService: RoomService,
    private _tariffService: TariffService,
    private _router: Router,
    private _roomIdService: RoomIdService,
    private _browserCheck: BrowserCheckService,
    private _currentLanguageService: CurrentLanguageService,
  ) {
    this.currentLanguage = this._currentLanguageService.currentLanguage;
    this._currentLanguageService.currentLanguage$.subscribe(value => {
      this.currentLanguage = value;
    });
    this.isBrowser = this._browserCheck.isBrowser();
    this.roomTariff = roomTariff;
    // this._roomService.findAllRoomWithPrice().subscribe(next => {
    this._roomService.findAllAvailableSplit().subscribe(next => {
      this.rooms = next;
      // this.rooms.forEach(value => value.descriptions.forEach(value1 => value1.description.substring(0,25)));
      console.log(this.rooms);
      this.sortRooms();
    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {

  }

  goTop() {
    window.scrollTo(0, 0);
  }

  scrollToId() {
    if (!isNullOrUndefined(this._roomIdService.id)) {
      console.log(this._roomIdService.id);
      document.getElementById(this._roomIdService.id).scrollIntoView({
        block: 'end'
      });
      this._roomIdService.setId(null);
    }
  }

  saveRoomId(id: number) {
    this._roomIdService.setId('roomIdForStoring' + id);
    if (this.isBrowser)
      window.scroll(0, 0);
  }

  sortRooms() {
    this.rooms.sort(function (a, b) {
      let roomTypes = ['STANDARD', 'STANDARD_IMPROVED', 'SUPERIOR',
        'SUPERIOR_IMPROVED', 'DELUXE'];
      return roomTypes.indexOf(a.type) - roomTypes.indexOf(b.type);
    });

    if (this.isBrowser)
      setTimeout(() => {
        this.scrollToId();
      }, 1);
  }

  isNull(object: any): Boolean {
    if (Array.isArray(object)) {
      return !isNullOrUndefined(object[0]);
    } else {
      return !isNullOrUndefined(object);
    }
  }

}
