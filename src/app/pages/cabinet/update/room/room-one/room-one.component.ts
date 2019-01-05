import {Component, ElementRef, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Room} from '../../../../../../shared/models/room';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RoomService} from '../../../../../../shared/service/room.service';
import {ImagePipePipe} from '../../../../../../shared/pipe/pipe/image.pipe';
import {AmenityService} from '../../../../../../shared/service/amenity.service';
import {isNullOrUndefined} from 'util';
import {Amenity} from '../../../../../../shared/models/amenity';

const languages = ['EN', 'PL', 'UK', 'RU'];

@Component({
  selector: 'app-room-one',
  templateUrl: './room-one.component.html',
  styleUrls: ['./room-one.component.css'],
  providers: [RoomService, ImagePipePipe, AmenityService]
})
export class RoomOneComponent implements OnInit {


  roomForm: FormGroup = this._fb.group({
    id: this._fb.control(-1),
    type: this._fb.control('', [Validators.required]),
    amount: this._fb.control('', [Validators.required]),
    price: this._fb.control('', [Validators.required]),
    square: this._fb.control('', [Validators.required]),
    available: this._fb.control(false),
    adultPlaces: this._fb.control('', [Validators.required]),
    kidsPlaces: this._fb.control('', [Validators.required]),
    priceThreePlaces: this._fb.control('', [Validators.required]),
    priceFifthPlaces: this._fb.control('', [Validators.required]),
    amenities: this._fb.array([]),
    descriptions: this._fb.array(languages.map(value => this._fb.group({
      language: this._fb.control(value),
      description: this._fb.control('', [Validators.minLength(3), Validators.required])
    }))),
    description: this._fb.control('', [Validators.minLength(3), Validators.maxLength(255), Validators.required]),
    keywords: this._fb.control('', [Validators.minLength(3), Validators.maxLength(255), Validators.required]),
  });
  room: Room = new Room();
  img: string[] = [];
  start: boolean = false;
  image: string[] = [];
  appear: boolean = true;
  fileField: ElementRef;
  id: number = 0;
  availableAmenities: Amenity[] = [];

  // roomDescriptionForm: FormArray;

  constructor(private _router: ActivatedRoute,
              private _amenityService: AmenityService,
              private _roomService: RoomService,
              private _route: Router,
              private _fb: FormBuilder
  ) {
    this.id = _router.snapshot.params.id;
    this._roomService.findOne(_router.snapshot.params.id).subscribe(next => {
      console.log(next);
      this.room = next;
      for (let one of this.room.amenities)
        (<FormArray>this.roomForm.get('amenities')).push(this.newAmenForm(one));
      _amenityService.findAllAvailable().subscribe(value => {
        this.availableAmenities = value.filter(value1 => !this.room.amenities.find(value2 => value2.id == value1.id));
      });
      this.roomForm.patchValue(<any>next);
    }, err => {
      console.error(err);
    });
  }

  get descriptionForms() {
    return (<FormArray>this.roomForm.get('descriptions')).controls;
  }

  get amenities() {
    return (<FormArray>this.roomForm.get('amenities')).controls;
  }

  getControls(one: AbstractControl): AbstractControl[] {
    // console.log((<FormArray>one).controls);
    return (<FormArray>one).controls;
  }

  newAmenForm(amenity?: Amenity) {
    let ret = this._fb.group({
      id: this._fb.control(-1),
      available: this._fb.control(false),
      imagePath: this._fb.control(''),
      amenityNames: this._fb.array(languages.map(value => this._fb.group({
        id: this._fb.control(-1),
        available: this._fb.control(false),
        language: this._fb.control(value),
        name: this._fb.control('')
      })))
    });
    if (amenity)
      ret.patchValue(amenity);
    // console.log(ret, ret.getRawValue());
    return ret;
  }

  ngOnInit() {
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
    this._roomService.update(this.roomForm.getRawValue(), form).subscribe(next => {
      this.room = next;
      for (let one of this.room.amenities)
        (<FormArray>this.roomForm.get('amenities')).push(this.newAmenForm(one));
      this.roomForm.patchValue(<any>next);
      console.log(next);
      // for (let one of next.images){
      //   this.image.push(this._imagePipe.transform(one.path));
      // }
      this.fileField = null;
      alert('Кімнату оновлено');
      this._route.navigateByUrl('/cabinet/update/room');
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

  addAmenity(id: number) {
    let fg = this.availableAmenities.find(value => value.id == id);
    this.availableAmenities = this.availableAmenities.filter(value => value.id != fg.id);
    if (fg)
      (<FormArray>this.roomForm.get('amenities')).push(this.newAmenForm(fg));
  }

  deleteAmenity(id: number) {
    let fg: FormGroup = <FormGroup>this.amenities.find(value => value.get('id').value == id);
    console.log(this.amenities.indexOf(fg));
    (<FormArray>this.roomForm.get('amenities')).removeAt(this.amenities.indexOf(fg));
    if (fg) {
      this.availableAmenities.push(fg.getRawValue());
      // (<FormArray>this.roomForm.get('amenities')).push(this.newAmenForm(fg.getRawValue()));
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
