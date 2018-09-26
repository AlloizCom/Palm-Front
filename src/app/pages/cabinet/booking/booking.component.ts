import {Component, OnInit} from '@angular/core';
import {BookService} from "../../../../shared/service/book.service";
import {Book} from "../../../../shared/models/book";
import {NotificationService} from "../../../../shared/service/notification.service";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  providers: [BookService, NotificationService]
})
export class BookingComponent implements OnInit {

  booking: Book[] = [];
  page: number = 0;
  numberOfItems: number = 5;

  constructor(private _bookService: BookService,
              private _notificationService: NotificationService) {
    _notificationService.resetCounter().subscribe(next => {
      // console.log(next);
    }, err => {
      console.log(err);
    });
    this._bookService.findAllAvailableBookByPage(this.page, this.numberOfItems).subscribe(next => {
      for (let one of next.books) {
        this.booking.push(one);
      }
    });
  }

  ngOnInit() {
    // this._bookService.findAll().subscribe(next => {
    //   this.booking = next;
    //   // console.log(this.booking);
    // }, err => {
    //   console.log(err);
    // });
  }


  showMore() {
    this.page++;
    this._bookService.findAllAvailableBookByPage(this.page, this.numberOfItems).subscribe(next => {
        for (let one of next.books) {
          this.booking.push(one);
        }
      }, err => {
        console.log(err)
      }
    );
  }

}
