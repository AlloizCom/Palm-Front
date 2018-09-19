import {Component, OnInit} from '@angular/core';
import {RoomService} from '../../../../../shared/service/room.service';
import {RoomWithPrice} from '../../../../../shared/models/room-with-price';
import {RoomTariff} from '../../../../../shared/enum/room-tariff';
import {isNullOrUndefined} from 'util';

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
  rooms: RoomWithPrice[] = [];

  constructor(private _roomService: RoomService) {
    this._roomService.findAllRoomWithPrice().subscribe(next => {
      this.roomTariff = RoomTariff;
      for (let i of next) {
        if (typeof (i) != undefined && i != null) {
          this.rooms.push(i);
        }
      }
    }, err => {
      console.log(err);
    });
  }

  scroll(x: number) {
    let old = new RoomWithPrice();
    let _new = new RoomWithPrice();
    Object.assign(old,this.rooms[0]);
    Object.assign(_new,this.rooms[x]);
    this.first = old;
    this.second = this.roomTariff[old.type];
    this.third = old.price;
    this.rooms[0] = _new;
    this.rooms[x] = old;
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
