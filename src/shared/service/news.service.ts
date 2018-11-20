import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {News} from "../models/news";
import {Injectable} from "@angular/core";
import {NewsByPage} from "../models/news-by-page";

@Injectable()
export class NewsService {

  controller = "/news";

  constructor(private _httpClient: HttpClient) {

  }

  findAll(): Observable<News[]> {
    return this._httpClient.get<News[]>(this.controller + '/find-all');
  }

  findAllAvailable(): Observable<News[]> {
    return this._httpClient.get<News[]>(this.controller + '/find-all-available');
  }

  //Pageble
  findAllNewsByPage(page: number, count: number): Observable<News[]> {
    return this._httpClient.get<News[]>
    (this.controller + '/find-all-news-by-page/' + page + '/' + count);
  }

  findAllAvailableNewsByPage(page: number, count: number): Observable<NewsByPage> {
    return this._httpClient.get<NewsByPage>
    (this.controller + '/find-all-news-by-page-available/' + page + '/' + count);
  }

  findOne(id: number): Observable<News> {
    return this._httpClient.get<News>(this.controller + '/find-one/' + id);
  }

  findOneAvailable(id: number): Observable<News> {
    return this._httpClient.get<News>(this.controller + '/find-one-available/' + id);
  }

  getRandomArray(length: number): Observable<any>{
    return this._httpClient.get<any>(this.controller + '/get-random-array/' + length);
  }

  // List of random News
  getRandomNews(amount: number): Observable<News[]> {
    return this._httpClient.get<News[]>(this.controller + '/get-list-of-random-news/' + amount);
  }

  save(newsJson: News, form: HTMLFormElement): Observable<News> {
    let f = new FormData(form);
    f.append('newsJson', JSON.stringify(newsJson));
    return this._httpClient.post<News>(this.controller + '/save', f, {
      headers: new HttpHeaders().append('enctype', 'multipart/form-data')
    });
  }

  update(newsJson: News, form: HTMLFormElement): Observable<News> {
    let f = new FormData(form);
    f.append('newsJson', JSON.stringify(newsJson));
    return this._httpClient.post<News>(this.controller + '/update', f, {
      headers: new HttpHeaders().append('enctype', 'multipart/form-data')
    });
  }

  delete(id: number): Observable<any> {
    return this._httpClient.delete(this.controller + '/delete/' + id);
  }


}
