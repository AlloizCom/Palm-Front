import { Component, OnInit } from '@angular/core';
import {ScheduleService} from "../../../../shared/service/schedule.service";
import {Schedule} from "../../../../shared/models/schedule";
import {RoomTariff} from "../../../../shared/enum/room-tariff";
import {DatePipe, DeprecatedDatePipe} from "@angular/common";
import {DatePipePipe} from "../../../../shared/pipe/pipe/date-pipe.pipe";

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
  roomTypes: any;
  numberOfRows: number = 150;
  value:string;
  myDate:any;


  constructor(private _scheduleService:ScheduleService) {
    this.myDate = new Date();
    this.myDate = '2018-09-28';
    console.log(this.myDate);
    this.roomTariff = RoomTariff;
    this.roomTypes = Object.keys(RoomTariff).filter((element, index, array) => {
      return (element != 'NONE');
    });
    this._scheduleService.findAllAvailableScheduleByPage(this.page, this.numberOfRows).subscribe(next=>{
      for (let one of next.shedules){
        this.schedule.push(one);
      }
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
