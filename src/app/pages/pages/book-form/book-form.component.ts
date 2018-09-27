import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Book} from '../../../../shared/models/book';
import {BookService} from '../../../../shared/service/book.service';
import {RoomParamsService} from "../../../../shared/service/room-params.serive";
import {RoomsParams} from "../../../../shared/models/rooms-params";

@Component({
  selector: 'app-bookForm',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
  book: Book = new Book();
  roomParams: RoomsParams;
  roomTariff: any;
  liqPayFormHtml: string = "";

  constructor(
    private _roomParamsService: RoomParamsService,
    private _bookService: BookService ) {
    this.roomParams = _roomParamsService.params;
  }

  ngOnInit() {

    this.bookForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Zа-яА-я]+$')]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Zа-яА-я]+$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.pattern('^\\+(?:[0-9\\s]●?){10,15}[0-9]$')]),
      message: new FormControl('')
    });
    this.bookForm.valueChanges.subscribe(value => {
      this.book = value;
    });
  }

  sendBook() {
    //   for(let key in this._BookingFormService.returnData()){
    //     this.book[key] = this._BookingFormService.returnData()[key];
    //   }
    //   this._bookService.save(this.book).subscribe(next => {
    //     console.log(next);
    //   });
    //   console.log(this.book);
    // }
  }

  pay() {

    let book = new Book();
    book.kids = this.roomParams.childrens;
    book.dateIn = this.roomParams.dateFrom;
    book.dateOut = this.roomParams.dateTo;
    book.adults = this.roomParams.adults;
    book.amountOfRooms = this.roomParams.numbersOfRooms;
    book.roomType = this.roomParams.roomType;
    book.email = this.bookForm.controls['email'].value;
    book.firstName = this.bookForm.controls['firstName'].value;
    book.lastName = this.bookForm.controls['lastName'].value;
    book.phoneNumber = this.bookForm.controls['phoneNumber'].value;
    book.message = this.bookForm.controls['message'].value;
    console.log(this.bookForm);
    console.log();

    // this._bookService.pay(book).subscribe(next => {
    //   this.liqPayFormHtml = next;
    // });
    this._bookService.pay(book).subscribe(next => {
      this.liqPayFormHtml = next;
    });;
  }
}
