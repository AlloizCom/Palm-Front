import {Routes} from '@angular/router';
import {CallbackComponent} from './callback/callback.component';
import {NewsComponent} from './news/news.component';
import {OptionComponent} from './option/option.component';
import {OrderComponent} from './order/order.component';
import {RoomComponent} from './room/room.component';
import {TariffComponent} from './tariff/tariff.component';
import {AddComponent} from './add.component';
import {AmenityNameComponent} from './amenity-name/amenity-name.component';

export const addRoutes :Routes =[
  {
    path:'add',component:AddComponent ,children :[
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
      },
      {
        path:'amenity',component: AmenityNameComponent
      }
    ]
  }
]
