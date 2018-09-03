import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Room} from "../../../../../shared/models/room";
import {RoomService} from "../../../../../shared/service/room.service";
import {ImagePipePipe} from "../../../../../shared/pipe/pipe/image.pipe";
import {AmenityService} from "../../../../../shared/service/amenity.service";
import {Amenity} from "../../../../../shared/models/amenity";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-room-one',
  templateUrl: './room-one.component.html',
  styleUrls: ['./room-one.component.css'],
  providers:[RoomService, ImagePipePipe, AmenityService]
})
export class RoomOneComponent implements OnInit {


  room: Room = new Room();
  img: string[] =[];
  start: boolean = false;
  image:string[] = [];
  appear: boolean = true;

  constructor(private _router: ActivatedRoute,private _amenityService:AmenityService, private _roomService: RoomService, private _imagePipe: ImagePipePipe) {
    _router.params.subscribe(next => {
      _roomService.findOne(next['id']).subscribe(next => {
        this.room = next;
        console.log(this.room);
        this.start = true;
        this.img = _imagePipe.transform(next.images[0].path);
      });
    });
  }

  ngOnInit() {
  }

  delete(id,id2) {
    this._roomService.deleteImage(id,id2).subscribe(next => {
      this.room.images.splice(this.room.images.indexOf(next), 1);
      console.log(this.room.images)
    }, error => {
      console.log(error);
    });
  }

  update(form) {
    this._roomService.update(this.room, form).subscribe(next => {
      this.room = next;
      console.log(next)
      this.img = [];
      this.img.push(this._imagePipe.transform(next.images[0].path))
     this.img[0] = this._imagePipe.transform(next.images[0].path);
    }, error => {
      console.log(error);
    });
  }


  readUrl(event: any) {
    if (event.target.files) {
      this.image = [];
      for (let i = 0; i < event.target.files.length; i++) {
        if (event.target.files[i]) {
          let reader = new FileReader();
          reader.onload = (event: any) => {
            this.image.push(event.target.result);
          };
          reader.readAsDataURL(event.target.files[i]);
        }
      }
    }
  }

  toggle() {
    this.appear = false;
  }

  isNull(object: any): Boolean {
    if (Array.isArray(object)) {
      return !isNullOrUndefined(object[0]);
    } else {
      return !isNullOrUndefined(object);
    }
  }

}
