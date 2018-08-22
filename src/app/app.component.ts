import { Component } from '@angular/core';
import {TranslateService} from 'ng2-translate'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor (private translate:TranslateService){
    translate.addLangs(["uk","en","pl","ru"]);
    translate.setDefaultLang("uk");

    let browserLang= translate.getBrowserLang();
    console.log(browserLang);
    // translate.use(browserLang.match(/uk|en|pl|ru/) ? browserLang:"uk");
    // translate.use('en')
  }
}
