import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Book} from '../../models/payment/book';

@Injectable()
export class BookService {

  private _controller = '/payment_book';

  constructor(private _httpClient: HttpClient) {
  }

  findAll(): Observable<Book[]> {
    return this._httpClient.get<Book[]>(this._controller + '/find-all');
  }

  findOne(id: number): Observable<Book> {
    return this._httpClient.get<Book>(this._controller + '/find-one/' + id);
  }

  findAllAvailable(): Observable<Book[]> {
    return this._httpClient.get<Book[]>(this._controller + '/find-all-available');
  }

  save(book: Book): Observable<Book> {
    return this._httpClient.post<Book>(this._controller + '/save', book);
  }

  update(book: Book): Observable<Book> {
    return this._httpClient.post<Book>(this._controller + '/update', book);
  }

  delete(id: number): Observable<Book> {
    return this._httpClient.delete<Book>(this._controller + '/delete/' + id);
  }
}
