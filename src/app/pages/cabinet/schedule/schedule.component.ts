import {Component, OnInit} from '@angular/core';
import {ScheduleService} from "../../../../shared/service/schedule.service";
import {Schedule} from "../../../../shared/models/schedule";
import {roomTariff} from "../../../../shared/enum/room-tariff";
import {DatePipe, DeprecatedDatePipe} from "@angular/common";
import {DatePipePipe} from "../../../../shared/pipe/pipe/date-pipe.pipe";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

export class ScheduleDateService {
  fromDate: string;
  private _fromDate: Subject<string> = new Subject<string>();
  fromDate$: Observable<string> = this._fromDate.asObservable();

  setDate(date: string) {
    this.fromDate = date;
    this._fromDate.next(date);
  }
}


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  providers: [ScheduleService, DatePipe, DatePipePipe
  ]
})
export class ScheduleComponent implements OnInit {

  public static service: ScheduleDateService = new ScheduleDateService();

  buttonsLocked = true;
  lock = 0;

  schedule: Schedule[] = [];
  roomTariff: any;
  page: number = 0;
  roomTypes: any;
  numberOfRows: number = 150;
  value: string;
  year: number;
  month: number;
  date: number;
  fromDate: string;


  constructor(private _scheduleService: ScheduleService) {
    this.setDates(new Date());
    this.roomTariff = roomTariff;
    this.roomTypes = Object.keys(roomTariff).filter((element, index, array) => {
      return (element != 'NONE');
    });
    this._scheduleService.findAllAvailableScheduleByPage(this.page, this.numberOfRows).subscribe(next => {
      for (let one of next.shedules) {
        this.schedule.push(one);
        // console.log(this.schedule[0].today);
      }
    });
  }

  block(ev: boolean) {
    if (ev) {
      this.lock++;
      console.log(this.roomTypes.length);
      console.log(this.lock);
      if (this.lock == this.roomTypes.length) {
        this.buttonsLocked = !ev;
        this.lock=0;
      }
    } else {
      this.buttonsLocked = !ev;
    }
  }

  setDates(date: Date) {
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    this.date = date.getDate();
    this.fromDate = `${this.year}-${this.month}-${this.date} 00:00:00`;
    ScheduleComponent.service.setDate(this.fromDate);
    console.log(this.fromDate);
  }

  changeYear(num: number) {
    this.setDates(new Date(this.year + num, this.month - 1, this.date))
  }

  changeMonth(num: number) {
    this.setDates(new Date(this.year, (this.month + num) - 1, this.date))
  }

  changeDate(num: number) {
    this.setDates(new Date(this.year, this.month - 1, this.date + num))
  }

  changeAmountOfRoomForSale(number) {
    console.log(number);
    console.log(this.schedule[0]);

    // this._scheduleService.update(number).subscribe(next=>{
    //   console.log("Server respones", next);
    //
    // });
  }

  ngOnInit() {
  }

  showMore() {
    this.page++;
    this._scheduleService.findAllAvailableScheduleByPage(this.page, this.numberOfRows).subscribe(next => {
        for (let one of next.shedules) {
          this.schedule.push(one);
        }
      }, err => {
        console.log(err)
      }
    );
  }

}
