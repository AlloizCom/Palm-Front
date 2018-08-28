import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {News} from "../models/news";
import {Injectable} from "@angular/core";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class NewsService {

  controller = "/news";

  constructor(private _httpClient: HttpClient) {

  }

  findAll(): Observable<News[]> {
    return this._httpClient.get<News[]>(this.controller + '/find-all')
      .catch(err => Observable.throw(err));
  }

  findAllAvailable(): Observable<News[]> {
    return this._httpClient.get<News[]>(this.controller + '/find-all-available')
      .catch(err => Observable.throw(err));
  }

  findOne(id: number): Observable<News> {
    return this._httpClient.get<News>(this.controller + '/find-one/' + id)
      .catch(err => Observable.throw(err));
  }

  findOneAvailable(id: number): Observable<News> {
    return this._httpClient.get<News>(this.controller + '/find-one-available/' + id)
      .catch(err => Observable.throw(err));
  }

  getRandomArray(length: number): Observable<any>{
    return this._httpClient.get<number[]>(this.controller + '/get-random-array/' + length)
      .catch(err => Observable.throw(err));
  }

  save(newsJson: News, form: HTMLFormElement): Observable<News> {
    let f = new FormData(form);
    f.append('newsJson', JSON.stringify(newsJson));
    return this._httpClient.post<News>(this.controller + '/save', f, {
      headers: new HttpHeaders().append('enctype', 'multipart/form-data')
    }).catch(err => Observable.throw(err));
  }

  update(newsJson: News, form: HTMLFormElement): Observable<News> {
    let f = new FormData(form);
    f.append('newsJson', JSON.stringify(newsJson));
    return this._httpClient.post<News>(this.controller + '/update', f, {
      headers: new HttpHeaders().append('enctype', 'multipart/form-data')
    }).catch(err => Observable.throw(err));
  }

  delete(id: number): Observable<any> {
    return this._httpClient.delete(this.controller + '/delete/' + id)
      .catch(err => Observable.throw(err));
  }


}
