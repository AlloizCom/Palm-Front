import { Component, OnInit } from '@angular/core';
import {Amenity} from '../../../../shared/models/amenity';
import {RoomDescription} from '../../../../shared/models/room-description';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Room} from '../../../../shared/models/room';
import {AmenityService} from '../../../../shared/service/amenity.service';
import {RoomService} from '../../../../shared/service/room.service';
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  providers: [AmenityService, RoomService]
})
export class RoomComponent implements OnInit {


  room: Room;
  amenity: Amenity[];
  roomDescriptions: RoomDescription[]=[];
  image: string[] =[];
  roomForm: FormGroup;
  appear: boolean = true;


  constructor( private _amenityService: AmenityService, private _roomService: RoomService) {
    this.roomDescriptions = [ new RoomDescription(),new RoomDescription(),new RoomDescription(),new RoomDescription()];
    this._amenityService.findAll().subscribe(next=>{
    this.amenity = next;

})
  }

  ngOnInit() {
    this.roomForm =new FormGroup({
      childrenPlaces: new FormControl(0, [Validators.min(0), Validators.max(9)] ),
      adultPlaces: new FormControl(0, [Validators.min(1), Validators.max(9)]),
      square: new FormControl( 0, [Validators.min(10), Validators.max(150)]),
      amount: new FormControl(1, [Validators.min(1), Validators.max(100)]),
      descriptionEn: new FormControl('', Validators.required),
      descriptionUk: new FormControl('', Validators.required),
      descriptionPl: new FormControl('', Validators.required),
      descriptionRu: new FormControl('', Validators.required)
    })
    this.roomForm.valueChanges.subscribe(value => {



    })
  };


  readUrl(event: any) {
    for (let i = 0; i < event.target.files.length; i++) {
      if (event.target.files && event.target.files[i]) {
        let reader = new FileReader();
        reader.onload = (event: any) => {
          this.image.push(event.target.result);
        };
        reader.readAsDataURL(event.target.files[i]);
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
  changeAmen(value){
    console.log(value);
  }

}
