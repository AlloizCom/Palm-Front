import {Component, OnInit} from '@angular/core';
import {isNullOrUndefined} from 'util';
import {RoomService} from '../../../../shared/service/room.service';
import {TariffService} from '../../../../shared/service/tariff.service';
import {RoomTariff} from '../../../../shared/enum/room-tariff';
import {RoomWithPrice} from '../../../../shared/models/room-with-price';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
  providers: [RoomService, TariffService]
})
export class RoomsComponent implements OnInit {

  roomTariff: any;
  rooms: RoomWithPrice[] = [];

  constructor(private _roomService: RoomService,
              private _tariffService: TariffService
  ) {
    this._roomService.findAllRoomWithPrice().subscribe(next => {
      console.log(this.rooms);
      this.roomTariff = RoomTariff;
      for (let i of next) {
        if (typeof (i) != 'undefined' && i != null) {
          this.rooms.push(i);
          console.log(this.rooms);
        }
      }
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

}
