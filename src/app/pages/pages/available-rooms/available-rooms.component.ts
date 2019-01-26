import {Component, OnInit} from '@angular/core';
import {roomTariff} from '../../../../shared/enum/room-tariff';
import {RoomService} from '../../../../shared/service/room.service';
import {RoomsParams} from '../../../../shared/models/rooms-params';
import {RoomWithPrice} from '../../../../shared/models/room-with-price';
import {isNullOrUndefined} from 'util';
import {RoomParamsService} from '../../../../shared/service/room-params.serive';
import {TariffService} from '../../../../shared/service/tariff.service';
import {Router} from '@angular/router';
import {RoomType} from '../../../../shared/models/room-type';

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
  roomTypes: string[] = [];

  constructor(private _roomService: RoomService,
              private _tariffService: TariffService,
              private _roomsParamsService: RoomParamsService,
              private _router: Router) {
    this.getRoomsParams();

    if (this.roomsParams) {
      // console.log("Params for rooms");
      console.log(this.roomsParams);
      _roomService.findRoomByParams(this.roomsParams).subscribe(next => {
        this.roomTariff = roomTariff;
        for (let j of next) {
          if (typeof (j) != 'undefined' && j != null) {
            console.log(j.type);
            this.rooms.push(j);
          }
        }
        this.sortRooms();
      }, err => {
        console.log(err);
      });


      console.log(this.rooms);
    }

  }

  sortRooms() {
    this.rooms.sort(function (a, b) {
      let roomTypes = ['STANDARD', 'STANDARD_IMPROVED', 'SUPERIOR',
        'SUPERIOR_IMPROVED', 'DELUXE'];
      return roomTypes.indexOf(a.type) - roomTypes.indexOf(b.type);
    });
  }


  getRoomsParams() {
    this.roomsParams = this._roomsParamsService.params;
    // this._roomsParamsService.setRoomsParams(null);
  }

  ngOnInit() {
  }

  chooseNumber(roomType: RoomType, id: number) {
    this.roomsParams.roomType = roomType;
    this._roomsParamsService.setRoomsParams(this.roomsParams);
    this._router.navigateByUrl('/available-rooms/room/' + id);
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
