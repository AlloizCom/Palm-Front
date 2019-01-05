import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user';

@Injectable()
export class UserService {

  controller = '/user';

  constructor(private _httpClient: HttpClient) {

  }

  findAll(): Observable<User[]> {
    return this._httpClient.get<User[]>(this.controller + '/find-all');
  }

  findAllAvailable(): Observable<User[]> {
    return this._httpClient.get<User[]>(this.controller + '/find-all-available');
  }

  findOne(id: number): Observable<User> {
    return this._httpClient.get<User>(this.controller + '/find-one/' + id);
  }

  findOneAvailable(id: number): Observable<User> {
    return this._httpClient.get<User>(this.controller + '/find-one-available/' + id);
  }

  save(user: User): Observable<User> {
    return this._httpClient.post<User>(this.controller + '/save', JSON.stringify(user));
  }

  getU(): Observable<User> {
    console.log('get!');
    return this._httpClient.get<User>(this.controller);
  }

  update(user: User): Observable<User> {
    return this._httpClient.post<User>(this.controller + '/update', JSON.stringify(user));
  }

  updatePassword(user: User): Observable<User> {
    return this._httpClient.post<User>(this.controller + '/update-password', JSON.stringify(user));
  }

  delete(id: number): Observable<any> {
    return this._httpClient.delete(this.controller + '/delete/' + id);
  }

}
