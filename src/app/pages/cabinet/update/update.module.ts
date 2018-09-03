import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoomComponent} from './room/room.component';
import {OrderComponent} from './order/order.component';
import {NewsComponent} from './news/news.component';
import {OptionComponent} from './option/option.component';
import {TariffComponent} from './tariff/tariff.component';
import {GlobalImportsModule} from '../../../shared/config/global-imports/global-imports.module';
import { OneNewsComponent } from './news/one-news/one-news.component';
import { TariffOneComponent } from './tariff/tariff-one/tariff-one.component';
import { RoomOneComponent } from './room/room-one/room-one.component';


@NgModule({
  imports: [
    CommonModule,
    GlobalImportsModule
  ],
  declarations: [OrderComponent, RoomComponent, NewsComponent, OptionComponent, TariffComponent, OneNewsComponent, TariffOneComponent, RoomOneComponent]
})
export class UpdateModule { }




