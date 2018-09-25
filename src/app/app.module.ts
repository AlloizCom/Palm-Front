import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {PagesModule} from "./pages/pages/pages.module";
import {CabinetModule} from "./pages/cabinet/cabinet.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {BsDatepickerModule} from "ngx-bootstrap";
import {FormsModule} from "@angular/forms";
import {GlobalImportsModule} from "../shared/config/global-imports/global-imports.module";
import {DateValueAccessorModule} from "angular-date-value-accessor";
import {routes} from "./app.routes";
import {PipeModule} from "../shared/pipe/pipe.module";
import {RouterModule} from "@angular/router";
import {CallbackService} from "../shared/service/callback.service";
import {ServiceService} from "../shared/service/service.service";
import {NewsService} from "../shared/service/news.service";
import {MenuComponent} from "./pages/pages/menu/menu.component";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {MyInterceptor} from "../shared/interceptors/my.interceptor";
import {UserDetailsService} from "../shared/service/user-details.service";
import {LoginService} from '../shared/service/login.service';
import {BookingFormService} from '../shared/service/booking-form.service';
import {BookService} from '../shared/service/book.service';

@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    PagesModule,
    CabinetModule,
    NgbModule.forRoot(),
    BsDatepickerModule.forRoot(),
    FormsModule,
    GlobalImportsModule,
    PipeModule,
    RouterModule.forRoot(routes),
    DateValueAccessorModule

  ],
  providers: [CallbackService,
    ServiceService,
    NewsService,
    MenuComponent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptor,
      multi: true
    },
    UserDetailsService,
    LoginService,
    BookingFormService,
    BookService

  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}


