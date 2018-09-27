import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Schedule} from "../../../../../shared/models/schedule";
import {ScheduleService} from "../../../../../shared/service/schedule.service";
import {isNullOrUndefined} from "util";
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-schedule-one',
  templateUrl: './schedule-one.component.html',
  styleUrls: ['./schedule-one.component.css'],
  providers: [ScheduleService]
})
export class ScheduleOneComponent implements OnInit {
  schedule: Schedule = new Schedule();
  id: number = 0;
  scheduleForm: FormGroup;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _scheduleService: ScheduleService
  ) {
    _route.params.subscribe(next => {
      this.id = next['id'];
      this._scheduleService.findOneAvailable(this.id).subscribe(value => {
        this.schedule = value;
      }, err => {
        console.log(err);
      });
    }, err => {
      console.log(err);
    });

  }

  ngOnInit() {
    this.scheduleForm = new FormGroup({
      id:new FormControl(),
      forSale:new FormControl('',[Validators.required,Validators.min(0),Validators.pattern("[0-9]")]),
      active:new FormControl('',[Validators.required,Validators.min(0),Validators.pattern("[0-9]")]),
      available:new FormControl(),
      today:new FormControl(),
      roomType:new FormControl(),
      free:new FormControl()
    });
    this._scheduleService.findOne(this.id).subscribe(next=>{
      console.log(next);
      this.scheduleForm.patchValue(<any>next);
    },err=>{
      console.error(err);
    });
  }


  isNull(object: any): Boolean {
    if (Array.isArray(object)) {
      return !isNullOrUndefined(object[0]);
    } else {
      return !isNullOrUndefined(object);
    }
  }
  update() {
    console.log(this.scheduleForm.getRawValue());
    this._scheduleService.update(this.scheduleForm.getRawValue()).subscribe(next => {
      this.scheduleForm.patchValue(<any>next);
      this._router.navigateByUrl("/cabinet/schedule");
    }, error => {
      console.error(error);
    });
  }
}
