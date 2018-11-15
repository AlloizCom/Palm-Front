import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Book} from '../../../../shared/models/book';
import {BookService} from '../../../../shared/service/book.service';
import {RoomParamsService} from "../../../../shared/service/room-params.serive";
import {RoomsParams} from "../../../../shared/models/rooms-params";
import {roomTariff} from "../../../../shared/enum/room-tariff";
import {Router} from "@angular/router";
import {TariffService} from "../../../../shared/service/tariff.service";
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-bookForm',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
  providers: [TariffService]
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
  book: Book = new Book();
  roomParams: RoomsParams;
  roomTariff: any;
  liqPayFormHtml: string = "";
  selectPayStatus: any [];
  errorMessag: boolean = false;


  constructor(
    private _roomParamsService: RoomParamsService,
    private _bookService: BookService,
    private _translateService: TranslateService,
    private _router: Router,
    private _tariffService: TariffService) {
    this.roomParams = _roomParamsService.params;
    this.roomTariff = roomTariff
  }

  ngOnInit() {
    this.selectPayStatus =[
      {id: 1, value: 'HAVE_TO_BE_PAID', lable:'Готівкою'},
      {id: 2, value: 'PAID_BY_CARD', lable:'Visa/MC'}];

    this.bookForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z.!@?#"$%&:;() *\\+,\\/;\\-=[\\\\\\]\\^_{|}<>\u0400-\u04FF]+$')]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z.!@?#"$%&:;() *\\+,\\/;\\-=[\\\\\\]\\^_{|}<>\u0400-\u04FF]+$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.pattern('^\\+(?:[0-9\\s]●?){10,15}[0-9]$')]),
      message: new FormControl(''),
      orderStatus: new FormControl('', [Validators.required])
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
    book.orderStatus = this.bookForm.controls['orderStatus'].value;

    this._tariffService.findByRoomType(this.roomParams.roomType).subscribe(next => {
      console.log();
    });

    console.log()

    // this._bookService.pay(book).subscribe(next => {
    //   this.liqPayFormHtml = next;
    // });
    // this._bookService.pay(book, this._translateService.currentLang).subscribe(next => {
    //   this.liqPayFormHtml = next;
    //   console.log(next);
    // });
    // this._router.navigateByUrl('/');
  }
}
