import {ArticleComponent} from "./article/article.component";
import {Routes} from "@angular/router";
import {ContactsComponent} from "./contacts/contacts.component";
import {MainComponent} from "./main/main.component";
import {NewsComponent} from "./news/news.component";
import {RoomsComponent} from "./rooms/rooms.component";
import {PagesComponent} from './pages.component';


export const pagesRoutes: Routes = [
  {
    path: '', component: PagesComponent, children: [
      {
        path: '', component: MainComponent
      },{
        path: 'article', component: ArticleComponent
      },{
        path: 'contacts', component: ContactsComponent
      },{
        path: 'news', component: NewsComponent
      },{
        path: 'rooms', component: RoomsComponent
      }
    ]
  }
];
