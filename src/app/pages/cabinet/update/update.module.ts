import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoomComponent} from './room/room.component';
import {NewsComponent} from './news/news.component';
import {TariffComponent} from './tariff/tariff.component';
import {GlobalImportsModule} from '../../../shared/config/global-imports/global-imports.module';
import {OneNewsComponent} from './news/one-news/one-news.component';
import {TariffOneComponent} from './tariff/tariff-one/tariff-one.component';
import {RoomOneComponent} from './room/room-one/room-one.component';
import {ServicesComponent} from './services/services.component';
import {ServicesOneComponent} from './services/services-one/services-one.component';
import {AmenityComponent} from "./amenity/amenity.component";
import {AmenityOneComponent} from "./amenity/amenity-one/amenity-one.component";
import {MainUpdateComponent} from "./main-update/main-update.component";
import {ScheduleComponent} from './schedule/schedule.component';
import {ScheduleOneComponent} from './schedule/schedule-one/schedule-one.component';
import {BookingComponent} from './booking/booking.component';


@NgModule({
  imports: [
    CommonModule,
    GlobalImportsModule
  ],
  declarations: [RoomComponent,
    NewsComponent,
    TariffComponent,
    OneNewsComponent,
    TariffOneComponent,
    RoomOneComponent,
    ServicesComponent,
    ServicesOneComponent,
    AmenityComponent,
    AmenityOneComponent,
    MainUpdateComponent,
    ScheduleComponent,
    ScheduleOneComponent,
    BookingComponent]
})
export class UpdateModule {
}




