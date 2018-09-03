import {Component, OnInit} from '@angular/core';
import {Amenity} from '../../../../shared/models/amenity';
import {RoomDescription} from '../../../../shared/models/room-description';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Room} from '../../../../shared/models/room';
import {AmenityService} from '../../../../shared/service/amenity.service';
import {RoomService} from '../../../../shared/service/room.service';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  providers: [AmenityService, RoomService]
})
export class RoomComponent implements OnInit {


  room: Room = new Room();
  amenity: Amenity[];
  roomDescriptions: RoomDescription[] = [];
  image: string[] = [];
  roomForm: FormGroup;
  roomDescriptionForm: FormArray;
  appear: boolean = true;
  type: string;

  constructor(private _amenityService: AmenityService, private _roomService: RoomService) {
    this.room.amenities = [];
    this._amenityService.findAll().subscribe(next => {
      this.amenity = next;
      // console.log('amenity : ', next);
    });
    this.roomDescriptions = [new RoomDescription(), new RoomDescription(), new RoomDescription(), new RoomDescription()];
    this.type = 'none';
  }

  ngOnInit() {
    this.createRoomForm();
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

  changeAmen(value) {
    this.type = value;
  }

  addRoom(form: HTMLFormElement) {
    // console.log((<HTMLInputElement>form.elements.item(19)).files);
    this._roomService.save(this.room, form).subscribe(next => {
        console.log(next);
        this.roomForm.reset();
        this.image=[];
      },
      error => {
        console.log(error);
      });
  }

  addAmenity(amenity: Amenity) {
    let amenities = (<Room>this.roomForm.getRawValue()).amenities;
    if (amenities.find(value => value.id == amenity.id)) {
      amenities = amenities.filter(value => value.id != amenity.id);
    } else {
      amenities.push(amenity);
    }
    this.roomForm.patchValue({amenities: amenities});
  }

  private createRoomForm() {
    this.roomDescriptionForm = new FormArray([
      new FormGroup({
        language: new FormControl('EN'),
        description: new FormControl('',[Validators.min(3),Validators.required])
      }),
      new FormGroup({
        language: new FormControl('UK'),
        description: new FormControl('',[Validators.min(3)])
      }),
      new FormGroup({
        language: new FormControl('PL'),
        description: new FormControl('',[Validators.min(3)])
      }),
      new FormGroup({
        language: new FormControl('RU'),
        description: new FormControl('',[Validators.min(3)])
      }),
    ]);
    this.roomForm = new FormGroup({
      kidsPlaces: new FormControl(0, [Validators.min(0), Validators.max(9)]),
      adultPlaces: new FormControl(0, [Validators.min(1), Validators.max(9)]),
      square: new FormControl(0, [Validators.min(10), Validators.max(150)]),
      amount: new FormControl(1, [Validators.min(1), Validators.max(100)]),
      amenities: new FormControl([]),
      descriptions: this.roomDescriptionForm
    });
    this.roomForm.valueChanges.subscribe(value => {
      this.room = value;
      this.room.type = this.type;
      console.log('room : ', this.room);
    });
  }
}
