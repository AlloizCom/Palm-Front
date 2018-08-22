import { Component, OnInit } from '@angular/core';
import {TranslateService} from "ng2-translate";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  constructor (private translate:TranslateService){
    translate.addLangs(["uk","en","pl","ru"]);
    translate.setDefaultLang("uk");

    let browserLang= translate.getBrowserLang();
    console.log(browserLang);
    translate.use(browserLang.match(/uk|en|pl|ru/) ? browserLang:"uk");
    // translate.use('en')
  }

  ngOnInit() {
  }
    changeLanguage(lang){
    this.translate.use(lang);
}
}
