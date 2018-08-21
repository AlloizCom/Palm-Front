import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RoomComponent} from './room/room.component';
import {NewsComponent} from './news/news.component';
import {OptionComponent} from './option/option.component';
import {CallbackComponent} from './callback/callback.component';
import {TariffComponent} from './tariff/tariff.component';
import {OrderComponent} from './order/order.component';
import {GlobalImportsModule} from '../../../shared/config/global-imports/global-imports.module';

@NgModule({
  imports: [
    CommonModule,
    GlobalImportsModule
  ],
  declarations: [OrderComponent, RoomComponent, NewsComponent, OptionComponent, CallbackComponent, TariffComponent],
})
export class AddModule { }




