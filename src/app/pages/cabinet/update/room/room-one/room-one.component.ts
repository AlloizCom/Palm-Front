import {Component, ElementRef, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Room} from "../../../../../../shared/models/room";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RoomService} from "../../../../../../shared/service/room.service";
import {ImagePipePipe} from "../../../../../../shared/pipe/pipe/image.pipe";
import {AmenityService} from "../../../../../../shared/service/amenity.service";
import {isNullOrUndefined} from "util";


@Component({
  selector: 'app-room-one',
  templateUrl: './room-one.component.html',
  styleUrls: ['./room-one.component.css'],
  providers: [RoomService, ImagePipePipe, AmenityService]
})
export class RoomOneComponent implements OnInit {


  roomForm: FormGroup;
  room: Room = new Room();
  img: string[] = [];
  start: boolean = false;
  image: string[] = [];
  appear: boolean = true;
  fileField: ElementRef;
  id: number = 0;
  roomDescriptionForm: FormArray;

  constructor(private _router: ActivatedRoute,
              private _amenityService: AmenityService,
              private _roomService: RoomService,
              private _route: Router) {
    _router.params.subscribe(next => {
      this.id = next['id'];
    });
  }

  ngOnInit() {
    this.roomDescriptionForm = new FormArray([
      new FormGroup({
        language: new FormControl('EN'),
        languageO: new FormControl('Англійська'),
        description: new FormControl('', [Validators.minLength(3), Validators.required])
      }),
      new FormGroup({
        language: new FormControl('UK'),
        languageO: new FormControl('Українська'),
        description: new FormControl('', [Validators.minLength(3), Validators.required])
      }),
      new FormGroup({
        language: new FormControl('PL'),
        languageO: new FormControl('Польська'),
        description: new FormControl('', [Validators.minLength(3), Validators.required])
      }),
      new FormGroup({
        language: new FormControl('RU'),
        languageO: new FormControl('Російська'),
        description: new FormControl('', [Validators.minLength(3), Validators.required])
      }),
    ]);
    console.log(this.fileField);
    this.roomForm = new FormGroup({
      id: new FormControl(),
      type: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      square: new FormControl('', [Validators.required]),
      available: new FormControl(),
      adultPlaces: new FormControl('', [Validators.required]),
      kidsPlaces: new FormControl('', [Validators.required]),
      amenities:new FormControl(''),
      descriptions: this.roomDescriptionForm,


    });
    this._roomService.findOne(this.id).subscribe(next => {
      console.log(next);
      this.room = next;
      this.roomForm.patchValue(<any>next);
    }, err => {
      console.error(err);
    });
  }

  delete(roomId, imageId, image) {
    console.log(this.room);
    console.log('roomId - ' + roomId);
    console.log('imageId - ' + imageId);
    this._roomService.deleteImage(roomId, imageId).subscribe(next => {
      console.log(next);

      this.room.images.splice(this.room.images.indexOf(image), 1);
      this.image.splice(this.room.images.indexOf(image), 1);

      // console.log(this.room.images)
    }, error => {
      console.log(error);
    });
  }

  update(form) {
    console.log('form ; ', this.roomForm.getRawValue());
    this._roomService.update(this.roomForm.getRawValue(), this.image.length>0? form:null).subscribe(next => {
      this.room = next;
      this.roomForm.patchValue(<any>next);
      console.log(next);
      // for (let one of next.images){
      //   this.image.push(this._imagePipe.transform(one.path));
      // }
      this.fileField = null;
      alert("Кімнату оновлено");
      this._route.navigateByUrl("/cabinet/update/room");
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

  // toggle() {
  //   this.appear = false;
  // }

  isNull(object: any): Boolean {
    if (Array.isArray(object)) {
      return !isNullOrUndefined(object[0]);
    } else {
      return !isNullOrUndefined(object);
    }
  }

}
