import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {ArticleComponent} from './article/article.component';
import {RoomsComponent} from './rooms/rooms.component';
import {MainComponent} from './main/main.component';
import {NewsComponent} from './news/news.component';
import {ContactsComponent} from './contacts/contacts.component';
import {SliderComponent} from './main/slider/slider.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MainRoomsComponent} from './main/main-rooms/main-rooms.component';
import {MenuComponent} from './menu/menu.component';
import {FooterComponent} from './footer/footer.component';
import {GlobalImportsModule} from '../../../shared/config/global-imports/global-imports.module';
import {PagesComponent} from './pages.component';
import {ServiceComponent} from './service/service.component';
import {RoomsBookingComponent} from './rooms-booking/rooms-booking.component';
import {TopSliderComponent} from './main/top-slider/top-slider.component';
import { ProposalItemComponent } from './main/proposal-item/proposal-item.component';

@NgModule({
  imports: [
    NgbModule,
    GlobalImportsModule
  ],
  declarations: [
    NewsComponent,
    ContactsComponent,
    RoomsComponent,
    SliderComponent,
    ArticleComponent,
    MainComponent,
    MainRoomsComponent,
    MenuComponent,
    FooterComponent,
    PagesComponent,
    ServiceComponent,
    RoomsBookingComponent,
    TopSliderComponent,
    ProposalItemComponent
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule {
}


