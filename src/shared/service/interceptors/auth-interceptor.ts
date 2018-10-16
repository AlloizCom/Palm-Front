import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {isNullOrUndefined} from 'util';
import {UserDetailsService} from '../user-details.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private  _router: Router, private _userDetailsService: UserDetailsService) {
  }

  intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    let ret = next.handle(req);
    ret.subscribe(value => {
    }, err => {
      console.error(req,err);
      if (err.status === 404) {
        this._router.navigateByUrl('/error/404');
      }
      if (err.status === 401) {
        this._userDetailsService.logout();
        this._router.navigateByUrl('/login');
        if (isNullOrUndefined(sessionStorage.getItem('refresh_token')) || isNullOrUndefined(localStorage.getItem('refresh_token'))) {
        }
      } else {
      }
    });
    return ret;
  }
}
