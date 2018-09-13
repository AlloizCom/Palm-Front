import { Component, OnInit } from '@angular/core';
import {ScheduleService} from "../../../../shared/service/schedule.service";
import {Schedule} from "../../../../shared/models/schedule";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  providers:[ScheduleService]
})
export class ScheduleComponent implements OnInit {

  schedule:Schedule[]=[];

  constructor(private _scheduleService:ScheduleService) {
    this._scheduleService.findAllAvailable().subscribe(next=>{
      this.schedule = next;
      console.log("schedule", next);
    });
  }

  changeAmountOfRoomForSale(number){
    console.log(number);
    console.log(this.schedule[0]);
    // this._scheduleService.update(number).subscribe(next=>{
    //   console.log("Server respones", next);
    //
    // });
  }


  ngOnInit() {
  }

}
