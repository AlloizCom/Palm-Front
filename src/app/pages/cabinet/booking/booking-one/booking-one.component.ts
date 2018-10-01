import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Book} from "../../../../../shared/models/book";
import {BookService} from "../../../../../shared/service/book.service";
import {OrderStatus} from "../../../../../shared/enum/order-status";

@Component({
  selector: 'app-booking-one',
  templateUrl: './booking-one.component.html',
  styleUrls: ['./booking-one.component.css'],
  providers: [BookService]
})
export class BookingOneComponent implements OnInit {
  booking: Book = new Book();
  id: number = 0;
  bookingForm: FormGroup;
  orderStatuss: any;

  constructor(private _router: ActivatedRoute, private _bookService: BookService) {
    this.orderStatuss = [OrderStatus.AVAILABLE, OrderStatus.CANCELED, OrderStatus.HAVE_TO_BE_PAID, OrderStatus.PAID_BY_CARD];
    // this.orderStatuss = OrderStatus;
    _router.params.subscribe(next => {
      this.id = next['id'];
      this._bookService.findOne(this.id).subscribe(next => {
        this.booking = next;
        console.log(next);
      });
    });

  }

  ngOnInit() {
    this.bookingForm = new FormGroup({
      adults: new FormControl('',[Validators.required]),
      kids: new FormControl('',[Validators.required]),
      orderStatus: new FormControl('',[Validators.required]),
    });
    this.bookingForm.valueChanges.subscribe(value => {
      this.booking.adults = value.adults;
      this.booking.kids = value.kids;
      this.booking.orderStatus = value.orderStatus;
    });
  }

  update() {
   // this.booking.adults = this.bookingForm.controls['adults'].value;
   // this.booking.kids = this.bookingForm.controls['kids'].value;
   console.log(this.bookingForm.controls['orderStatus'].value);

   // this.booking.orderStatus = this.bookingForm.controls['orderStatus'].value;
    console.log(this.booking);
   this._bookService.update(this.booking).subscribe(next =>{
     console.log(next);
   });
   // console.log(this.booking);
  }
}
