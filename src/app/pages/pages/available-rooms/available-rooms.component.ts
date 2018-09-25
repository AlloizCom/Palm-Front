import {Component, OnInit} from '@angular/core';
import {RoomTariff} from "../../../../shared/enum/room-tariff";
import {RoomService} from "../../../../shared/service/room.service";
import {RoomsParams} from "../../../../shared/models/rooms-params";
import {RoomWithPrice} from "../../../../shared/models/room-with-price";
import {isNullOrUndefined} from "util";
import {RoomParamsService} from "../../../../shared/service/room-params.serive";
import {TariffService} from "../../../../shared/service/tariff.service";
import {Room} from '../../../../shared/models/room';

@Component({
  selector: 'app-available-rooms',
  templateUrl: './available-rooms.component.html',
  styleUrls: ['./available-rooms.component.css'],
  providers: [RoomService, TariffService]
})
export class AvailableRoomsComponent implements OnInit {

  roomTariff: any;
  rooms: RoomWithPrice[] = [];
  roomsParams: RoomsParams;
  room: Room[];

  constructor(private _roomService: RoomService,
              private _tariffService: TariffService,
              private _roomsParamsService: RoomParamsService) {
    this.getRoomsParams();

    if (this.roomsParams) {
      // console.log("Params for rooms");
      console.log(this.roomsParams);
      _roomService.findRoomByParams(this.roomsParams).subscribe(next => {
        this.roomTariff = RoomTariff;
        for (let j of next) {
          if (typeof (j) != 'undefined' && j != null) {
            this.rooms.push(j);
          }
        }
        // console.log(this.rooms);
      }, err => {
        console.log(err);
      });
    }
    this._roomService.findAllRoomWithPrice().subscribe(next => {
      this.room = next;
    });
  }

  getRoomsParams() {
    this.roomsParams = this._roomsParamsService.params;
    // this._roomsParamsService.setRoomsParams(null);
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
  //
  // isNoParams(){
  //   if(room)
  // }

}
