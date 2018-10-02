import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {User} from "../models/user";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

  controller = "/user";

  constructor(private _httpClient: HttpClient){

  }

  findAll(): Observable<User[]>{
    return this._httpClient.get<User[]>(this.controller + '/find-all').catch(err => Observable.throw(err));
  }

  findAllAvailable(): Observable<User[]>{
    return this._httpClient.get<User[]>(this.controller + '/find-all-available').catch(err => Observable.throw(err));
  }

  findOne(id: number): Observable<User>{
    return this._httpClient.get<User>(this.controller + '/find-one/' + id).catch(err => Observable.throw(err));
  }

  findOneAvailable(id: number): Observable<User>{
    return this._httpClient.get<User>(this.controller + '/find-one-available/' + id).catch(err => Observable.throw(err));
  }

  save(user: User): Observable<User>{
      return this._httpClient.post<User>(this.controller + '/save', JSON.stringify(user)).catch(err => Observable.throw(err));
  }

  get(): Observable<User> {
    console.log('get!');
    return this._httpClient.get<User>(this.controller).catch(err =>
      Observable.throw(err));
  }

  update(user: User): Observable<User>{
    return this._httpClient.post<User>(this.controller + '/update',JSON.stringify(user)).catch(err => Observable.throw(err));
  }

  delete(id: number): Observable<any>{
    return this._httpClient.delete(this.controller + '/delete/' + id).catch(err => Observable.throw(err));
  }

}
