import { Component, OnInit } from '@angular/core';
import {Amenity} from "../../../../shared/models/amenity";
import {Image} from "../../../../shared/models/image";
import {AmenityService} from "../../../../shared/service/amenity.service";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-amenity',
  templateUrl: './amenity.component.html',
  styleUrls: ['./amenity.component.css'],
  providers: [AmenityService]
})
export class AmenityComponent implements OnInit {

  amenities: Amenity[] = [];
  image: Image;
  start: boolean = false;

  constructor(private _amenityService: AmenityService) {
    this._amenityService.findAll().subscribe(next => {
      this.amenities = next;
      this.start = true;
      console.log(next);
    });
  }

  ngOnInit() {
  }

  isNull(object: any): Boolean {
    if (Array.isArray(object)) {
      return !isNullOrUndefined(object[0]);
    } else {
      return !isNullOrUndefined(object);
    }
  }

  deleteAmenity(i){
    this._amenityService.delete(i).subscribe(next =>{
      this._amenityService.findAll().subscribe(value => {
        this.amenities = value;
        console.log(value);
      });
    }), error => {
      console.log(error);
    }
  }
}
