import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {CurrentLanguageService} from '../../../shared/service/current-language.service';
import {BrowserCheckService} from '../../shared/service/browser-check.service';

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
    private _currentLanguageService: CurrentLanguageService,
    private _isBrowserService: BrowserCheckService
  ) {
    if (_activateRouteSnapshot.snapshot.params.lang &&
      _translate.getLangs().includes(_activateRouteSnapshot.snapshot.params.lang)) {
      this._translate.use(_activateRouteSnapshot.snapshot.params.lang);
    } else {
      this._router.navigateByUrl('pages/' + _currentLanguageService.currentLanguage);
    }
    this._router.events.subscribe(value => {
      if (event instanceof NavigationEnd) {
        if (_isBrowserService.isBrowser()) {
          (<any>window).ga('set', 'page', event.urlAfterRedirects);
          (<any>window).ga('send', 'pageview');
        }
      }
    });
  }

  ngOnInit() {
  }

}
