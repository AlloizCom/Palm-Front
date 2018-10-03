import {Component, OnInit} from '@angular/core';
import {ScheduleService} from "../../../../shared/service/schedule.service";
import {Schedule} from "../../../../shared/models/schedule";
import {RoomTariff} from "../../../../shared/enum/room-tariff";
import {DatePipe, DeprecatedDatePipe} from "@angular/common";
import {DatePipePipe} from "../../../../shared/pipe/pipe/date-pipe.pipe";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  providers: [ScheduleService, DatePipe, DatePipePipe
  ]
})
export class ScheduleComponent implements OnInit {

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
    this.roomTariff = RoomTariff;
    this.roomTypes = Object.keys(RoomTariff).filter((element, index, array) => {
      return (element != 'NONE');
    });
    this._scheduleService.findAllAvailableScheduleByPage(this.page, this.numberOfRows).subscribe(next => {
      for (let one of next.shedules) {
        this.schedule.push(one);
        // console.log(this.schedule[0].today);
      }
    });
  }

  setDates(date: Date) {
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    this.date = date.getDate();
    this.fromDate = `${this.year}-${this.month}-${this.date} 00:00:00`;
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
