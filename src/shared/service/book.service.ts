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
      ;
  }

  findAllAvailable(): Observable<Book[]> {
    return this._httpClient.get<Book[]>(this.controller + '/find-all-available')
      ;
  }

  findOne(id: number): Observable<Book> {
    return this._httpClient.get<Book>(this.controller + '/find-one/' + id)
      ;
  }

  findOneAvailable(id: number): Observable<Book> {
    return this._httpClient.get<Book>(this.controller + '/find-one-available/' + id)
      ;
  }

  changeOrderStatus(id: number, orderStatus: string): Observable<Book> {
    return this._httpClient.get<Book>(this.controller + '/change-order-status/' + id + '/' + orderStatus)
      ;
  }

  save(book: Book, language: string): Observable<Book> {
    return this._httpClient.post<Book>(this.controller + '/save/' + language.toUpperCase(), JSON.stringify(book))
      ;
  }

  update(book: Book): Observable<Book> {
    return this._httpClient.post<Book>(this.controller + '/update', JSON.stringify(book))
      ;
  }

  delete(id: number): Observable<any> {
    return this._httpClient.delete(this.controller + '/delete/' + id)
      ;
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
      ;
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
      ;
  }


  /**
   * pay
   * @param {Book} book
   * @returns {Observable<Book>}
   */
  pay(book: Book, language: string): Observable<string> {
    return this._httpClient.post(this.controller + '/pay/' + language.toUpperCase(), JSON.stringify(book), {responseType: "text"})
      ;
  }

  cancel(book: Book): Observable<Book> {
    return this._httpClient.post<Book>(this.controller + '/cancel', JSON.stringify(book))
      ;
  }

}
