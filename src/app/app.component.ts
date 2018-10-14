import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private _translate: TranslateService) {
    _translate.addLangs(['uk', 'en', 'pl', 'ru']);
    _translate.setDefaultLang('uk');
    this._translate.use('uk')
  }

}
