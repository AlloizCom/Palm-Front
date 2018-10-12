import {Component, OnInit} from '@angular/core';
import {isNullOrUndefined} from 'util';
import {RoomService} from '../../../../shared/service/room.service';
import {TariffService} from '../../../../shared/service/tariff.service';
import {RoomTariff} from '../../../../shared/enum/room-tariff';
import {RoomWithPrice} from '../../../../shared/models/room-with-price';
import {Router} from "@angular/router";
import {ScrollToService} from "ng2-scroll-to-el";
import {RoomIdService} from "../../../../shared/service/room-id.service";

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
  providers: [RoomService, TariffService, ScrollToService]
})
export class RoomsComponent implements OnInit {

  roomTariff: any;
  rooms: RoomWithPrice[] = [];

  constructor(private _roomService: RoomService,
              private _tariffService: TariffService,
              private _router: Router,
              private _roomIdService: RoomIdService
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
      this.sortRooms();
    }, err => {
      console.log(err);
    });


  }

  ngOnInit() {
    // window.scrollTo({
    //   top: 70,
    //   behavior: "smooth"
    // });
  }

  // scrollPoint(element: any){
  //   console.log(element);
  //   document.getElementById(element).scrollIntoView({
  //     behavior: "smooth"
  //   });
  // }

  scrollToId() {
    if (!isNullOrUndefined(this._roomIdService.id)) {
      console.log(this._roomIdService.id);
      document.getElementById(this._roomIdService.id).scrollIntoView({
        block:    "end"
      });
      this._roomIdService.setId(null);
    }
  }

  goToRoom(id: number) {
    this._router.navigateByUrl('/rooms-booking/' + id);
    this._roomIdService.setId('some' + id);
    window.scroll(0, 0);
  }

  sortRooms() {
    this.rooms.sort(function (a, b) {
      let roomTypes = ['STANDARD', 'STANDARD_IMPROVED', 'SUPERIOR',
        'SUPERIOR_IMPROVED', 'DELUXE'];
      return roomTypes.indexOf(a.type) - roomTypes.indexOf(b.type);
    });
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
