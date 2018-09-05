import { Component, OnInit } from '@angular/core';
import {RoomService} from "../../../../shared/service/room.service";
import {Room} from "../../../../shared/models/room";
import {isNullOrUndefined, isUndefined} from "util";
import {Image} from "../../../../shared/models/image";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  providers:[RoomService]
})
export class RoomComponent implements OnInit {

  room: Room[]=[];
  image: Image;

  constructor(private _roomService:RoomService) {
    _roomService.findAll().subscribe(next=>{
        this.room=next;
        console.log(next);
      }
    )
  }


  ngOnInit() {
  }

  deleteRoom(i){
    this._roomService.delete(i).subscribe(next =>{
      this._roomService.findAll().subscribe(value => {
        this.room = value;
        console.log(value);
      });
    }), error => {
      console.log(error);
    }
  }

  isNull(object: any): Boolean {
    if (Array.isArray(object)) {
      return !isNullOrUndefined(object[0]);
    } else {
      return !isNullOrUndefined(object);
    }
  }


}
