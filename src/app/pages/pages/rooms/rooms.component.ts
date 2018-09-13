import {Component, OnInit} from '@angular/core';
import {isNullOrUndefined} from 'util';
import {RoomService} from '../../../shared/service/room.service';
import {TariffService} from '../../../shared/service/tariff.service';
import {RoomTariff} from '../../../shared/enum/room-tariff';
import {RoomWithPrice} from '../../../shared/models/room-with-price';
import {RoomParamsService} from "../../../shared/service/room-params.serive";
import {RoomsParams} from "../../../shared/models/rooms-params";

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
  providers: [RoomService, TariffService]
})
export class RoomsComponent implements OnInit {

  roomTariff: any;
  rooms: RoomWithPrice[] = [];
  roomsParams: RoomsParams;

  constructor(private _roomService: RoomService,
              private _tariffService: TariffService,
              private _roomsParamsService: RoomParamsService
  ) {
    this.getRoomsParams();

    //   NEED TO COMPLETE

    if(this.roomsParams){
      console.log("Params for rooms");
      console.log(this.roomsParams);
      _roomService.findRoomByParams(this.roomsParams).subscribe(next => {
        this.roomTariff = RoomTariff;
        for (let j of next) {
          if (typeof (j) != 'undefined' && j != null) {
            this.rooms.push(j);
          }
        }
        console.log(this.rooms);
      }, err => {
        console.log(err);
      });
    }else{
      console.log("No params for room");
      this._roomService.findAllRoomWithPrice().subscribe(next => {
        this.roomTariff = RoomTariff;
        for (let i of next) {
          if (typeof (i) != 'undefined' && i != null) {
            this.rooms.push(i);
          }
        }

        console.log(this.rooms);
      }, err => {
        console.log(err);
      });
    }




  }

  ngOnInit() {

  }

  getRoomsParams(){
    this.roomsParams = this._roomsParamsService.params;
    this._roomsParamsService.setRoomsParams(null);
  }


  isNull(object: any): Boolean {
    if (Array.isArray(object)) {
      return !isNullOrUndefined(object[0]);
    } else {
      return !isNullOrUndefined(object);
    }
  }

}
