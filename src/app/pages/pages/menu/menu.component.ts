import {Component, Injectable, OnInit} from '@angular/core';
import {Language} from '../../../../shared/enum/language';
import {ServiceService} from '../../../../shared/service/service.service';
import {Service} from '../../../../shared/models/service';
import {CarrentLanguadgeService} from '../../../../shared/service/carrent-languadge.service';
import {TranslateService} from '@ngx-translate/core';

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
  servicesToShow: Service[] = [];

  constructor(private translate: TranslateService,
              private _serviceService: ServiceService,
              private  _carrentLanguadgeService: CarrentLanguadgeService) {
    this._serviceService.findAllAvailable().subscribe(next => {
      this.services = next;
      console.log('menu : ',this.services);
      this.servicesToShow = this.services.filter(value => value.showOnTop);
      // console.log('services ', this.services);
    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
  }

  changeLanguage(lang: Language) {
    this.currentLang = lang;
    this.translate.use(lang);
    this._carrentLanguadgeService.setCarrentLanguadge(lang);
  }

  toggleState() {
    this.isIn = !this.isIn;
  }

}
