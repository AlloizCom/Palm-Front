import {Component, OnInit} from '@angular/core';
import {TranslateService} from 'ng2-translate';
import {Language} from '../../../shared/enum/language';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  currentLang: Language = 'uk';

  constructor(private translate: TranslateService) {
    translate.addLangs(['uk', 'en', 'pl', 'ru']);
    translate.setDefaultLang('uk');
    this.translate.use('uk');
    // console.log('def curr lang = ' + this.translate.currentLang);
    let browserLang = translate.getBrowserLang();
    console.log(browserLang);
    // translate.use(browserLang.match(/uk|en|pl|ru/) ? browserLang:"uk");
    // translate.use('en')
  }


  ngOnInit() {
  }

  changeLanguage(lang: Language) {
    this.currentLang = lang;
    this.translate.use(lang);


    // console.log('curr lang = ' + this.translate.currentLang);
  }
}
