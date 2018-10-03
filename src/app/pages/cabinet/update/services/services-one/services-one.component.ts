import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Service} from "../../../../../../shared/models/service";
import {ServiceService} from "../../../../../../shared/service/service.service";
import {ImagePipePipe} from "../../../../../../shared/pipe/pipe/image.pipe";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
@Component({
  selector: 'app-services-one',
  templateUrl: './services-one.component.html',
  styleUrls: ['./services-one.component.css'],
  providers: [ServiceService, ImagePipePipe]
})
export class ServicesOneComponent implements OnInit {
  serviceUpdateForm: FormGroup;
  service: Service = new Service();
  img: string = '';
  descriptions:FormArray;

  constructor(private _route: Router, private _router: ActivatedRoute, private _serviceService: ServiceService, private _imagePipe: ImagePipePipe) {
    _router.params.subscribe(next => {
      _serviceService.findOne(next['id']).subscribe(next => {
        this.service = next;
        console.log(next);
        this.img = this._imagePipe.transform(next.picturePath);
        console.log("tyt1" + this.img)
      })
    })
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.img = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  ngOnInit() {

    this._router.params.subscribe(next => {
      this.descriptions = new FormArray([
        this.getFormGroupDescription(),
        this.getFormGroupDescription(),
        this.getFormGroupDescription(),
        this.getFormGroupDescription(),
      ]);

      this.serviceUpdateForm = new FormGroup({
        id: new FormControl(),
        amenityDescriptions: this.descriptions,
        available: new FormControl(null),
        dateTime: new FormControl(''),
        picturePath: new FormControl(''),
        serviceDescriptions: this.descriptions,
        // multipartFile:new FormControl('',Validators.required),
      });
      this.serviceUpdateForm.valueChanges.subscribe(next => {
        this.service= next;
        console.log('Value ', next)
      });
      this._serviceService.findOne(next['id']).subscribe(next => {
        console.log(next);
        this.service = next;
        this.serviceUpdateForm.patchValue(<any>next);
      }, err => {
        console.error(err);
      });
    })

  }
  update(form) {
    console.log(this.service);
    this._serviceService.update(this.service, form).subscribe(next => {
      this.service = next;
      this.serviceUpdateForm.patchValue(<any>next);
      alert("Сервіс оновлено");
      this._route.navigateByUrl("/cabinet/update/services");
    }, error => {
      console.log(error);
    })
  }
  private getFormGroupDescription() {
      return new FormGroup({
        language: new FormControl(''),
        title: new FormControl('', Validators.required),
        headerText: new FormControl('', Validators.required),
        mainText: new FormControl('', Validators.required),
        id:new FormControl(),
        available:new FormControl(),
      });
    }
}
