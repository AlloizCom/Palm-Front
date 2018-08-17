import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RoomComponent} from './room/room.component';
import {NewsComponent} from './news/news.component';
import {OptionComponent} from './option/option.component';
import {CallbackComponent} from './callback/callback.component';
import {TariffComponent} from './tariff/tariff.component';
import {OrderComponent} from './order/order.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [OrderComponent, RoomComponent, NewsComponent, OptionComponent, CallbackComponent, TariffComponent]
})
export class AddModule { }




