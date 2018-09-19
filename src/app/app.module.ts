import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {PagesModule} from './pages/pages/pages.module';
import {RouterModule} from '@angular/router';
import {routes} from './app.routes';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CabinetModule} from './pages/cabinet/cabinet.module';
import {CallbackService} from '../shared/service/callback.service';
import {UserDetailsService} from '../shared/service/user-details.service';
import {MyInterceptor} from '../shared/interceptors/my.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {GlobalImportsModule} from '../shared/config/global-imports/global-imports.module';
import {PipeModule} from '../shared/pipe/pipe.module';
import {NewsService} from '../shared/service/news.service';
import {ServiceService} from "../shared/service/service.service";
import {MenuComponent} from "./pages/pages/menu/menu.component";
import { DateValueAccessorModule } from 'angular-date-value-accessor';

@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    PagesModule,
    CabinetModule,
    NgbModule.forRoot(),
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

  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}


