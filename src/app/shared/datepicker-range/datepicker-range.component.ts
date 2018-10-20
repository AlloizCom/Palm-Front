import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

export class RangeDate {

  constructor(public from: NgbDateStruct, public to: NgbDateStruct) {

  }


}


const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;

@Component({
  selector: 'app-datepicker-range',
  templateUrl: './datepicker-range.component.html',
  styleUrls: ['./datepicker-range.component.css']
})
export class DatepickerRangeComponent implements OnInit {

  hoveredDate: NgbDateStruct;

  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;

  @Output() dateRange = new EventEmitter<RangeDate>();
  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);

  constructor(private calendar: NgbCalendar) {
    this.fromDate = /*null*/calendar.getToday();
    this.toDate = /*null*//*calendar.getNext(calendar.getToday(), 'd', 10)*/calendar.getToday();
  }

  clear() {
    this.toDate = null;
    this.fromDate = null;
  }

  onDateSelection(date: NgbDateStruct) {

    if (equals(this.fromDate, this.toDate) && equals(this.fromDate, date)) {
      this.clear();
    }

    if (!this.fromDate && !this.toDate && (after(date, this.calendar.getToday()) || equals(date, this.calendar.getToday()))) {
      this.fromDate = date;
      console.log(this.fromDate);
      console.log(this.toDate);
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate) || equals(date, this.fromDate) && (after(date, this.calendar.getToday()) || equals(date, this.calendar.getToday()))) {
      this.toDate = date;
      console.log(this.fromDate);
      console.log(this.toDate);
      this.dateRange.next(new RangeDate(this.fromDate, this.toDate));
    } else if ((after(date, this.calendar.getToday()) || equals(date, this.calendar.getToday()))) {
      this.toDate = null;
      this.fromDate = date;
    } else {
      this.toDate = null;
      this.fromDate = this.calendar.getToday();
    }
  }

  ngOnInit(): void {
  }

}
