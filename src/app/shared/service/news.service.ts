import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {News} from "../models/news";
import {Injectable} from "@angular/core";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {NewsByPage} from "../models/news-by-page";

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

  //Pageble
  findAllNewsByPage(page: number, count: number): Observable<News[]> {
    return this._httpClient.get<News[]>
    (this.controller + '/find-all-news-by-page/' + page + '/' + count)
      .catch(err => Observable.throw(err));
  }

  findAllAvailableNewsByPage(page: number, count: number): Observable<NewsByPage> {
    return this._httpClient.get<NewsByPage>
    (this.controller + '/find-all-news-by-page-available/' + page + '/' + count)
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
    return this._httpClient.get<any>(this.controller + '/get-random-array/' + length)
      .catch(err => Observable.throw(err));
  }

  // List of random News
  getRandomNews(amount: number): Observable<News[]> {
    return this._httpClient.get<News[]>(this.controller + '/get-list-of-random-news/' + amount)
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
