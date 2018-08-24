import { Component, OnInit } from '@angular/core';
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
  amenityNames: AmenityName[] =[];
  image: string ='';
  available: boolean =true;
  appear: boolean = false;
  allAmenities: Amenity[] =[];


  constructor(private _amenityService: AmenityService) {
    let amen = new AmenityName();
    amen.language = '';
    for(let i=0; i<4; i++){
      this.amenity.amenityNames.push(amen);
      console.log(this.amenity.amenityNames[i].language);
    }
  }

  ngOnInit() {
    this.amenityForm = new FormGroup({
      nameEn: new FormControl('', [Validators.required]),
      nameUk: new FormControl('', [Validators.required]),
      namePl: new FormControl('', [Validators.required]),
      nameRu: new FormControl('', [Validators.required])
    });
    this.amenityForm.valueChanges.subscribe(value => {
      console.log(value);
    });
  }
  addName(name: string, index: number) {
    switch (index) {
      case 0: {
        this.amenity.amenityNames[index].language = 'EN';
        this.amenity.amenityNames[index].name = name;
        break;
      }
      case 1: {
        this.amenity.amenityNames[index].language = 'UK';
        this.amenity.amenityNames[index].name = name;
        break;
      }
      case 2: {
        this.amenity.amenityNames[index].language = 'PL';
        this.amenity.amenityNames[index].name = name;
        break;
      }
      case 3: {
        this.amenity.amenityNames[index].language = 'RU';
        this.amenity.amenityNames[index].name = name;
        break;
      }
    }
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
            this.getAmenity();
          });
  }

  getAmenity(){
      this._amenityService.findAll().subscribe(next=>{
        this.allAmenities=next;
        console.log(next);
      })


  }

}
