import {Routes} from '@angular/router';
import {UpdateComponent} from './update.component';
import {CallbackComponent} from './callback/callback.component';
import {NewsComponent} from './news/news.component';
import {OptionComponent} from './option/option.component';
import {OrderComponent} from './order/order.component';
import {RoomComponent} from './room/room.component';
import {TariffComponent} from './tariff/tariff.component';

export const updateRoutes :Routes =[
  {
    path:'update',component:UpdateComponent ,children :[
      {
        path:'callback',component:CallbackComponent
      },
      {
        path:'news',component:NewsComponent
      },
      {
        path:'option',component:OptionComponent
      },
      {
        path:'order',component:OrderComponent
      },
      {
        path:'room',component:RoomComponent
      },
      {
        path:'tariff',component:TariffComponent
      }
    ]
  }
]
