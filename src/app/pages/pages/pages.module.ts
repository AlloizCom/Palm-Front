import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ArticleComponent} from "./article/article.component";
import {RoomDescriptionComponent} from "./rooms/room-description/room-description.component";
import {RoomsComponent} from "./rooms/rooms.component";
import {MenuComponent} from "./menu/menu.component";
import {MainComponent} from "./main/main.component";
import {NewsComponent} from "./news/news.component";
import {RoomComponent} from "./rooms/room/room.component";
import {ContactsComponent} from "./contacts/contacts.component";
import {SliderComponent} from "./main/slider/slider.component";
import {FooterComponent} from "./footer/footer.component";

@NgModule({
  imports: [
    CommonModule,
    MainComponent,
    MenuComponent,
    FooterComponent,
    NewsComponent,
    ContactsComponent,
    RoomsComponent,
    SliderComponent,
    ArticleComponent,
    RoomComponent,
    RoomDescriptionComponent
  ],
  declarations: []
})
export class PagesModule { }
