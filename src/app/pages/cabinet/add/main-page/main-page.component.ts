import { Component, OnInit } from '@angular/core';
import {isNullOrUndefined} from "util";
import {MainPage} from "../../../../shared/models/main-page";
import {MainPageSevice} from "../../../../shared/service/main-page.sevice";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers:[MainPageSevice]
})
export class MainPageComponent implements OnInit {

  mainPage: MainPage = new MainPage();
  image: string[] = [];
  appear: boolean = true;
  mainPageForm:FormGroup;

  constructor(private _mainPageService: MainPageSevice) {
  }

  ngOnInit() {
    this.createmainPageForm();
  }


  private   createmainPageForm(){
    this.mainPageForm = new FormGroup({
      multipartFiles: new FormControl(null,[this.validateImages]),
    })
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
        console.log(next);
        form.reset();
        this.image=[];
      },
      error => {
        console.log(error);
      });
  }

  validateImages(c: FormControl): {[key: string]: any} {
    return c.value == null || c.value.length == 0 ? { "required" : true} : null;
  }

}

