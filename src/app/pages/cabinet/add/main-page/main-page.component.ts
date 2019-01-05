import {Component, OnInit} from '@angular/core';
import {isNullOrUndefined} from 'util';
import {MainPage} from '../../../../../shared/models/main-page';
import {MainPageSevice} from '../../../../../shared/service/main-page.sevice';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';

const languages = ['EN', 'PL', 'UK', 'RU'];

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers: [MainPageSevice]
})
export class MainPageComponent implements OnInit {

  mainPage: MainPage = new MainPage();
  image: string[] = [];
  appear: boolean = true;
  mainPageForm: FormGroup = this._formBuilder.group({
    multipartFiles: this._formBuilder.control(null, [this.validateImages]),
    seos: this._formBuilder.array(languages.map(value =>
      this._formBuilder.group({
        language: this._formBuilder.control(value),
        keywords: this._formBuilder.control(''),
        description: this._formBuilder.control('')
      })
    ))
  });

  constructor(
    private _mainPageService: MainPageSevice,
    private _formBuilder: FormBuilder
  ) {
  }

  get seos(): FormArray {
    return <FormArray>this.mainPageForm.get('seos');
  }

  ngOnInit() {
    this.createmainPageForm();
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

  addImages(form: HTMLFormElement) {
    this._mainPageService.save(this.mainPage, form).subscribe(next => {
        // console.log(next);
        form.reset();
        this.image = [];
        alert('Фото добавлено');
      },
      error => {
        console.log(error);
      }, () => {

      });
  }

  validateImages(c: FormControl): { [key: string]: any } {
    return c.value == null || c.value.length == 0 ? {'required': true} : null;
  }

  private createmainPageForm() {
    this.mainPageForm.valueChanges.subscribe(value => {
      this.mainPage = value;
    });
  }

}

