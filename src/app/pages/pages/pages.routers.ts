import {ArticleComponent} from "./article/article.component";
import {Routes} from "@angular/router";
import {ContactsComponent} from "./contacts/contacts.component";
import {MainComponent} from "./main/main.component";
import {NewsComponent} from "./news/news.component";
import {RoomsComponent} from "./rooms/rooms.component";
import {PagesComponent} from './pages.component';
import {ServiceComponent} from "./service/service.component";
import {RoomsBookingComponent} from "./rooms-booking/rooms-booking.component";
import {ProposalComponent} from "./proposal/proposal.component";
import {AvailableRoomsComponent} from "./available-rooms/available-rooms.component";
import {LoginComponent} from './login/login.component';

export const pagesRoutes: Routes = [
  {
    path: '', component: PagesComponent, children: [
      {
        path: '', component: MainComponent
      }
      , {
        path: 'contacts', component: ContactsComponent
      }, {
        path: 'news', component: NewsComponent
      }, {
        path: 'news/:id', component: ArticleComponent
      }, {
        path: 'service/:id', component: ServiceComponent
      }, {
        path: 'rooms', component: RoomsComponent
      }, {
        path: 'rooms-booking', component: RoomsBookingComponent
      }, {
        path: 'rooms-booking/:id', component: RoomsBookingComponent
      },
      {
        path: 'proposal/:id', component: ProposalComponent
      },
      {
        path: 'available-rooms', component: AvailableRoomsComponent
      },
      {
        path: 'login', component:LoginComponent
      }
    ]
  }
];
