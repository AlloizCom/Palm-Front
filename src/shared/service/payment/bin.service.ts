import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Book} from '../../models/payment/book';

@Injectable()
export class BinService {

  private _bin$: Subject<Book> = new Subject();

  get bin$() {
    return this._bin$.asObservable();
  }

  private _bin: Book = new Book();

  get bin() {
    return this._bin;
  }

  set bin(bin: Book) {
    this._bin = bin;
    this._bin$.next(bin);
  }

}
