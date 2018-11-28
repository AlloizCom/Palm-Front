import {Component, OnInit} from '@angular/core';
import {ServiceService} from '../../../../../shared/service/service.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

const languages = ['EN', 'PL', 'UK', 'RU'];

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css'],
  providers: [ServiceService]
})
export class OptionComponent implements OnInit {

  defaultValidators = [Validators.required, Validators.minLength(3)];

  servicesForm: FormGroup = this.formBuilder.group({
    multipartFile: this.formBuilder.control('', this.defaultValidators),
    serviceDescriptions: this.formBuilder.array(
      languages.map(value =>
        this.formBuilder.group({
          language: this.formBuilder.control(value),
          title: this.formBuilder.control('', this.defaultValidators),
          headerText: this.formBuilder.control('', this.defaultValidators),
          mainText: this.formBuilder.control('', this.defaultValidators)
        })
      )
    ),
    available: this.formBuilder.control(true),
    showOnTop: this.formBuilder.control(false)
  });
  appear = false;
  image: string;

  get descriptionForms(){
    return (<FormArray>this.servicesForm.get('serviceDescriptions')).controls;
  }

  constructor(
    private _serviceService: ServiceService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
  }

  addServices(form: HTMLFormElement) {
    // console.log(this.service);
    this._serviceService.save(this.servicesForm.getRawValue(), form).subscribe(next => {
      this.image = null;
      form.reset();
      alert('Сервіс добавлено');
    }, error => {
      alert('Сервіс не добавлено');
      console.log(error);
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

  validateImages(c: FormControl): { [key: string]: any } {
    return c.value == null || c.value.length == 0 ? {'required': true} : null;
  }

}
