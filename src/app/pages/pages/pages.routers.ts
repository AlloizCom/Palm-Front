import {ArticleComponent} from './article/article.component';
import {Routes} from '@angular/router';
import {ContactsComponent} from './contacts/contacts.component';
import {MainComponent} from './main/main.component';
import {NewsComponent} from './news/news.component';
import {RoomsComponent} from './rooms/rooms.component';
import {PagesComponent} from './pages.component';
import {ServiceComponent} from './service/service.component';
import {RoomsBookingComponent} from './rooms-booking/rooms-booking.component';
import {ProposalComponent} from './proposal/proposal.component';
import {LoginComponent} from './login/login.component';
import {BookFormComponent} from './book-form/book-form.component';

export const pagesRoutes: Routes = [
  {
    path: '', component: PagesComponent
  },
  {
    path: ':lang', component: PagesComponent, children: [
      {path: '', component: MainComponent},
      {path: 'contacts', component: ContactsComponent},
      {
        path: 'news', children: [
          {path: '', component: NewsComponent},
          {path: ':id', component: ArticleComponent},
        ]
      },
      {path: 'service/:id', component: ServiceComponent},
      {path: 'rooms', component: RoomsComponent},
      {
        path: 'rooms-booking', children: [
          {path: '', component: RoomsBookingComponent},
          {
            path: ':id', children: [
              {path: '', component: RoomsBookingComponent},
              {
                path: 'bookForm', children: [
                  {path: '', component: BookFormComponent},
                  {path: '', redirectTo: '/', pathMatch: 'full'}
                ]
              }
            ]
          },
        ]
      },
      {path: 'proposal/:id', component: ProposalComponent},
      {
        path: 'available-rooms', children: [
          {path: '', component: BookFormComponent},
          // { path: 'room/:id',component: BookFormComponent }
        ],
      },
      {path: 'login', component: LoginComponent},
    ]
  }
];
