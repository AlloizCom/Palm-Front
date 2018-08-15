import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ArticleComponent} from "./article/article.component";
import {RoomDescriptionComponent} from "./rooms/room-description/room-description.component";
import {RoomsComponent} from "./rooms/rooms.component";
import {MainComponent} from "./main/main.component";
import {NewsComponent} from "./news/news.component";
import {RoomComponent} from "./rooms/room/room.component";
import {ContactsComponent} from "./contacts/contacts.component";
import {SliderComponent} from "./main/slider/slider.component";
import {PipeModule} from '../shared/pipe/pipe.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    PipeModule,
    NgbModule,
    FormsModule
  ],
  declarations: [
    NewsComponent,
    ContactsComponent,
    RoomsComponent,
    SliderComponent,
    ArticleComponent,
    RoomComponent,
    RoomDescriptionComponent,
    MainComponent
  ],
  exports:[
    PipeModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule { }
