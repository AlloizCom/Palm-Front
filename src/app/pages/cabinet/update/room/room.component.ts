import { Component, OnInit } from '@angular/core';
import {RoomService} from "../../../../shared/service/room.service";
import {Room} from "../../../../shared/models/room";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  providers:[RoomService]
})
export class RoomComponent implements OnInit {

  room: Room[]=[];
  constructor(private _roomService:RoomService) {
    _roomService.findAll().subscribe(next=>{
        this.room=next;
        console.log(next)
      }
    )
  }


  ngOnInit() {
  }



}
