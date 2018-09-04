import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Service} from "../../../../../shared/models/service";
import {ServiceService} from "../../../../../shared/service/service.service";
import {ImagePipePipe} from "../../../../../shared/pipe/pipe/image.pipe";

@Component({
  selector: 'app-services-one',
  templateUrl: './services-one.component.html',
  styleUrls: ['./services-one.component.css'],
  providers: [ServiceService, ImagePipePipe]
})
export class ServicesOneComponent implements OnInit {

  services: Service = new Service();
  img: string = '';
  appear: boolean = true;

  constructor(private _router: ActivatedRoute, private _serviceService: ServiceService, private _imagePipe: ImagePipePipe) {
    _router.params.subscribe(next => {
      _serviceService.findOne(next['id']).subscribe(next => {
        this.services = next;
        console.log(next);
        this.img = this._imagePipe.transform(next.picturePath);
        console.log("tyt1" + this.img)
      })
    })
  }


  readUrl(event: any) {
    this.appear = false;
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.img = event.target.result;
        this.appear = true;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  ngOnInit() {
  }

  update(form) {
    console.log(this.services);
    this._serviceService.update(this.services, form).subscribe(next => {
      this.services = next;
      console.log("tyt3" + this.img)
    }, error => {
      console.log(error);
    })
  }
}
