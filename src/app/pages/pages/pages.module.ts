import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {ArticleComponent} from "./article/article.component";
import {RoomDescriptionComponent} from "./rooms/room-description/room-description.component";
import {MenuComponent} from "./menu/menu.component";
import {MainComponent} from "./main/main.component";
import {NewsComponent} from "./news/news.component";
import {RoomComponent} from "./rooms/room/room.component";
import {ContactsComponent} from "./contacts/contacts.component";
import {SliderComponent} from "./main/slider/slider.component";
import {FooterComponent} from "./footer/footer.component";
import {GlobalImportsModule} from "../../../shared/global-imports";
import {RoomsComponent} from "./rooms/rooms.component";

@NgModule({
  imports: [
    GlobalImportsModule,
  ],
  declarations: [
    MainComponent,
    MenuComponent,
    FooterComponent,
    NewsComponent,
    ContactsComponent,
    SliderComponent,
    ArticleComponent,
    RoomComponent,
    RoomDescriptionComponent,
    RoomsComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class PagesModule { }
