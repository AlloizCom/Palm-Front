import {Component, OnInit} from '@angular/core';
import {MainPageSevice} from '../../../../../shared/service/main-page.sevice';
import {isNullOrUndefined} from 'util';
import {Image} from '../../../../../shared/models/image';
import {MainPage} from '../../../../../shared/models/main-page';
import {BrowserCheckService} from '../../../../shared/service/browser-check.service';

@Component({
  selector: 'app-top-slider',
  templateUrl: './top-slider.component.html',
  styleUrls: ['./top-slider.component.css']
})
export class TopSliderComponent implements OnInit {

  images: Image[] = [];
  mainPage: MainPage [] = [];
  allPathes: string [] = [];
  index: number = 0;
  indexDot: number = 0;
  autoScrol: any;
  isBrowser = false;

  constructor(private _mainPageService: MainPageSevice, private _browserCheck: BrowserCheckService) {
    this.isBrowser = this._browserCheck.isBrowser();
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
      if (this.isBrowser)
        this.autoScrol = setInterval(() => {
          this.scroll(false);
        }, 4000);
    }, err => {
      console.log(err);
    });
  }


  scroll(event) {
    if (this.index > 0 && this.index != this.allPathes.length - 1) {
      event ? this.index -= 1 : this.index += 1;
      event ? this.indexDot += 1 : this.indexDot -= 1;
    } else if (this.index == 0 && event == false) {
      this.index += 1;
      this.indexDot -= 1;
    } else if (this.index == this.allPathes.length - 1 && event == true) {
      this.index -= 1;
      this.indexDot += 1;
    } else if (this.index == this.allPathes.length - 1 && event == false) {
      this.index = 0;
      this.indexDot = this.allPathes.length - 1;
    } else if (this.index == 0 && event == true) {
      this.index = this.allPathes.length - 1;
      this.indexDot = 0;
    }
    if(this.isBrowser) {
      clearInterval(this.autoScrol);
      this.autoScrol = setInterval(() => {
        this.scroll(false);
      }, 4000);
    }
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
