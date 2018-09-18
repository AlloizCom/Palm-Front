import {Component, HostListener, Injectable, OnInit} from '@angular/core';
import {TranslateService} from 'ng2-translate';
import {Language} from '../../../../shared/enum/language';
import {ServiceService} from '../../../../shared/service/service.service';
import {Service} from '../../../../shared/models/service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
@Injectable()
export class MenuComponent implements OnInit {

  currentLang: Language = 'uk';
  isIn: boolean = true;
  services: Service[] = [];
  dropdownHoverShow:boolean =false;

  constructor(private translate: TranslateService,
              private _serviceService: ServiceService) {
    this._serviceService.findAllAvailable().subscribe(next => {
      for (let i of next) {
        if (typeof (i) != undefined && i != null) {
          this.services.push(i);
        }
      }
      this.services = next;
      console.log('services ', this.services);

    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
  }

  changeLanguage(lang: Language) {
    this.currentLang = lang;
    console.log('now lang is : ', lang);
    this.translate.use(lang);
  }

  toggleState() {
    this.isIn = !this.isIn;
  }

  mouseHover(){
    console.log('hover');
  }
}
