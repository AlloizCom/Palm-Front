import {Component, OnInit} from '@angular/core';
import {Image} from "../../../../../shared/models/image";
import {MainPage} from "../../../../../shared/models/main-page";
import {MainPageSevice} from "../../../../../shared/service/main-page.sevice";
import {NgbCarouselConfig} from "@ng-bootstrap/ng-bootstrap";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-main-update',
  templateUrl: './main-update.component.html',
  styleUrls: ['./main-update.component.css'],
  providers: [MainPageSevice]
})
export class MainUpdateComponent implements OnInit {

  images: Image[] = [];
  mainPage: MainPage [] = [];

  constructor(config: NgbCarouselConfig, private _mainPageService: MainPageSevice) {
    this._mainPageService.findAllAvailable().subscribe(next => {
      for (let i of next) {
        if (typeof (i) != undefined && i != null) {
          this.mainPage.push(i);
        }
      }
      this.mainPage = next;
      this.clearPages();
    }, err => {
      console.log(err);
    });

  }

  isNull(object: any): Boolean {
    if (Array.isArray(object)) {
      return !isNullOrUndefined(object[0]);
    } else {
      return !isNullOrUndefined(object);
    }
  }

  delete(roomId: number, imageId: number) {
    console.log(this.mainPage);
    console.log('roomId - ' + roomId);
    console.log('imageId - ' + imageId);
    this._mainPageService.deleteImage(roomId, imageId).subscribe(next => {
      console.log(next);
      this.mainPage.map(value => {
        if (value.id == roomId) value.images = value.images.filter(value1 => value1.id != imageId);
        return value;
      });
      this.clearPages();
    }, error => {
      console.log(error);
    });
  }

  ngOnInit() {
  }

  clearPages(){
    this.mainPage = this.mainPage.filter(value => value.images.length!=0);
  }

}
