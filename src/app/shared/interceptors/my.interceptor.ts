import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {url} from '../config/url';
import {isPlatformBrowser} from '@angular/common';
import {isNull} from 'util';
import {UserDetailsService} from '../service/user-details.service';

@Injectable()

export class MyInterceptor  implements HttpInterceptor{

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private _userService: UserDetailsService) {
  }

  intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    req = req.clone({url: url + req.url});
    if (isPlatformBrowser(this.platformId)) {
      req = req.clone({headers: this.getHeaders(req)});
    }
    return next.handle(req);
  }

  getHeaders(req: HttpRequest<any>): HttpHeaders {
    let headers = new HttpHeaders();
    let temp: HttpRequest<any>;
    if (isNull(req.headers)) {
      temp = req.clone({headers});
    } else {
      temp = req.clone();
    }
    headers = temp.headers;
    if (temp.params.has('password')) {
      // if (temp.headers.keys().indexOf('Authorization') != -1) {
      headers = headers.append('content-type', 'application/x-www-form-urlencoded');
      headers = headers.append('authorization', 'Basic Y2xpZW50X2d1aWxkX29mX3RlYWNoZXJzLmNvbTpzZWNyZXRfMDEwc2VydmVyLmNvbQ==');
    } else {
      if (this._userService.checkAuth()) {
        headers = headers.append('authorization', `Bearer ${this._userService.getAccessToken()}`);
        if (temp.headers.keys().indexOf('enctype') != -1) {
          // headers = headers.set('Content-type', 'application/x-www-form-urlencoded');
          headers = headers.set('enctype', 'form-data/multipart');
        } else {
          if (temp.headers.keys().indexOf('Content-Type') != -1) {
            if (temp.headers.get('Content-Type').indexOf('application/json') == -1) {
              headers = headers.set('Content-Type', temp.headers.get('Content-Type') + ';application/json');
            }
          } else {
            headers = headers.append('Content-Type', 'application/json');
          }
        }
      }
    }
    headers = headers.append('Accept', 'application/json');
    return headers;
  }
}
