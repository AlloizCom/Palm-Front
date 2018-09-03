import {Routes} from '@angular/router';
import {UpdateComponent} from './update.component';
import {NewsComponent} from './news/news.component';
import {OptionComponent} from './option/option.component';
import {OrderComponent} from './order/order.component';
import {RoomComponent} from './room/room.component';
import {TariffComponent} from './tariff/tariff.component';
import {OneNewsComponent} from './news/one-news/one-news.component';
import {TariffOneComponent} from "./tariff/tariff-one/tariff-one.component";
import {RoomOneComponent} from "./room/room-one/room-one.component";

export const updateRoutes :Routes =[
  {
    path:'update',component:UpdateComponent ,children :[
      {
        path:'news',component:NewsComponent
      },{
        path:'news/:id',component:OneNewsComponent
      },
      {
        path:'option',component:OptionComponent
      },
      {
        path:'order',component:OrderComponent
      },
      // {
      //   path:'option/:id',component:TariffOneComponent
      // },
      {
        path:'room',component:RoomComponent
      },
      {
        path:'room/:id',component:RoomOneComponent
      },
      {
        path:'tariff',component:TariffComponent
      },
      {
        path:'tariff/:id',component:TariffOneComponent
      }
    ]
  }
]
