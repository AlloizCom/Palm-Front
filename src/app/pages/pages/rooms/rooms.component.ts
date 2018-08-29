import { Component, OnInit } from '@angular/core';
import {isNullOrUndefined} from "util";
import {RoomService} from "../../../shared/service/room.service";
import {Room} from "../../../shared/models/room";

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
  providers:[RoomService]
})
export class RoomsComponent implements OnInit {


  rooms: Room[] = [];

  constructor(private _roomService: RoomService) {
    this._roomService.findAllAvailable().subscribe(next => {
      for (let i of next) {
        if (typeof (i) != 'undefined' && i != null) {
          this.rooms.push(i);
        }
      }

      this.rooms = next;
      console.log(this.rooms);
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
