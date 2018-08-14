import {Routes} from "@angular/router";
import {ArticleComponent} from "./article/article.component";
import {MainComponent} from "./main/main.component";
import {FooterComponent} from "./footer/footer.component";
import {NewsComponent} from "./news/news.component";
import {ContactsComponent} from "./contacts/contacts.component";
import {RoomsComponent} from "./rooms/rooms.component";

export const pagesRoutes: Routes = [
  {
    path: 'main', component: MainComponent
  },
  {
    path: 'article', component: ArticleComponent
  },
  {
    path: 'footer', component: FooterComponent
  },
  {
    path: 'contacts', component: ContactsComponent
  },
  {
    path: 'news', component: NewsComponent
  }, {
    path: 'rooms', component: RoomsComponent
  }
];
