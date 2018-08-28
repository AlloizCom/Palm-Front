import { Component, OnInit } from '@angular/core';
import {ImagePipePipe} from "../../../shared/pipe/pipe/image.pipe";
import {Service} from "../../../shared/models/service";
import {ServiceService} from "../../../shared/service/service.service";
import {ActivatedRoute} from "@angular/router";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
  providers: [ImagePipePipe]
})
export class ServiceComponent implements OnInit {

  service: Service;
  id: number;
  img: string = '';

  constructor(private _serviceService: ServiceService,
              private _imagePipe: ImagePipePipe,
              private _router: ActivatedRoute) {
    // this.service.serviceDescriptions = [];
    this._router.params.subscribe(next =>{
      this._serviceService.findOneAvailable(next['id']).subscribe(next => {
        this.service = next;
        this.id = next['id'];
        this.img= this._imagePipe.transform(next.image);
        console.log(this.service) ;
      }, err => {
        console.log(err);
      });
    }, err => {
      console.log(err);
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
}
