import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Book} from "../models/book";
import {Injectable} from "@angular/core";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {Schedule} from "../models/schedule";
import {ScheduleByPage} from "../models/schedule-by-page";
import {BookByPage} from "../models/book-by-page";

@Injectable()
export class BookService {

  controller = "/book";

  constructor(protected _httpClient: HttpClient) {

  }

  findAll(): Observable<Book[]> {
    return this._httpClient.get<Book[]>(this.controller + '/find-all')
      .catch(err => Observable.throw(err));
  }

  findAllAvailable(): Observable<Book[]> {
    return this._httpClient.get<Book[]>(this.controller + '/find-all-available')
      .catch(err => Observable.throw(err));
  }

  findOne(id: number): Observable<Book> {
    return this._httpClient.get<Book>(this.controller + '/find-one/' + id)
      .catch(err => Observable.throw(err));
  }

  findOneAvailable(id: number): Observable<Book> {
    return this._httpClient.get<Book>(this.controller + '/find-one-available/' + id)
      .catch(err => Observable.throw(err));
  }

  changeOrderStatus(id: number, orderStatus: string): Observable<Book> {
    return this._httpClient.get<Book>(this.controller + '/change-order-status/' + id + '/' + orderStatus)
      .catch(err => Observable.throw(err));
  }

  save(book: Book, language: string): Observable<Book> {
    return this._httpClient.post<Book>(this.controller + '/save/' + language.toUpperCase(), JSON.stringify(book))
      .catch(err => Observable.throw(err));
  }

  update(book: Book): Observable<Book> {
    return this._httpClient.post<Book>(this.controller + '/update', JSON.stringify(book))
      .catch(err => Observable.throw(err));
  }

  delete(id: number): Observable<any> {
    return this._httpClient.delete(this.controller + '/delete/' + id)
      .catch(err => Observable.throw(err));
  }

  /**
   *
   * @param {number} page
   * @param {number} count
   * @returns {Observable<Book[]>}
   */
  findAllBookByPage(page: number, count: number): Observable<Book[]> {
    return this._httpClient.get<Book[]>
    (this.controller + '/find-all-book-by-page/' + page + '/' + count)
      .catch(err => Observable.throw(err));
  }

  /**
   *
   * @param {number} page
   * @param {number} count
   * @returns {Observable<BookByPage>}
   */
  findAllAvailableBookByPage(page: number, count: number): Observable<BookByPage> {
    return this._httpClient.get<BookByPage>
    (this.controller + '/find-all-book-by-page-available/' + page + '/' + count)
      .catch(err => Observable.throw(err));
  }


  /**
   * pay
   * @param {Book} book
   * @returns {Observable<Book>}
   */
  pay(book: Book, language: string): Observable<string> {
    return this._httpClient.post(this.controller + '/pay/' + language.toUpperCase(), JSON.stringify(book), {responseType: "text"})
      .catch(err => Observable.throw(err));
  }

  cancel(book: Book): Observable<Book> {
    return this._httpClient.post<Book>(this.controller + '/cancel', JSON.stringify(book))
      .catch(err => Observable.throw(err));
  }

}
