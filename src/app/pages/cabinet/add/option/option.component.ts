import {Component, OnInit} from '@angular/core';
import {Service} from '../../../../shared/models/service';
import {ServiceService} from '../../../../shared/service/service.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ServiceDescription} from '../../../../shared/models/service-description';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css'],
  providers: [ServiceService]
})
export class OptionComponent implements OnInit {

  servicesForm: FormGroup;
  service: Service = new Service();
  description: ServiceDescription[] = [];


  appear = false;
  image: string;

  constructor(private _serviceService: ServiceService) {
    this.description = [new ServiceDescription(), new ServiceDescription(), new ServiceDescription(), new ServiceDescription()];
    this.service.serviceDescriptions = this.description;
  }

  ngOnInit() {
    this.servicesForm = new FormGroup({
      TitleEn: new FormControl('', [Validators.required,Validators.minLength(3)]),
      HeaderTextareaEn: new FormControl('', [Validators.required,Validators.minLength(3)]),
      textEn: new FormControl('', [Validators.required,Validators.minLength(3)]),
      TitleUk: new FormControl('', [Validators.required,Validators.minLength(3)]),
      HeaderTextareaUk: new FormControl('', [Validators.required,Validators.minLength(3)]),
      textUk: new FormControl('', [Validators.required,Validators.minLength(3)]),
      TitlePl: new FormControl('', [Validators.required,Validators.minLength(3)]),
      HeaderTextareaPl: new FormControl('', [Validators.required,Validators.minLength(3)]),
      textPl: new FormControl('', [Validators.required,Validators.minLength(3)]),
      TitleRu: new FormControl('', [Validators.required,Validators.minLength(3)]),
      HeaderTextareaRu: new FormControl('', [Validators.required,Validators.minLength(3)]),
      textRu: new FormControl('', [Validators.required,Validators.minLength(3)]),
      multipartFile: new FormControl(null,[this.validateImages]),
    });
    this.servicesForm.valueChanges.subscribe(value => {
      this.service.serviceDescriptions[0].language = 'EN';
      this.service.serviceDescriptions[0].title = value.TitleEn;
      this.service.serviceDescriptions[0].headerText = value.HeaderTextareaEn;
      this.service.serviceDescriptions[0].mainText = value.textEn;
      this.service.serviceDescriptions[1].language = 'UK';
      this.service.serviceDescriptions[1].title = value.TitleUk;
      this.service.serviceDescriptions[1].headerText = value.HeaderTextareaUk;
      this.service.serviceDescriptions[1].mainText = value.textUk;
      this.service.serviceDescriptions[2].language = 'PL';
      this.service.serviceDescriptions[2].title = value.TitlePl;
      this.service.serviceDescriptions[2].headerText = value.HeaderTextareaPl;
      this.service.serviceDescriptions[2].mainText = value.textPl;
      this.service.serviceDescriptions[3].language = 'RU';
      this.service.serviceDescriptions[3].title = value.TitleRu;
      this.service.serviceDescriptions[3].headerText = value.HeaderTextareaRu;
      this.service.serviceDescriptions[3].mainText = value.textRu;
    });
  }

  addServices(form: HTMLFormElement) {
    console.log(this.service);
    this._serviceService.save(this.service, form).subscribe(next => {
      console.log(next);
    }, error => {
      console.log(error);
    }, () => {
      this.image = null;
      form.reset();
    });
  }

  readUrl(event: any) {
    this.appear = false;
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.image = event.target.result;
        this.appear = true;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  validateImages(c: FormControl): {[key: string]: any} {
    return c.value == null || c.value.length == 0 ? { "required" : true} : null;
  }

}
