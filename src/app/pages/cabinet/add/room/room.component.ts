import {Component, OnInit} from '@angular/core';
import {Amenity} from '../../../../../shared/models/amenity';
import {RoomDescription} from '../../../../../shared/models/room-description';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Room} from '../../../../../shared/models/room';
import {AmenityService} from '../../../../../shared/service/amenity.service';
import {RoomService} from '../../../../../shared/service/room.service';
import {RoomService as PaymentRoomService} from '../../../../../shared/service/payment/room.service';
import {isNullOrUndefined} from 'util';
import {Language} from '../../../../../shared/models/payment/language';
import {LanguageService} from '../../../../../shared/service/payment/language.service';

const languages = ['EN', 'PL', 'UK', 'RU'];


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  providers: [AmenityService, RoomService]
})
export class RoomComponent implements OnInit {

  defaultFormValue = {
    descriptions: [
      {language: 'EN', languageO: 'English', description: ''},
      {language: 'UK', languageO: 'Ukrainian', description: ''},
      {language: 'PL', languageO: 'Polish', description: ''},
      {language: 'RU', languageO: 'Russian', description: ''}
    ],
    kidsPlaces: 0,
    adultPlaces: 1,
    square: 20,
    amount: 1,
    amenities: [],
    type: 'NONE',
    price: 1,
    multipartFiles: null,
    priceThreePlaces: 0,
    priceFifthPlaces: 0
  };

  paymentRoomsForm: FormGroup = this._formBuilder.group({arr: this._formBuilder.array([])});

  room: Room = new Room();
  amenity: Amenity[];
  roomDescriptions: RoomDescription[] = [];
  image: string[] = [];
  roomForm: FormGroup;
  roomDescriptionForm: FormArray;
  appear: boolean = true;
  type: string;
  _languages: Language[] = [];

  constructor(
    private _amenityService: AmenityService,
    private _roomService: RoomService,
    private _paymentRoomService: PaymentRoomService,
    private _formBuilder: FormBuilder,
    private _languageService: LanguageService
  ) {
    this.room.amenities = [];
    this._amenityService.findAll().subscribe(next => {
      this.amenity = next;
      // console.log('amenity : ', next);
    });
    this.roomDescriptions = [new RoomDescription(), new RoomDescription(), new RoomDescription(), new RoomDescription()];
    this.type = 'none';
    this._languageService.findAll().subscribe(value => this._languages = value);
  }

  get paymentRoomsFormArray(): FormArray {
    return <FormArray>this.paymentRoomsForm.get('arr');
  }

  get seoForms() {
    return (<FormArray>this.roomForm.get('seos')).controls;
  }

  ngOnInit() {
    this.createRoomForm();
  }

  addPaymentRoomForm() {
    event.preventDefault();
    this.paymentRoomsFormArray.push(this._formBuilder.group({
      roomType: this._formBuilder.control(this.roomForm.getRawValue().type),
      name: this._formBuilder.control(''),
      roomNumber: this._formBuilder.control(''),
      additionalPlaces: this._formBuilder.control(''),
      image: this._formBuilder.control(''),
      // descriptions: this._formBuilder.array(this._languages.map(value => this._formBuilder.group({
      //   language: this._formBuilder.control(value),
      //   text: this._formBuilder.control('')
      // }))),
      price: this._formBuilder.control('')
    }));
  }

  removePaymentRoomForm(i: number) {
    event.preventDefault();
    this.paymentRoomsFormArray.removeAt(i);
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

  addRoom(form: HTMLFormElement) {
    this._roomService.save(this.room, form).subscribe(next => {
        // console.log(next);
        this.roomForm.reset(this.defaultFormValue);
        this.createFormArray();
        this.image = [];
        alert('Кімнату добавлено');
      },
      error => {
        console.log(error);
      });
    for (let one of <FormGroup[]>this.paymentRoomsFormArray.controls) {
      this._paymentRoomService.save(one.getRawValue()).subscribe(value => console.log(`payment room ${value} saved`));
    }
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

  validateImages(c: FormControl): { [key: string]: any } {
    return c.value == null || c.value.length == 0 ? {'required': true} : null;
  }

  validateType(c: FormControl): { [key: string]: any } {
    return c.value == 'NONE' || c.value == '' ? {'required': true} : null;
  }

  private createRoomForm() {
    this.createFormArray();
    this.roomForm = new FormGroup({
      kidsPlaces: new FormControl(0, [Validators.min(0), Validators.max(9), Validators.required]),
      adultPlaces: new FormControl(1, [Validators.min(1), Validators.max(9), Validators.required]),
      square: new FormControl(20, [Validators.min(10), Validators.max(150), Validators.required]),
      amount: new FormControl(1, [Validators.min(1), Validators.max(100), Validators.required]),
      price: new FormControl(1, [Validators.min(1), Validators.max(10000), Validators.required]),
      seos: this._formBuilder.array(languages.map(value =>
        this._formBuilder.group({
          language: this._formBuilder.control(value),
          keywords: this._formBuilder.control(''),
          description: this._formBuilder.control('')
        })
      )),
      amenities: new FormControl([]),
      priceThreePlaces: new FormControl(0, [Validators.min(0), Validators.max(10000), Validators.required]),
      priceFifthPlaces: new FormControl(0, [Validators.min(0), Validators.max(10000), Validators.required]),
      type: new FormControl('NONE', [Validators.required, this.validateType]),
      multipartFiles: new FormControl(null, [this.validateImages]),
      descriptions: this.roomDescriptionForm
    });
    this.roomForm.valueChanges.subscribe(value => {
      this.room = value;
      // console.log('room : ', this.room);
    });
    this.roomForm.get('type').valueChanges.subscribe(value => {
      for (let one of <FormGroup[]>this.paymentRoomsFormArray.controls) {
        one.patchValue({roomType: value});
      }
    });
  }

  private createFormArray() {
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
  }
}
