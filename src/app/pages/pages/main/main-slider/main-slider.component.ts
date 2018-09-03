import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import {isNullOrUndefined} from "util";
import {Image} from "../../../../shared/models/image";
import {MainPageSevice} from "../../../../shared/service/main-page.sevice";
import {MainPage} from "../../../../shared/models/main-page";

@Component({
  selector: 'app-main-slider',
  templateUrl: './main-slider.component.html',
  styleUrls: ['./main-slider.component.css'],
  providers: [NgbCarouselConfig, MainPageSevice]
})
export class MainSliderComponent implements OnInit {

  images: Image[] = [];
  mainPage: MainPage [] = [];
  allPathes: string [] = [];

  // images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);//bootstrap

  constructor(config: NgbCarouselConfig, private _mainPageService: MainPageSevice) {
    this._mainPageService.findAllAvailable().subscribe(next => {
      for (let i of next) {
        if (typeof (i) != undefined && i != null) {
          this.mainPage.push(i);
        }
      }
      this.mainPage = next;
      for (let i = 0; i < this.mainPage.length; i++) {
        for (let j = 0; j < this.mainPage[i].images.length; j++) {
          this.images = this.mainPage[i].images;
          this.allPathes.push(this.mainPage[i].images[j].path);
        }
      }
      console.log(this.allPathes);

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





  ngOnInit() {
  }

}
