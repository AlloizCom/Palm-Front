import {Component, OnInit} from '@angular/core';
import {Amenity} from '../../../../shared/models/amenity';
import {AmenityName} from '../../../../shared/models/amenity-name';
import {AmenityService} from '../../../../shared/service/amenity.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-amenity-name',
  templateUrl: './amenity-name.component.html',
  styleUrls: ['./amenity-name.component.css'],
  providers: [AmenityService]
})
export class AmenityNameComponent implements OnInit {

  amenityForm: FormGroup;
  amenity: Amenity = new Amenity();
  amenityNames: AmenityName[] = [];
  image: string = '';
  available: boolean = true;
  appear: boolean = false;
  allAmenities: Amenity[] = [];


  constructor(private _amenityService: AmenityService) {
    this.amenityNames = new Array(4);
    this.amenityNames = [new AmenityName(), new AmenityName(), new AmenityName(), new AmenityName()];
    this.amenity.amenityNames = this.amenityNames;
  }

  ngOnInit() {
    this.amenityForm = new FormGroup({
      nameEn: new FormControl('', [Validators.required, Validators.minLength(3)]),
      nameUk: new FormControl('', [Validators.required, Validators.minLength(3)]),
      namePl: new FormControl('', [Validators.required, Validators.minLength(3)]),
      nameRu: new FormControl('', [Validators.required, Validators.minLength(3)]),
      multipartFile: new FormControl(null, [this.validateImages]),

    });
    this.amenityForm.valueChanges.subscribe(value => {
      this.amenity.amenityNames[0].language = 'EN';
      this.amenity.amenityNames[0].name = value.nameEn;
      this.amenity.amenityNames[1].language = 'UK';
      this.amenity.amenityNames[1].name = value.nameUk;
      this.amenity.amenityNames[2].language = 'PL';
      this.amenity.amenityNames[2].name = value.namePl;
      this.amenity.amenityNames[3].language = 'RU';
      this.amenity.amenityNames[3].name = value.nameRu;
    });
  }

  readUrl(event: any) {
    this.appear = false;
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.image = event.target.result;
        this.appear = true;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  addAmenity(form: HTMLFormElement) {
    this._amenityService.save(this.amenity, form).subscribe(next => {
      console.log(next);
    }, error => {
      console.log(error);
    }, () => {
      this.image = null;
      form.reset();
      // this.getAmenity();
    });
  }

  getAmenity() {
    this._amenityService.findAll().subscribe(next => {
      this.allAmenities = next;
    })


  }

  validateImages(c: FormControl): { [key: string]: any } {
    console.log(c.value);
    return c.value == null || c.value.length == 0 ? {"required": true} : null;
  }

}
