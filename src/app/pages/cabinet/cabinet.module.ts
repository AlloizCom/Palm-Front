import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GlobalImportsModule} from '../../shared/config/global-imports/global-imports.module';
import {UpdateModule} from './update/update.module';
import {AddModule} from './add/add.module';
import {AddComponent} from './add/add.component';
import {UpdateComponent} from './update/update.component';
import {CabinetComponent} from './cabinet.component';
import {BookingComponent} from './booking/booking.component';
import {ScheduleComponent} from './schedule/schedule.component';
import {ScheduleOneComponent} from './schedule/schedule-one/schedule-one.component';


@NgModule({
  imports: [
    CommonModule,
    GlobalImportsModule,
    AddModule,
    UpdateModule
  ],
  declarations: [
    AddComponent,
    UpdateComponent,
    CabinetComponent,
    BookingComponent,
    ScheduleOneComponent,
    ScheduleComponent
  ]
})
export class CabinetModule { }




