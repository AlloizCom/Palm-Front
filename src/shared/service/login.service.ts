import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService {

  controller = '/oauth/token';

  constructor(private _httpClient: HttpClient) {
  }

  login(username: string, password: string): any {
    return this._httpClient.post<any>(this.controller,
      null, {
        params: new HttpParams()
          .append('username', username)
          .append('password', password)
          .append('grant_type', 'password')
      })
      .catch(error => Observable.throw(error));
  }

}
