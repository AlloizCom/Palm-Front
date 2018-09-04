import {Component, OnInit} from '@angular/core';
import {isNullOrUndefined} from "util";
import {AmenityService} from "../../../../../shared/service/amenity.service";
import {Amenity} from "../../../../../shared/models/amenity";
import {ActivatedRoute, Router} from "@angular/router";
import {ImagePipePipe} from "../../../../../shared/pipe/pipe/image.pipe";

@Component({
  selector: 'app-amenity-one',
  templateUrl: './amenity-one.component.html',
  styleUrls: ['./amenity-one.component.css'],
  providers: [AmenityService, ImagePipePipe]
})
export class AmenityOneComponent implements OnInit {

  amenity: Amenity = new Amenity();
  image: string = '';
  appear: boolean = true;


  constructor(private _amenityService: AmenityService,
              private _router: ActivatedRoute,
              private _imagePipe: ImagePipePipe,
              private _route:Router) {
    _router.params.subscribe(next => {
      this._amenityService.findOne(next['id']).subscribe(next => {
        this.amenity = next;
        console.log(this.amenity);
        this.image = this._imagePipe.transform(next.imagePath);
      });
    });
  }

  ngOnInit() {
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

  update(form) {
    this._amenityService.update(this.amenity, form).subscribe(next => {
      this.amenity = next;
      console.log(next);
      this._route.navigateByUrl('/cabinet/update/amenity');
    }, error => {
      console.log(error);
    });
  }

  isNull(object: any): Boolean {
    if (Array.isArray(object)) {
      return !isNullOrUndefined(object[0]);
    } else {
      return !isNullOrUndefined(object);
    }
  }

}
