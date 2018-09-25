import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Book} from '../../../../shared/models/book';
import {BookingFormService} from '../../../../shared/service/booking-form.service';
import {BookService} from '../../../../shared/service/book.service';

@Component({
  selector: 'app-bookForm',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
  book: Book;
  bookHtml: Book;


  constructor(
    private _BookingFormService: BookingFormService,
    private _bookService: BookService ) {
  }

  ngOnInit() {
    this.bookHtml=this._BookingFormService.returnData();
    this.bookForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')])
    });
    this.bookForm.valueChanges.subscribe(value => {
      this.book = value;
    });
  }

  sendBook() {
    for(let key in this._BookingFormService.returnData()){
      this.book[key] = this._BookingFormService.returnData()[key];
    }
    this._bookService.save(this.book).subscribe(next => {
      console.log(next);
    });
    console.log(this.book);
  }

}
