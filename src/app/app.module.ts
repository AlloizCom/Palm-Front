import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MainComponent } from './pages/pages/main/main.component';
import { MenuComponent } from './pages/pages/menu/menu.component';
import { FooterComponent } from './pages/pages/footer/footer.component';
import { NewsComponent } from './pages/pages/news/news.component';
import { ContactsComponent } from './pages/pages/contacts/contacts.component';
import { RoomsComponent } from './pages/pages/rooms/rooms.component';
import { SliderComponent } from './pages/pages/main/slider/slider.component';
import { ArticleComponent } from './pages/pages/article/article.component';
import { RoomComponent } from './pages/pages/rooms/room/room.component';
import { RoomDescriptionComponent } from './pages/pages/rooms/room-description/room-description.component';


@NgModule({
  declarations: [
    AppComponent,
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
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
