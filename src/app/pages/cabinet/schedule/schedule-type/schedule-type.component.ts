import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Schedule} from "../../../../../shared/models/schedule";
import {ScheduleService} from "../../../../../shared/service/schedule.service";
import {ScheduleComponent} from "../schedule.component";

@Component({
  selector: 'app-schedule-type',
  templateUrl: './schedule-type.component.html',
  styleUrls: ['./schedule-type.component.css']
})
export class ScheduleTypeComponent implements OnInit {
  datefrom: string;
  @Input() roomType: string;
  @Output() updated = new EventEmitter<boolean>();

  schedule: Schedule[] = [];
  status: string[] = [];
  id: number = 0;
  day: any;

  constructor(private _scheduleService: ScheduleService) {
    this.datefrom = ScheduleComponent.service.fromDate;
    this.updated.emit(false);
    ScheduleComponent.service.fromDate$.subscribe(value => {
      this.updated.emit(false);
      this.datefrom = value;
      this.ngOnInit();
    })
  }


  ngOnInit() {
    this._scheduleService.findAllScheduleByTypeFromDate(this.datefrom, this.roomType).subscribe(next => {
      this.updated.emit(true);
      this.schedule = next;
      this.Weekends();
      this.calculateStatuses();
      console.log(this.status);
    });
  }


  Weekends() {
    for (let i = 0; i < this.schedule.length; i++) {
      let one = this.schedule[i].today;
      console.log(one)
    }


  }

  calculateStatuses() {
    console.log(this.schedule);
    for (var i = 0; i < this.schedule.length; i++) {
      if (i == 0) {
        if ((this.schedule[i].free && this.schedule[i + 1].free)
          || (!this.schedule[i].free && !this.schedule[i + 1].free)) {
          this.status[i] = "1";
        } else {
          this.status[i] = "4";
        }
      } else if (i == this.schedule.length - 1) {
        if ((this.schedule[i - 1].free && this.schedule[i].free) || (!this.schedule[i - 1].free && !this.schedule[i].free)) {
          this.status[i] = "2";
        } else {
          this.status[i] = "4";
        }
      } else {
        if ((this.schedule[i - 1].free && this.schedule[i].free && this.schedule[i + 1].free)
          || (!this.schedule[i - 1].free && !this.schedule[i].free && !this.schedule[i + 1].free)) {
          this.status[i] = "3";
        } else if ((this.schedule[i - 1].free && this.schedule[i].free)
          || (!this.schedule[i - 1].free && !this.schedule[i].free)) {
          this.status[i] = "2";
        } else if ((this.schedule[i].free && this.schedule[i + 1].free)
          || (!this.schedule[i].free && !this.schedule[i + 1].free)) {
          this.status[i] = "1";
        } else {
          this.status[i] = "4";
        }
      }
      this.status[i] = this.schedule[i].free ? "1" + this.status[i] : "0" + this.status[i];
    }
  }
}
