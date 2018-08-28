import {ArticleComponent} from "./article/article.component";
import {Routes} from "@angular/router";
import {ContactsComponent} from "./contacts/contacts.component";
import {MainComponent} from "./main/main.component";
import {NewsComponent} from "./news/news.component";
import {RoomsComponent} from "./rooms/rooms.component";
import {PagesComponent} from './pages.component';
import {ServiceComponent} from "./service/service.component";


export const pagesRoutes: Routes = [
  {
    path: '', component: PagesComponent, children: [
      {
        path: '', component: MainComponent
      },{
        path: 'contacts', component: ContactsComponent
      },{
        path: 'news', component: NewsComponent
      },{
        path: 'news/:id', component: ArticleComponent
      },{
        path: 'service/:id', component: ServiceComponent
      },{
        path: 'rooms', component: RoomsComponent
      }
    ]
  }
];
