import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {CurrentLanguageService} from '../../../shared/service/current-language.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(
    private _translate: TranslateService,
    private _router: Router,
    private _activateRouteSnapshot: ActivatedRoute,
    private _currentLanguageService: CurrentLanguageService
  ) {
    if (_activateRouteSnapshot.snapshot.params.lang &&
      _translate.getLangs().includes(_activateRouteSnapshot.snapshot.params.lang)) {
      this._translate.use(_activateRouteSnapshot.snapshot.params.lang);
    } else {
      this._router.navigateByUrl('pages/'+_currentLanguageService.currentLanguage);
    }
    // this._router.events.subscribe(value => {
    //   if (value instanceof NavigationEnd) {
    //     if (this._activateRouteSnapshot.snapshot.params.lang != this._currentLanguageService.currentLanguage) {
    //       this._router.navigateByUrl(`${_currentLanguageService.currentLanguage}${value.urlAfterRedirects.replace(this._activateRouteSnapshot.snapshot.params.lang, '')}`);
    //     }
    //   }
    // });
  }

  ngOnInit() {
  }

}
