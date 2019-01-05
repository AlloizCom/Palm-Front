import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RoomParamsService} from '../../../../shared/service/room-params.serive';
import {RoomsParams} from '../../../../shared/models/rooms-params';
import {roomTariff} from '../../../../shared/enum/room-tariff';
import {TariffService} from '../../../../shared/service/tariff.service';
import {Book} from '../../../../shared/models/payment/book';

@Component({
  selector: 'app-bookForm',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
  providers: [TariffService]
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup = this._formBuilder.group({
    firstName: this._formBuilder.control('', [Validators.required]),
    lastName: this._formBuilder.control('', [Validators.required]),
    email: this._formBuilder.control('', [Validators.required, Validators.email]),
    phoneNumber: this._formBuilder.control('', [Validators.pattern(/^\+?\d{5,12}$/)]),
    message: this._formBuilder.control(''),
  });
  book: Book = new Book();
  roomParams: RoomsParams;
  roomTariff: any;
  liqPayFormHtml: string = '';
  selectPayStatus: any [];
  errorMessag: boolean = false;


  constructor(
    private _roomParamsService: RoomParamsService,
    private _formBuilder: FormBuilder,
  ) {
    this.roomParams = _roomParamsService.params;
    this.roomTariff = roomTariff;
  }

  ngOnInit() {
    this.bookForm.valueChanges.subscribe(value => {
      this.book = value;
      console.log('invalid', this.bookForm.invalid);
      console.log('firstName', this.bookForm.controls['firstName'].errors);
      console.log('lastName', this.bookForm.controls['lastName'].errors);
      console.log('email', this.bookForm.controls['email'].errors);
      console.log('phoneNumber', this.bookForm.controls['phoneNumber'].errors);
      console.log('message', this.bookForm.controls['message'].errors);
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
    // this._bookService.save(this.book, 'UK').subscribe(value => console.log(value), err => console.error(err));

    // this._bookService.pay(book).subscribe(next => {
    //   this.liqPayFormHtml = next;
    // });
    // this._bookService.pay(book, this._translateService.currentLanguage).subscribe(next => {
    //   this.liqPayFormHtml = next;
    //   console.log(next);
    // });
    // this._router.navigateByUrl('/');
  }
}
