import { Component, OnInit, Input } from '@angular/core';
import {Schedule} from "../../../../../shared/models/schedule";
import {ScheduleService} from "../../../../../shared/service/schedule.service";

@Component({
  selector: 'app-schedule-type',
  templateUrl: './schedule-type.component.html',
  styleUrls: ['./schedule-type.component.css']
})
export class ScheduleTypeComponent implements OnInit {
  @Input() datefrom: string;
  @Input() roomType: string;

  schedule:Schedule[] = [];
  status:string[] = [];
  constructor(private _scheduleService:ScheduleService) {

  }

  ngOnInit() {
    this._scheduleService.findAllScheduleByTypeFromDate(this.datefrom, this.roomType).subscribe(next=>{
      this.schedule = next;
    });
  }
}
