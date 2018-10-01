import { Component, OnInit, Input } from '@angular/core';
import { Schedule } from "../../../../../shared/models/schedule";
import { ScheduleService } from "../../../../../shared/service/schedule.service";

@Component({
  selector: 'app-schedule-type',
  templateUrl: './schedule-type.component.html',
  styleUrls: ['./schedule-type.component.css']
})
export class ScheduleTypeComponent implements OnInit {
  @Input() datefrom: string;
  @Input() roomType: string;

  schedule: Schedule[] = [];
  status: string[] = [];
  id: number = 0;
  constructor(private _scheduleService: ScheduleService) {

  }

  ngOnInit() {
    this._scheduleService.findAllScheduleByTypeFromDate(this.datefrom, this.roomType).subscribe(next => {
      this.schedule = next;
      this.calculateStatuses();
      console.log(this.status);
    });
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
