import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user';

@Injectable()
export class LoginService {

  static tokenName: string = 'access_token';

  constructor(private _http: HttpClient) {
  }

  sendCredentials(model: User): Observable<any> {
    // return this._http.post('/oauth/token', {grant_type: 'password', username: model.login, password: model.password});
    return this._http.post('/oauth/token', null, {
      params: new HttpParams({
        fromObject: {
          grant_type: 'password',
          username: model.login,
          password: model.password
        }
      })
    });
  }
}
