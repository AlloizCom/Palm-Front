import {isNullOrUndefined} from 'util';
import {Injectable} from '@angular/core';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';


@Injectable()
export class UserDetailsService {

  checkAuth(): boolean {
    return !isNullOrUndefined(localStorage.getItem('access_token'));
  }

  getAccessToken(): string {
    return localStorage.getItem('access_token');
  }

  saveToken(data) {
    this.deleteToken();
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('token_type', data.token_type);
    localStorage.setItem('expires_in', new Date().setSeconds(data.expires_in) + '');
    localStorage.setItem('scope', data.scope);
    localStorage.setItem('jti', data.jti);
    localStorage.setItem('refresh_token', data.refresh_token);
  }

  deleteToken() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token_type');
    localStorage.removeItem('expires_in');
    localStorage.removeItem('scope');
    localStorage.removeItem('jti');
    localStorage.removeItem('refresh_token');
  }
}
