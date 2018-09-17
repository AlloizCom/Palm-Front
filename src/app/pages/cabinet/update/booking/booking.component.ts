import { Component, OnInit } from '@angular/core';
import {BookService} from "../../../../shared/service/book.service";
import {Book} from "../../../../shared/models/book";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  providers:[BookService]
})
export class BookingComponent implements OnInit {

  booking: Book[] = [];

  constructor(private _bookService: BookService) { }

  ngOnInit() {
    this._bookService.findAll().subscribe(next => {
      this.booking = next;
      console.log(this.booking);
    }, err => {
      console.log(err);
    });
  }
}
