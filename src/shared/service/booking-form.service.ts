import {Injectable} from '@angular/core';
import {Book} from '../models/book';

@Injectable()
export class BookingFormService {
  book = new Book();

  constructor() {
  }

  getData(data: Book) {
    this.book = data;
    console.log(data);
  }

  returnData() {
    return this.book;
  }


}
