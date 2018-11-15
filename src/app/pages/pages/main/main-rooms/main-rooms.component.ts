import {Component, OnInit} from '@angular/core';
import {RoomService} from '../../../../../shared/service/room.service';
import {RoomWithPrice} from '../../../../../shared/models/room-with-price';
import {roomTariff} from '../../../../../shared/enum/room-tariff';
import {isNullOrUndefined} from 'util';
import {Room} from "../../../../../shared/models/room";

@Component({
  selector: 'app-main-rooms',
  templateUrl: './main-rooms.component.html',
  styleUrls: ['./main-rooms.component.css'],
  providers: [RoomService]
})
export class MainRoomsComponent implements OnInit {
  first;
  second;
  third;
  roomTariff: any;
  rooms: Room[] = [];
  timedscroll;

  constructor(private _roomService: RoomService) {
    this._roomService.findAllAvailable().subscribe(next => {
      this.roomTariff = roomTariff;
      for (let i of next) {
        if (typeof (i) != undefined && i != null) {
          this.rooms.push(i);
        }
      }
      this.timedscroll = setTimeout(() => {
        this.scroll(this.currentI++);
      }, 3000);
    }, err => {
      console.log(err);
    });
  }

  private _currentI = 1;

  get currentI(): number {
    return this._currentI;
  }

  set currentI(value: number) {
    if (value > 4) {
      this._currentI = 1;
      return;
    } else if (value < 1) {
      this._currentI = 4;
      return;
    }
    this._currentI = value;
  }

  scroll(x: number) {
    clearTimeout(this.timedscroll);
    if (x < 0) {
      if (x == -1)
        this.scroll(this.currentI++);
      else
        this.scroll(this.currentI--);
      return;
    }
    let old = new Room();
    let _new = new Room();
    Object.assign(old, this.rooms[0]);
    Object.assign(_new, this.rooms[x]);
    this.first = old;
    this.second = this.roomTariff[old.type];
    this.third = old.price;
    this.rooms[0] = _new;
    this.rooms[x] = old;
    this.timedscroll = setTimeout(() => {
      this.scroll(this.currentI++);
    }, 3000);
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

}
