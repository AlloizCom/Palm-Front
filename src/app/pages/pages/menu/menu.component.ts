import {Component, Injectable, OnInit} from '@angular/core';
import {Language} from '../../../../shared/enum/language';
import {ServiceService} from '../../../../shared/service/service.service';
import {Service} from '../../../../shared/models/service';
import {CurrentLanguageService} from '../../../../shared/service/current-language.service';
import {TranslateService} from '@ngx-translate/core';
import {LangSort} from '../../../../shared/models/utils/lang-sort';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
@Injectable()
export class MenuComponent implements OnInit {

  currentLang: Language = 'uk';
  currentUrl: string = '';
  isIn: boolean = true;
  services: Service[] = [];
  servicesToShow: Service[] = [];

  constructor(
    private translate: TranslateService,
    private _serviceService: ServiceService,
    private  _currentLanguageService: CurrentLanguageService,
    private _router: Router
  ) {
    this._router.events.subscribe(value => {
      if (value instanceof NavigationEnd) {
        this.currentUrl = value.urlAfterRedirects.replace(/\/?pages\/?(uk|en|pl|ru)\/?/, '');
      }
    });
    this._serviceService.findAllAvailable().subscribe(next => {
      this.services = next;
      for (let i = 0; i < this.services.length; i++) {
        this.services[i].serviceDescriptions = LangSort.sort(this.services[i].serviceDescriptions);
      }
      console.log('menu : ', this.services);
      this.servicesToShow = this.services.filter(value => value.showOnTop);
      // console.log('services ', this.services);
    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
  }

  goTop() {
    window.scrollTo(0, 0);
  }

  changeLanguage(lang: Language) {
    // this._router.navigateByUrl(this._router.url.replace(this.currentLanguage, lang));
    this.currentLang = lang;
    this.translate.use(lang);
    this._currentLanguageService.currentLanguage = lang;
  }

  toggleState() {
    this.isIn = !this.isIn;
  }

  getLang() {
    return this.currentLang;
  }

}
