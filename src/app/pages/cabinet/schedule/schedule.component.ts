import { Component, OnInit } from '@angular/core';
import {ScheduleService} from "../../../../shared/service/schedule.service";
import {Schedule} from "../../../../shared/models/schedule";
import {RoomTariff} from "../../../../shared/enum/room-tariff";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  providers:[ScheduleService]
})
export class ScheduleComponent implements OnInit {

  schedule:Schedule[]=[];
  roomTariff: any;
  page: number = 0;
  numberOfRows: number = 70;

  constructor(private _scheduleService:ScheduleService) {
    this.roomTariff = RoomTariff;
    this._scheduleService.findAllAvailableScheduleByPage(this.page, this.numberOfRows).subscribe(next=>{
      for (let one of next.shedules){
        this.schedule.push(one);
      }
      console.log("schedule", next.shedules);
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

  showMore(){
      this.page++;
      this._scheduleService.findAllAvailableScheduleByPage(this.page,this.numberOfRows).subscribe(next =>{
        for(let one of next.shedules){
          this.schedule.push(one);
        }
      }, err =>
        {console.log(err)}
        );
    }

}
