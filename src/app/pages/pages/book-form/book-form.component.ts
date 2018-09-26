import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Book} from '../../../../shared/models/book';
import {BookService} from '../../../../shared/service/book.service';
import {RoomParamsService} from "../../../../shared/service/room-params.serive";
import {RoomsParams} from "../../../../shared/models/rooms-params";
import {RoomTariff} from "../../../../shared/enum/room-tariff";

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

  constructor(
    private _roomParamsService: RoomParamsService,
    private _bookService: BookService ) {
    this.roomParams = _roomParamsService.params;
    this.roomTariff = RoomTariff;
  }

  ngOnInit() {

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
    //   for(let key in this._BookingFormService.returnData()){
    //     this.book[key] = this._BookingFormService.returnData()[key];
    //   }
    //   this._bookService.save(this.book).subscribe(next => {
    //     console.log(next);
    //   });
    //   console.log(this.book);
    // }
  }
}
